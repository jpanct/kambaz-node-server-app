// src/Kambaz/Courses/People/client.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const USERS_API = `${API_BASE}/users`;

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const findUserById = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}`);
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/courses/${courseId}/users`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};


export const createUser = async (user: any) => {
  const response = await axios.post(USERS_API, user);
  return response.data;
};