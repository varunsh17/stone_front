import axios from 'axios';
import { EditPageProps } from '../sub-components/manage-users-table';
import { user, AllUsers, APIResponse } from './admin-interfaces';

const email = 'abc@example.com';
const password = 'qwer';
const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://stonebridge-backend-dfc59cb7ed48.herokuapp.com',
  headers: { 'Content-Type': 'application/json' }
});

export const getAllUsers = async (): Promise<EditPageProps> => {
  let result: EditPageProps = {
    title: 'MANAGE USERS',
    tableData: []
  };

  const body = { email, password };

  await api.post<AllUsers>(`/admin/get-all-users`, body)
    .then(response => {
      result.tableData = response.data.users || [];
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });

  return result;
};


export const registerUser = async (data: user): Promise<string> => {
  let result = '';

  const body = {
    Useremail: data.email,
    Userpassword: data.password,
    first_name: data.first_name,
    last_name: data.last_name,
    email: 'abc@example.com',
    password: 'qwer',
  };

  try {
    const response = await api.post<APIResponse>('/admin/register', body);
    result = response.data as string;
  } catch (error) {
    console.error('Error adding user:', error);
    result = 'Failed to add user';
  }

  return result;
};


export const deleteUser = async (email: string): Promise<APIResponse> => {
  let result: APIResponse = {};

  const body = {
    Useremail: email,
    email: 'abc@example.com',
    password: 'qwer',
  };

  await api.patch<APIResponse>('/admin/delete-user', body)
    .then(response => {
      result = response.data;
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      result.message = 'Failed to delete user';
    });

  return result;
};
