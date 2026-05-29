interface CollectionItem {
  id: string;
  isPublished: boolean;
  title: string;
}

interface UseCollectionPageOptions<T extends CollectionItem> {
  /** API path for the collection, e.g. '/api/projects' */
  endpoint: string;
  /** Key used to extract the array from GET/POST/PATCH responses, e.g. 'projects' */
  responseKey: string;
  /** Fields to match the search query against (dot-notation not supported, top-level only) */
  searchFields: (keyof T)[];
}

export function useCollectionPage<T extends CollectionItem>(options: UseCollectionPageOptions<T>) {
  const { endpoint, responseKey, searchFields } = options;
  const { fetcher } = useApi();

  // --- Collection state ---
  const items = ref<T[]>([]) as Ref<T[]>;
  const loading = ref(true);
  const fetchError = ref('');

  async function fetchItems() {
    loading.value = true;
    fetchError.value = '';
    try {
      const data = await fetcher(endpoint, { credentials: 'include' });
      items.value = data[responseKey];
    } catch (e: unknown) {
      fetchError.value = e instanceof Error ? e.message : 'Failed to load items.';
    } finally {
      loading.value = false;
    }
  }

  // --- Search ---
  const searchQuery = ref('');

  const filteredItems = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q) return items.value;
    return items.value.filter(item =>
      searchFields.some(field => {
        const val = item[field];
        if (Array.isArray(val)) return val.some(v => String(v).toLowerCase().includes(q));
        return String(val ?? '')
          .toLowerCase()
          .includes(q);
      }),
    );
  });

  // --- Create / edit modal ---
  const modalOpen = ref(false);
  const selectedItem = ref<T | null>(null) as Ref<T | null>;

  function openCreate() {
    selectedItem.value = null;
    modalOpen.value = true;
  }

  function openEdit(item: T) {
    selectedItem.value = item;
    modalOpen.value = true;
  }

  function onSaved(saved: T) {
    const idx = items.value.findIndex(i => i.id === saved.id);
    if (idx >= 0) {
      items.value[idx] = saved;
    } else {
      items.value.unshift(saved);
    }
  }

  // --- Publish toggle ---
  const togglingId = ref<string | null>(null);

  async function togglePublished(item: T, responseItemKey: string = responseKey.replace(/s$/, '')) {
    if (togglingId.value) return;
    togglingId.value = item.id;
    try {
      const data = await fetcher(`${endpoint}/${item.id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      const idx = items.value.findIndex(i => i.id === item.id);
      if (idx >= 0) items.value[idx] = data[responseItemKey];
    } catch {
      // update only on success; icon reverts automatically
    } finally {
      togglingId.value = null;
    }
  }

  // --- Delete modal ---
  const deleteModalOpen = ref(false);
  const itemToDelete = ref<T | null>(null) as Ref<T | null>;
  const deleting = ref(false);
  const deleteError = ref('');

  function openDelete(item: T) {
    itemToDelete.value = item;
    deleteError.value = '';
    deleteModalOpen.value = true;
  }

  async function confirmDelete() {
    if (!itemToDelete.value) return;
    deleting.value = true;
    deleteError.value = '';
    try {
      await fetcher(`${endpoint}/${itemToDelete.value.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      items.value = items.value.filter(i => i.id !== itemToDelete.value!.id);
      deleteModalOpen.value = false;
      itemToDelete.value = null;
    } catch (e: unknown) {
      deleteError.value = e instanceof Error ? e.message : 'Failed to delete item.';
    } finally {
      deleting.value = false;
    }
  }

  return {
    // Collection
    items,
    loading,
    fetchError,
    fetchItems,
    // Search
    searchQuery,
    filteredItems,
    // Create / edit modal
    modalOpen,
    selectedItem,
    openCreate,
    openEdit,
    onSaved,
    // Publish toggle
    togglingId,
    togglePublished,
    // Delete modal
    deleteModalOpen,
    itemToDelete,
    deleting,
    deleteError,
    openDelete,
    confirmDelete,
  };
}
