import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsCircular extends Document {
  circularNo?: string;
  title: string;
  category:
    | 'Symposium'
    | 'Circular'
    | 'Achievement'
    | 'Lecture'
    | 'Membership'
    | 'Statutory Resolution'
    | 'Electoral Notice';
  summary: string;
  content?: string;
  author: string;
  attachmentPdfUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  readCount: number;
  downloadCount: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsCircularSchema: Schema<INewsCircular> = new Schema(
  {
    circularNo: {
      type: String,
      default: '',
      trim: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, 'News/Circular title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Symposium',
        'Circular',
        'Achievement',
        'Lecture',
        'Membership',
        'Statutory Resolution',
        'Electoral Notice',
      ],
      required: [true, 'Category is required'],
    },
    summary: {
      type: String,
      required: [true, 'Synopsis/summary is required'],
    },
    content: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Secretariat Desk',
      trim: true,
    },
    attachmentPdfUrl: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const NewsCircular: Model<INewsCircular> =
  mongoose.models.NewsCircular ||
  mongoose.model<INewsCircular>('NewsCircular', NewsCircularSchema);

export default NewsCircular;
