import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudentChapter extends Document {
  institution: string;
  establishedYear: string;
  facultyAdvisor: string;
  location: string;
  memberCount: string;
  highlights: string[];
  badgeStatus: 'Active Chapter' | 'Premier Chapter' | 'Growing Chapter';
  contactEmail?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentChapterSchema: Schema<IStudentChapter> = new Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      unique: true,
      trim: true,
    },
    establishedYear: {
      type: String,
      default: '2015',
      trim: true,
    },
    facultyAdvisor: {
      type: String,
      required: [true, 'Faculty advisor is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Chapter location is required'],
      trim: true,
    },
    memberCount: {
      type: String,
      default: '50+ Students',
    },
    highlights: {
      type: [String],
      default: [],
    },
    badgeStatus: {
      type: String,
      enum: ['Active Chapter', 'Premier Chapter', 'Growing Chapter'],
      default: 'Active Chapter',
    },
    contactEmail: {
      type: String,
      lowercase: true,
      trim: true,
      default: '',
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

export const StudentChapter: Model<IStudentChapter> =
  mongoose.models.StudentChapter ||
  mongoose.model<IStudentChapter>('StudentChapter', StudentChapterSchema);

export default StudentChapter;
