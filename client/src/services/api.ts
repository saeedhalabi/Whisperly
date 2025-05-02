import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const signInUrl = `${url}/api/auth/signin`;
const signUpUrl = `${url}/api/auth/signup`;
const logoutUrl = `${url}/api/auth/logout`;
const getUsersUrl = `${url}/api/auth/users`;

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(signInUrl, { email, password });
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

export const getUsers = async (token: string) => {
  try {
    if (!token) {
      throw new Error("No token found. Please sign in.");
    }

    const response = await axios.get(getUsersUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });
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
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (!token) {
      throw new Error("No token found. Please sign in.");
    }

    const response = await axios.get(`${url}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });

    return response.data.user;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};
