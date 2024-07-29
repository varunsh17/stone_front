import axios from 'axios';
import { AddLeaseRequest, APIResponse, LeaseDetails, UpdateLeaseRequest } from './admin-interfaces';
import { CatogoryType } from '../sub-components/edit-table-page';
import { modifyDataObject } from '../helpers/admin-data-helper';
import { EditPageProps } from '../sub-components/lease-details-table';
import { SessionData } from '../../session-manager';

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://stonebridge-backend-dfc59cb7ed48.herokuapp.com',
  headers: {'Content-Type': 'application/json'}
});

export const getAllLease = async (type: CatogoryType, session: SessionData | null): Promise<EditPageProps> => {
  let result: EditPageProps = {
    tableData: []
  };
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-all-lease`, body)
  .then(response => {
    result = modifyDataObject(type, {code: response.data.code, leases: response.data.leases});
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const getLease = async (leaseNo: string, session: SessionData | null): Promise<LeaseDetails> => {
  let result: LeaseDetails= {
    lease_no: '',
    bill_to: ''
  };
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.post(`/admin/get-lease/${leaseNo}`, body)
  .then(response => {
    result = {
      lease_no: leaseNo,
      bill_to: response.data.lease.bill_to
    };
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
export const addLease = async (data: AddLeaseRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, created_by: null};
  await api.post(`/admin/add-lease`, body)
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
export const updateLease = async (data: UpdateLeaseRequest, session: SessionData | null) => {
  let result: APIResponse = {};
  const body = {
    email: session && session.email,
    password: session && session.password, ...data, updated_by: null};
  console.log()
  await api.put(`/admin/update-lease`, body)
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
export const deleteLease = async (leaseNo: string, session: SessionData | null): Promise<APIResponse> => {
  let result = {};
  const body = {
    email: session && session.email,
    password: session && session.password};
  await api.patch(`/admin/delete-lease/${leaseNo}`,body)
  .then(response => {
    result = response;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};
