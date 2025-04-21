import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const signInUrl = `${url}/api/auth/signin`;
const signUpUrl = `${url}/api/auth/signup`;
const logoutUrl = `${url}/api/auth/logout`;
const getUsersUrl = `${url}/api/auth/users`;

// Add an axios request interceptor to include the token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      // Add token to Authorization header if it's available
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(signInUrl, { email, password });
    const { token } = response.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    return response;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};

export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      signUpUrl,
      { firstname: firstName, lastname: lastName, email, password },
      { withCredentials: true }
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token"); // Remove the token from localStorage
    const response = await axios.post(logoutUrl);
    return response;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(getUsersUrl);
    return response.data.users;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};

// Function to get the current user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${url}/api/auth/me`);
    return response.data.user;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};
