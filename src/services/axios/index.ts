import axios, { AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/", // Ensure this is defined in your .env file
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use optional chaining and type assertion for headers
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
