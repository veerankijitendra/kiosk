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

const data = {
  success: true,
  doctors: [
    {
      _id: '69c61b88b0762272da3fa199',
      name: 'Dr.Sagar',
      departmentId: {
        _id: '69c5179ad905dfcda4bc53df',
        name: 'Neurology',
        prefix: 'NU',
      },
      hospitalId: '69c51765d905dfcda4bc53d5',
      userId: {
        _id: '69c61b88b0762272da3fa197',
        profilePic: '',
      },
      isAvailable: true,
      experience: 5,
      availability: [
        {
          day: 'Monday',
          from: '09:00',
          to: '17:00',
          _id: '69c61b88b0762272da3fa19a',
        },
        {
          day: 'Tuesday',
          from: '09:00',
          to: '17:00',
          _id: '69c61b88b0762272da3fa19b',
        },
        {
          day: 'Wednesday',
          from: '09:00',
          to: '17:00',
          _id: '69c61b88b0762272da3fa19c',
        },
        {
          day: 'Thursday',
          from: '09:00',
          to: '17:00',
          _id: '69c61b88b0762272da3fa19d',
        },
        {
          day: 'Friday',
          from: '09:00',
          to: '17:00',
          _id: '69c61b88b0762272da3fa19e',
        },
      ],
      tokenConfig: {
        maxPerDay: 40,
        avgTimePerPatient: 15,
      },
      currentToken: 0,
      breaks: [
        {
          from: '13:00',
          to: '14:00',
          label: 'Lunch Break',
          _id: '69c61b88b0762272da3fa19f',
        },
      ],
      consultationFee: 1000,
      createdAt: '2026-03-27T05:54:16.665Z',
      updatedAt: '2026-03-27T09:28:05.435Z',
      __v: 0,
      profilePic: null,
    },
    {
      _id: '69c6888c359f49d77e148bdd',
      name: 'Dr.Tarun',
      departmentId: {
        _id: '69c5179ad905dfcda4bc53df',
        name: 'Neurology',
        prefix: 'NU',
      },
      hospitalId: '69c51765d905dfcda4bc53d5',
      userId: {
        _id: '69c6888b359f49d77e148bdb',
        profilePic: '',
      },
      isAvailable: true,
      experience: 5,
      availability: [
        {
          day: 'Monday',
          from: '09:00',
          to: '17:00',
          _id: '69c6888c359f49d77e148bde',
        },
        {
          day: 'Tuesday',
          from: '09:00',
          to: '17:00',
          _id: '69c6888c359f49d77e148bdf',
        },
        {
          day: 'Wednesday',
          from: '09:00',
          to: '17:00',
          _id: '69c6888c359f49d77e148be0',
        },
        {
          day: 'Thursday',
          from: '09:00',
          to: '17:00',
          _id: '69c6888c359f49d77e148be1',
        },
        {
          day: 'Friday',
          from: '09:00',
          to: '17:00',
          _id: '69c6888c359f49d77e148be2',
        },
      ],
      tokenConfig: {
        maxPerDay: 40,
        avgTimePerPatient: 15,
      },
      currentToken: 0,
      breaks: [
        {
          from: '13:00',
          to: '14:00',
          label: 'Lunch Break',
          _id: '69c6888c359f49d77e148be3',
        },
      ],
      consultationFee: 300,
      createdAt: '2026-03-27T13:39:24.073Z',
      updatedAt: '2026-03-27T13:39:24.073Z',
      __v: 0,
      profilePic: null,
    },
    {
      _id: '69c51e36415678dd5119cc2e',
      name: 'Dr. Smith',
      departmentId: {
        _id: '69c517b7d905dfcda4bc53e4',
        name: 'General Medicine',
        prefix: 'GEN',
      },
      hospitalId: '69c51765d905dfcda4bc53d5',
      userId: {
        _id: '69c51e35415678dd5119cc2c',
        profilePic: '',
      },
      isAvailable: true,
      experience: 5,
      availability: [
        {
          day: 'Monday',
          from: '09:00',
          to: '17:00',
          _id: '69c51e36415678dd5119cc2f',
        },
        {
          day: 'Tuesday',
          from: '09:00',
          to: '17:00',
          _id: '69c51e36415678dd5119cc30',
        },
        {
          day: 'Wednesday',
          from: '09:00',
          to: '17:00',
          _id: '69c51e36415678dd5119cc31',
        },
        {
          day: 'Thursday',
          from: '09:00',
          to: '17:00',
          _id: '69c51e36415678dd5119cc32',
        },
        {
          day: 'Friday',
          from: '09:00',
          to: '17:00',
          _id: '69c51e36415678dd5119cc33',
        },
      ],
      tokenConfig: {
        maxPerDay: 40,
        avgTimePerPatient: 15,
      },
      currentToken: 0,
      breaks: [
        {
          from: '13:00',
          to: '14:00',
          label: 'Lunch Break',
          _id: '69c51e36415678dd5119cc34',
        },
      ],
      consultationFee: 1000,
      createdAt: '2026-03-26T11:53:26.168Z',
      updatedAt: '2026-03-30T13:45:00.525Z',
      __v: 0,
      profilePic: null,
    },
  ],
  pagination: {
    total: 3,
    page: 1,
    pages: 1,
  },
};
