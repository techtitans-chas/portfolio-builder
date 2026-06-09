import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { ay as useState } from './server.mjs';
import { o as vueExports } from '../routes/renderer.mjs';

function useCollections() {
  const { fetcher } = useApi();
  const collections = useState("user-collections", () => []);
  const loading = vueExports.ref(false);
  const fetchError = vueExports.ref("");
  async function fetchCollections() {
    loading.value = true;
    fetchError.value = "";
    try {
      const data = await fetcher("/api/collections", { credentials: "include" });
      collections.value = data.collections;
    } catch (e) {
      fetchError.value = e instanceof Error ? e.message : "Failed to load collections.";
    } finally {
      loading.value = false;
    }
  }
  const activeCollectionTypes = vueExports.computed(() => new Set(collections.value.map((c) => c.type)));
  return {
    collections,
    loading,
    fetchError,
    fetchCollections,
    activeCollectionTypes
  };
}

export { useCollections as u };
//# sourceMappingURL=useCollections-Be_EdGTg.mjs.map
