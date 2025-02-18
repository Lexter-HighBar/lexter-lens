import { useAuth } from "@clerk/clerk-react";
import Axios from 'axios';
import { ReactNode, useMemo } from "react";
import { UserdataApiContext } from "./UserdataApiContext";

type Props = {
  children: ReactNode;
};

// ✅ Create Axios instance outside the component
const axiosInstance = Axios.create({
  baseURL: 'https://lexter-server.onrender.com/api', // Replace with env variable when needed
  headers: { 'Content-Type': 'application/json' },
});

export const UserDataApiProvider = ({ children }: Props) => {
  const { getToken } = useAuth();

  // ✅ Use useMemo to avoid unnecessary re-renders
  useMemo(() => {
    axiosInstance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, [getToken]); // ✅ Runs only when `getToken` changes

  async function get<T, S = T>(path: string, search?: Partial<S>) {
    const params = new URLSearchParams(
      Object.entries(search || {}).reduce((acc, [key, value]) => {
        acc[key] = String(value); // ✅ Ensure all values are strings
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `${path}${params ? `?${params}` : ''}`;
    const res = await axiosInstance.get<T>(url);
    return res.data;
  }

  async function post<T, E>(url: string, body: E) {
    const res = await axiosInstance.post<T>(url, body);
    return res.data;
  }

  async function patch<T, E>(url: string, body: E) {
    const res = await axiosInstance.patch<T>(url, body);
    return res.data;
  }

  async function destroy<T>(url: string) {
    const res = await axiosInstance.delete<T>(url);
    return res.data;
  }

  return (
    <UserdataApiContext.Provider value={{ get, post, patch, destroy }}>
      {children}
    </UserdataApiContext.Provider>
  );
};