export default defineAppConfig({
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
