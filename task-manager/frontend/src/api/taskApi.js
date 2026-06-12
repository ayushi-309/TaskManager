import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/tasks";

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};

export const getTasks = async (search = "", status = "") => {
  const response = await axios.get(
    `${API_URL}?search=${search}&status=${status}`
  );
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`${API_URL}/${id}`, taskData);
  return response.data;
};