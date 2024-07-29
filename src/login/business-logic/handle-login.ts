import axios from 'axios';
import { SessionData } from '../../session-manager';

const api = axios.create({
  // // baseURL: 'http://localhost:8000',
  baseURL: 'https://stonebridge-backend-dfc59cb7ed48.herokuapp.com',
  headers: {'Content-Type': 'application/json'}
});

export const login = async (email: string, password: string) => {
  let result: SessionData = {email
    : 
    "",
    first_name
    : 
    "",
    last_name
    : 
    "",
    password
    : 
    "",
    type
    : 
    "",
  };
  const body = {
    email,
    password};
  await api.post(`/login`, body)
  .then(response => {
    result = response.data;
  })
  .catch(error => {
    console.error(error);
    throw error;
  });
  return result;
};