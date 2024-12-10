import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { User } from '../user/user.model';
import { ILoginData, IVerifyEmail } from './auth.interface';
import { jwtHelper } from '../../ulitis/helper/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import cryptoToken from '../../ulitis/cryptoToken';
import { ResetToken } from '../resetToken/resetToken.model';

const loginUser = async (payload: ILoginData) => {
  const { email, password } = payload;
  const isExistUser = await User.findOne({ email });
  if (!isExistUser) {
    throw new Error('User does not exist');
  }

  if (isExistUser.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  if (isExistUser.verified === false) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is not verified');
  }

  //check match password
  if (
    password &&
    !(await User.isMatchPassword(password, isExistUser.password))
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
  }

  const accessToken = jwtHelper.createToken(
    {
      id: isExistUser._id,
      role: isExistUser.role,
      email: isExistUser.email,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    {
      id: isExistUser._id,
      role: isExistUser.role,
      email: isExistUser.email,
    },
    config.jwt.jwtRefreshSecret as Secret,
    config.jwt.jwtRefreshExpiresIn as string,
  );

  return { accessToken, refreshToken };
};

const verifyEmail = async (payload: IVerifyEmail) => {
  const { email, oneTimeCode } = payload;

  const isExistUser = await User.findOne({ email });

  if (!isExistUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  if (!oneTimeCode) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide the OTP. Check your email for the code.',
    );
  }

  // Check if authentication exists
  if (!isExistUser.authentication) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Authentication data is missing for this user.',
    );
  }

  if (isExistUser.authentication.oneTimeCode !== oneTimeCode) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid code');
  }

  const date = new Date();
  if (date > isExistUser?.authentication?.expireAt) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'OTP has expired. Please request a new one.',
    );
  }
  let message;
  let data;

  if (!isExistUser.verified) {
    await User.findOneAndUpdate(
      { _id: isExistUser._id },
      { verified: true, authentication: { oneTimeCode: null, expireAt: null } },
    );
    message =
      'Your email has been successfully verified. Your account is now fully activated.';
  } else {
    await User.findOneAndUpdate(
      { _id: isExistUser._id },
      {
        authentication: {
          isResetPassword: true,
          oneTimeCode: null,
          expireAt: null,
        },
      },
    );

    //create token ;
    const createToken = cryptoToken();
    await ResetToken.create({
      user: isExistUser._id,
      token: createToken,
      expireAt: new Date(Date.now() + 5 * 60000),
    });
    message =
      'Verification Successful: Please securely store and utilize this code for reset password';
    data = createToken;
  }
  return { data, message };
};

export const AuthService = {
  loginUser,
  verifyEmail,
};
