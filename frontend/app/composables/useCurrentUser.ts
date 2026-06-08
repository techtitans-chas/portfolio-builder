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
  seoMeta: { seoTitle?: string; seoDescription?: string } | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export function useCurrentUser() {
  const user = useState<CurrentUser | null>('current-user', () => null);
  const portfolio = useState<CurrentPortfolio | null>('current-portfolio', () => null);
  const pending = useState<boolean>('current-user-pending', () => false);

  const { fetcher } = useApi();

  async function fetch() {
    if (user.value || pending.value) return;
    pending.value = true;
    try {
      const cookieHeader = import.meta.server ? useRequestHeaders(['cookie']) : undefined;
      const data = await fetcher('/api/users/me', {
        credentials: 'include',
        cache: 'no-store',
        headers: cookieHeader as HeadersInit | undefined,
      });
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
