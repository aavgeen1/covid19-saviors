import { Document } from 'mongoose';
import { PickupLocation, ItemType } from './types';
interface Post extends Document {
  id: number;
  title: string;
  description?: string;
  pickup_location: PickupLocation;
  address: string;
  picturesUris: [string];
  providingOffering: boolean;
  itemType: ItemType;
  phoneNumber?: string;
  listingDaysLife?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export default Post;
