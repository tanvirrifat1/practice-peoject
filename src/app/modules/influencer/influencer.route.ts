import express, { NextFunction, Request, Response } from 'express';
import { InfluencerController } from './influencer.controller';
import fileUploadHandler from '../../middlewares/fileUploadHelper';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../ulitis/user';
import { influencerValidation } from './influencer.validation';

const router = express.Router();

router.patch(
  '/update-influencer/:id',
  fileUploadHandler(),
  auth(USER_ROLES.INFLUENCER),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = influencerValidation.influencerSchema.parse(
      JSON.parse(req.body.data),
    );
    return InfluencerController.updateInfluencer(req, res, next);
  },
);

export const InfluencerRoute = router;
