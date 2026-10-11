import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name.')
    .max(80, 'Name is too long.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number.')
    .max(20, 'Phone number is too long.')
    .regex(/^[+\d\s()-]+$/, 'Only digits, spaces, +, - and ( ) are allowed.'),
  addressLine: z
    .string()
    .min(5, 'Please enter a complete street address.')
    .max(200, 'Address is too long.'),
  city: z.string().min(2, 'City is required.').max(80),
  state: z.string().min(2, 'State is required.').max(80),
  pinCode: z
    .string()
    .min(4, 'Please enter a valid postal code.')
    .max(10, 'Postal code is too long.')
    .regex(/^[A-Za-z0-9\s-]+$/, 'Postal code contains invalid characters.'),
  notes: z.string().max(280, 'Notes must be 280 characters or fewer.').optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;