module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 13,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: [
      'react',
      '@typescript-eslint',
    ],
    settings: {
      react: {
        createClass: 'createReactClass',
        pragma: 'React',
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'no-unused-vars': 'off',
      'no-restricted-imports': 'off',
      'no-use-before-define': 'off',
      'import/prefer-default-export': 'off',
      'max-len': 'off',
      'func-names': 0,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/extensions': [
        2,
        'ignorePackages',
        {
          'js': 'never',
          'jsx': 'never',
          'ts': 'never',
          'tsx': 'never'
        }
      ]
    },
  };