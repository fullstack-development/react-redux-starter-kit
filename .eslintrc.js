module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript'
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/sort-comp': ['error', {
      order: [
        'static-methods',
        'lifecycle',
        'render',
        'everything-else'
      ]
    }],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/type-annotation-spacing': ['error', { 
      'before': false,
      'after': true,
      'overrides': { arrow: { 'before': true, 'after': true }} 
    }],
    'import/order': ['error', { 
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    }],
    'import/no-extraneous-dependencies': "off", // TODO: uncomment ['error', { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'import/no-internal-modules': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', { 'code': 120 }],
    'no-restricted-imports': ['error', 'react-jss', '@material-ui/core', '@material-ui/icons', 'i18next', 'react-i18next'],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'arrow-parens': ['error', 'as-needed'],
    'spaced-comment': 'error',
    'object-curly-newline': 'off'
    // one-line rule is missing in eslint
    // whitespace rule will provided by prettier
    // ban-keywords is missing in eslint
  },
  env: {
    jest: true,
    browser: true,
  },
  globals: {
    window: 'readonly',
  }
};
