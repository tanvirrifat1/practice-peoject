import { Plan } from '../plan/plan.model';
import { stripe } from '../plan/plan.service';
import { User } from '../user/user.model';

const createCheckoutSessionService = async (
  userId: string,
  planId: string, // The plan that the user is subscribing to
) => {
  const isUser = await User.findById(userId);

  try {
    // Assuming 'Plan' is a model containing plan details, including priceId
    const plan = await Plan.findById(planId); // Fetch the plan by its ID
    if (!plan) {
      throw new Error('Plan not found');
    }

    // Create a checkout session for a subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId, // The priceId associated with the plan
          quantity: 1, // Quantity is usually 1 for subscriptions
        },
      ],
      mode: 'subscription', // Use subscription mode if this is for a subscription
      success_url:
        'https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://yourapp.com/cancel',
      metadata: {
        userId,
        planId, // Store planId for reference
      },
      customer_email: isUser?.email,
    });

    // Return the checkout session URL
    return session.url;
  } catch (error) {
    console.error('Stripe session creation failed:', error);
    throw new Error('Failed to create checkout session');
  }
};

export const SubscriptationService = {
  createCheckoutSessionService,
};
