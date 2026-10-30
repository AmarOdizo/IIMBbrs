import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSetting extends Document {
  chapterName: string;
  tagline: string;
  secretariatAddress: string;
  primaryEmail: string;
  membershipEmail: string;
  symposiumEmail: string;
  primaryPhone: string;
  secondaryPhone?: string;
  officeHours: string;
  activeMembersCount: string;
  partnerInstitutionsCount: string;
  studentChaptersCount: string;
  symposiaCount: string;
  chairmanName: string;
  chairmanTitle: string;
  chairmanQuote: string;
  chairmanPhotoUrl?: string;
  updatedAt: Date;
}

const SiteSettingSchema: Schema<ISiteSetting> = new Schema(
  {
    chapterName: {
      type: String,
      default: 'The Indian Institute of Metals • Bhubaneswar Chapter',
    },
    tagline: {
      type: String,
      default: 'Advancing Metallurgy, Mineral Processing & Advanced Materials in Odisha',
    },
    secretariatAddress: {
      type: String,
      default: 'CSIR – Institute of Minerals and Materials Technology (CSIR-IMMT), Acharya Vihar, Bhubaneswar - 751013, Odisha, India',
    },
    primaryEmail: {
      type: String,
      default: 'secretary@iimbhubaneswar.in',
    },
    membershipEmail: {
      type: String,
      default: 'membership@iimbhubaneswar.in',
    },
    symposiumEmail: {
      type: String,
      default: 'symposium2026@iimbhubaneswar.in',
    },
    primaryPhone: {
      type: String,
      default: '+91 674 237 9401',
    },
    secondaryPhone: {
      type: String,
      default: '+91 674 237 4112',
    },
    officeHours: {
      type: String,
      default: 'Mon - Fri: 9:30 AM - 5:30 PM IST',
    },
    activeMembersCount: {
      type: String,
      default: '750+',
    },
    partnerInstitutionsCount: {
      type: String,
      default: '30+',
    },
    studentChaptersCount: {
      type: String,
      default: '4',
    },
    symposiaCount: {
      type: String,
      default: '18',
    },
    chairmanName: {
      type: String,
      default: 'Dr. Ashok Kumar Mohanty, FIE, FIIM',
    },
    chairmanTitle: {
      type: String,
      default: 'Chairman, IIM Bhubaneswar Chapter • Chief Scientist (Retd.), CSIR-IMMT',
    },
    chairmanQuote: {
      type: String,
      default: 'Odisha produces over half of India’s iron ore and bauxite. As we transition towards green hydrogen direct-reduction and circular slag utilisation, the IIM Bhubaneswar Chapter serves as the intellectual crucible transforming resource abundance into sustainable technological sovereignty.',
    },
    chairmanPhotoUrl: {
      type: String,
      default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXJLb17-gAgiAbTuy8BbvJYrloluT-VtCz2Srii32Kl6kmr8754QzKuV0JdNNvve6Sus3DvgQTAObVcV-Ci4BdAGzoG4Vju6YPVhKfe4Z3goGnvDkqAjXlPdfXVbgbkv2CKKd0tufy0Y44iwCX5KRiHSLI4uQt0wa73raNAua88vSdfUQ6-P98KizsHgZ0BNrtLIr_603BX0P5RGtWdpgCPInzBhwJPJMBKuSCRl5mxx9zJm200HmF',
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
