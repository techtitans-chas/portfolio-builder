export interface DefaultMediaFile {
  filename: string;
  label: string;
  fileType: string;
  url: string;
}

const defaultFiles = ref<DefaultMediaFile[]>([]);
const loaded = ref(false);

export function useDefaultMedia() {
  async function fetchDefaultMedia() {
    if (loaded.value) return;
    try {
      const data = await $fetch<DefaultMediaFile[]>('/media/manifest.json');
      defaultFiles.value = data;
      loaded.value = true;
    } catch {
      // If manifest is unavailable, silently show no defaults
    }
  }

  return { defaultFiles, fetchDefaultMedia };
}
