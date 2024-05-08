import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createDbConnection } from './db';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

type Environment = {
  DB: () => PrismaClient;
};

const app = new Hono<{ Bindings: Environment }>().basePath('/api');

//init prisma
app.use(async (ctx, next) => {
  ctx.env.DB = createDbConnection;
  await next();
});

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

export const GET = handle(app);
export const POST = handle(app);

export function paginate<T extends { id: number | string }>(
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
