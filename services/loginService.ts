import { Login } from "@/interfaces/login";
import axios from "axios";

export async function logIn(data: Login) {
  return axios.post('/api/auth', data);
}