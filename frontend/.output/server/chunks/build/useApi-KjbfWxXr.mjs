import { aH as useRuntimeConfig } from './server.mjs';

class ApiError extends Error {
  status;
  data;
  constructor(status, message, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.apiUrl || config.public.apiUrl || "http://localhost:3111";
  const fetcher = async (endpoint, options) => {
    const response = await fetch(`${apiBase}${endpoint}`, {
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new ApiError(
        response.status,
        body?.errors?.[0]?.detail ?? body?.message ?? response.statusText,
        body
      );
    }
    return body;
  };
  return { fetcher, apiBase };
};

export { ApiError as A, useApi as u };
//# sourceMappingURL=useApi-KjbfWxXr.mjs.map
