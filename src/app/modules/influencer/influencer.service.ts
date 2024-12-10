import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { IInfluencer, UpdateInfluencerPayload } from './influencer.interface';
import { Influencer } from './influencer.model';
import unlinkFile from '../../../shared/unlinkFile';

const updateInfluencer = async (
  id: string,
  payload: UpdateInfluencerPayload,
) => {
  const isExistInfluencer = await Influencer.findById(id);
  if (!isExistInfluencer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Influencer not found');
  }

  if (payload.imagesToDelete && payload.imagesToDelete.length > 0) {
    for (let image of payload.imagesToDelete) {
      unlinkFile(image);
    }

    isExistInfluencer.image = isExistInfluencer.image.filter(
      (img) => !payload.imagesToDelete!.includes(img),
    );
  }

  const updateImage = payload.image
    ? [...isExistInfluencer.image, ...payload.image]
    : isExistInfluencer.image;

  const uopdateData = {
    ...payload,
    image: updateImage,
  };

  const result = await Influencer.findByIdAndUpdate(id, uopdateData, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Influencer not found');
  }

  return result;
};

export const InfluencerService = {
  updateInfluencer,
};
