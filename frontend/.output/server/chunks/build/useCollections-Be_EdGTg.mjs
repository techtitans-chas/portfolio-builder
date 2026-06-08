import { u as useApi } from './useApi-KjbfWxXr.mjs';
import { ab as useState } from './server.mjs';
import { ref, computed } from 'vue';

function useCollections() {
  const { fetcher } = useApi();
  const collections = useState("user-collections", () => []);
  const loading = ref(false);
  const fetchError = ref("");
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
  const activeCollectionTypes = computed(() => new Set(collections.value.map((c) => c.type)));
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
