import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import config from '../../config';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...payload } = req.body;

  const result = await AuthService.loginUser(payload);

  res.cookie('refreshToken', result.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { ...verifyData } = req.body;
  const result = await AuthService.verifyEmail(verifyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result.message,
    data: result.data,
  });
});

export const AuthController = {
  loginUser,
  verifyEmail,
};
