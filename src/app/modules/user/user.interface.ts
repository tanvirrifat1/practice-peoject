import { Model, Types } from 'mongoose';

export type TUser = {
  role: string;
  email: string;
  name: string;
  password: string;
  brand?: Types.ObjectId;
  verified?: boolean;
  influencer?: Types.ObjectId;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isExistUserById(id: string): Promise<TUser | null>;
  isExistUserByEmail(email: string): Promise<TUser | null>;
  isAccountCreated(id: string): Promise<boolean>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}
