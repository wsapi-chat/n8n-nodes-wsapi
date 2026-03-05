import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

export default [
	...compat.extends('plugin:n8n-nodes-base/nodes'),
	{
		files: ['**/*.ts', '**/*.json'],
		languageOptions: {
			parser: (await import('@typescript-eslint/parser')).default,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
			},
		},
		rules: {
			'n8n-nodes-base/node-filename-against-convention': 'error',
			'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'error',
			'n8n-nodes-base/node-class-description-outputs-wrong': 'error',
		},
	},
];
