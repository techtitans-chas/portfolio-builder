import type { Collection } from '@portfolio-builder/shared/types';

/**
 * Fetches the authenticated user's collections and exposes the set of
 * active collection types. Used by the block picker to gate collection-locked
 * blocks, and by the admin ribbon to manage collections.
 */
export function useCollections() {
  const { fetcher } = useApi();

  const collections = useState<Collection[]>('user-collections', () => []);
  const loading = ref(false);
  const fetchError = ref('');

  async function fetchCollections() {
    loading.value = true;
    fetchError.value = '';
    try {
      const data = await fetcher('/api/collections', { credentials: 'include' });
      collections.value = data.collections;
    } catch (e: unknown) {
      fetchError.value = e instanceof Error ? e.message : 'Failed to load collections.';
    } finally {
      loading.value = false;
    }
  }

  const activeCollectionTypes = computed(() => new Set(collections.value.map(c => c.type)));

  return {
    collections,
    loading,
    fetchError,
    fetchCollections,
    activeCollectionTypes,
  };
}
