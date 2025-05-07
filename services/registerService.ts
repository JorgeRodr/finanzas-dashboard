import { User } from '@/interfaces/user';
import axios from 'axios';

export async function registerUser(data: User) {
  return axios.post('/api/users', data);
}
