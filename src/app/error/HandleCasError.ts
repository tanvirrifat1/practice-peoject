import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/errInterface';
import httpStatus from 'http-status';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  const statusCode = httpStatus.NOT_FOUND;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
