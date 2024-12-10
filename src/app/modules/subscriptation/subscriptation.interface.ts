import { Types } from 'mongoose';

export type ISubscriptation = {
  user: Types.ObjectId;
  plan: Types.ObjectId;
  customerId: string;
  subscriptionId: string;
  status: string;
};
