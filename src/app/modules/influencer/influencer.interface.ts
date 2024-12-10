import { Model } from 'mongoose';
import { GENDER } from './influencer.constant';

export type IInfluencer = {
  name: string;
  description: string;
  image: string[];
  gender: GENDER;
  phone: string;
  email: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  instagram: string;
  facebook: string;
  twitter?: string;
};

export type UpdateInfluencerPayload = Partial<IInfluencer> & {
  imagesToDelete?: string[];
};

export type InfluencerModel = Model<IInfluencer>;
