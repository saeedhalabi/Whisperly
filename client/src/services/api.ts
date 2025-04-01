import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const signInUrl = `${url}/api/auth/signin`;
const signUpUrl = `${url}/api/auth/signup`;
const logoutUrl = `${url}/api/auth/logout`;

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      signInUrl,
      { email, password },
      { withCredentials: true }
    );

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
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(logoutUrl, {}, { withCredentials: true });
    return response;
  } catch (error: any) {
    throw error.response
      ? error.response.data.message
      : "Network error, please try again.";
  }
};
