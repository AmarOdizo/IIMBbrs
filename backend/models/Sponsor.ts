import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISponsor extends Document {
  name: string;
  tier: 'Title Sponsor' | 'Platinum Sponsor' | 'Gold Sponsor' | 'Silver Sponsor' | 'Institutional Partner' | string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SponsorSchema: Schema<ISponsor> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Sponsor name is required'],
      trim: true,
    },
    tier: {
      type: String,
      required: [true, 'Sponsorship tier is required'],
      default: 'Platinum Sponsor',
      trim: true,
    },
    logoUrl: {
      type: String,
      required: [true, 'Logo URL is required'],
      trim: true,
    },
    websiteUrl: {
      type: String,
      trim: true,
    },
    description: {
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

SponsorSchema.index({ orderIndex: 1, isActive: 1 });

export const Sponsor: Model<ISponsor> =
  mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema);
