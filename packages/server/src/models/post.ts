import { Schema, model, Model } from 'mongoose';
import { Post } from '../types';

const postSchema: Schema = new Schema({
  id: { type: 'number', example: 1 },
  title: { type: 'string', required: true, example: 'Food needed' },
  description: {
    type: 'string',
    required: false,
    example: 'Food for 100 people required in delhi',
  },
  latitude: { type: 'string', required: true },
  longitude: { type: 'string', required: true },
  address: { type: 'string', required: true },
  picturesUris: {
    type: 'array',
    required: true,
    example: [
      'https://pbs.twimg.com/profile_images/1218785809240748032/L2KEJyTb_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1218785809240748032/L2KEJyTb_400x400.jpg',
    ],
  },
  createdAt: { type: 'string', required: true, example: new Date() },
  updatedAt: { type: 'string', required: false, example: new Date() },
});

const post: Model<Post> = model<Post>('post', postSchema);

export default post;
