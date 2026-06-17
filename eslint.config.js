import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const requireExtensions = require('eslint-plugin-require-extensions');

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'require-extensions': requireExtensions,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_|^error$|^err$|^e$',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'require-extensions/require-extensions': 'error',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.js',
      '*.mjs',
      '*.cjs',
    ],
  },
];
