import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type {
  DepartmentResponseType,
  CheckInDetailType,
  PaymentMethodType,
  DoctorsResponseType,
} from '../types/index';

// --- Interfaces ---
type Department = DepartmentResponseType['data'][0];
type Doctor = DoctorsResponseType['doctors'][0];

interface KioskState {
  // Connection State
  isOnline: boolean;

  // Data Slices
  doctor: Doctor | null;
  department: Department | null;
  currentPatient: CheckInDetailType;
  selectedPaymentMethod: PaymentMethodType | null;
  token: string;

  // Actions
  setOnlineStatus: (status: boolean) => void;
  setDoctor: (docs: Doctor) => void;
  setDepartment: (deps: Department) => void;
  registerPatient: (patient: CheckInDetailType) => void;
  setPaymentMethod: (method: PaymentMethodType) => void;
  setToken: (token: string) => void;
  clearSession: () => void; // Call this after payment is successful
}

export const useKioskStore = create<KioskState>()(
  persist(
    (set) => ({
      isOnline: navigator.onLine,
      doctor: null,
      department: null,
      currentPatient: { age: '29', gender: 'Male', name: 'Test', phone: '9999999999' },
      selectedPaymentMethod: null,
      token: '',

      setOnlineStatus: (status) => set({ isOnline: status }),
      setDoctor: (doctor) => set({ doctor }),
      setDepartment: (department) => set({ department }),
      registerPatient: (patient) => set({ currentPatient: patient }),
      setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
      setToken: (token) => set({ token }),

      clearSession: () =>
        set({
          currentPatient: { age: '29', gender: 'Male', name: 'Test', phone: '9999999999' },
          selectedPaymentMethod: null,
        }),
    }),
    {
      name: 'kiosk-medical-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist data, not the online status
      partialize: (state) => ({
        doctor: state.doctor,
        department: state.department,
        currentPatient: state.currentPatient,
        selectedPaymentMethod: state.selectedPaymentMethod,
        token: state.token,
      }),
    },
  ),
);
