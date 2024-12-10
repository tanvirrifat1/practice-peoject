import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../ulitis/user';

const router = express.Router();

router.post('/create-brand', UserController.createBrand);

router.post('/create-influencer', UserController.createInfluencer);

router.get(
  '/profile',
  auth(
    USER_ROLES.BRAND,
    USER_ROLES.INFLUENCER,
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
  ),
  UserController.getProfile,
);

export const UserRoute = router;
