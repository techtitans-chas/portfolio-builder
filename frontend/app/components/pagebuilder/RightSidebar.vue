<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { allBlockDefinitions } from '~/config/blocks';
import { getPath, setPath } from '~/utils/dotPath';

const { selectedBlock } = useSelectedBlock();
const { setBlockContent, setBlockName } = usePageEditor();

const editingName = ref(false);
const nameInput = ref('');

watch(selectedBlock, block => {
  editingName.value = false;
  nameInput.value = block?.name ?? '';
});

function startEditingName() {
  nameInput.value = selectedBlock.value?.name ?? '';
  editingName.value = true;
  nextTick(() => {
    (document.querySelector('#block-name-input') as HTMLInputElement)?.focus();
  });
}

function commitName() {
  if (!selectedBlock.value) return;
  const trimmed = nameInput.value.trim() || null;
  setBlockName(selectedBlock.value.id, trimmed, selectedBlock.value);
  editingName.value = false;
}

const definition = computed(() =>
  selectedBlock.value
    ? (allBlockDefinitions.find(d => d.type === selectedBlock.value!.type) ?? null)
    : null,
);

const hasTabs = computed(() => !!definition.value?.tabs?.length);

const tabItems = computed<TabsItem[]>(
  () => definition.value?.tabs?.map(t => ({ label: t.label, icon: t.icon })) ?? [],
);
const currentTab = ref('0');

watch(definition, () => {
  currentTab.value = '0';
});

// Local editable copy of content — reset when selected block changes
const localContent = ref<Record<string, unknown>>({});

watch(
  selectedBlock,
  block => {
    localContent.value = block ? { ...block.content } : {};
  },
  { immediate: true },
);

const activeSections = computed(() => {
  if (!definition.value) return [];
  if (hasTabs.value) {
    const idx = Number(currentTab.value);
    return definition.value.tabs?.[idx]?.sections ?? [];
  }
  return definition.value.sections ?? [];
});

function getValue(key: string): unknown {
  return getPath(localContent.value, key);
}

function setValue(key: string, value: unknown) {
  if (!selectedBlock.value) return;
  localContent.value = setPath(localContent.value, key, value);
  setBlockContent(selectedBlock.value.id, localContent.value);
}
</script>

<template>
  <div class="flex flex-col w-64 shrink-0 border-l border-default">
    <template v-if="selectedBlock && definition">
      <!-- Header -->
      <div class="p-3 border-b border-default shrink-0 flex items-center gap-2 min-w-0">
        <UIcon :name="definition.icon" class="size-4 text-muted shrink-0" />
        <div class="flex-1 min-w-0">
          <template v-if="editingName">
            <UInput
              id="block-name-input"
              v-model="nameInput"
              size="sm"
              :placeholder="definition.label"
              class="w-full"
              @blur="commitName"
              @keydown.enter="commitName"
              @keydown.escape="editingName = false"
            />
          </template>
          <template v-else>
            <p class="text-sm font-medium truncate">
              {{ selectedBlock.name || definition.label }}
            </p>
            <p class="text-xs text-muted capitalize">{{ definition.type }}</p>
          </template>
        </div>
        <UButton
          v-if="!selectedBlock.isMandatory"
          icon="i-lucide-pencil"
          color="neutral"
          variant="ghost"
          size="xs"
          class="text-muted hover:text-highlighted shrink-0"
          aria-label="Rename block"
          @click="startEditingName"
        />
      </div>

      <!-- Tabs (if defined) -->
      <div v-if="hasTabs" class="px-3 pt-3 shrink-0">
        <UTabs
          v-model="currentTab"
          :items="tabItems"
          color="neutral"
          :content="false"
          class="w-full"
        />
      </div>

      <!-- Sections + fields -->
      <div class="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
        <div v-for="(section, si) in activeSections" :key="si" class="flex flex-col gap-2">
          <p v-if="section.label" class="text-xs font-semibold text-muted uppercase tracking-wide">
            {{ section.label }}
          </p>
          <div v-for="field in section.fields" :key="field.key" class="flex flex-col gap-1">
            <label class="text-xs text-muted">{{ field.label }}</label>

            <UTextarea
              v-if="field.type === 'textarea'"
              :model-value="(getValue(field.key) as string) ?? ''"
              :placeholder="field.placeholder"
              size="sm"
              autoresize
              :rows="2"
              @update:model-value="setValue(field.key, $event)"
            />
            <UCheckbox
              v-else-if="field.type === 'checkbox'"
              :model-value="(getValue(field.key) as boolean) ?? false"
              @update:model-value="setValue(field.key, $event)"
            />
            <USelect
              v-else-if="field.type === 'select'"
              :model-value="(getValue(field.key) as string) ?? ''"
              :items="field.options ?? []"
              size="sm"
              @update:model-value="setValue(field.key, $event)"
            />
            <UInput
              v-else
              :model-value="(getValue(field.key) as string) ?? ''"
              :placeholder="field.placeholder"
              :type="field.type === 'color' ? 'color' : field.type === 'url' ? 'url' : 'text'"
              size="sm"
              @update:model-value="setValue(field.key, $event)"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <div v-else class="flex-1 flex items-center justify-center p-4">
      <p class="text-sm text-muted text-center">Select a block in the Layers panel to edit it</p>
    </div>
  </div>
</template>
