import { BaseContext, Context } from 'koa';
import { post } from '../models';
import {} from 'mongoose';
import { Post, Errormessage } from '../types';
import { validatePost } from '../utils/validator';

export default class PostController {
  public static async getPosts(ctx: BaseContext) {
    await post.find((err, postsRes: Post[]) => {
      if (err) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      } else {
        ctx.status = 200;
        ctx.body = postsRes;
      }
    });
  }
  public static async getPost(ctx: Context) {
    const postRes = await post.findById(ctx.params.id || 0);

    if (postRes) {
      // return OK status code and loaded user object
      ctx.status = 200;
      ctx.body = postRes;
    } else {
      // return a BAD REQUEST status code and error message
      ctx.status = 400;
      ctx.body = {
        error: "The post you are trying to retrieve doesn't exist.",
      };
    }
  }

  public static async createPost(ctx: Context) {
    // get a user repository to perform operations with user
    // build up entity user to be saved
    const postToBeSaved: Post = new post();
    postToBeSaved.title = ctx.request.body.title;
    postToBeSaved.description = ctx.request.body.description;
    postToBeSaved.address = ctx.request.body.address;
    postToBeSaved.latitude = ctx.request.body.latitude;
    postToBeSaved.longitude = ctx.request.body.longitude;
    postToBeSaved.picturesUris = ctx.request.body.pictureUris;
    postToBeSaved.createdAt = new Date();
    // validate job entity
    const errors: Errormessage[] = validatePost(postToBeSaved); // errors is an array of validation errors

    if (errors.length > 0) {
      // return BAD REQUEST status code and errors array
      ctx.status = 400;
      ctx.body = {
        type: 'validation',
        error: errors,
      };
    } else if (
      await post.findOne({
        description: postToBeSaved.description,
        title: postToBeSaved.title,
        address: postToBeSaved.address,
      })
    ) {
      // return BAD REQUEST
      ctx.status = 400;
      ctx.body = {
        type: 'error',
        error: [
          {
            message: 'The specified post posting already exists.',
          },
        ],
      };
    } else {
      // save the post contained in the POST body
      const postRes = await postToBeSaved.save();
      // return CREATED status code and updated post
      ctx.status = 201;
      ctx.body = postRes;
    }
  }

  public static async updatePost(ctx: Context) {
    let postToBeUpdated: Post = new post();
    const document: any = {};
    // postToBeUpdated.id = ctx.request.body.id
    if (ctx.request.body.title) document.title = ctx.request.body.title;
    if (ctx.request.body.description)
      document.description = ctx.request.body.description;
    if (ctx.request.body.picturesUris)
      document.picturesUris = ctx.request.body.picturesUris;
    if (ctx.request.body.latitude)
      document.latitude = ctx.request.body.latitude;
    if (ctx.request.body.longitude)
      document.longitude = ctx.request.body.longitude;
    if (ctx.request.body.address) document.address = ctx.request.body.address;

    document.updatedAt = new Date();

    postToBeUpdated = document;
    // validate user entity
    const errors: Errormessage[] = validatePost(postToBeUpdated); // errors is an array of validation errors

    if (errors.length > 0) {
      // return BAD REQUEST status code and errors array
      ctx.status = 400;
      ctx.body = {
        type: 'validation',
        error: errors,
      };
    } else if (!(await post.findById(ctx.params.id))) {
      // check if a user with the specified id exists
      // return a BAD REQUEST status code and error message
      ctx.status = 400;
      ctx.body = {
        type: 'error',
        error: [
          {
            message: "The post you are trying to update doesn't already",
          },
        ],
      };
    } else {
      // save the post contained in the PUT body
      const newPost = await post.findByIdAndUpdate(
        ctx.params.id,
        postToBeUpdated
      );
      // return CREATED/UPDATED status code and updated post
      ctx.status = 201;
      ctx.body = newPost;
    }
  }

  public static async deletePost(ctx: Context) {
    // find the job by specified id
    const postToRemove: Post = await post.findById(ctx.params.id);
    if (!postToRemove) {
      // return a BAD REQUEST status code and error message
      ctx.status = 400;
      ctx.body = {
        type: 'error',
        error: [
          {
            message: "The post you are trying to delete doesn't exist.",
          },
        ],
      };
    } else {
      // the user is there so can be removed
      await postToRemove.remove();
      // return a NO CONTENT status code
      ctx.status = 204;
      ctx.body = {
        message: 'Deleted the specified post.',
      };
    }
  }
}
