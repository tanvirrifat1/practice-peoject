class AppError extends Error {
  statusCode: number;
  data?: any; // Add a data property for additional response information

  constructor(
    statusCode: number,
    message: string | undefined,
    data?: any, // Optional data parameter
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data; // Assign data to the instance
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
