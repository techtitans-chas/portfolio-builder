// Configure API client for backend communication
export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiUrl || 'http://localhost:3001';

  const fetcher = async (endpoint: string, options?: RequestInit) => {
    const url = `${apiBase}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };

  return { fetcher, apiBase };
};
