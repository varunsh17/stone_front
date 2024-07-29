import axios from 'axios';
import { ActivityDetails, AddActivityRequest, APIResponse } from './admin-interfaces';
import { CatogoryType } from '../sub-components/edit-table-page';
import { EditPageProps } from '../sub-components/lease-details-table';
import { modifyDataObject } from '../helpers/admin-data-helper';
import { SessionData } from '../../session-manager';

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://stonebridge-backend-dfc59cb7ed48.herokuapp.com',
  headers: {'Content-Type': 'application/json'}
});

export const getAllActivity = async (type: CatogoryType, session: SessionData | null): Promise<EditPageProps> => {
  let result: EditPageProps = {
    tableData: []
  };
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-all-activity`, body)
  .then(response => {
    result = modifyDataObject(type, {code: response.data.code, activities: response.data.type});
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const getActivity = async (activity: string, session: SessionData | null): Promise<ActivityDetails> => {
  let result: ActivityDetails = {
    type: activity,
    managementFee: 0,
    description: ''
  };
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-activity/${activity}`,body)
  .then(response => {
    result = {
      type: activity,
      managementFee: response.data.type.management_fee,
      description: response.data.type.description
    }
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const addActivity = async (data: AddActivityRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, created_by: null};
  await api.post(`/admin/add-activity`, body)
  .then(response => {
    result = {
      code: response.data.code,
      message: response.data.message,
    }
  })
  .catch(error => {
    console.error(error);
  });
  return result;
};
export const updateActivity = async (data: AddActivityRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, updated_by: null};
  await api.put(`/admin/update-activity`, body)
  .then(response => {
    result = {
      code: response.data.code,
      message: response.data.message,
    }
  })
  .catch(error => {
    console.error(error);
  });
  return result;
};
export const deleteActivity = async (activityNo: string, session: SessionData | null): Promise<APIResponse> => {
  let result = {};
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.patch(`/admin/delete-activity/${activityNo}`, body)
  .then(response => {
    result = response;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
