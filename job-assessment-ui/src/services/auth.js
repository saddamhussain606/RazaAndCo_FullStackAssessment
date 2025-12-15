import apiClient from "./api";

export const authService = {
  login: async (credentials) => {
    const res = await apiClient.post("/Auth/login", credentials);
    return res.data.token;
  },
};
