import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMembershipApplication extends Document {
  docketNo: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  designation?: string;
  cadreSought: string;
  applicationType: 'New Application' | 'Chapter Transfer' | 'Grade Upgrade';
  existingIimId?: string;
  qualification?: string;
  documentsUrl?: string;
  verificationStatus:
    | 'Docs Pending'
    | 'Ready for Seal'
    | 'HOD Endorsed'
    | 'Board Resol. Awaited'
    | 'Approved'
    | 'Rejected'
    | 'Flagged';
  remarks?: string;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MembershipApplicationSchema: Schema<IMembershipApplication> = new Schema(
  {
    docketNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    fullName: {
      type: String,
      required: [true, 'Applicant name is required'],
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
    organization: {
      type: String,
      required: [true, 'Organization or university is required'],
      trim: true,
    },
    designation: {
      type: String,
      default: '',
      trim: true,
    },
    cadreSought: {
      type: String,
      required: [true, 'Cadre sought is required'],
      trim: true,
    },
    applicationType: {
      type: String,
      enum: ['New Application', 'Chapter Transfer', 'Grade Upgrade'],
      default: 'New Application',
    },
    existingIimId: {
      type: String,
      default: '',
      trim: true,
    },
    qualification: {
      type: String,
      default: '',
    },
    documentsUrl: {
      type: String,
      default: '',
    },
    verificationStatus: {
      type: String,
      enum: [
        'Docs Pending',
        'Ready for Seal',
        'HOD Endorsed',
        'Board Resol. Awaited',
        'Approved',
        'Rejected',
        'Flagged',
      ],
      default: 'Docs Pending',
    },
    remarks: {
      type: String,
      default: '',
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    reviewedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const MembershipApplication: Model<IMembershipApplication> =
  mongoose.models.MembershipApplication ||
  mongoose.model<IMembershipApplication>('MembershipApplication', MembershipApplicationSchema);

export default MembershipApplication;
