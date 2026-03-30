import { z } from 'zod';

export const loginSchema = z.object({
  kioskId: z.string().length(6, 'Kiosk ID must be exactly 6 characters'),

  password: z.string().min(3, 'Password must be at least 3 characters'),
});
