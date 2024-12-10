import mongoose, { model } from 'mongoose';
import { IInfluencer } from './influencer.interface';

const influencerSchema = new mongoose.Schema<IInfluencer>({
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
  gender: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },

  image: [
    {
      type: String,
    },
  ],

  zipCode: {
    type: String,
  },
  twitter: {
    type: String,
  },

  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

export const Influencer = model<IInfluencer>('Influencer', influencerSchema);
