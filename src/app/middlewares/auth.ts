import { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/AppError';
import { jwtHelper } from '../ulitis/helper/jwtHelper';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.headers.authorization;
      if (!tokenWithBearer) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      if (tokenWithBearer && tokenWithBearer.startsWith('Bearer')) {
        const token = tokenWithBearer.split(' ')[1];

        //verify token
        const verifyUser = jwtHelper.verifyToken(
          token,
          config.jwt.jwt_secret as Secret,
        );
        //set user to header
        req.user = verifyUser;

        //guard user
        if (roles.length && !roles.includes(verifyUser.role)) {
          throw new AppError(
            httpStatus.FORBIDDEN,
            "You don't have permission to access this api",
          );
        }

        next();
      }
    } catch (error) {
      next(error);
    }
  };

export default auth;
