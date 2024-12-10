import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-brand', UserController.createBrand);
router.post('/create-influencer', UserController.createInfluencer);

export const UserRoute = router;
