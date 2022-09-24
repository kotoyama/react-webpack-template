module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'effector',
    'boundaries',
    'import',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:boundaries/recommended',
    'plugin:prettier/recommended',
    'plugin:effector/recommended',
    'plugin:effector/scope',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.spec.*', '**/*.test.*'],
      env: { jest: true },
      rules: {
        'effector/no-watch': 'off',
        'effector/no-getState': 'off',
        'boundaries/element-types': 'off',
      },
    },
  ],
  rules: {
    'no-else-return': 'warn',
    'no-console': ['warn'],
    'prettier/prettier': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        pathGroups: [
          { group: 'internal', position: 'after', pattern: '~/processes/**' },
          { group: 'internal', position: 'after', pattern: '~/pages/**' },
          { group: 'internal', position: 'after', pattern: '~/widgets/**' },
          { group: 'internal', position: 'after', pattern: '~/features/**' },
          { group: 'internal', position: 'after', pattern: '~/entities/**' },
          { group: 'internal', position: 'after', pattern: '~/shared/**' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/app/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/processes/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/pages/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/widgets/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/features/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/entities/*/**'],
          },
          {
            message:
              'Private imports are prohibited, use public imports instead',
            group: ['~/shared/*/*/*/**'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/app'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/processes'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/pages'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/widgets'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/features'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/entities'],
          },
          {
            message:
              'Prefer absolute imports instead of relatives (for root modules)',
            group: ['../**/shared'],
          },
        ],
      },
    ],
    'boundaries/element-types': [
      'warn',
      {
        default: 'disallow',
        rules: [
          {
            from: 'app',
            allow: [
              'processes',
              'pages',
              'widgets',
              'features',
              'entities',
              'shared',
            ],
          },
          {
            from: 'processes',
            allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
          },
          {
            from: 'pages',
            allow: ['widgets', 'features', 'entities', 'shared'],
          },
          { from: 'widgets', allow: ['features', 'entities', 'shared'] },
          { from: 'features', allow: ['entities', 'shared'] },
          { from: 'entities', allow: ['shared'] },
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'boundaries/elements': [
      { type: 'app', pattern: 'app/*' },
      { type: 'processes', pattern: 'processes/*' },
      { type: 'pages', pattern: 'pages/*' },
      { type: 'widgets', pattern: 'widgets/*' },
      { type: 'features', pattern: 'features/*' },
      { type: 'entities', pattern: 'entities/*' },
      { type: 'shared', pattern: 'shared/*' },
    ],
    'boundaries/ignore': ['**/*.test.*'],
    'import/resolver': { typescript: true, node: true },
  },
}
