const nodePlugin = require('eslint-plugin-node');

module.exports = [
  {
    languageOptions: {
      globals: {
        require: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    plugins: {
      node: nodePlugin, // Define el plugin de Node.js correctamente
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'off',
    },
  },
  {
    files: ['*.js'],
    rules: {
      'no-undef': 'off', // Desactiva `no-undef` solo para archivos JS
    },
  },
];
