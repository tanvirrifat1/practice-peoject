import express from 'express';
import { SubscriptationController } from './subscriptation.controller';

const router = express.Router();

//webhook
router.post(
  '/create-checkout-session',
  SubscriptationController.createCheckoutSessionController,
);

export const SubscriptationRoutes = router;
