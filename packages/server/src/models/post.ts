import { Schema, model, Model } from 'mongoose';
import { Post } from '../types';

const postSchema: Schema = new Schema({
  id: { type: 'number', example: 1 },
  title: { type: 'string', required: true, example: 'Food needed' },
  description: {
    type: 'string',
    required: false,
    example: 'Food for 100 people required in delhi'
  },
  pickup_location: {
    latitude: { type: 'number', required: true },
    longitude: { type: 'number', required: true }
  },
  address: { type: 'string', required: true },
  picturesUris: {
    type: ['string'],
    required: true,
    example: [
      'https://pbs.twimg.com/profile_images/1218785809240748032/L2KEJyTb_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1218785809240748032/L2KEJyTb_400x400.jpg'
    ]
  },
  providingOffering: {
    type: 'boolean',
    required: true,
    example: true
  },
  itemType: {
    cookedMeals: {
      type: 'boolean',
      required: true,
      example: true
    },
    groceries: {
      type: 'boolean',
      required: true,
      example: false
    },
    supplies: {
      type: 'boolean',
      required: true,
      example: false
    }
  },
  phoneNumber: {
    type: 'string',
    required: false,
    example: '+91-8948484848'
  },
  pickupTimes: {
    type: 'string',
    required: false,
    example: 'monday and saturday between 6:00pm to 9:00pm'
  },
  listingDaysLife: {
    type: 'number',
    required: false,
    default: 1,
    example: 2
  },
  createdAt: {
    type: 'string',
    required: true,
    example: new Date(),
    default: Date.now
  },
  updatedAt: { type: 'string', required: false, example: new Date() }
});

const post: Model<Post> = model<Post>('post', postSchema);

export default post;
