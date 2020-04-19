import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as KoaBody from 'koa-body';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as winston from 'winston';
import { logger } from './logging';
import { config } from './config';
import { postRoutes } from './routes';
import mongo from './mongo';

const app = new Koa();

// Connect to MongoDB with mongoose
connectDatabase();

app.use(KoaBody());
// Enable cors with default options
app.use(cors());
// ORDER OF BOTH MATTERS AS, CORS CAN OVERRIDE THE HEADERS SET BY HELMET
// Provides important security headers to make your app more secure
app.use(helmet());

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// error handling
app.use(async (ctx: Koa.Context, next) => {
  try {
    // Pass the request to the next middleware function, in this case: winston
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

const router = new Router();

// router.get('/*', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

app.use(router.routes());
app.use(postRoutes.routes()).use(postRoutes.allowedMethods());

const server = app.listen(config.port);

console.log(`\x1b[32m Server running on port ${config.port}`);

export default server;
