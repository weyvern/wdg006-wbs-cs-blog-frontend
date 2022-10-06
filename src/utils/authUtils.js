import axios from "axios";

export const getUser = async (token) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BLOG_API}/auth/me`, {
      headers: { Authorization: token }
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

export const registerUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BLOG_API}/auth/signup`,
      formData
    );
    return { data };
  } catch (error) {
    return { error };
  }
};

export const loginUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BLOG_API}/auth/signin`,
      formData
    );
    return { data };
  } catch (error) {
    return { error };
  }
};
