module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'security'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.53'
    },
    propWrapperFunctions: [
        'forbidExtraProps',
        {'property': 'freeze', 'object': 'Object'},
        {'property': 'myFavoriteWrapper'}
    ],
    linkComponents: [
      'Hyperlink',
      {'name': 'Link', 'linkAttribute': 'to'}
    ]
  }
}
