import api from "./api";

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error");
    }
  }
};

// Registration function
export const register = async (name, email, password) => {
  try {
    const response = await api.post("/users/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Network error");
    }
  }
};
