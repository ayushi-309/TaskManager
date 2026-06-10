import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/tasks";

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData);
  return response.data;
};