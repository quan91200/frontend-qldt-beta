import vuePluginConfig from './eslint.js'
import jsdoc from 'eslint-plugin-jsdoc'

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
    plugins: {
      jsdoc,
    },
  },

  {
    rules: {
      complexity: 'off',

      '@stylistic/lines-around-comment': 'off',

      'vue/attribute-hyphenation': 'off',

      "jsdoc/require-jsdoc": [
        "error",
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          }
        }
      ],
    },
  },
]
