import { PostController } from '../controllers';
import * as Router from 'koa-router';

const postRouters = new Router();

// Job ROUTES
postRouters.post('/v1/post', PostController.createPost);
postRouters.put('/v1/post/:id', PostController.updatePost);
postRouters.get('/v1/post/:id', PostController.updatePost);
postRouters.delete('/v1/post/:id', PostController.deletePost);

export default postRouters;
