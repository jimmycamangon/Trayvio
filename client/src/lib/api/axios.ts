import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders
} from 'axios';
import { CurrentUserResponse } from '@/types/users';


type ApiErrorResponse = {
  message?: string;
  error?: string;
};


// Configuration
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5222/api';
console.log('API Base URL:', baseURL);

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  } as AxiosRequestHeaders
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.debug(`Requesting: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: unknown) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.debug(`Response from: ${response.config.url}`, response.data);
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const errorInfo = {
        url: axiosError.config?.url || 'unknown',
        method: axiosError.config?.method || 'unknown',
        code: axiosError.code || 'no-code',
        status: axiosError.response?.status || 'no-status',
        message: axiosError.message,
        responseData: axiosError.response?.data
      };

      console.error('API Error:', JSON.stringify(errorInfo, null, 2));

      if (axiosError.code === 'ECONNABORTED') {
        return Promise.reject(new Error(`Request timeout to ${baseURL}`));
      }

      if (!axiosError.response) {
        const message = [
          `Cannot connect to API at ${baseURL}`,
          'Possible causes:',
          '1. Backend service not running',
          '2. CORS misconfiguration',
          '3. Network firewall blocking',
          `4. Wrong API URL (current: ${baseURL})`
        ].join('\n');
        return Promise.reject(new Error(message));
      }

      switch (axiosError.response.status) {
        case 401:
          return Promise.reject(new Error('Session expired - please login again'));
        case 403:
          return Promise.reject(new Error('You don\'t have permission for this action'));
        case 404:
          if (axiosError.config?.url?.includes('/fooditem/vendor/')) {
            return Promise.reject(axiosError);
          }
          return Promise.reject(new Error('Requested resource not found'));
        default:
          const responseData = axiosError.response?.data as ApiErrorResponse | undefined;
          const serverMessage =
            responseData?.message ||
            responseData?.error ||
            `Request failed with status ${axiosError.response.status}`;

          return Promise.reject(new Error(serverMessage));
      }
    }

    const err = error as Error;
    console.error('Non-Axios Error:', err);
    return Promise.reject(err);
  }
);

// Connection check
interface ConnectionStatus {
  connected: boolean;
  url: string;
  data?: unknown;
  error?: string;
}


export const checkConnection = async (): Promise<ConnectionStatus> => {
  try {
    const response = await axiosInstance.get('/health');
    return {
      connected: true,
      url: baseURL,
      data: response.data
    };
  } catch (error) {
    return {
      connected: false,
      url: baseURL,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// User endpoints
export const Login = async (
  email: string,
  password: string
): Promise<unknown> => {
  const response = await axiosInstance.post('/User/login', { email, password });
  return response.data;
};

export const GetCurrentUser = async (): Promise<CurrentUserResponse> => {
  try {
    const response = await axiosInstance.get('/User/current');
    return response.data;
  } catch (error: unknown) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 404
    ) {
      return {
        success: false,
        message: 'No active user session',
        user: null
      };
    }

    const message =
      error instanceof AxiosError
        ? (error.response?.data as ApiErrorResponse)?.message ?? 'Failed to fetch user'
        : 'Failed to fetch user';

    return {
      success: false,
      message,
      user: null
    };
  }
};

export const Logout = async (): Promise<void> => {
  await axiosInstance.post('/User/logout');
};

export const Signup = async (data: Record<string, unknown>) => {

  try {
    const response = await axiosInstance.post('/User/signup', data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        (error.response?.data as ApiErrorResponse)?.message ||
        (error.response?.data as ApiErrorResponse)?.error ||
        'Please check your input';
      throw new Error(errorMessage);
    }
    throw error;
  }

};

// Vendor endpoints
export const GetVendors = async () => {
  try {
    const response = await axiosInstance.get('/vendor');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vendors:', error);
    throw error;
  }
};

export const GetVendorById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/vendor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch vendor ${id}:`, error);
    throw error;
  }
};

// Menu endpoints
export const GetMenus = async () => {
  try {
    const response = await axiosInstance.get('/menu');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch menus:', error);
    throw error;
  }
};

export const GetMenusByVendor = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/menu/vendor/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (
      error instanceof AxiosError &&
      error.response?.status === 404
    ) {
      return [];
    }
    console.error(`Failed to fetch menu items for vendor ${id}:`, error);
    throw error;
  }
};

export const CreateMenu = async (
  data: Record<string, unknown>
) => {
  try {
    const response = await axiosInstance.post('/menu', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create menu:', error);
    throw error;
  }
};

export const UpdateMenu = async (
  id: number,
  data: Record<string, unknown>
) => {
  try {
    const response = await axiosInstance.put(`/menu/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data as ApiErrorResponse | undefined;
      const errorMessage =
        responseData?.message ||
        responseData?.error ||
        'Please check your input';

      throw new Error(errorMessage);
    }

    throw error;
  }
};

export const DeleteMenu = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete menu ${id}:`, error);
    throw error;
  }
};