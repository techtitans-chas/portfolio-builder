<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { allBlockDefinitions } from '~/config/blocks';
import { getPath, setPath } from '~/utils/dotPath';
import { FONT_OPTIONS } from '~/config/fonts';

const { selectedBlock } = useSelectedBlock();
const { setBlockContent, setBlockName, pendingContentEdits } = usePageEditor();
const { collections } = useCollections();

const pickerFieldKey = ref<string | null>(null);
const pickerOpen = ref(false);
const pickerImagesOnly = ref(true);

function openPicker(key: string, imagesOnly = true) {
  pickerFieldKey.value = key;
  pickerImagesOnly.value = imagesOnly;
  pickerOpen.value = true;
}

function onImageSelected(url: string) {
  if (pickerFieldKey.value) setValue(pickerFieldKey.value, url);
  pickerOpen.value = false;
  pickerFieldKey.value = null;
}

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

// Local editable copy of content — reset when selected block changes or its
// server-side content updates (e.g. after a media file is deleted).
const localContent = ref<Record<string, unknown>>({});
const localContentBlockId = ref<string | null>(null);
// Set to true while setValue is writing to pendingContentEdits so the watch
// below doesn't re-apply our own write back on top of localContent.
let isApplyingLocal = false;

watch(
  () => selectedBlock.value?.id,
  id => {
    // Block changed — always reset to the new block's content (merging pending edits)
    const block = selectedBlock.value;
    if (!block) {
      localContent.value = {};
      localContentBlockId.value = null;
      return;
    }
    const pending = pendingContentEdits.value[block.id] ?? {};
    localContent.value = { ...(block.content as Record<string, unknown>), ...pending };
    localContentBlockId.value = id ?? null;
  },
  { immediate: true },
);

watch(
  () => selectedBlock.value?.content,
  content => {
    // Content updated externally (e.g. inline field edit, media delete) —
    // only apply if no pending sidebar edits to avoid interrupting typing.
    if (!selectedBlock.value) return;
    if (selectedBlock.value.id !== localContentBlockId.value) return;
    if (pendingContentEdits.value[selectedBlock.value.id]) return;
    localContent.value = content ? { ...content } : {};
  },
  { deep: true },
);

