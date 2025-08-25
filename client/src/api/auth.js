import api from "./api";

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    return response.data; // return the data (token, user info, etc.)
  } catch (error) {
    // Handle error and throw for component to catch
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error");
    }
  }
};
