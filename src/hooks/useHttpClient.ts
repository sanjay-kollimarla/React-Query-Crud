// src/hooks/useHttpClient.ts
import axios from "axios";
import type  { AxiosInstance } from "axios";
import { useMemo } from "react";

interface UseHttpClientProps {
  headers?: Record<string, string>;
  withAuth?: boolean;
}

/**
 * Dynamic Axios client hook.
 * Enables using other hooks (auth, org store, etc.) to build runtime headers.
 */
export function useHttpClient(props: UseHttpClientProps = {}): AxiosInstance {
  const { headers = {}, withAuth = true } = props;

  // Example: get token from context or Zustand (customize this)
  // const token = useAuthStore((s) => s.token);
  const token = ""; // placeholder for now

  return useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 10_000,
      headers: {
        ...headers,
        ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    // Optional runtime interceptors
    instance.interceptors.request.use((config) => {
      // You can modify config dynamically here
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        // Global error handling
        // Example: logout on 401
        return Promise.reject(err);
      }
    );

    return instance;
  }, [headers, withAuth, token]);
}
