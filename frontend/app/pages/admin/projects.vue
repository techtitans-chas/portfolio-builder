<script setup lang="ts">
import type { Project } from '@portfolio-builder/shared/types';

definePageMeta({
  layout: 'admin',
});

const {
  loading,
  fetchError,
  fetchItems,
  searchQuery,
  filteredItems: filteredProjects,
  modalOpen,
  selectedItem: selectedProject,
  openCreate,
  openEdit,
  onSaved,
  togglingId,
  togglePublished,
  deleteModalOpen,
  itemToDelete: projectToDelete,
  deleting,
  deleteError,
  openDelete,
  confirmDelete,
} = useCollectionPage<Project>({
  endpoint: '/api/projects',
  responseKey: 'projects',
  searchFields: ['title', 'description', 'time', 'tags'],
});

await fetchItems();
</script>

<template>
  <AdminLayoutPageStructure
    title="Projects"
    description="Manage the projects shown in your portfolio."
  >
    <div class="max-w-lg grid gap-4">
      <!-- Toolbar -->
      <div class="flex items-center gap-3">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search projects"
          class="flex-1 max-w-sm"
        />
        <UButton icon="i-lucide-plus" @click="openCreate">New project</UButton>
      </div>

      <UAlert v-if="fetchError" color="error" variant="soft" :description="fetchError" />

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-2">
        <USkeleton v-for="i in 4" :key="i" class="h-12 w-full rounded-md" />
      </div>

      <!-- Empty state -->
      <div v-else-if="!filteredProjects.length" class="py-12 text-center text-muted text-sm">
        <template v-if="searchQuery">No projects match your search.</template>
        <template v-else>No projects yet.</template>
      </div>

      <!-- Project list -->
      <div v-else class="divide-y divide-default border border-default rounded-md">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
        >
          <!-- Reorder placeholder -->
          <UIcon name="i-lucide-grip-vertical" class="text-muted-foreground size-4 shrink-0" />

          <!-- Project info -->
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ project.title || 'Untitled project' }}</p>
            <p v-if="project.time" class="text-xs text-muted">{{ project.time }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 shrink-0">
            <UButton
              :icon="project.isPublished ? 'i-lucide-eye' : 'i-lucide-eye-off'"
              size="xs"
              variant="ghost"
              :color="project.isPublished ? 'primary' : 'neutral'"
              :loading="togglingId === project.id"
              :aria-label="project.isPublished ? 'Unpublish project' : 'Publish project'"
              @click="togglePublished(project, 'project')"
            />
            <UButton
              icon="i-lucide-edit"
              size="xs"
              variant="ghost"
              aria-label="Edit project"
              @click="openEdit(project)"
            />
            <UButton
              icon="i-lucide-trash-2"
              size="xs"
              variant="ghost"
              color="error"
              aria-label="Delete project"
              @click="openDelete(project)"
            />
          </div>
        </div>
      </div>
    </div>
  </AdminLayoutPageStructure>

  <!-- Create / Edit modal -->
  <AdminProjectsProjectModal
    v-model:open="modalOpen"
    :project="selectedProject"
    @saved="onSaved"
  />

  <!-- Delete confirmation -->
  <AdminConfirmModal
    v-model:open="deleteModalOpen"
    title="Delete project"
    :description="`Are you sure you want to delete &quot;${projectToDelete?.title || 'this project'}&quot;? This cannot be undone.`"
    confirm-label="Delete"
    :loading="deleting"
    :error-message="deleteError"
    @confirm="confirmDelete"
    @cancel="deleteModalOpen = false"
  />
</template>
