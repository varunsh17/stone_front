import axios from 'axios';
import { AddBLDRequest, APIResponse, BLDDetails, UpdateBLDRequest } from './admin-interfaces';
import { EditPageProps } from '../sub-components/lease-details-table';
import { modifyDataObject } from '../helpers/admin-data-helper';
import { CatogoryType } from '../sub-components/edit-table-page';
import { SessionData } from '../../session-manager';

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://stonebridge-backend-dfc59cb7ed48.herokuapp.com',
  headers: {'Content-Type': 'application/json'}
});

export const getAllBuilding = async (type: CatogoryType, session: SessionData | null): Promise<EditPageProps> => {
  let result: EditPageProps = {
    tableData: []
  }; 
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-all-building`, body)
  .then(response => {
    result = modifyDataObject(type, {code: response.data.code, buildings: response.data.building});
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const getBuilding = async (buildingNo: string, session: SessionData | null): Promise<BLDDetails> => {
  let result: BLDDetails = {
    building_no: buildingNo,
    address: ''
  };
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-building/${buildingNo}`, body)
  .then(response => {
    result = {
      building_no: buildingNo,
      address: response.data.building.address
    }
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const addBuilding = async (data: AddBLDRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, created_by: null};
  await api.post(`/admin/add-building`, body)
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
export const updateBuilding = async (data: UpdateBLDRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, updated_by: null};
  await api.put(`/admin/update-building`, body)
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
export const deleteBuilding = async (buildingNo: string, session: SessionData | null): Promise<APIResponse> => {
  let result = {};
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.patch(`/admin/delete-building/${buildingNo}`, body)
  .then(response => {
    result = response;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
