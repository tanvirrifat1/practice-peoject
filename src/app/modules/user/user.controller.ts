import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const createBrand = catchAsync(async (req, res) => {
  await UserService.createBrand(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      'Please check your email to verify your account. We have sent you an OTP to complete the registration process.',
  });
});

const createInfluencer = catchAsync(async (req, res) => {
  await UserService.createInstructor(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:
      'Please check your email to verify your account. We have sent you an OTP to complete the registration process.',
  });
});

export const UserController = {
  createBrand,
  createInfluencer,
};
