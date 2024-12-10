import { startSession } from 'mongoose';
import { TUser } from './user.interface';
import { IBrand } from '../brand/brand.interface';
import { USER_ROLES } from '../../ulitis/user';
import { User } from './user.model';
import httpStatus from 'http-status';
import { Brand } from '../brand/brand.model';
import AppError from '../../../utils/AppError';
import { IInfluencer } from '../influencer/influencer.interface';
import { Influencer } from '../influencer/influencer.model';
import generateOTP from '../../ulitis/optGenerate';
import { emailTemplate } from '../../../shared/emailTemple';
import { emailHelper } from '../../../shared/emailHelper';
import { JwtPayload } from 'jsonwebtoken';

const createBrand = async (payload: Partial<TUser & IBrand>) => {
  const session = await startSession();

  try {
    session.startTransaction();

    payload.role = USER_ROLES.BRAND;

    if (!payload.email) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Please provide email');
    }

    const isEmail = await User.findOne({ email: payload.email });

    if (isEmail) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
    }

    const [brand] = await Brand.create([payload], { session });

    if (!brand) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create brand');
    }

    payload.brand = brand._id;

    const [user] = await User.create([payload], { session });

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const otp = generateOTP();

    const emailValaues = {
      name: user.name,
      email: user.email,
      otp: otp,
    };

    const accountMail = emailTemplate.createAccount(emailValaues);

    emailHelper.sendEmail(accountMail);

    const auth = {
      oneTimeCode: otp,
      expireAt: new Date(Date.now() + 5 * 60000),
    };

    const updateUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { authentication: auth } },
      { new: true, session },
    );

    if (!updateUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user');
    }

    await session.commitTransaction();

    return updateUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createInstructor = async (payload: Partial<TUser & IInfluencer>) => {
  const session = await startSession();

  try {
    session.startTransaction();

    payload.role = USER_ROLES.INFLUENCER;

    if (!payload.email) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Please provide email');
    }

    const isEmail = await User.findOne({ email: payload.email });

    if (isEmail) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists');
    }

    const [influencer] = await Influencer.create([payload], { session });

    if (!influencer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create influencer');
    }

    payload.influencer = influencer._id;

    const [user] = await User.create([payload], { session });

    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const otp = generateOTP();

    const values = {
      name: user.name,
      email: user.email,
      otp: otp,
    };

    const accountMail = emailTemplate.createAccount(values);

    emailHelper.sendEmail(accountMail);

    const auth = {
      oneTimeCode: otp,
      expireAt: new Date(Date.now() + 5 * 60000),
    };

    const updateUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { authentication: auth } },
      { new: true, session },
    );

    if (!updateUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user');
    }

    await session.commitTransaction();

    return user;
  } catch (error) {
    session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getProfile = async (user: JwtPayload): Promise<Partial<TUser>> => {
  const { id } = user;

  const isExistUser = await User.findById(id).populate('brand influencer');
  if (!isExistUser) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User doesn't exist!");
  }

  return isExistUser;
};

export const UserService = {
  createBrand,
  createInstructor,
  getProfile,
};
