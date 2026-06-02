<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import type { BlockField } from '~/config/blocks/types';

const props = defineProps<{
  field: BlockField;
  modelValue: Record<string, unknown>[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, unknown>[]];
}>();

const items = computed({
  get: () => props.modelValue ?? [],
  set: val => emit('update:modelValue', val),
});

// Which item index is expanded
const expanded = ref<number | null>(items.value.length > 0 ? 0 : null);

function addItem() {
  const newItem = props.field.defaultItem?.() ?? { id: crypto.randomUUID() };
  const next = [...items.value, newItem];
  emit('update:modelValue', next);
  expanded.value = next.length - 1;
}

function removeItem(index: number) {
  const next = items.value.filter((_, i) => i !== index);
  emit('update:modelValue', next);
  if (expanded.value === index) {
    expanded.value = next.length > 0 ? Math.min(index, next.length - 1) : null;
  } else if (expanded.value !== null && expanded.value > index) {
    expanded.value -= 1;
  }
}

function updateItemField(index: number, key: string, value: unknown) {
  const next = items.value.map((item, i) => (i === index ? { ...item, [key]: value } : item));
  emit('update:modelValue', next);
}

function getItemField(item: Record<string, unknown>, key: string): unknown {
  return item[key];
}

function itemSummary(item: Record<string, unknown>): string {
  // Use the first itemField's value as a display label
  const firstKey = props.field.itemFields?.[0]?.key;
  if (firstKey && typeof item[firstKey] === 'string' && item[firstKey]) {
    return item[firstKey] as string;
  }
  return props.field.itemLabel ?? 'Item';
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <VueDraggable v-model="items" handle=".list-drag-handle" class="flex flex-col gap-1">
      <div
        v-for="(item, index) in items"
        :key="(item.id as string) ?? index"
        class="border border-default rounded-md overflow-hidden"
      >
        <!-- Item header row -->
        <div
          class="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-elevated/50 select-none"
          @click="expanded = expanded === index ? null : index"
        >
          <UIcon
            name="i-lucide-grip-vertical"
            class="list-drag-handle size-3.5 text-muted shrink-0 cursor-grab active:cursor-grabbing"
            @click.stop
          />
          <span class="flex-1 text-xs truncate min-w-0 text-highlighted">
            {{ itemSummary(item) }}
          </span>
          <UButton
            icon="i-lucide-trash-2"
            color="neutral"
            variant="ghost"
            size="xs"
            class="text-muted hover:text-error shrink-0"
            :aria-label="`Remove ${field.itemLabel ?? 'item'}`"
            @click.stop="removeItem(index)"
          />
          <UIcon
            :name="expanded === index ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            class="size-3.5 text-muted shrink-0"
          />
        </div>

        <!-- Expanded sub-fields -->
        <div
          v-if="expanded === index"
          class="px-2 pb-2 pt-1 flex flex-col gap-2 border-t border-default"
        >
          <div v-for="subField in field.itemFields" :key="subField.key" class="flex flex-col gap-1">
            <label class="text-xs text-muted">{{ subField.label }}</label>
            <UTextarea
              v-if="subField.type === 'textarea'"
              :model-value="(getItemField(item, subField.key) as string) ?? ''"
              :placeholder="subField.placeholder"
              size="sm"
              autoresize
              :rows="2"
              @update:model-value="updateItemField(index, subField.key, $event)"
            />
            <UInput
              v-else
              :model-value="(getItemField(item, subField.key) as string) ?? ''"
              :placeholder="subField.placeholder"
              :type="subField.type === 'url' ? 'url' : 'text'"
              size="sm"
              @update:model-value="updateItemField(index, subField.key, $event)"
            />
          </div>
        </div>
      </div>
    </VueDraggable>

    <UButton
      icon="i-lucide-plus"
      color="neutral"
      variant="subtle"
      size="xs"
      class="w-full mt-1 flex justify-center"
      @click="addItem"
    >
      Add {{ field.itemLabel ?? 'item' }}
    </UButton>
  </div>
</template>
