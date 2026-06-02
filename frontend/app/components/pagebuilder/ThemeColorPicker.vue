<script setup lang="ts">
const props = defineProps<{ modelValue: string | null }>();
const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>();

const { palette, resolveColor } = useActivePalette();

const open = ref(false);

const activeColor = computed(() => resolveColor(props.modelValue));
</script>

<template>
  <UPopover v-model:open="open" :content="{ align: 'end' }">
    <button
      type="button"
      class="size-6 rounded border-2 border-default hover:border-primary transition-colors shrink-0"
      :style="activeColor ? { backgroundColor: activeColor } : {}"
      :title="palette.find(p => p.key === modelValue)?.label ?? 'None'"
    >
      <UIcon v-if="!activeColor" name="i-lucide-ban" class="size-3.5 text-muted m-auto block" />
    </button>

    <template #content>
      <div class="p-2">
        <div class="grid grid-cols-3 gap-1.5">
          <!-- None -->
          <button
            type="button"
            class="size-8 rounded border-2 flex items-center justify-center transition-colors hover:border-primary"
            :class="!modelValue ? 'border-primary' : 'border-default'"
            title="None"
            @click="
              emit('update:modelValue', null);
              open = false;
            "
          >
            <UIcon name="i-lucide-ban" class="size-4 text-muted" />
          </button>

          <!-- Palette swatches -->
          <button
            v-for="entry in palette"
            :key="entry.key"
            type="button"
            class="size-8 rounded border-2 transition-colors hover:border-primary"
            :class="modelValue === entry.key ? 'border-primary' : 'border-default'"
            :style="{ backgroundColor: resolveColor(entry.key) ?? undefined }"
            :title="entry.label"
            @click="
              emit('update:modelValue', entry.key);
              open = false;
            "
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
