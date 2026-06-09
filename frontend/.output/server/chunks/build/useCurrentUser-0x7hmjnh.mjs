import { ay as useState, at as useRequestHeaders } from './server.mjs';
import { u as useApi } from './useApi-KjbfWxXr.mjs';

function useCurrentUser() {
  const user = useState("current-user", () => null);
  const portfolio = useState("current-portfolio", () => null);
  const pending = useState("current-user-pending", () => false);
  const { fetcher } = useApi();
  async function fetch() {
    if (user.value || pending.value) return;
    pending.value = true;
    try {
      const cookieHeader = true ? useRequestHeaders(["cookie"]) : void 0;
      const data = await fetcher("/api/users/me", {
        credentials: "include",
        cache: "no-store",
        headers: cookieHeader
      });
      user.value = data.user;
      portfolio.value = data.portfolio;
    } catch {
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

export { useCurrentUser as u };
//# sourceMappingURL=useCurrentUser-0x7hmjnh.mjs.map
