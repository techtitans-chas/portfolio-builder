<script setup lang="ts"></script>

<template>
  <UHeader title="Starta" :toggle="false">
    <template #right>
      <UButton color="neutral" variant="ghost" to="/login" aria-label="Login" label="Login" />
      <UButton
        color="primary"
        variant="solid"
        to="/register"
        aria-label="Register"
        label="Register"
      />
    </template>
  </UHeader>
</template>
