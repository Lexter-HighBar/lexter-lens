import { useAuth } from "@clerk/clerk-react";
import Axios from 'axios';
import { ReactNode } from "react";
import { UserdataApiContext } from "./UserdataApiContext";

type Props = {
    children: ReactNode;
  };
  
  export const UserDataApiProvider = ({ children }: Props) => {
    const { getToken } = useAuth();
    const axios = Axios.create();
  
    // Base URL for userdata API 
    axios.defaults.baseURL =  '/userdata'; //To be replaced after adding .env with the next line 
   // axios.defaults.baseURL = import.meta.env.VITE_EXPRES_API_URL || '/userdata';
  
    axios.interceptors.request.use(async (config) => {
      const token = await getToken();
      config.headers['Content-Type'] = 'application/json';
    if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    

    });
  
    async function get<T, S = T>(path: string, search?: Partial<S>) {
      const params = new URLSearchParams(search as Record<string, string>).toString();
      const url = `${path}${params ? `?${params}` : ''}`;
      const res = await axios.get<T>(url);
      return res.data;
    }
  
    async function post<T, E>(url: string, body: E) {
      const res = await axios.post<T>(url, body);
      return res.data;
    }
  
    async function patch<T, E>(url: string, body: E) {
      const res = await axios.patch<T>(url, body);
      return res.data;
    }
  
    async function destroy<T>(url: string) {
      const res = await axios.delete<T>(url);
      return res.data;
    }
  
    return (
      <UserdataApiContext.Provider value={{ get, post, patch, destroy }}>
        {children}
      </UserdataApiContext.Provider>
    );
  };
  
  