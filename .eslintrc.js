// eslint-disable-next-line @typescript-eslint/no-var-requires
const prettierConfig = require('./.prettierrc.js');

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    camelcase: 'warn',
    eqeqeq: 'error',
    'no-duplicate-imports': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'prettier/prettier': ['error', prettierConfig],
    'react/style-prop-object': 'off',
    'sort-keys': 'warn',
  },
};
