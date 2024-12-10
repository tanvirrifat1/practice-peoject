import mongoose from 'mongoose';
import { ISubscriptation } from './subscriptation.interface';

const subscriptationSchema = new mongoose.Schema<ISubscriptation>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscriptation = mongoose.model<ISubscriptation>(
  'Subscriptation',
  subscriptationSchema,
);
