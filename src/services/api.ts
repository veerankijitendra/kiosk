import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_END_POINTS } from '../utils/apiEndPoints';
import { useAuthStore } from '../store/useAuthStore';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const getApiUrl = (): string => import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const isRefreshing: boolean = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

const api = axios.create({
  baseURL: getApiUrl(),
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {};

    // ✅ Token
    // const token = getAccessToken();
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Content-Type handling
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// api.interceptors.response.use(
//   (res: AxiosResponse) => res,
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           subscribeTokenRefresh((token: string) => {
//             if (originalRequest.headers) {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             resolve(api(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         const url = getApiUrl() + API_END_POINTS.REFRESH;
//         const refreshToken = useAuthStore.getState().refreshToken;
//         const res = await axios.post<{ token: string }>(
//           url,
//           { refreshToken },
//           { withCredentials: true },
//         );

//         const newToken = res.data.token;

//         // setTokens(newToken, newToken);
//         const setAuth = useAuthStore.getState().setAuth;
//         setAuth({ token: newToken });

//         onRefreshed(newToken);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         }

//         return api(originalRequest);
//       } catch (err) {
//         console.error('Refresh failed', err);
//         const { clearAuth } = useAuthStore.getState();
//         clearAuth();
//         window.location.href = '/';
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     if (error.response?.status === 403) {
//       console.warn('Token expired');
//       const { clearAuth } = useAuthStore.getState();
//       clearAuth();
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   },
// );

export default api;
