import vuePluginConfig from './eslint.js'

export default [
  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  ...vuePluginConfig,

  {
    rules: {
      complexity: 'off',

      '@stylistic/lines-around-comment': 'off',

      'vue/attribute-hyphenation': 'off',
    },
  },
]
