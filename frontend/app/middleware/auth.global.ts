export default defineNuxtRouteMiddleware(async to => {
  if (!to.path.startsWith('/admin')) return;

  const config = useRuntimeConfig();
  const apiBase = config.public.apiUrl || 'http://localhost:3111';

  try {
    const response = await fetch(`${apiBase}/api/auth/get-session`, {
      credentials: 'include',
    });

    if (!response.ok) {
      return navigateTo('/verify-email');
    }

    const session = await response.json();

    if (!session?.user) {
      return navigateTo('/login');
    }

    if (!session.user.emailVerified) {
      return navigateTo('/verify-email');
    }
  } catch {
    return navigateTo('/login');
  }
});
