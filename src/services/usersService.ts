import { api } from './api';
import { UserAttr } from '../types';

export const fetchUsers = async (): Promise<UserAttr[]> => {
  const token = localStorage.getItem('authToken');
  const response = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};
