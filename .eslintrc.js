module.exports = {
  env: {
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'max-len': ['error', { code: 120 }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
