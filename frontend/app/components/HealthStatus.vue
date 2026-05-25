<script setup lang="ts">
const { health, isLoading, error, checkHealth } = useHealthCheck();
</script>

<template>
  <div class="flex items-center gap-3">
    <UCard class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold">Backend Status</h3>
          <UButton
            :loading="isLoading"
            icon="i-lucide-refresh-cw"
            size="xs"
            variant="ghost"
            @click="checkHealth"
          />
        </div>
      </template>

      <div v-if="error" class="flex items-center gap-2 text-red-500">
        <UIcon name="i-lucide-alert-circle" />
        <span class="text-sm">{{ error }}</span>
      </div>

      <div v-else-if="health" class="space-y-2">
        <div class="flex items-center gap-2">
          <UIcon
            :name="health.status === 'healthy' ? 'i-lucide-check-circle-2' : 'i-lucide-x-circle'"
            :class="health.status === 'healthy' ? 'text-green-500' : 'text-red-500'"
          />
          <span class="text-sm font-medium">
            {{ health.status === 'healthy' ? 'Healthy' : 'Unhealthy' }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <UIcon
            :name="health.db === 'connected' ? 'i-lucide-database' : 'i-lucide-database-off'"
            :class="health.db === 'connected' ? 'text-green-500' : 'text-red-500'"
          />
          <span class="text-sm">Database: {{ health.db }}</span>
        </div>
        <div class="text-xs text-gray-500 space-y-1">
          <div>Service: {{ health.service }}</div>
          <div v-if="health.version">Version: {{ health.version }}</div>
          <div>Last checked: {{ new Date(health.timestamp).toLocaleTimeString() }}</div>
        </div>
      </div>

      <div v-else class="text-sm text-gray-500">Loading...</div>
    </UCard>
  </div>
</template>
