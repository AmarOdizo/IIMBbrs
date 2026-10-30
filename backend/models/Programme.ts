import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgramme extends Document {
  title: string;
  category: string;
  annualSchedule: string;
  description: string;
  highlights: string[];
  bannerImage?: string;
  brochurePdfUrl?: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProgrammeSchema: Schema<IProgramme> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Programme title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Programme category is required'],
      trim: true,
      default: 'Annual Tradition',
    },
    annualSchedule: {
      type: String,
      required: [true, 'Annual schedule is required'],
      trim: true,
      default: 'Annually',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    bannerImage: {
      type: String,
      trim: true,
    },
    brochurePdfUrl: {
      type: String,
      trim: true,
    },
    orderIndex: {
      type: Number,
      default: 1,
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

ProgrammeSchema.index({ orderIndex: 1, isActive: 1 });

export const Programme: Model<IProgramme> =
  mongoose.models.Programme || mongoose.model<IProgramme>('Programme', ProgrammeSchema);
