import apiClient from "./apiClient";

export const getAll = async (endpoint) => {
  return apiClient.get(endpoint);
};

export const getById = async (endpoint, id) => {
  return apiClient.get(`${endpoint}/${id}`);
};

export const createItem = async (endpoint, payload) => {
  return apiClient.post(endpoint, payload);
};

export const updateItem = async (endpoint, id, payload) => {
  return apiClient.put(`${endpoint}/${id}`, payload);
};

export const deleteItem = async (endpoint, id) => {
  return apiClient.delete(`${endpoint}/${id}`);
};
