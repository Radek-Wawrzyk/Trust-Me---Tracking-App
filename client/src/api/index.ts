import axios from 'axios';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  validateStatus: (status: number) => {
    return status >= 200 && status < 300;
  },
});

// Set HTTP header with JWT Token
request.interceptors.request.use((config) => {
  // const authStore = useAuthStore();

  // if (authStore.isAuthenticated) {
  //   config.headers = {
  //     ...config.headers,
  //     Authorization: `Bearer ${'token'}`,
  //   };

  //   return config;
  // }

  return config;
});

export default request;
