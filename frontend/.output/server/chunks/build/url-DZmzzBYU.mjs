import { a9 as useAsyncData, as as useRequestEvent, aw as useRuntimeConfig } from './server.mjs';
import { o as vueExports } from '../routes/renderer.mjs';
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
//# sourceMappingURL=url-DZmzzBYU.mjs.map
