import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISymposiumRegistration extends Document {
  symposiumTitle: string;
  delegateName: string;
  email: string;
  phone: string;
  institution: string;
  tier: 'IIM Members' | 'Non-Members' | 'Student Delegates' | 'Corporate / Industry';
  feeAmount: number;
  mode: 'Physical' | 'Virtual' | 'Hybrid';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentId?: string;
  badgeQrCode?: string;
  dietaryPreference?: string;
  isAttendingBanquet: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SymposiumRegistrationSchema: Schema<ISymposiumRegistration> = new Schema(
  {
    symposiumTitle: {
      type: String,
      default: '18th National Symposium (AHSS-2026)',
      trim: true,
    },
    delegateName: {
      type: String,
      required: [true, 'Delegate name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    institution: {
      type: String,
      required: [true, 'Institution or company is required'],
      trim: true,
    },
    tier: {
      type: String,
      enum: ['IIM Members', 'Non-Members', 'Student Delegates', 'Corporate / Industry'],
      required: [true, 'Registration tier is required'],
    },
    feeAmount: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      enum: ['Physical', 'Virtual', 'Hybrid'],
      default: 'Physical',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    paymentId: {
      type: String,
      default: '',
      trim: true,
    },
    badgeQrCode: {
      type: String,
      default: '',
    },
    dietaryPreference: {
      type: String,
      default: 'Standard',
    },
    isAttendingBanquet: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SymposiumRegistration: Model<ISymposiumRegistration> =
  mongoose.models.SymposiumRegistration ||
  mongoose.model<ISymposiumRegistration>('SymposiumRegistration', SymposiumRegistrationSchema);

export default SymposiumRegistration;
