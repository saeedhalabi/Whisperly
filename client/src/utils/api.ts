import axios from "axios";

const url = "http://localhost:8080";

const apiUrl = `${url}/api/auth/signin`;

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      apiUrl,
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

const signUpUrl = `${url}/api/auth/signup`;

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
