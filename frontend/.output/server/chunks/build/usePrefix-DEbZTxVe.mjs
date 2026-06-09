import { a8 as useAppConfig } from './server.mjs';

function usePrefix() {
  const appConfig = useAppConfig();
  const prefix = appConfig.ui?.prefix;
  return (classString) => {
    if (!prefix || !classString) {
      return classString;
    }
    return classString.split(/\s+/).filter(Boolean).map((cls) => `${prefix}:${cls}`).join(" ");
  };
}

export { usePrefix as u };
//# sourceMappingURL=usePrefix-DEbZTxVe.mjs.map
