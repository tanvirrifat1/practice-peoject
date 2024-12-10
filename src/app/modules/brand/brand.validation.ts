import { z } from 'zod';

export const brandSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
    })
    .optional(),
  name: z.string(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  image: z.string().optional(),
});

export const brandValidation = {
  brandSchema,
};
