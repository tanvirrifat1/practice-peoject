import { z } from 'zod';

export const influencerSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  name: z.string(),
  phone: z.string().optional(),
  zipCode: z.string().optional(),
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
});

export const influencerValidation = {
  influencerSchema,
};
