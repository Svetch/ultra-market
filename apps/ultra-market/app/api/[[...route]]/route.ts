import { db } from './db';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.get('/search/:query?', async (ctx, params) => {
  const { query } = ctx.req.param();
  const items = await db.shopItem.findMany({
    where: {
        OR:[
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
              }
            },
            {
              tags: {
                hasSome: query?.split(' '),
              }
            }
          ]
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

export const GET = handle(app)
export const POST = handle(app)
