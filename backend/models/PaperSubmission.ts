import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaperSubmission extends Document {
  symposiumTitle: string;
  paperTitle: string;
  track:
    | 'Track 1: Green Steel & Hydrogen Metallurgy'
    | 'Track 2: Advanced High Strength Steels (AHSS)'
    | 'Track 3: Critical & Rare Minerals'
    | 'Track 4: Sustainable Mineral Processing';
  authors: string[];
  correspondingAuthor: {
    name: string;
    email: string;
    phone?: string;
    institution: string;
  };
  abstractText: string;
  manuscriptUrl?: string;
  keywords: string[];
  reviewStatus: 'Submitted' | 'Under Review' | 'Revision Required' | 'Accepted' | 'Rejected';
  reviewerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaperSubmissionSchema: Schema<IPaperSubmission> = new Schema(
  {
    symposiumTitle: {
      type: String,
      default: '18th National Symposium (AHSS-2026)',
      trim: true,
    },
    paperTitle: {
      type: String,
      required: [true, 'Paper title is required'],
      trim: true,
    },
    track: {
      type: String,
      enum: [
        'Track 1: Green Steel & Hydrogen Metallurgy',
        'Track 2: Advanced High Strength Steels (AHSS)',
        'Track 3: Critical & Rare Minerals',
        'Track 4: Sustainable Mineral Processing',
      ],
      required: [true, 'Thematic track is required'],
    },
    authors: {
      type: [String],
      required: [true, 'At least one author is required'],
    },
    correspondingAuthor: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, default: '', trim: true },
      institution: { type: String, required: true, trim: true },
    },
    abstractText: {
      type: String,
      required: [true, 'Abstract content is required'],
    },
    manuscriptUrl: {
      type: String,
      default: '',
    },
    keywords: {
      type: [String],
      default: [],
    },
    reviewStatus: {
      type: String,
      enum: ['Submitted', 'Under Review', 'Revision Required', 'Accepted', 'Rejected'],
      default: 'Submitted',
    },
    reviewerNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const PaperSubmission: Model<IPaperSubmission> =
  mongoose.models.PaperSubmission ||
  mongoose.model<IPaperSubmission>('PaperSubmission', PaperSubmissionSchema);

export default PaperSubmission;
