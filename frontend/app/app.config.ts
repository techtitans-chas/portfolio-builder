export default defineAppConfig({
  app: {
    head: {
      title: 'Starta Website Builder',
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.svg' }],
    },
  },
  ui: {
    colors: {
      primary: 'teal',
      secondary: 'sky',
      neutral: 'slate',
    },
    header: {
      slots: {
        root: 'bg-primary-500/80 backdrop-blur dark border-b-0 h-(--ui-header-height) sticky top-0 z-50',
      },
    },
  },
});
