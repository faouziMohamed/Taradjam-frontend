module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
    jest: true,
  },
  plugins: [
    'prettier',
    'simple-import-sort',
    'promise',
    'unicorn',
    'unused-imports',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'airbnb',
    'next',
    'next/core-web-vitals',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      { singleQuote: true, semi: true, jsxSingleQuote: true },
      { usePrettierrc: true },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'promise/catch-or-return': 'error',
    'no-console': 'warn',
    'no-alert': 'error',
    'no-empty': 'error',
    'no-implicit-coercion': 'error',
    'no-underscore-dangle': 'off',
    'no-var': 'warn',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    'no-empty-function': 'warn',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true,
      },
    ],
    'no-mixed-operators': 'error',
    'no-plusplus': [
      'warn',
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Lib and hooks
          ['^@/lib', '^@/hooks'],
          // static data
          ['^@/data'],
          // components
          ['^@/components', '^@/container'],
          // zustand store
          ['^@/store'],
          // Other imports
          ['^@/'],
          ['^~/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          // other that didn't fit in
          ['^'],
        ],
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    'react/display-name': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/function-component-definition': 'off',
    'react/no-unstable-nested-components': 'off',
    'react/require-default-props': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/no-noninteractive-tabindex': [
      'error',
      {
        tags: ['div', 'label'],
        roles: ['tabpanel'],
      },
    ],
    // #region  //*=========== Unused Import ===========
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // #endregion  //*======== Unused Import ===========
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@/db': './src/db',
          '@/lib': './src/lib',
          '@/components': './src/components',
          '@/hooks': './src/hooks',
          '@/theme': './src/theme',
          '@/api-utils': './src/api-utils',
          '@/images': './public/images',
          '@/features': './src/features',
        },
        extensions: ['.js', '.jsx'],
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    '*.config.js',
    '.eslintrc.js',
    '.prettierrc.js',
  ],
  globals: {
    React: true,
    JSX: true,
  },
};
