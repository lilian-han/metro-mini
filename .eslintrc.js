module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'eslint-config-prettier', // 解决 eslint 和 prettier 冲突
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
  },
  globals: {
    API: 'readonly',
    my: 'readonly',
    uni: 'readonly',
    getCurrentPages: 'readonly',
  },
  overrides: [
    {
      files: ['src/pages/**/*.vue', 'src/utils/alipayLogger.js'],
      rules: {
        'vue/multi-word-component-names': 0,
      },
    },
  ],
  rules: {
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 修改 eslint-plugin-vue 8 组件必须驼峰
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
