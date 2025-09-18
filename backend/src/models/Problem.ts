import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ProblemDocument extends Document {
  externalId: string;
  title: string;
  difficulty: string;
  topic: string;
  tags: string[];
  url: string;
  source: 'leetcode' | 'codeforces' | 'gfg' | 'other';
  rating?: number;
  acceptanceRate?: number;
  sheetKey?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema = new Schema<ProblemDocument>(
  {
    externalId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    topic: { type: String, required: true, index: true },
    tags: { type: [String], default: [] },
    url: { type: String, required: true },
    source: { type: String, required: true, enum: ['leetcode', 'codeforces', 'gfg', 'other'], index: true },
    rating: { type: Number },
    acceptanceRate: { type: Number },
    sheetKey: { type: String, default: null, index: true },
  },
  { timestamps: true }
);

ProblemSchema.index({ source: 1, externalId: 1 }, { unique: true });

export const ProblemModel: Model<ProblemDocument> =
  mongoose.models.Problem || mongoose.model<ProblemDocument>('Problem', ProblemSchema);


