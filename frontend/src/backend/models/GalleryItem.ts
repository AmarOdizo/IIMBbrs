import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  category: 'Symposium' | 'Lectures' | 'Ceremonies' | 'Field Visits' | 'Campus';
  imageUrl: string;
  description?: string;
  eventDate?: Date;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema<IGalleryItem> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Symposium', 'Lectures', 'Ceremonies', 'Field Visits', 'Campus'],
      required: [true, 'Gallery category is required'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    description: {
      type: String,
      default: '',
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    orderIndex: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);

export default GalleryItem;
