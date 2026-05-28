export function useUnsavedChanges(form: Record<string, unknown>) {
  const snapshot = ref(JSON.stringify(form));
  const isDirty = computed(() => snapshot.value !== JSON.stringify(form));

  function markSaved() {
    snapshot.value = JSON.stringify(form);
  }

  // Browser tab close / refresh
  if (import.meta.client) {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty.value) e.preventDefault();
    };
    window.addEventListener('beforeunload', handler);
    onUnmounted(() => window.removeEventListener('beforeunload', handler));
  }

  // Nuxt client-side navigation
  onBeforeRouteLeave(() => {
    if (isDirty.value) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
  });

  return { isDirty, markSaved };
}
