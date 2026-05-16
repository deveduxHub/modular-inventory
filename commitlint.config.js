/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'scope-enum': [
      1,
      'always',
      [
        'root',
        'design-system',
        'core',
        'auth',
        'products',
        'stock',
        'expiration',
        'sales',
        'reports',
        'wholesale',
        'bodega-simple',
        'playground',
        'deps',
        'release',
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'subject-empty': [2, 'never'],
    'body-max-line-length': [2, 'always', 100],
  },
}

export default config
