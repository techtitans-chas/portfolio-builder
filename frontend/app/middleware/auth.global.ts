export default defineNuxtRouteMiddleware(async to => {
  if (import.meta.server) return;
  if (!to.path.startsWith('/admin')) return;

  const config = useRuntimeConfig();
  const apiBase = config.public.apiUrl || 'http://localhost:3111';
  const redirectParam = { redirect: to.fullPath };

  try {
    const response = await fetch(`${apiBase}/api/auth/get-session`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return navigateTo({ path: '/login', query: redirectParam });
    }

    const session = await response.json();

    if (!session?.user) {
      return navigateTo({ path: '/login', query: redirectParam });
    }

    if (!session.user.emailVerified) {
      return navigateTo('/verify-email');
    }
  } catch {
    return navigateTo({ path: '/login', query: redirectParam });
  }
});
