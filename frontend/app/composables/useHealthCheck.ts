import type { HealthResponse } from '@portfolio-builder/shared/types';

export const useHealthCheck = () => {
  const { fetcher } = useApi();
  const health = ref<HealthResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const checkHealth = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      health.value = await fetcher('/api/health');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to check health';
      health.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  // Auto-check health on mount
  onMounted(() => {
    checkHealth();
    // Refresh every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    onUnmounted(() => clearInterval(interval));
  });

  return {
    health,
    isLoading,
    error,
    checkHealth,
  };
};
