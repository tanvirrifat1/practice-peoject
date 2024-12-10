import express, { NextFunction, Request, Response } from 'express';
import { InfluencerController } from './influencer.controller';
import fileUploadHandler from '../../middlewares/fileUploadHelper';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../ulitis/user';
import { influencerValidation } from './influencer.validation';

const router = express.Router();

router.patch(
  '/update-influencer/:id',
  auth(USER_ROLES.INFLUENCER),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    const { imagesToDelete, data } = req.body;

    if (!data && imagesToDelete) {
      req.body = { imagesToDelete };
      return InfluencerController.updateInfluencer(req, res, next);
    }

    if (data) {
      const parsedData = influencerValidation.influencerSchema.parse(
        JSON.parse(data),
      );

      req.body = { ...parsedData, imagesToDelete };
    }

    return InfluencerController.updateInfluencer(req, res, next);
  },
);

export const InfluencerRoute = router;
