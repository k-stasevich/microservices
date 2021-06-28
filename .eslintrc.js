module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
};
