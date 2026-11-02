import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEventSpeaker {
  name: string;
  designation: string;
  topic?: string;
  image?: string;
}

export interface IEvent extends Document {
  title: string;
  eventType:
    | 'National Symposium'
    | 'Memorial Lecture'
    | 'Technical Workshop'
    | 'Industrial Visit'
    | 'Colloquium'
    | 'Annual General Meeting';
  eventDate: Date;
  time?: string;
  venue: string;
  description: string;
  speakers: IEventSpeaker[];
  bannerImage?: string;
  registrationUrl?: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    eventType: {
      type: String,
      enum: [
        'National Symposium',
        'Memorial Lecture',
        'Technical Workshop',
        'Industrial Visit',
        'Colloquium',
        'Annual General Meeting',
      ],
      required: [true, 'Event type is required'],
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      default: '09:30 AM - 05:30 PM IST',
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    speakers: [
      {
        name: { type: String, required: true },
        designation: { type: String, default: '' },
        topic: { type: String, default: '' },
        image: { type: String, default: '' },
      },
    ],
    bannerImage: {
      type: String,
      default: '',
    },
    registrationUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
