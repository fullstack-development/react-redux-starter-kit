module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript'
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    'react/sort-comp': ['error', {
      order: [
        'static-variables',
        'static-methods',
        'instance-variables',
        'getters',
        'setters',
        'lifecycle',
        'render',
        'instance-methods',
        'everything-else'
      ]
    }],
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-cycle': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', { 
      'before': false,
      'after': true,
      'overrides': { arrow: { 'before': true, 'after': true }} 
    }],
    'import/order': ['error', { 
      groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
      'newlines-between': 'always',
    }],
    'import/no-extraneous-dependencies': "off", // TODO: uncomment ['error', { devDependencies: ['**/test.tsx', '**/test.ts'] }],
    'import/no-internal-modules': 'off',
    'max-len': ['error', { 'code': 120 }],
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-restricted-imports': ['error', 'react-jss', '@material-ui/core', '@material-ui/icons', 'i18next', 'react-i18next'],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true  }],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'arrow-parens': ['error', 'as-needed'],
    'no-undef': 'off',
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  globals: {
    window: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
};
