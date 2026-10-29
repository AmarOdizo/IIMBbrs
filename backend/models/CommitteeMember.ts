import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICommitteeMember extends Document {
  name: string;
  role: string;
  category: 'Apex' | 'Office Bearer' | 'Executive Member' | 'Advisory';
  title: string;
  institution: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  tags: string[];
  image: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommitteeMemberSchema: Schema<ICommitteeMember> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role (e.g. Chapter Chairman, Honorary Secretary) is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Apex', 'Office Bearer', 'Executive Member', 'Advisory'],
      required: [true, 'Category is required'],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    bio: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
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

export const CommitteeMember: Model<ICommitteeMember> =
  mongoose.models.CommitteeMember ||
  mongoose.model<ICommitteeMember>('CommitteeMember', CommitteeMemberSchema);

export default CommitteeMember;
