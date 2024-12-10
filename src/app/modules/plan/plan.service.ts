import Stripe from 'stripe';
import config from '../../config';
import { IPlan } from './plan.interface';
import { Plan } from './plan.model';
import AppError from '../../../utils/AppError';
import httpStatus from 'http-status';

export const stripe = new Stripe(config.stripe_api_secret as string, {
  apiVersion: '2024-11-20.acacia',
});

const createPlan = async (payload: IPlan) => {
  const { name, description, unit, interval } = payload;

  const isExit = await Plan.findOne({ name: name });
  if (isExit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Plan already exist');
  }

  const product = await stripe.products.create({
    name: name,
    description: description,
  });

  // Determine the Stripe interval and interval count
  let stripeInterval: 'day' | 'week' | 'month' | 'year';
  let intervalCount = 1;

  if (interval === 'half-yearly') {
    stripeInterval = 'month';
    intervalCount = 6;
  } else {
    stripeInterval = interval;
  }

  const price = await stripe.prices.create({
    unit_amount: unit * 100, // e.g., $20.00
    currency: 'usd',
    recurring: {
      interval: stripeInterval,
      interval_count: intervalCount,
    },
    product: product.id,
  });

  const plan = await Plan.create({
    name,
    description,
    unit,
    interval: interval,
    productId: product.id,
    priceId: price.id,
  });

  return plan;
};

const getAllPlans = async () => {
  const result = await Plan.find({});

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  return result;
};

const updatePlan = async (planId: string, updatePayload: Partial<IPlan>) => {
  const existingPlan = await Plan.findById(planId);

  if (!existingPlan) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  const { name, description, unit, interval } = updatePayload;

  // Update the product details in Stripe if needed
  if (name || description) {
    const product = await stripe.products.update(existingPlan.productId, {
      name: name || existingPlan.name,
      description: description || existingPlan.description,
    });
  }

  // Handle price updates
  if (unit || interval) {
    let stripeInterval: 'day' | 'week' | 'month' | 'year';
    let intervalCount = 1;

    if (interval === 'half-yearly') {
      stripeInterval = 'month';
      intervalCount = 6;
    } else if (interval) {
      stripeInterval = interval; // Ensure it's a valid Stripe interval
    } else {
      stripeInterval = existingPlan.interval as
        | 'day'
        | 'week'
        | 'month'
        | 'year'; // Use the current interval
    }

    console.log(existingPlan, 'existingPlan');

    // Deactivate the old price
    await stripe.prices.update(existingPlan.priceId, {
      active: false,
    });

    // Create a new price
    const newPrice = await stripe.prices.create({
      unit_amount: (unit || existingPlan.unit) * 100,
      currency: 'usd',
      recurring: {
        interval: stripeInterval,
        interval_count: intervalCount,
      },
      product: existingPlan.productId,
    });

    console.log(newPrice);

    // Update the price ID in the database
    existingPlan.priceId = newPrice.id;
  }

  // Update local database fields
  if (name) existingPlan.name = name;
  if (description) existingPlan.description = description;
  if (unit) existingPlan.unit = unit;
  if (interval) existingPlan.interval = interval;

  await existingPlan.save();

  return existingPlan;
};

const deletePlan = async (planId: string) => {
  const existingPlan = await Plan.findById(planId);
  if (!existingPlan) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  const price = await stripe.prices.update(existingPlan.priceId, {
    active: false,
  });

  if (!price) {
    throw new AppError(httpStatus.NOT_FOUND, 'Price not found');
  }

  const product = await stripe.products.update(existingPlan.productId, {
    active: false,
  });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const result = await Plan.findByIdAndDelete(planId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }

  return result;
};

export const PlanService = {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
};
