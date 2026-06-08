export const AVATAR_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB (server resizes & converts to WebP)
export const AVATAR_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const DEFAULT_AVATARS = [
  '/avatars/avatar-1.webp',
  '/avatars/avatar-2.webp',
  '/avatars/avatar-3.webp',
  '/avatars/avatar-4.webp',
  '/avatars/avatar-5.webp',
  '/avatars/avatar-6.webp',
];

export interface AvatarUploadOptions {
  /** Called with the new image URL after a successful upload or default selection. */
  onSuccess?: (imageUrl: string) => void;
}

// Explicit return type so the auto-import type stub is fully resolved
// without needing a running Nuxt dev server.
export type AvatarUpload = ReturnType<typeof useAvatarUpload>;

export function useAvatarUpload(options: AvatarUploadOptions = {}) {
  const { fetcher, apiBase } = useApi();

  const uploading = ref(false);
  const error = ref('');
  const success = ref('');
  const showDefaultPicker = ref(false);
  const fileInput = ref<HTMLInputElement | null>(null);

  function clearMessages() {
    error.value = '';
    success.value = '';
  }

  function openFilePicker() {
    fileInput.value?.click();
  }

  // ---------------------------------------------------------------------------
  // Upload a custom file
  // ---------------------------------------------------------------------------
  async function uploadFile(file: File): Promise<void> {
    clearMessages();

    // Client-side validation
    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      error.value = 'Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.';
      return;
    }
    if (file.size > AVATAR_MAX_FILE_SIZE) {
      error.value = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 5 MB.`;
      return;
    }

    uploading.value = true;
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      // Raw fetch — do NOT set Content-Type; the browser must set the
      // multipart boundary itself. fetcher() always injects application/json.
      const response = await fetch(`${apiBase}/api/users/me/avatar`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body?.errors?.[0]?.detail ?? body?.message ?? response.statusText);
      }

      success.value = 'Profile image updated.';
      options.onSuccess?.(body.image);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Upload failed. Please try again.';
    } finally {
      uploading.value = false;
    }
  }

  /** Handler for `<input type="file" @change="onFileInputChange">` */
  async function onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    await uploadFile(file);
    input.value = ''; // reset so the same file can be re-selected
  }

  // ---------------------------------------------------------------------------
  // Select a default avatar
  // ---------------------------------------------------------------------------
  async function selectDefault(path: string): Promise<void> {
    clearMessages();
    uploading.value = true;
    try {
      const data = await fetcher('/api/users/me/avatar', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ image: path }),
      });

      success.value = 'Profile image updated.';
      showDefaultPicker.value = false;
      options.onSuccess?.(data.image);
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'Failed to update avatar. Please try again.';
    } finally {
      uploading.value = false;
    }
  }

  return {
    // state
    uploading,
    error,
    success,
    showDefaultPicker,
    fileInput,
    // constants (convenient for templates)
    defaultAvatars: DEFAULT_AVATARS,
    allowedTypes: AVATAR_ALLOWED_TYPES.join(','),
    // actions
    openFilePicker,
    uploadFile,
    onFileInputChange,
    selectDefault,
  };
}
