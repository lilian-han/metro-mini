import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    root: true,
    env: {
      node: true,
    },
    globals: {
      API: "readonly",
      my: "readonly",
      uni: "readonly",
      getCurrentPages: "readonly",
    },
    extends: [
      "eslint-config-prettier", // 解决 eslint 和 prettier 冲突
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "plugin:vue/vue3-essential",
      "plugin:prettier/recommended",
      './.eslintrc-auto-import.json',
  ],
    rules: {
      "no-var": "error",
      "prettier/prettier": "error",
      // 修改 eslint-plugin-vue 8 组件必须驼峰
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["index"],
        },
      ],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
    languageOptions: { globals: globals.browser },
    parser: "@typescript-eslint/parser", // 使用@typescript-eslint/parser这个解析器进行语法解析
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
