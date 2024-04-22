import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

app.get('/search', async (ctx) => {
  return ctx.json({ message: 'Hello, from API!' });
});

export default app;

export const handler = handle(app);
