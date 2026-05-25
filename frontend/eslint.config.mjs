// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'vue/singleline-html-element-content-newline': 'off',
    '@stylistic/operator-linebreak': 'off',
    'vue/max-attributes-per-line': 'off',
  },
});
