import { useCallback, useState } from "react";

type Headers = {
  "Content-Type"?: string;
  Accept?: string;
};

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface Response<T> {
  status: "ok" | "error";
  code: number;
  message?: string;
  data: T;
}

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const URL_BASE = "http://localhost:5000/api";

  async function request<T>(
    url: string,
    method: Method = "GET",
    fetchBody: any = null,
    headers: Headers = {}
  ): Promise<Response<T>> {
    setIsLoading(true);
    try {
      let body = null;
      if (fetchBody) {
        body = JSON.stringify(fetchBody);
        headers["Content-Type"] = "application/json";
        headers.Accept = "application/json";
      }

      const response = await fetch(`${URL_BASE}/${url}`, {
        method,
        body,
        headers,
      });
      const data: Response<T> = await response.json();

      if (!response.ok) throw data.message || "Error occured while fetch";

      setIsLoading(false);

      return data;
    } catch (e: any) {
      setIsLoading(false);
      setError(e.message);
      throw e;
    }
  }

  const clearError = useCallback(() => setError(null), []);

  return { isLoading, request, error, clearError };
};
