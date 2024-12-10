import express, { NextFunction, Request, Response } from 'express';
import { BrandController } from './brand.controller';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHelper';
import { USER_ROLES } from '../../ulitis/user';
import { brandValidation } from './brand.validation';

const router = express.Router();

router.patch(
  '/update-brand/:id',
  fileUploadHandler(),
  auth(USER_ROLES.BRAND),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = brandValidation.brandSchema.parse(JSON.parse(req.body.data));
    }
    return BrandController.updateBrand(req, res, next);
  },
);

export const BrandRoutes = router;
