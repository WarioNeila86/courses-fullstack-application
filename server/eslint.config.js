const js = require('@eslint/js');
const globals = require('globals');
const pluginNode = require('eslint-plugin-n');

module.exports = [
  {
    ignores: ['**/eslint.config.js'] // Ignore the config file itself
  },
  js.configs.recommended,
  pluginNode.configs['flat/recommended-script'],
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      semi: ['error', 'always']
    }
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'n/no-unpublished-require': 'off'
    }
  }
];
