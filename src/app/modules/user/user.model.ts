import mongoose from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<TUser>(
  {
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: 8,
    },
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    influencer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Influencer',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isExistUserById = async (id: string) => {
  const isExist = await User.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist;
};

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

//check user
userSchema.pre('save', async function (next) {
  //check user

  //password hash
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_Salt_rounds),
  );
  next();
});

//check user)

// Middleware and other methods...

export const User = mongoose.model<TUser, UserModel>('User', userSchema);
