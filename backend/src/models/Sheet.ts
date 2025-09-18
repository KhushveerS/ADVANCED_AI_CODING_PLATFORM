import mongoose, { Schema, Document, Model } from 'mongoose';

export interface SheetDocument extends Document {
  key: string;
  title: string;
  author: string;
  description: string;
  topics: string[];
  total: number;
  referenceUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SheetSchema = new Schema<SheetDocument>(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, default: '' },
    topics: { type: [String], default: [] },
    total: { type: Number, required: true },
    referenceUrl: { type: String },
  },
  { timestamps: true }
);

export const SheetModel: Model<SheetDocument> =
  mongoose.models.Sheet || mongoose.model<SheetDocument>('Sheet', SheetSchema);


