import { Document } from 'mongoose';

interface Post extends Document {
  id: number;
  title: string;
  description?: string;
  latitude: string;
  longitude: string;
  address: string;
  picturesUris: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export default Post;
