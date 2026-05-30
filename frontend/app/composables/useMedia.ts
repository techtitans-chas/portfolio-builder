export interface MediaFile {
  id: string;
  userId: string;
  url: string;
  filename: string;
  fileType: string;
  sizeBytes: number;
  purpose: string | null;
  createdAt: string;
  updatedAt: string;
}

export const MEDIA_ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

export const MEDIA_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB raw; server enforces 2 MB post-conversion

export const MEDIA_TYPE_OPTIONS = [
  { label: 'All', value: 'all' as const },
  { label: 'Images', value: 'image' as const },
  { label: 'PDFs', value: 'pdf' as const },
];

export const MEDIA_SORT_OPTIONS = [
  { label: 'Newest first', value: 'date' as const },
  { label: 'Name', value: 'name' as const },
  { label: 'Largest first', value: 'size' as const },
];

export function useMedia() {
  const { fetcher, apiBase } = useApi();

  const files = ref<MediaFile[]>([]);
  const loading = ref(true);
  const error = ref('');

  // ---------------------------------------------------------------------------
  // Search / filter / sort
  // ---------------------------------------------------------------------------
  const search = ref('');
  const filterType = ref<'all' | 'image' | 'pdf'>('all');
  const sortBy = ref<'date' | 'name' | 'size'>('date');

  const filteredFiles = computed(() => {
    let list = files.value;

    if (search.value.trim()) {
      const q = search.value.toLowerCase();
      list = list.filter(f => f.filename.toLowerCase().includes(q));
    }

    if (filterType.value === 'image') {
      list = list.filter(f => f.fileType.startsWith('image/'));
    } else if (filterType.value === 'pdf') {
      list = list.filter(f => f.fileType === 'application/pdf');
    }

    return [...list].sort((a, b) => {
      if (sortBy.value === 'name') return a.filename.localeCompare(b.filename);
      if (sortBy.value === 'size') return b.sizeBytes - a.sizeBytes;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------
  async function fetchMedia() {
    loading.value = true;
    error.value = '';
    try {
      const data = await fetcher('/api/media', { credentials: 'include' });
      files.value = data.media;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to load media.';
    } finally {
      loading.value = false;
    }
  }

  async function deleteMedia(id: string): Promise<boolean> {
    try {
      await fetcher(`/api/media/${id}`, { method: 'DELETE', credentials: 'include' });
      files.value = files.value.filter(f => f.id !== id);
      return true;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to delete file.';
      return false;
    }
  }

  async function uploadFile(file: File, purpose?: string): Promise<MediaFile | null> {
    const formData = new FormData();
    formData.append('file', file);
    if (purpose) formData.append('purpose', purpose);

    try {
      const response = await fetch(`${apiBase}/api/media`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body?.errors?.[0]?.detail ?? body?.message ?? response.statusText);
      }

      const uploaded: MediaFile = body.media;
      files.value = [uploaded, ...files.value];
      return uploaded;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Upload failed.';
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // Upload with client-side validation
  // ---------------------------------------------------------------------------
  const uploading = ref(false);
  const uploadError = ref('');

  async function handleFiles(fileList: FileList | File[]): Promise<boolean> {
    const filesToUpload = Array.from(fileList).filter(f => {
      if (!MEDIA_ALLOWED_TYPES.includes(f.type)) {
        uploadError.value = `"${f.name}" has an unsupported file type.`;
        return false;
      }
      if (f.size > MEDIA_MAX_FILE_SIZE) {
        uploadError.value = `"${f.name}" exceeds the 10 MB limit.`;
        return false;
      }
      return true;
    });

    if (filesToUpload.length === 0) return false;

    uploading.value = true;
    uploadError.value = '';
    for (const file of filesToUpload) {
      await uploadFile(file);
    }
    uploading.value = false;
    return true;
  }

  return {
    // state
    files,
    loading,
    error,
    uploading,
    uploadError,
    // search / filter / sort
    search,
    filterType,
    sortBy,
    filteredFiles,
    // constants
    typeOptions: MEDIA_TYPE_OPTIONS,
    sortOptions: MEDIA_SORT_OPTIONS,
    allowedTypes: MEDIA_ALLOWED_TYPES,
    // actions
    fetchMedia,
    deleteMedia,
    uploadFile,
    handleFiles,
  };
}
