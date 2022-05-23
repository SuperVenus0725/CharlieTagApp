import axios from "axios";
import { ROOT_API_URL } from "./config";
//Tags API
export const fetchAllTags = async () => {
  const allTags = await axios.get(`${ROOT_API_URL}/tags`);
  return allTags.data;
};

export const addNewTag = async (newTag: object) => {
  return await axios.post(`${ROOT_API_URL}/tags`, newTag);
};

export const editCurrentTag = async (
  guid: string,
  id: string,
  crrTag: object
) => {
  return await axios.post(`${ROOT_API_URL}/tags/${guid}/${id}`, crrTag);
};

export const deleteCurrentTag = async (guid: string, id: string) => {
  return await axios.delete(`${ROOT_API_URL}/tags/${guid}/${id}`);
};

export const assignNewTag = async (
  deviceSelectId: number,
  guid: string,
  id: number
) => {
  return await axios.get(
    `${ROOT_API_URL}/deviceselects/${deviceSelectId}/assign/${guid}/${id}/`
  );
};

export const clearCurrentTag = async (
  deviceSelectId: number,
  guid: string,
  id: number
) => {
  return await axios.get(
    `${ROOT_API_URL}/deviceselects/${deviceSelectId}/cleartag/${guid}/${id}/`
  );
};

//Device Select Api

export const createDeviceSelectId = async (filter: any) => {
  return await axios.post(`${ROOT_API_URL}/deviceselects/`, filter);
};

export const deviceSelectBuild = async (selectId: number) => {
  return await axios.get(`${ROOT_API_URL}/deviceselects/${selectId}/build`);
};

export const fetchDeviceData = async (
  selectId: number,
  pageSize: number,
  crrPage: number
) => {
  return await axios.get(
    `${ROOT_API_URL}/deviceselects/${selectId}/devices/${pageSize}/${
      crrPage - 1
    }/`
  );
};

export const getDeviceSelectInfo = async (deviceSelectId: number) => {
  return await axios.get(`${ROOT_API_URL}/deviceselects/${deviceSelectId}`);
};

export const deleteDeviceSelectId = async (deviceSelectId: number) => {
  return axios.delete(`${ROOT_API_URL}/deviceselects/${deviceSelectId}`);
};

//automation

export const fetchAutomationData = async () => {
  return await axios(`${ROOT_API_URL}/automations/1000/0`);
};

export const deleteCurrentAutomation = async (targetId: number) => {
  return await axios.delete(`${ROOT_API_URL}/automations/${targetId}`);
};

export const editCurrentAutomation = async (id: number, rule: object) => {
  return await axios.post(`${ROOT_API_URL}/automations/${id}`, rule);
};

export const getCurrentAutomation = async (editId: number) => {
  return await axios.get(`${ROOT_API_URL}/automations/${editId}`);
};

export const createNewAutomation = async (newAutomation: object) => {
  return await axios.post(`${ROOT_API_URL}/automations`, newAutomation);
};

export const getAllSettings = async () => {
  return await axios.get(`${ROOT_API_URL}/settings`);
};
