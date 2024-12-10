import { ZodError } from 'zod';
import { IErrorMessage } from '../ulitis/error.type';

const handleZodError = (error: ZodError) => {
  const errorMessages: IErrorMessage[] = error.errors.map((el) => {
    return {
      path: el.path[el.path.length - 1],
      message: el.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleZodError;
