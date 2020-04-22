import { Errormessage } from './../types';
import { Validator } from 'class-validator';
import { Post } from '../types';

const validator = new Validator();
const validatePost = (post: Post): Errormessage[] => {
  const errormessages: Errormessage[] = [];
  // title
  if (
    post.title &&
    (!validator.minLength(post.title, 5) ||
      !validator.maxLength(post.title, 40))
  ) {
    errormessages.push({
      field: 'title',
      message: 'Title length should be between 5 & 40 characters.'
    });
  }
  // description
  if (
    post.description &&
    (!validator.minLength(post.description, 10) ||
      !validator.maxLength(post.description, 2000))
  ) {
    errormessages.push({
      field: 'description',
      message: 'Post description length should be between 10 & 2000 characters.'
    });
  }
  // pickup_location
  if (
    post.pickup_location &&
    post.pickup_location.latitude &&
    !validator.isNumber(post.pickup_location.latitude) &&
    post.pickup_location.longitude &&
    !validator.isNumber(post.pickup_location.longitude)
  ) {
    errormessages.push({
      field: 'pickup_location',
      message: 'Location is not valid.'
    });
  }
  // address
  if (
    post.address &&
    (!validator.minLength(post.address, 10) ||
      !validator.maxLength(post.address, 400))
  ) {
    errormessages.push({
      field: 'address',
      message: 'Post address length should be between 10 & 400 characters.'
    });
  }
  const phoneNumberRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  // phoneNumber
  if (post.phoneNumber && !post.phoneNumber.match(phoneNumberRegexp)) {
    errormessages.push({
      field: 'phoneNumber',
      message: 'Phone Number is not valid.'
    });
  }
  // listingDaysLife
  if (
    post.listingDaysLife &&
    !validator.min(1, post.listingDaysLife) &&
    !validator.max(30, post.listingDaysLife)
  ) {
    errormessages.push({
      field: 'listingDaysLife',
      message: 'Listing Days should be max of 30 and min of 1.'
    });
  }
  // picturesUris
  if (
    post.picturesUris &&
    (!validator.isArray(post.picturesUris) ||
      post.picturesUris.length < 1 ||
      post.picturesUris.length > 3)
  ) {
    errormessages.push({
      field: 'picturesUris',
      message: 'Pictures should be max of 3 and min of 1.'
    });
  }
  post.picturesUris.map((pictureUri) => {
    if (!validator.isFQDN(pictureUri)) {
      errormessages.push({
        field: 'picturesUris',
        message: 'Picture link not valid. Please try again.'
      });
    }
  });
  // Created and upadted dates need not to be valided.
  return errormessages;
};

export { validatePost };
