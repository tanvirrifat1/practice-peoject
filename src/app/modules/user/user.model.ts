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
    },
    authentication: {
      isResetPassword: {
        type: Boolean,
        default: false,
      },
      oneTimeCode: {
        type: Number,
      },
      expireAt: {
        type: Date,
      },
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

userSchema.statics.isExistUserById = async function (id: string) {
  return this.findById(id);
};

userSchema.statics.isExistUserByEmail = async function (email: string) {
  return this.findOne({ email });
};

userSchema.statics.isAccountCreated = async function (id: string) {
  const user = await this.findById(id);
  return user ? !!user.authentication?.isResetPassword : false;
};

userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashPassword);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const saltRounds = Number(config.bcrypt_Salt_rounds);
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next();
});

// Middleware and other methods...

export const User = mongoose.model<TUser, UserModel>('User', userSchema);
