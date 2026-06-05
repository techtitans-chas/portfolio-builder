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

export interface UploadEntry {
  file: File;
  progress: number; // 0–100
  status: 'pending' | 'uploading' | 'done' | 'error';
  error?: string;
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

// Shared state — lives at module level so all useMedia() callers read the same refs.
const files = ref<MediaFile[]>([]);
const loading = ref(true);
const error = ref('');
const search = ref('');
const filterType = ref<'all' | 'image' | 'pdf'>('all');
const sortBy = ref<'date' | 'name' | 'size'>('date');
const uploadQueue = ref<UploadEntry[]>([]);
const uploadError = ref('');

export function useMedia() {
  const { fetcher, apiBase } = useApi();

  // ---------------------------------------------------------------------------
  // Search / filter / sort
  // ---------------------------------------------------------------------------
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

  async function renameMedia(id: string, name: string): Promise<boolean> {
    try {
      const data = await fetcher(`/api/media/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ name }),
      });
      const idx = files.value.findIndex(f => f.id === id);
      if (idx !== -1) files.value[idx] = data.media;
      return true;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to rename file.';
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // Upload with progress tracking
  // ---------------------------------------------------------------------------
  const uploading = computed(() =>
    uploadQueue.value.some(e => e.status === 'uploading' || e.status === 'pending'),
  );

  function uploadFileWithProgress(entry: UploadEntry, purpose?: string): Promise<MediaFile | null> {
    return new Promise(resolve => {
      const formData = new FormData();
      formData.append('file', entry.file);
      if (purpose) formData.append('purpose', purpose);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) entry.progress = Math.round((e.loaded / e.total) * 100);
      });

      xhr.addEventListener('load', () => {
        let body: { media?: MediaFile; errors?: { detail: string }[]; message?: string } = {};
        try {
          body = JSON.parse(xhr.responseText);
        } catch {
          //
        }

        if (xhr.status >= 200 && xhr.status < 300 && body.media) {
          files.value = [body.media, ...files.value];
          entry.progress = 100;
          entry.status = 'done';
          resolve(body.media);
        } else {
          entry.error = body.errors?.[0]?.detail ?? body.message ?? xhr.statusText;
          entry.status = 'error';
          resolve(null);
        }
      });

      xhr.addEventListener('error', () => {
        entry.error = 'Network error — upload failed.';
        entry.status = 'error';
        resolve(null);
      });

      xhr.addEventListener('timeout', () => {
        entry.error = 'Upload timed out. Check your connection and try again.';
        entry.status = 'error';
        resolve(null);
      });

      xhr.open('POST', `${apiBase}/api/media`);
      xhr.withCredentials = true;
      xhr.timeout = 30_000;
      entry.status = 'uploading';
      xhr.send(formData);
    });
  }

  async function handleFiles(fileList: FileList | File[]): Promise<boolean> {
    uploadError.value = '';

    const validated = Array.from(fileList).filter(f => {
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

    if (validated.length === 0) return false;

    uploadQueue.value = validated.map(f => ({ file: f, progress: 0, status: 'pending' }));

    for (const entry of uploadQueue.value) {
      await uploadFileWithProgress(entry);
    }

    return uploadQueue.value.every(e => e.status === 'done');
  }

  function clearUploadQueue() {
    uploadQueue.value = [];
    uploadError.value = '';
  }

  return {
    // state
    files,
    loading,
    error,
    uploading,
    uploadQueue,
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
    renameMedia,
    handleFiles,
    clearUploadQueue,
  };
}
