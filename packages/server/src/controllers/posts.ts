import { Context } from 'koa';
import { post } from '../models';
import { Post, Errormessage } from '../types';
import { validatePost } from '../utils/validator';

export default class PostController {
  public static async getPosts(ctx: Context) {
    console.log(ctx.request.query);
    // Search Params: latitude & longitude
    // searchString: for search in title, description and address
    // itemType: one of (cookedMeals, groceries or supplies)
    // distance: in kms for nearness of location
    // offset & limit: for pagination (fb's way)
    const DEFAULT_DISTANCE = 2000; // 2km
    let {
      latitude,
      longitude,
      itemType
    }: {
      latitude: string;
      longitude: string;
      itemType: string;
    } = ctx.request.query;
    const {
      searchString,
      distance,
      offset,
      limit
    }: {
      searchString: string;
      distance: string;
      offset: string;
      limit: string;
    } = ctx.request.query;
    if (
      itemType !== 'cookedMeals' &&
      itemType !== 'groceries' &&
      itemType !== 'supplies'
    ) {
      itemType = undefined;
    }
    if (!latitude || !longitude) {
      latitude = undefined;
      longitude = undefined;
    }
    const queryCond = {
      ...(itemType && { 'itemType.cookedMeals': itemType === 'cookedMeals' }),
      ...(itemType && { 'itemType.groceries': itemType === 'groceries' }),
      ...(itemType && { 'itemType.supplies': itemType === 'supplies' }),
      ...(searchString && {
        $or: [
          { title: RegExp(searchString, 'i') },
          { description: RegExp(searchString, 'i') },
          { address: RegExp(searchString, 'i') }
        ]
      }),
      ...(latitude &&
        longitude && {
          pickup_location: {
            $near: {
              $maxDistance: distance
                ? parseInt(distance, 10) * 1000
                : DEFAULT_DISTANCE,
              $geometry: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
              }
            }
          }
        })
    };
    try {
      const postsResponse: Post[] = await post
        .find(queryCond)
        .sort({ pickup_location: 'desc' })
        .limit(parseInt(limit, 10))
        .skip(parseInt(offset, 10));
      ctx.status = 200;
      ctx.body = postsResponse;
    } catch (err) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
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
        error: "The post you are trying to retrieve doesn't exist."
      };
    }
  }

  public static async createPost(ctx: Context) {
    // get a user repository to perform operations with user
    // build up entity user to be saved
    const {
      request: {
        body: {
          title,
          description,
          address,
          pickup_location,
          picturesUris,
          providingOffering,
          itemType,
          phoneNumber,
          listingDaysLife
        }
      }
    } = ctx;
    const postToBeSaved: Post = new post();
    postToBeSaved.title = title;
    postToBeSaved.description = description;
    postToBeSaved.address = address;
    postToBeSaved.pickup_location = {
      type: 'Point',
      coordinates: [
        parseFloat(pickup_location.longitude),
        parseFloat(pickup_location.latitude)
      ]
    };
    postToBeSaved.picturesUris = picturesUris;
    postToBeSaved.providingOffering = providingOffering;
    postToBeSaved.itemType = {
      cookedMeals: itemType.cookedMeals,
      groceries: itemType.groceries,
      supplies: itemType.supplies
    };
    postToBeSaved.phoneNumber = phoneNumber;
    postToBeSaved.listingDaysLife = listingDaysLife;
    postToBeSaved.createdAt = new Date();
    // validate job entity
    const errors: Errormessage[] = validatePost(postToBeSaved);
    // errors is an array of validation errors

    if (errors.length > 0) {
      // return BAD REQUEST status code and errors array
      ctx.status = 400;
      ctx.body = {
        type: 'validation',
        error: errors
      };
    } else if (
      await post.findOne({
        description: postToBeSaved.description,
        title: postToBeSaved.title
      })
    ) {
      // return BAD REQUEST
      ctx.status = 400;
      ctx.body = {
        type: 'error',
        error: [
          {
            message: 'The specified post posting already exists.'
          }
        ]
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
    const {
      request: {
        body: {
          title,
          description,
          address,
          pickup_location,
          picturesUris,
          providingOffering,
          itemType,
          phoneNumber,
          listingDaysLife
        }
      }
    } = ctx;
    // postToBeUpdated.id = ctx.request.body.id
    if (title) document.title = title;
    if (description) {
      document.description = description;
    }
    if (picturesUris) {
      document.picturesUris = picturesUris;
    }
    if (address) {
      document.address = address;
    }
    if (pickup_location && pickup_location.latitude) {
      document.pickup_location.coordinates[1] = parseFloat(
        pickup_location.latitude
      );
    }
    if (pickup_location && pickup_location.longitude) {
      document.pickup_location.coordinates[0] = parseFloat(
        pickup_location.longitude
      );
    }
    if (address) {
      document.address = address;
    }
    if (providingOffering) {
      document.providingOffering = providingOffering;
    }
    if (itemType) {
      document.itemType = itemType;
    }
    if (phoneNumber) {
      document.phoneNumber = phoneNumber;
    }
    if (providingOffering) {
      document.listingDaysLife = listingDaysLife;
    }

    document.updatedAt = new Date();

    postToBeUpdated = document;
    // validate user entity
    const errors: Errormessage[] = validatePost(postToBeUpdated);
    // errors is an array of validation errors

    if (errors.length > 0) {
      // return BAD REQUEST status code and errors array
      ctx.status = 400;
      ctx.body = {
        type: 'validation',
        error: errors
      };
    } else if (!(await post.findById(ctx.params.id))) {
      // check if a user with the specified id exists
      // return a BAD REQUEST status code and error message
      ctx.status = 400;
      ctx.body = {
        type: 'error',
        error: [
          {
            message: "The post you are trying to update doesn't exist already"
          }
        ]
      };
    } else {
      // save the post contained in the PUT body
      const options = { new: true };
      const newPost = await post.findByIdAndUpdate(
        ctx.params.id,
        postToBeUpdated,
        options
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
            message: "The post you are trying to delete doesn't exist."
          }
        ]
      };
    } else {
      // the user is there so can be removed
      await postToRemove.remove();
      // return a NO CONTENT status code
      ctx.status = 204;
      ctx.body = {
        message: 'Deleted the specified post.'
      };
    }
  }
}
