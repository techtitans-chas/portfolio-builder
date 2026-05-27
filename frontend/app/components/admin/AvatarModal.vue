<script setup lang="ts">
const props = defineProps<{
  currentImage: string | null
}>()

const emit = defineEmits<{
  success: [imageUrl: string]
}>()

const open = defineModel<boolean>('open', { default: false })

const {
  uploading,
  error: avatarError,
  success: avatarSuccess,
  fileInput,
  defaultAvatars,
  allowedTypes,
  openFilePicker,
  onFileInputChange,
  selectDefault,
} = useAvatarUpload({
  onSuccess: (imageUrl: string) => {
    emit('success', imageUrl)
    open.value = false
  },
})
</script>

<template>
  <UModal v-model:open="open" title="Change Avatar" description="Upload your own image or pick a default avatar.">
    <template #body>
      <div class="space-y-5">
        <!-- Hidden file input -->
        <input
          ref="fileInput"
          type="file"
          :accept="allowedTypes"
          class="hidden"
          @change="onFileInputChange"
        />

        <!-- Upload button -->
        <UButton
          variant="outline"
          class="w-full justify-center"
          :loading="uploading"
          :disabled="uploading"
          icon="i-lucide-upload"
          @click="openFilePicker"
        >
          Upload image
        </UButton>

        <p class="text-xs text-muted text-center">
          JPG, PNG, GIF or WebP · max 10 MB
        </p>

        <USeparator label="or choose a default" />

        <!-- Default avatar grid -->
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="path in defaultAvatars"
            :key="path"
            type="button"
            class="w-full aspect-square rounded-full overflow-hidden border-2 transition-colors focus:outline-none"
            :class="
              props.currentImage === path
                ? 'border-primary'
                : 'border-transparent hover:border-muted-foreground'
            "
            :disabled="uploading"
            :aria-label="`Select default avatar`"
            @click="selectDefault(path)"
          >
            <img :src="path" alt="" class="w-full h-full object-cover" />
          </button>
        </div>

        <!-- Feedback messages -->
        <UAlert v-if="avatarSuccess" color="success" variant="soft" :description="avatarSuccess" />
        <UAlert v-if="avatarError" color="error" variant="soft" :description="avatarError" />
      </div>
    </template>
  </UModal>
</template>
