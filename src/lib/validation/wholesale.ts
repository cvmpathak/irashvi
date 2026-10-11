import { z } from 'zod';

export const wholesaleSchema = z.object({
  name: z.string().min(2, 'Please enter your name.').max(80),
  company: z.string().min(2, 'Company name is required.').max(120),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number.')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Only digits, spaces, +, - and ( ) are allowed.'),
  businessType: z.enum(['restaurant', 'retailer', 'distributor', 'caterer', 'other'], {
    errorMap: () => ({ message: 'Please pick a business type.' }),
  }),
  productInterest: z
    .string()
    .min(2, 'Please tell us which products you are interested in.')
    .max(240),
  estimatedQuantity: z
    .string()
    .min(2, 'Please share an indicative quantity.')
    .max(120),
  deliveryLocation: z.string().min(2, 'Delivery location is required.').max(120),
  message: z.string().max(600, 'Message must be 600 characters or fewer.').optional(),
});

export type WholesaleFormData = z.infer<typeof wholesaleSchema>;