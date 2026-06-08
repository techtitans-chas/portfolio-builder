import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { aJ as useState } from './server.mjs';

const useServerFeatures = () => {
  const { apiBase } = useApi();
  const features = useState("server-features", () => ({
    storage: true,
    email: true
  }));
  const pending = useState("server-features-pending", () => false);
  const fetched = useState("server-features-fetched", () => false);
  async function fetchFeatures() {
    if (fetched.value || pending.value) return;
    pending.value = true;
    try {
      const data = await $fetch(`${apiBase}/api/health`);
      if (data?.features) features.value = data.features;
      fetched.value = true;
    } catch {
    } finally {
      pending.value = false;
    }
  }
  return { features, fetchFeatures };
};

export { useServerFeatures as u };
//# sourceMappingURL=useServerFeatures-DOIxALfL.mjs.map
