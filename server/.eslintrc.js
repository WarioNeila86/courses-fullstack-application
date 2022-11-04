module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'always']
  }
};
