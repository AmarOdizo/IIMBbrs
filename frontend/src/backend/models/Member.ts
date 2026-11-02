import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMember extends Document {
  memberCode: string;
  name: string;
  category: 'Life Member' | 'Corporate Member' | 'Student Member' | 'Annual Member' | 'Donor Member';
  organization: string;
  designation?: string;
  city: string;
  state: string;
  email?: string;
  phone?: string;
  status: 'Active' | 'Pending Verification' | 'Inactive';
  joinedYear?: number;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema: Schema<IMember> = new Schema(
  {
    memberCode: {
      type: String,
      required: [true, 'Member code (e.g. LM-001) is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Life Member', 'Corporate Member', 'Student Member', 'Annual Member', 'Donor Member'],
      required: [true, 'Membership category is required'],
    },
    organization: {
      type: String,
      required: [true, 'Organization or institution is required'],
      trim: true,
    },
    designation: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      default: 'Bhubaneswar',
      trim: true,
    },
    state: {
      type: String,
      default: 'Odisha',
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Pending Verification', 'Inactive'],
      default: 'Active',
    },
    joinedYear: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

export const Member: Model<IMember> =
  mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);

export default Member;
