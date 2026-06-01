<script setup lang="ts">
import type { Experience } from '@portfolio-builder/shared/types';

definePageMeta({
  layout: 'admin',
});

const {
  loading,
  fetchError,
  fetchItems,
  searchQuery,
  filteredItems: filteredExperiences,
  modalOpen,
  selectedItem: selectedExperience,
  openCreate,
  openEdit,
  onSaved,
  togglingId,
  togglePublished,
  deleteModalOpen,
  itemToDelete: experienceToDelete,
  deleting,
  deleteError,
  openDelete,
  confirmDelete,
} = useCollectionPage<Experience>({
  endpoint: '/api/experiences',
  responseKey: 'experiences',
  searchFields: ['title', 'place', 'location', 'description', 'time', 'tags'],
});

await fetchItems();
</script>

<template>
  <AdminLayoutPageStructure
    title="Experiences"
    description="Manage the experiences shown in your portfolio."
  >
    <div class="max-w-lg grid gap-4">
      <!-- Toolbar -->
      <div class="flex items-center gap-3">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search experiences"
          class="flex-1 max-w-sm"
        />
        <UButton icon="i-lucide-plus" @click="openCreate">New experience</UButton>
      </div>

      <UAlert v-if="fetchError" color="error" variant="soft" :description="fetchError" />

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-2">
        <USkeleton v-for="i in 4" :key="i" class="h-14 w-full rounded-md" />
      </div>

      <!-- Empty state -->
      <div v-else-if="!filteredExperiences.length" class="py-12 text-center text-muted text-sm">
        <template v-if="searchQuery">No experiences match your search.</template>
        <template v-else>No experiences yet.</template>
      </div>

      <!-- Experience list -->
      <div v-else class="divide-y divide-default border border-default rounded-md">
        <div
          v-for="experience in filteredExperiences"
          :key="experience.id"
          class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
          :class="{ 'opacity-50': !experience.isPublished }"
        >
          <!-- Reorder placeholder -->
          <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground size-4 shrink-0" />

          <!-- Experience info -->
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ experience.title || 'Untitled experience' }}</p>
            <p class="text-xs text-muted truncate">
              <span v-if="experience.place">{{ experience.place }}</span>
              <span v-if="experience.place && experience.time">&nbsp;{{ experience.time }}</span>
              <span v-else-if="experience.time">{{ experience.time }}</span>
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 shrink-0">
            <UButton
              :icon="experience.isPublished ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              size="xs"
              variant="ghost"
              :color="experience.isPublished ? 'primary' : 'neutral'"
              :loading="togglingId === experience.id"
              :aria-label="experience.isPublished ? 'Unpublish experience' : 'Publish experience'"
              @click="togglePublished(experience, 'experience')"
            />
            <UButton
              icon="i-lucide-edit"
              size="xs"
              variant="ghost"
              aria-label="Edit experience"
              @click="openEdit(experience)"
            />
            <UButton
              icon="i-lucide-trash-2"
              size="xs"
              variant="ghost"
              color="error"
              aria-label="Delete experience"
              @click="openDelete(experience)"
            />
          </div>
        </div>
      </div>
    </div>
  </AdminLayoutPageStructure>

  <!-- Create / Edit modal -->
  <AdminExperiencesExperienceModal
    v-model:open="modalOpen"
    :experience="selectedExperience"
    @saved="onSaved"
  />

  <!-- Delete confirmation -->
  <AdminConfirmModal
    v-model:open="deleteModalOpen"
    title="Delete experience"
    :description="`Are you sure you want to delete &quot;${experienceToDelete?.title || 'this experience'}&quot;? This cannot be undone.`"
    confirm-label="Delete"
    :loading="deleting"
    :error-message="deleteError"
    @confirm="confirmDelete"
    @cancel="deleteModalOpen = false"
  />
</template>
