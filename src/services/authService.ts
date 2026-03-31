import api from './api';
import type { LoginFormType, LoginResponseType } from '../types';
import { API_END_POINTS } from '../utils/apiEndPoints';

class AuthService {
  async login(credential: LoginFormType): Promise<LoginResponseType> {
    const { data } = await api.post<LoginResponseType>(API_END_POINTS.LOGIN, credential);
    return data;
  }

  async logout(): Promise<void> {}
}

export const authService = new AuthService();
