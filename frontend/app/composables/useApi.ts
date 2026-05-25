export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiUrl || 'http://localhost:3111';

  const fetcher = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${apiBase}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(response.status, body?.errors?.[0]?.detail ?? body?.message ?? response.statusText, body);
    }

    return body;
  };

  return { fetcher, apiBase };
};
