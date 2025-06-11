import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
// import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      perfectionist,
      // prettier,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
      'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
      'perfectionist/sort-jsx-props': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-object-types': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-objects': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-named-imports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-named-exports': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-union-types': ['error', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-intersection-types': ['error', { type: 'natural', order: 'asc' }],
    },
  },
]

export default eslintConfig
