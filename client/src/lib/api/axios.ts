import axios from 'axios';

// Default localhost URL
const defaultLocalURL = 'http://localhost:5222/api';

// Try to detect if we're running on a local network IP
const getLocalNetworkUrl = () => {
  try {
    // This will only work in browser environment
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname !== 'localhost' && hostname.match(/^192\.168\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./)) {
        return `http://${hostname}:5222/api`;
      }
    }
  } catch (e) {
    console.warn('Could not determine local network URL', e);
  }
  return null;
};


// Priority: 1. ENV variable 2. Local network IP 3. Default localhost
const baseURL = process.env.NEXT_PUBLIC_API_URL || getLocalNetworkUrl() || defaultLocalURL;

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn(`API URL not found in environment variables. Using ${baseURL}`);
}

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds`
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth headers here later if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced response interceptor with more detailed error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);

    // Enhanced timeout message
    if (error.code === 'ECONNABORTED') {
      throw new Error(`Request timeout - the server at ${baseURL} didn't respond in time`);
    }

    // Network errors (server not running, CORS issues, etc.)
    if (!error.response) {
      throw new Error(
        `Network error - please check if:
        1. The API server is running
        2. You're using the correct URL (${baseURL})
        3. There are no CORS issues (if accessing from different origin)`
      );
    }

    // Handle specific HTTP errors with more context
    switch (error.response.status) {
      case 401:
        throw new Error('Unauthorized - please login');
      case 403:
        throw new Error('Forbidden - you don\'t have permission');
      case 404:
        // Allow 404 for food items by vendor, let the function handle it
        if (error.config.url?.includes('/fooditem/vendor/')) {
          return Promise.reject(error); // Let the function handle it
        }
        throw new Error(`Resource not found at ${error.config.url}`);
      case 400:
        throw new Error(`Bad request: ${error.response.data?.message || 'please check your input'}`);
      case 500:
        throw new Error(`Server error: ${error.response.data?.message || 'please try again later'}`);
      default:
        throw new Error(`Request failed with status ${error.response.status}`);
    }
  }
);

// API endpoints

// Food Item
export const GetFoodItems = async () => {
  try {
    const response = await axiosInstance.get('/fooditem');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export const GetFoodItemsByVendorId = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/fooditem/vendor/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Return empty array if no food items found
      return [];
    }
    console.error(`Failed to fetch food items for vendor ${id}:`, error);
    throw error;
  }
}

export const CreateFoodItem = async (data: any) => {
  try {
    const response = await axiosInstance.post('/fooditem', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create food item:', error);
    throw error;
  }
}

export const UpdateFoodItem = async (id: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/fooditem/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update food item ${id}:`, error);
    // Extract server error message if available
    const errorMessage = error.response?.data?.message ||
      error.response?.data?.error ||
      "Please check your input";
    throw new Error(errorMessage);
  }
};

export const DeleteFoodItem = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/fooditem/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    throw error;
  }
}



// Vendor
export const GetVendors = async () => {
  try {
    const response = await axiosInstance.get('/vendor');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export const GetVendorById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/vendor/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}


// // User
// export const GetUsers = async () => {
//   try {
//     const response = await axiosInstance.get('/user'); // or '/users' depending on your route
//     return response.data;
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     throw error;
//   }
// };

export const Login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/User/login', { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error);
    // Extract server error message if available
    const errorMessage = error.response?.data?.message ||
      error.response?.data?.error ||
      "Invalid email or password";
    throw new Error(errorMessage);
  }
}

export const Signup = async (data: any) => {
  try {
    const response = await axiosInstance.post('/User/signup', data);
    return response.data;
  }
catch (error: any) {
    console.error('Signup failed:', error);
    // Extract server error message if available
    const errorMessage = error.response?.data?.message ||
      error.response?.data?.error ||
      "Please check your input";
    throw new Error(errorMessage);
  }
}

// Menu
export const GetMenus = async () => {
  try {
    const response = await axiosInstance.get('/menu');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch menus:', error);
    throw error;
  }
}

export const GetMenusByVendor = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/menu/vendor/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // No menu items found for this vendor, return empty array
      return [];
    }
    console.error(`Failed to fetch menu items for vendor ${id}:`, error);
    throw error;
  }
};

export const CreateMenu = async (data: any) => {
  try {
    const response = await axiosInstance.post('/menu', data);
    return response.data;
  } catch (error) {
    console.error('Failed to create menu:', error);
    throw error;
  }
}

export const UpdateMenu = async (id: number, data: any) => {
  try {
    const response = await axiosInstance.put(`/menu/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to update menu ${id}:`, error);
    // Extract server error message if available
    const errorMessage = error.response?.data?.message ||
      error.response?.data?.error ||
      "Please check your input";
    throw new Error(errorMessage);
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
}





// Utility function to help debug connection issues
export const checkApiConnection = async () => {
  try {
    const response = await axiosInstance.get('/health');
    return {
      connected: true,
      url: baseURL,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      connected: false,
      url: baseURL,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}