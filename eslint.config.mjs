// eslint.config.mjs
import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormattingConfig from '@vue/eslint-config-prettier/skip-formatting';

export default [
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormattingConfig,
  {
    files: [
      '**/*.vue',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.ts',
      '**/*.cts',
      '**/*.mts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  { ignores: ['playwright-report/*', 'dist/*'] },
];
