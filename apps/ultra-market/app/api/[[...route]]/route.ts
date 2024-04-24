import { BaselimeLogger } from '@baselime/edge-logger';
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { createDbConnection } from './db';
import { instrument, ResolveConfigFn } from '@microlabs/otel-cf-workers';

export const runtime = 'edge';

type Environment = {
  DB: () => PrismaClient;
  BASELIME_API_KEY: string;
  SERVICE_NAME: string;
};

const app = new Hono<{ Bindings: Environment }>().basePath('/api');
// init baselime
app.use(async (ctx, next) => {
  const logger = new BaselimeLogger({
    service: ctx.env?.SERVICE_NAME || process.env.SERVICE_NAME!,
    namespace: ctx.req.url,
    apiKey: ctx.env?.BASELIME_API_KEY || process.env.BASELIME_API_KEY!,
    ctx: ctx.executionCtx,
    isLocalDev: process.env.NODE_ENV === 'development',
  });
  await next();
  if (ctx.executionCtx.waitUntil) ctx.executionCtx.waitUntil(logger.flush());
  else {
    await logger.flush();
  }
});

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

const config: ResolveConfigFn = (env: Environment, _trigger) => {
  return {
    exporter: {
      url: 'https://otel.baselime.io/v1',
      headers: { 'x-api-key': env.BASELIME_API_KEY },
    },
    service: { name: env.SERVICE_NAME },
  };
};

const instrumented = instrument({ fetch: handle(app) }, config);
export const GET = instrumented;
export const POST = instrumented;
