import { aO as vueExports, W as onBeforeRouteLeave } from './server.mjs';

function useUnsavedChanges(form) {
  const snapshot = vueExports.ref(JSON.stringify(form));
  const isDirty = vueExports.computed(() => snapshot.value !== JSON.stringify(form));
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
