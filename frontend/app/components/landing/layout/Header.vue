<template>
  <UHeader :toggle="false">
    <template #title>
      <AppLogo class="text-xl" white underline />
    </template>
    <template #right>
      <UButton
        color="neutral"
        variant="ghost"
        to="/login"
        aria-label="Login"
        label="Login"
        class="login-link"
      />
      <UButton
        color="neutral"
        variant="solid"
        to="/register"
        aria-label="Register"
        label="Get started"
        trailing-icon="i-lucide-arrow-right"
        class="font-bold"
      />
    </template>
  </UHeader>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.login-link {
  @apply text-white outline-white transition-colors;

  &:hover {
    @apply bg-transparent outline;
  }
}
</style>
