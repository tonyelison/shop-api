module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
