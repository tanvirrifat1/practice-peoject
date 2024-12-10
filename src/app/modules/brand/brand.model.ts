import mongoose, { model } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new mongoose.Schema<IBrand>(
  {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
    },
    socialLinks: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    image: {
      type: String,
      default: 'https://i.ibb.co.com/bNMNQHP/client.jpg',
    },
  },
  {
    timestamps: true,
  },
);

export const Brand = model<IBrand>('Brand', brandSchema);
