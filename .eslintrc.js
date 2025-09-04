module.exports = {
  extends: ['plugin:n8n-nodes-base/nodes'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['n8n-nodes-base'],
  rules: {
    'n8n-nodes-base/node-filename-against-convention': 'error',
    'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
    'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
  },
};