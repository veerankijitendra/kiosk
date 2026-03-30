import { z } from 'zod';
import { loginSchema } from './schema';

export type LoginFormType = z.infer<typeof loginSchema>;

export type LoginResponseType = {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    hospitalId: string;
    doctorId: null;
    token: string;
  };
};
