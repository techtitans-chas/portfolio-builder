import { ref, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

function useUnsavedChanges(form) {
  const snapshot = ref(JSON.stringify(form));
  const isDirty = computed(() => snapshot.value !== JSON.stringify(form));
  function markSaved() {
    snapshot.value = JSON.stringify(form);
  }
  onBeforeRouteLeave(() => {
    if (isDirty.value) {
      return confirm("You have unsaved changes. Leave anyway?");
    }
  });
  return { isDirty, markSaved };
}

export { useUnsavedChanges as u };
//# sourceMappingURL=useUnsavedChanges-CbDvifmB.mjs.map
