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

app.get('/search/:query?', async (ctx, params) => {
  const DB = ctx.env.DB();
  const { query } = ctx.req.param();
  const items = await DB.shopItem.findMany({
    where: {
      OR: [
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          tags: {
            hasSome: query?.split(' '),
          },
        },
      ],
    },
    take: 10,
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      description: true,
      tags: true,
    },
  });

  return ctx.json({ items });
});

export const GET = handle(app);
export const POST = handle(app);
