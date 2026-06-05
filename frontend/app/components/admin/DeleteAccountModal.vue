<script setup lang="ts">
const props = defineProps<{
  userEmail: string;
}>();

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const open = defineModel<boolean>('open', { default: false });

const emailInput = ref('');
const emailMatches = computed(
  () => emailInput.value.trim().toLowerCase() === props.userEmail.toLowerCase(),
);

watch(open, isOpen => {
  if (!isOpen) emailInput.value = '';
});
</script>

<template>
  <UModal
    v-model:open="open"
    title="Delete account"
    description="This action is permanent and cannot be undone. All your data — portfolio, pages, blocks, collections, and media — will be deleted immediately."
  >
    <template #body>
      <div class="space-y-4">
        <UAlert
          color="error"
          variant="soft"
          icon="i-lucide-triangle-alert"
          description="Your account and all associated data will be permanently deleted. You will be logged out immediately."
        />
        <UFormField
          :label="`Type your email address to confirm: ${userEmail}`"
          name="email-confirm"
        >
          <UInput
            v-model="emailInput"
            type="email"
            placeholder="Enter your email address"
            class="w-full"
            autocomplete="off"
          />
        </UFormField>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2 w-full">
        <UButton
          variant="ghost"
          @click="
            emit('cancel');
            open = false;
          "
        >
          Cancel
        </UButton>
        <UButton color="error" :disabled="!emailMatches" @click="emit('confirm')">
          Delete my account
        </UButton>
      </div>
    </template>
  </UModal>
</template>
