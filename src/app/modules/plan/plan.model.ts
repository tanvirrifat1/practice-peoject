import mongoose from 'mongoose';
import { IPlan } from './plan.interface';

const planSchema = new mongoose.Schema<IPlan>({
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required: true,
  },
  interval: { type: String, required: true },
  productId: {
    type: String,
    required: true,
  },
  priceId: {
    type: String,
    required: true,
  },
});

export const Plan = mongoose.model<IPlan>('Plan', planSchema);
