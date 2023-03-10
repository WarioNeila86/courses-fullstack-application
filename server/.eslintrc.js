module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: ['standard', 'eslint-config-prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always']
  }
};
