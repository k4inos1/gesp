module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignorar archivos compilados
    '.eslintrc.js',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'quotes': ['error', 'single'],
    'import/no-unresolved': 0,
    'indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 100 }],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'comma-dangle': ['error', 'only-multiline'],
    'arrow-parens': ['error', 'as-needed'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
