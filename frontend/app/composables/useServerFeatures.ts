interface ServerFeatures {
  storage: boolean;
  email: boolean;
}

/**
 * Fetches the /api/health endpoint once and exposes the `features` flags.
 * Results are cached for the lifetime of the Nuxt app instance.
 */
export const useServerFeatures = () => {
  const { apiBase } = useApi();

  const features = useState<ServerFeatures>('server-features', () => ({
    storage: true,
    email: true,
  }));

  const pending = useState<boolean>('server-features-pending', () => false);
  const fetched = useState<boolean>('server-features-fetched', () => false);

  async function fetchFeatures() {
    if (fetched.value || pending.value) return;
    pending.value = true;
    try {
      const data = await $fetch<{ features?: ServerFeatures }>(`${apiBase}/api/health`);
      if (data?.features) features.value = data.features;
      fetched.value = true;
    } catch {
      // If health check fails, keep the optimistic defaults
    } finally {
      pending.value = false;
    }
  }

  return { features, fetchFeatures };
};
