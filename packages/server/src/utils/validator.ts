import { Errormessage } from './../types';
import { Validator } from 'class-validator';
import { Post } from '../types';

const validator = new Validator();
const validatePost = (post: Post): Errormessage[] => {
  const errormessages: Errormessage[] = [];
  if (
    post.title &&
    (!validator.minLength(post.title, 5) ||
      !validator.maxLength(post.title, 40))
  ) {
    errormessages.push({
      field: 'title',
      message: 'Title length should be between 5 & 40 characters.',
    });
  }
  if (
    post.description &&
    (!validator.minLength(post.description, 10) ||
      !validator.maxLength(post.description, 2000))
  ) {
    errormessages.push({
      field: 'description',
      message:
        'Post description length should be between 10 & 2000 characters.',
    });
  }
  if (
    post.address &&
    (!validator.minLength(post.address, 10) ||
      !validator.maxLength(post.address, 400))
  ) {
    errormessages.push({
      field: 'address',
      message: 'Post address length should be between 10 & 400 characters.',
    });
  }
  if (
    post.picturesUris &&
    (!validator.isArray(post.picturesUris) ||
      post.picturesUris.length < 1 ||
      post.picturesUris.length > 3)
  ) {
    errormessages.push({
      field: 'tags',
      message: 'Pictures should be max of 3 and min of 1.',
    });
  }
  post.picturesUris.map((pictureUri) => {
    if (!validator.isFQDN(pictureUri)) {
      errormessages.push({
        field: 'picturesUris',
        message: 'Picture link not valid. Please try again.',
      });
    }
  });
  // Created and upadted dates need not to be valided.
  return errormessages;
};

export { validatePost };
