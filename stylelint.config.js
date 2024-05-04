module.exports = {
  customSyntax: 'postcss-html',
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue', 'stylelint-config-prettier'],
  // fix  Unexpected unknown at-rule "@mixin" https://github.com/stylelint/stylelint/issues/3190
  plugins: ['stylelint-scss'],
  ignoreFiles: ['node_modules/**/*.scss', 'node_modules/**/**.**'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'font-family-no-missing-generic-family-keyword': null,
    'unit-no-unknown': [true, { ignoreUnits: 'rpx' }],
    'import-notation': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
