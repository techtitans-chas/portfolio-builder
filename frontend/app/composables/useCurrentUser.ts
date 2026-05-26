interface CurrentUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
}

interface CurrentPortfolio {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  ogImageUrl: string | null;
  themeSettings: unknown;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

const user = ref<CurrentUser | null>(null);
const portfolio = ref<CurrentPortfolio | null>(null);
const pending = ref(false);

export function useCurrentUser() {
  const { fetcher } = useApi();

  async function fetch() {
    if (user.value || pending.value) return;
    pending.value = true;
    try {
      const data = await fetcher('/api/auth/me', { credentials: 'include' });
      user.value = data.user;
      portfolio.value = data.portfolio;
    } catch {
      // leave existing state intact on error
    } finally {
      pending.value = false;
    }
  }

  function clear() {
    user.value = null;
    portfolio.value = null;
  }

  return { user, portfolio, pending, fetch, clear };
}
