import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactInquiry extends Document {
  docketId: string;
  category: 'symposia' | 'membership' | 'industry' | 'student' | 'secretariat';
  fullName: string;
  email: string;
  phone?: string;
  organization: string;
  subjectRef: string;
  messageBody: string;
  attachmentUrl?: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Resolved' | 'Archived';
  assignedTo?: mongoose.Types.ObjectId;
  replyNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema: Schema<IContactInquiry> = new Schema(
  {
    docketId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      enum: ['symposia', 'membership', 'industry', 'student', 'secretariat'],
      required: [true, 'Inquiry category is required'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Professional email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'Affiliated organization is required'],
      trim: true,
    },
    subjectRef: {
      type: String,
      required: [true, 'Subject/Reference is required'],
      trim: true,
    },
    messageBody: {
      type: String,
      required: [true, 'Official communication body is required'],
    },
    attachmentUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Assigned', 'In Progress', 'Resolved', 'Archived'],
      default: 'New',
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    replyNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);

export default ContactInquiry;
