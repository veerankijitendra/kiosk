import api from './api';
import type { LoginFormType, LoginResponseType } from '../types';

class AuthService {
  async login(credential: LoginFormType): Promise<LoginResponseType> {
    try {
      const { data } = await api.post<LoginResponseType>('/api/auth/login', credential);
      return data;
    } catch (error: unknown) {
      throw (error as { response: { data: unknown } })?.response?.data || error;
    }
  }

  async logout(): Promise<void> {}
}

export const authService = new AuthService();
