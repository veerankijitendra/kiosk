import type {
  CreateTokenResponseType,
  AdsResponseType,
  CreateTokenPayload,
  DepartmentResponseType,
  DoctorFilterType,
  DoctorsResponseType,
} from '../types';
import api from './api';
import { API_END_POINTS } from '../utils/apiEndPoints';
import { doctorsFilterSchema } from '../types/schema';

class KioskService {
  async getAds(): Promise<AdsResponseType> {
    const { data } = await api.get<AdsResponseType>(API_END_POINTS.GET_ADS);
    return data;
  }

  async createToken(patientDetails: CreateTokenPayload): Promise<unknown> {
    const { data } = await api.post<CreateTokenResponseType>(
      API_END_POINTS.CREATE_TOKEN,
      patientDetails,
    );
    return data;
  }

  async getDepartments(): Promise<DepartmentResponseType> {
    const { data } = await api.get<DepartmentResponseType>(API_END_POINTS.GET_DEPARTMENTS);
    return data;
  }

  async getDoctors(filters: DoctorFilterType): Promise<DoctorsResponseType> {
    const result = doctorsFilterSchema.safeParse(filters);
    if (!result.success) throw result.error;
    console.log(filters, 'jitendra');

    const queryObj = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryObj.append(key, String(value));
      }
    });

    // const queryParams = queryObj.toString();

    // const { data } = await api.get<unknown>(
    //   `${API_END_POINTS.GET_DOCTORS}${queryParams ? `?${queryParams}` : ''} }`,
    // );

    const { data } = await api.get<DoctorsResponseType>(
      `${API_END_POINTS.GET_DOCTORS}?departmentId=${filters.departmentId}`,
    );
    return data;
  }
}

export const kioskService = new KioskService();
