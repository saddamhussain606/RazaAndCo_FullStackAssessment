import apiClient from "./api";

export const userService = {
  getAll: async () => {
    const res = await apiClient.get("/Users");
    return res.data;
  },

  getById: async (id) => {
    const res = await apiClient.get(`/Users/${id}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await apiClient.post("/Users", payload);
    return res.data;
  },

  update: async (id, payload) => {
    const res = await apiClient.put(`/Users/${id}`, payload);
    return res.data;
  },

  remove: async (id) => {
    await apiClient.delete(`/Users/${id}`);
  },
};
