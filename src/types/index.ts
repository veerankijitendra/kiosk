import { z } from 'zod';
import { loginSchema, checkInDetailSchema, doctorsFilterSchema } from './schema';

export type LoginFormType = z.infer<typeof loginSchema>;
export type CheckInDetailType = z.infer<typeof checkInDetailSchema>;
export type DoctorFilterType = z.infer<typeof doctorsFilterSchema>;

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

export type AdsResponseType = {
  success: boolean;
  data: {
    _id: string;
    title: string;
    type: string;
    fileName: string;
    contentType: string;
    fileKey: string;
    displayArea: string;
    hospitalId: string;
    departmentId: null;
    duration: number;
    isActive: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
};

export type PaymentMethodType = 'CASH' | 'UPI' | 'CARD';

export type CreateTokenPayload = {
  departmentId: string;
  patientDetails: CheckInDetailType;
  doctorId: string;
  appointmentDate: string;
  paymentType: PaymentMethodType;
};

export type FieldErrorItem = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

export type ApiValidationError = {
  success: boolean;
  errors: FieldErrorItem[];
};

type SuccessResponseType<T> = {
  success: boolean;
  data: T;
};

type Token = {
  _id: string;
  tokenNumber: string;
  sequenceNumber: number;

  departmentId: Department;
  doctorId: Doctor;

  hospitalId: string;
  status: TokenStatus;

  patientId: Patient;

  calledAt: string | null;
  completedAt: string | null;
  canceledAt: string | null;

  createdAt: string;
  updatedAt: string;
};

type Department = {
  _id: string;
  name: string;
  prefix: string;
};

type Doctor = {
  _id: string;
  name: string;
};

type Patient = {
  _id: string;
  name: string;
  phone: string;
  age: number;
};

export type CreateTokenResponseType = SuccessResponseType<Token>;

export type TokenStatus = 'PROVISIONAL' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED';

type DepartmentType = {
  _id: string;
  name: string;
  prefix: string;
  hospitalId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type DepartmentResponseType = SuccessResponseType<DepartmentType[]>;

type DoctorType = {
  _id: string;
  name: string;
  departmentId: {
    _id: string;
    name: string;
    prefix: string;
  };
  hospitalId: string;
  userId: {
    _id: string;
    profilePic: string;
  };
  isAvailable: boolean;
  experience: number;
  availability: {
    day: string;
    from: string;
    to: string;
    _id: string;
  }[];
  tokenConfig: {
    maxPerDay: number;
    avgTimePerPatient: number;
  };
  currentToken: number;
  breaks: {
    from: string;
    to: string;
    label: string;
    _id: string;
  }[];
  consultationFee: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profilePic: null;
};

export type DoctorsResponseType = {
  success: boolean;
  doctors: DoctorType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
