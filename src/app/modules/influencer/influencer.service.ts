import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { IInfluencer } from './influencer.interface';
import { Influencer } from './influencer.model';

const updateInfluencer = async (id: string, payload: Partial<IInfluencer>) => {
  const result = await Influencer.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Influencer not found');
  }

  return result;
};

export const InfluencerService = {
  updateInfluencer,
};