watch(
  () => selectedBlock.value && pendingContentEdits.value[selectedBlock.value.id],
  pending => {
    // Pending content changed externally (e.g. drag-reorder of header widgets) —
    // merge the new pending values into localContent so they aren't overwritten
    // next time the sidebar calls setValue.
    if (isApplyingLocal) return;
    if (!selectedBlock.value) return;
    if (!pending) return;
    localContent.value = { ...localContent.value, ...(pending as Record<string, unknown>) };
  },
  { deep: true },
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
  isApplyingLocal = true;
  setBlockContent(selectedBlock.value.id, localContent.value);
  isApplyingLocal = false;
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
      <div v-if="hasTabs" class="px-3 pt-2 shrink-0 flex gap-0.5">
        <UTooltip v-for="(tab, i) in tabItems" :key="i" :text="tab.label" :delay-duration="300">
          <button
            type="button"
            class="flex items-center justify-center size-7 rounded transition-colors"
            :class="
              currentTab === String(i)
                ? 'bg-elevated text-highlighted'
                : 'text-muted hover:text-highlighted hover:bg-elevated/60'
            "
            @click="currentTab = String(i)"
          >
            <UIcon :name="tab.icon ?? 'i-lucide-layout'" class="size-3.5" />
          </button>
        </UTooltip>
      </div>

      <!-- Sections + fields -->
      <div class="flex-1 overflow-y-auto p-3 flex flex-col gap-4">
        <div v-for="(section, si) in activeSections" :key="si" class="flex flex-col gap-2">
          <template
            v-if="
              section.fields.filter(
                f =>
                  f.type !== 'inline-text' &&
                  f.type !== 'inline-rich' &&
                  (!f.showIf || getValue(f.showIf.key) === f.showIf.value),
              ).length
            "
          >
            <p
              v-if="section.label"
              class="text-xs font-semibold text-muted uppercase tracking-wide"
            >
              {{ section.label }}
            </p>
            <div
              v-for="field in section.fields.filter(
                f =>
                  f.type !== 'inline-text' &&
                  f.type !== 'inline-rich' &&
                  (!f.showIf || getValue(f.showIf.key) === f.showIf.value),
              )"
              :key="field.key"
              class="flex gap-1"
              :class="
                ['theme-color', 'checkbox', 'switch', 'color'].includes(field.type)
                  ? 'items-center justify-between'
                  : field.type === 'slider'
                    ? 'flex-col gap-1'
                    : 'flex-col'
              "
            >
              <label class="text-xs text-muted">{{ field.label }}</label>

              <!-- Image / file picker -->
              <div
                v-if="field.type === 'image' || field.type === 'file'"
                class="flex flex-col gap-2"
              >
                <template v-if="getValue(field.key)">
                  <!-- Image preview -->
                  <div
                    v-if="field.type === 'image'"
                    class="relative rounded-md overflow-hidden border border-default aspect-video bg-muted"
                  >
                    <img
                      :src="getValue(field.key) as string"
                      alt=""
                      class="w-full h-full object-cover"
                    />
                    <UButton
                      icon="i-lucide-x"
                      color="neutral"
                      variant="solid"
                      size="xs"
                      class="absolute top-1 right-1 opacity-80 hover:opacity-100"
                      aria-label="Remove image"
                      @click="setValue(field.key, null)"
                    />
                  </div>
                  <!-- File preview -->
                  <div
                    v-else
                    class="flex items-center gap-2 px-2 py-1.5 rounded-md border border-default bg-muted text-xs"
                  >
                    <UIcon name="i-lucide-file" class="size-4 text-muted shrink-0" />
                    <span class="flex-1 truncate min-w-0">
                      {{ (getValue(field.key) as string).split('/').at(-1) }}
                    </span>
                    <UButton
                      icon="i-lucide-x"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      class="shrink-0 text-muted hover:text-highlighted"
                      aria-label="Remove file"
                      @click="setValue(field.key, null)"
                    />
                  </div>
                </template>
                <UButton
                  :icon="
                    getValue(field.key)
                      ? field.type === 'image'
                        ? 'i-lucide-image'
                        : 'i-lucide-file'
                      : 'i-lucide-plus'
                  "
                  color="neutral"
                  variant="subtle"
                  size="xs"
                  class="w-full flex justify-center"
                  @click="openPicker(field.key, field.type === 'image')"
                >
                  {{
                    getValue(field.key)
                      ? field.type === 'image'
                        ? 'Change image'
                        : 'Change file'
                      : field.type === 'image'
                        ? 'Choose image'
                        : 'Choose file'
                  }}
                </UButton>
              </div>

              <PagebuilderThemeColorPicker
                v-else-if="field.type === 'theme-color'"
                :model-value="(getValue(field.key) as string | null) ?? null"
                @update:model-value="setValue(field.key, $event)"
              />

              <PagebuilderListFieldEditor
                v-else-if="field.type === 'list'"
                :field="field"
                :model-value="(getValue(field.key) as Record<string, unknown>[]) ?? []"
                @update:model-value="setValue(field.key, $event)"
              />
              <div v-else-if="field.type === 'textarea'" class="flex flex-col gap-0.5">
                <UTextarea
                  :model-value="(getValue(field.key) as string) ?? ''"
                  :placeholder="field.placeholder"
                  size="sm"
                  :rows="3"
                  :maxrows="5"
                  autoresize
                  class="overflow-y-auto"
                  @update:model-value="setValue(field.key, $event)"
                />
                <p v-if="field.maxLength" class="text-xs text-muted text-right tabular-nums">
                  {{ ((getValue(field.key) as string) ?? '').length }} / {{ field.maxLength }}
                </p>
              </div>
              <UCheckbox
                v-else-if="field.type === 'checkbox'"
                :model-value="(getValue(field.key) as boolean) ?? false"
                @update:model-value="setValue(field.key, $event)"
              />
              <USwitch
                v-else-if="field.type === 'switch'"
                :model-value="(getValue(field.key) as boolean) ?? false"
                size="sm"
                @update:model-value="setValue(field.key, $event)"
              />
              <div v-else-if="field.type === 'slider'" class="flex items-center gap-2">
                <USlider
                  :model-value="(getValue(field.key) as number) ?? field.min ?? 0"
                  :min="field.min ?? 0"
                  :max="field.max ?? 100"
                  :step="field.step ?? 1"
                  class="flex-1"
                  @update:model-value="setValue(field.key, $event)"
                />
                <span class="text-xs text-muted w-8 text-right tabular-nums">
                  {{ (getValue(field.key) as number) ?? field.min ?? 0 }}px
                </span>
              </div>
              <USelect
                v-else-if="field.type === 'collection-select'"
                :model-value="(getValue(field.key) as string) || '__default__'"
                :items="[
                  { label: 'All (default)', value: '__default__' },
                  ...collections
                    .filter(c => c.type === field.collectionType)
                    .map(c => ({ label: c.name, value: c.id })),
                ]"
                size="sm"
                @update:model-value="setValue(field.key, $event === '__default__' ? '' : $event)"
              />
              <USelect
                v-else-if="field.type === 'select'"
                :model-value="(getValue(field.key) as string) ?? ''"
                :items="field.options ?? []"
                size="sm"
                @update:model-value="setValue(field.key, $event)"
              />
              <USelect
                v-else-if="field.type === 'font'"
                :model-value="(getValue(field.key) as string) ?? ''"
                :items="FONT_OPTIONS"
                size="sm"
                @update:model-value="setValue(field.key, $event)"
              />
              <label
                v-else-if="field.type === 'color'"
                class="size-6 rounded border-2 border-default hover:border-primary transition-colors shrink-0 cursor-pointer block"
                :style="{ backgroundColor: (getValue(field.key) as string) || '#000000' }"
              >
                <input
                  type="color"
                  :value="(getValue(field.key) as string) ?? '#000000'"
                  class="sr-only"
                  @input="setValue(field.key, ($event.target as HTMLInputElement).value)"
                />
              </label>
              <div v-else class="flex flex-col gap-0.5">
                <UInput
                  :model-value="(getValue(field.key) as string) ?? ''"
                  :placeholder="field.placeholder"
                  :type="field.type === 'url' ? 'url' : 'text'"
                  size="sm"
                  @update:model-value="setValue(field.key, $event)"
                />
                <p v-if="field.maxLength" class="text-xs text-muted text-right tabular-nums">
                  {{ ((getValue(field.key) as string) ?? '').length }} / {{ field.maxLength }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <!-- Empty state -->
    <div v-else class="flex-1 flex items-center justify-center p-4">
      <p class="text-sm text-muted text-center">Select a block</p>
    </div>
  </div>

  <AdminMediaPickerModal
    v-model:open="pickerOpen"
    :images-only="pickerImagesOnly"
    :selected-url="pickerFieldKey ? (getValue(pickerFieldKey) as string | null) : null"
    @select="onImageSelected"
  />
</template>
