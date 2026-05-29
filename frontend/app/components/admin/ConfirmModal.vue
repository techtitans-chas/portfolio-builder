<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  confirmLabel?: string;
  confirmColor?: string;
  loading?: boolean;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const open = defineModel<boolean>('open', { default: false });
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title ?? 'Are you sure?'"
    :description="description"
  >
    <template v-if="errorMessage" #body>
      <UAlert color="error" variant="soft" :description="errorMessage" />
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton variant="ghost" @click="emit('cancel'); open = false">Cancel</UButton>
        <UButton
          :color="(confirmColor as any) ?? 'error'"
          :loading="loading"
          @click="emit('confirm')"
        >
          {{ confirmLabel ?? 'Confirm' }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
