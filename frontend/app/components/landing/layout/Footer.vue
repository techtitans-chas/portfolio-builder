<script setup lang="ts"></script>

<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/idaohlen"
        target="_blank"
        aria-label="Ida Öhlén"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/martinsodersten"
        target="_blank"
        aria-label="Martin Södersten"
      />
      <UColorModeButton />
    </template>
  </UFooter>
</template>
