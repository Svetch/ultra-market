import { clerkMiddleware } from '@hono/clerk-auth';
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { FetchEventLike } from 'hono/types';
import Stripe from 'stripe';
import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import { createDbConnection } from './db';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Environment = {
  DB: () => PrismaClient;
};

const app = new Hono<{ Bindings: Environment }>().basePath('/api');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: '2024-04-10',
});

//init prisma
app.use(async (ctx, next) => {
  ctx.env.DB = createDbConnection;
  await next();
});
app.use('*', clerkMiddleware());

app.get('/search', async (ctx, e) => {
  //wait for 10 seconds

  //  await new Promise((resolve) => setTimeout(resolve, 10000));

  const DB = ctx.env.DB();
  const { query, category, price, cursor } = ctx.req.query();
  const [min, max] = price?.split(',').map(Number) || [0, 3000];

  const items = await DB.shopItem.findMany({
    ...(cursor && {
      cursor: {
        id: parseInt(cursor),
      },
    }),
    where: {
      ...(category && {
        categories: {
          some: {
            id: parseInt(category),
          },
        },
      }),
      ...(price && {
        price: {
          gte: min,
          lte: max,
        },
      }),
      ...(query && {
        OR: [
          {
            name: {
              search: query,
            },
          },
          {
            description: {
              search: query,
            },
          },
        ],
      }),
    },
    take: 11,
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
      categories: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    orderBy: {
      ...(query && {
        _relevance: {
          fields: ['name', 'description'],
          search: query,
          sort: 'desc',
        },
      }),
    },
  });
  console.log(items);

  return ctx.json(paginate({ take: 10 }, items));
});

app.get('/categories', async (ctx) => {
  const DB = ctx.env.DB();
  const categories = await DB.category.findMany({
    select: {
      name: true,
      id: true,
    },
    orderBy: {
      name: 'asc',
    },
  });

  return ctx.json(categories);
});

app.get('/item/:id', async (ctx) => {
  const DB = ctx.env.DB();
  const id = parseInt(ctx.req.param('id'));
  if (isNaN(id)) return ctx.json({ error: 'Invalid id' }, 400);

  const item = await DB.shopItem.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
      organizationId: true,
      stock: true,
      shortDescription: true,
      categories: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return ctx.json(item);
});

