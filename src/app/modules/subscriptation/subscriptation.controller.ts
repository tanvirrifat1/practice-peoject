import { Request, Response } from 'express';
import { SubscriptationService } from './subscriptation.service';

const createCheckoutSessionController = async (req: Request, res: Response) => {
  const { userId, planId } = req.body; // Expecting planId for subscriptions

  console.log(userId, planId);

  try {
    // Pass the correct parameters (userId, email, and planId)
    const sessionUrl = await SubscriptationService.createCheckoutSessionService(
      userId,
      planId, // Use planId instead of products
    );
    res.status(200).json({ url: sessionUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create checkout session' });
  }
};

export const SubscriptationController = {
  createCheckoutSessionController,
};
