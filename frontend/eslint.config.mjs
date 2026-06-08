// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Layout/formatting rules — Prettier owns all of these
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/semi': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/brace-style': 'off',

    // Logic rules — keep these
    'vue/no-multiple-template-root': 'off',
  },
});
