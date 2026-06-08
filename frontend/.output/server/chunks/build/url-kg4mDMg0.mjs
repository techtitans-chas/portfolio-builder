import { ak as useAsyncData, aO as vueExports, aD as useRequestEvent, aH as useRuntimeConfig } from './server.mjs';
import { s as getRequestURL } from '../nitro/nitro.mjs';

function usePageBlocks(slug, pageSlug) {
  const config = useRuntimeConfig();
  const baseURL = config.apiUrl;
  const { data, error } = useAsyncData(
    `portfolio-${slug}-page-${pageSlug}-blocks`,
    () => $fetch(`/api/portfolios/${slug}/pages/${pageSlug}/blocks`, { baseURL })
  );
  const contentBlocks = vueExports.computed(
    () => (data.value?.blocks ?? []).filter((b) => b.type !== "header" && b.type !== "footer")
  );
  return { contentBlocks, error };
}
function useRequestURL(opts) {
  {
    return getRequestURL(useRequestEvent(), opts);
  }
}

export { useRequestURL as a, usePageBlocks as u };
//# sourceMappingURL=url-kg4mDMg0.mjs.map
