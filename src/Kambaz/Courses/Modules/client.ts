// src/Kambaz/Courses/Modules/client.ts
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return response.data;
};


export const updateModule = async (moduleId: string, module: any) => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${moduleId}`,
    module
  );
  return response.data;
};

export const getModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.get(
    `${MODULES_API}/${moduleId}`
  );
  return response.data;
};

export const getAllModules = async () => {
  const response = await axiosWithCredentials.get(MODULES_API);
  return response.data;
};