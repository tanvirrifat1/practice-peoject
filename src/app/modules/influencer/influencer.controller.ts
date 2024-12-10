import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { InfluencerService } from './influencer.service';

const updateInfluencer = catchAsync(async (req, res) => {
  let image: any = [];
  if (req.files && 'image' in req.files && Array.isArray(req.files.image)) {
    image = req.files.image.map((file) => `/images/${file.filename}`);
  }
  const value = {
    ...req.body,
    image,
  };

  const result = await InfluencerService.updateInfluencer(req.params.id, value);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Influencer updated successfully',
    data: result,
  });
});

export const InfluencerController = {
  updateInfluencer,
};
