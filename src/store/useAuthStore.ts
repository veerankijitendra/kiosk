import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type LoginResponseType } from '../types';

type LoginResponse = Partial<LoginResponseType['data']>;

interface AuthState extends LoginResponse {
  // actions
  setAuth: (data: LoginResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: undefined,
      refreshToken: undefined,
      kioskType: undefined,

      setAuth: ({ token, refreshToken, kioskType }) =>
        set((state) => {
          return {
            token: token ?? state.token,
            refreshToken: refreshToken ?? state.refreshToken,
            kioskType: kioskType ?? state.kioskType,
          };
        }),
      clearAuth: () => set({ token: undefined, refreshToken: undefined, kioskType: undefined }),
    }),
    {
      name: 'kiosk-auth',

      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        kioskType: state.kioskType,
      }),

      version: 1,
    },
  ),
);