app.get('/org/item', async (ctx) => {
  const DB = ctx.env.DB();
  const auth = ctx.get('clerkAuth');
  if (!auth?.userId) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const clerk = ctx.get('clerk');
  const orgs = await clerk.users.getOrganizationMembershipList({
    userId: auth.userId,
  });
  const org = orgs.data[0]?.organization;
  if (!org) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  const items = await DB.shopItem.findMany({
    where: {
      organizationId: org.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
      categories: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return ctx.json(items);
});

app.patch('/org/item/:itemId', async (ctx) => {
  const DB = ctx.env.DB();
  const itemId = parseInt(ctx.req.param('itemId'));
  const auth = ctx.get('clerkAuth');
  if (!auth?.userId) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const clerk = ctx.get('clerk');
  const orgs = await clerk.users.getOrganizationMembershipList({
    userId: auth.userId,
  });
  const org = orgs.data[0]?.organization;
  if (!org) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  const body = await ctx.req.json();

  await Promise.all(
    body.categories.map(async (name: string) => {
      await DB.category.upsert({
        where: {
          name,
        },
        create: {
          name,
        },
        update: {},
      });
    })
  );

  const item = await DB.shopItem.update({
    where: {
      id: itemId,
      organizationId: org.id,
    },
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
      images: body.images,
      stock: body.stock,
      shortDescription: body.shortDescription,
      categories: {
        set: body.categories.map((name: string) => ({
          name,
        })),
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
      categories: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return ctx.json(item);
});

app.post('/org/item', async (ctx) => {
  const DB = ctx.env.DB();
  const auth = ctx.get('clerkAuth');
  if (!auth?.userId) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const clerk = ctx.get('clerk');
  const orgs = await clerk.users.getOrganizationMembershipList({
    userId: auth.userId,
  });
  const org = orgs.data[0]?.organization;
  if (!org) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const body = await ctx.req.json();

  const item = await DB.shopItem.create({
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
      images: body.images,
      organization: {
        connectOrCreate: {
          where: {
            id: org.id,
          },
          create: {
            id: org.id,
            owner: {
              connectOrCreate: {
                where: {
                  id: auth.userId,
                },
                create: {
                  id: auth.userId,
                },
              },
            },
          },
        },
      },
      shortDescription: body.shortDescription,
      stock: body.stock,
      categories: {
        connectOrCreate: body.categories.map((name: string) => ({
          where: {
            name,
          },
          create: {
            name,
          },
        })),
      },
    },
  });

  return ctx.json(item);
});

app.get('/org/orders', async (ctx) => {
  const DB = ctx.env.DB();
  const { cursor } = ctx.req.query();
  const auth = ctx.get('clerkAuth');
  if (!auth?.userId) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const clerk = ctx.get('clerk');
  const orgs = await clerk.users.getOrganizationMembershipList({
    userId: auth.userId,
  });
  const org = orgs.data[0]?.organization;
  if (!org) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const orders = await Promise.all(
    (
      await DB.order.findMany({
        ...(cursor && {
          cursor: {
            id: cursor,
          },
        }),
        where: {
          items: {
            some: {
              organizationId: org.id,
            },
          },
        },
        take: 11,
        select: {
          id: true,
          orderStatus: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    ).map(async (order) => {
      return {
        ...(await stripe.checkout.sessions.retrieve(order.id, {
          expand: ['line_items', 'line_items.data.price.product'],
        })),
        orderStatus: order.orderStatus,
      };
    })
  );
  return ctx.json(paginate({ take: 10 }, orders));
});

app.patch('/org/orders/:id', async (ctx) => {
  const DB = ctx.env.DB();
  const auth = ctx.get('clerkAuth');
  if (!auth?.userId) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const clerk = ctx.get('clerk');
  const orgs = await clerk.users.getOrganizationMembershipList({
    userId: auth.userId,
  });
  const org = orgs.data[0]?.organization;
  if (!org) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const body = await ctx.req.json();
  if (
    !['Pending', 'Packiging', 'Shipping', 'Delivered', 'Canceled'].includes(
      body.status
    )
  )
    return ctx.json({ error: 'Invalid status' }, 400);
  const order = await DB.order.update({
    where: {
      id: ctx.req.param('id'),
      items: {
        some: {
          organizationId: org.id,
        },
      },
    },
    data: {
      orderStatus: body.status,
    },
  });
  return ctx.json(order);
});

app.post('/checkout_sessions', async (ctx) => {
  const DB = ctx.env.DB();
  const body = await ctx.req.json();
  const auth = ctx.get('clerkAuth');
  if (!auth || auth?.userId === null) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }

  const items = await DB.shopItem.findMany({
    where: {
      id: {
        in: body.items.map((item: { id: number }) => item.id),
      },
    },
  });
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'pay',
    mode: 'payment',
    line_items: items.map((item) => {
      return {
        price_data: {
          currency: 'HUF',
          product_data: {
            name: item.name,
            images: item.images,
            description: item.description,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: formatAmountForStripe(item.price, 'HUF'),
        },
        quantity: body.items.find((i: any) => i.id === item.id)?.quantity || 1,
      };
    }),
    shipping_address_collection: {
      allowed_countries: ['HU'],
    },
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${ctx.req.header('origin')}/api/result/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${ctx.req.header('origin')}/api/result/{CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession = await stripe.checkout.sessions.create(params);

  const order = await DB.order.create({
    data: {
      orderStatus: 'WaitingForPayment',
      paymentStatus: 'Pending',
      id: checkoutSession.id,
      user: {
        connectOrCreate: {
          where: {
            id: auth.userId,
          },
          create: {
            id: auth.userId,
          },
        },
      },
      items: {
        connect: items.map((item) => ({ id: item.id })),
      },
    },
  });

  return ctx.json(checkoutSession);
});

app.get('/result/:id', async (ctx) => {
  const DB = ctx.env.DB();
  const auth = ctx.get('clerkAuth');
  if (!auth || auth?.userId === null) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const session = await stripe.checkout.sessions.retrieve(ctx.req.param('id'));
  if (!session) return ctx.json({ error: 'Not found' }, 404);
  const order = await DB.order.update({
    where: {
      id: session.id,
    },
    data: {
      paymentStatus: session.payment_status === 'paid' ? 'Payed' : 'Canceled',
      orderStatus: session.payment_status === 'paid' ? 'Pending' : 'Canceled',
      address:
        session.shipping_details?.address?.line1 +
        '' +
        session.shipping_details?.address?.line2,
      city: session.shipping_details?.address?.city,
      country: session.shipping_details?.address?.country,
      phone: session.customer_details?.phone,
      zip: session.shipping_details?.address?.postal_code,
      name: session.shipping_details?.name,
    },
  });
  if (session.status == 'open') {
    await stripe.checkout.sessions.expire(session.id);
    return ctx.redirect(`/search`);
  }

  return ctx.redirect(`/payment/${session.id}`);
});

app.get('/payment/:id', async (ctx) => {
  const DB = ctx.env.DB();
  const auth = ctx.get('clerkAuth');
  if (!auth || auth?.userId === null) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const payment = await stripe.checkout.sessions.retrieve(ctx.req.param('id'), {
    expand: ['line_items', 'line_items.data.price.product'],
  });
  if (!payment) return ctx.json({ error: 'Not found' }, 404);
  return ctx.json(payment);
});

app.get('/price-range', async (ctx) => {
  const DB = ctx.env.DB();
  const minPrice = await DB.shopItem.findFirst({
    select: {
      price: true,
    },
    take: 1,
    orderBy: {
      price: 'asc',
    },
  });

  const maxPrice = await DB.shopItem.findFirst({
    select: {
      price: true,
    },
    take: 1,
    orderBy: {
      price: 'desc',
    },
  });

  return ctx.json({
    min: minPrice?.price || 0,
    max: maxPrice?.price || 10_000,
  });
});

app.get('/me/orders', async (ctx) => {
  const DB = ctx.env.DB();
  const { cursor } = ctx.req.query();
  const auth = ctx.get('clerkAuth');
  if (!auth || auth?.userId === null) {
    return ctx.json({ error: 'Unauthorized' }, 401);
  }
  const orders = await Promise.all(
    (
      await DB.order.findMany({
        ...(cursor && {
          cursor: {
            id: cursor,
          },
        }),
        take: 11,
        where: {
          userId: auth.userId,
        },
        select: { id: true, orderStatus: true },
      })
    ).map(async (order) => ({
      ...(await stripe.checkout.sessions.retrieve(order.id, {
        expand: ['line_items', 'line_items.data.price.product'],
      })),
      orderStatus: order.orderStatus,
    }))
  );
  return ctx.json(paginate({ take: 10 }, orders));
});

const handle =
  (app: Hono<any, any, any>) =>
  (req: Request, requestContext: FetchEventLike) => {
    return app.fetch(req, process.env, requestContext);
  };

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);

function paginate<T extends { id: number | string }>(
  query: {
    take: number;
  },
  data: T[]
): {
  data: T[];
  metaData: {
    lastCursor: number | string | null;
    hasNextPage: boolean;
  };
} {
  if (data.length == 0) {
    return {
      data: [],
      metaData: {
        lastCursor: null,
        hasNextPage: false,
      },
    };
  }

  const lastCursor = data[data.length - 1].id;

  return {
    data: data.slice(0, query.take),
    metaData: {
      lastCursor,
      hasNextPage: data.length > query.take,
    },
  };
}
