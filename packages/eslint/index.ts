import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const eslint = store.getFeature('eslint');
  const typescript = store.getFeature('typescript');
  if (!eslint) {
    return;
  }
  const loading = ora('Add ESLint support ...');
  loading.start();
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());
  let eslintrc = require(path.resolve(__dirname, './template/.eslintrc.js'));

  /* package.json */
  let pkg = {
    scripts: {
      lint: "eslint -c ./.eslintrc.js './src/**/*.{tsx,jsx,ts,js}'",
    },
    devDependencies: {
      eslint: '^6.8.0',
      'eslint-config-prettier': '^6.9.0',
      'eslint-loader': '^3.0.3',
      'eslint-plugin-react': '^7.17.0',
      'eslint-plugin-prettier': '^3.1.2',
    },
  };
  // if has typescript add more module for eslint
  if (typescript) {
    // pkg
    pkg = _.merge(pkg, {
      devDependencies: {
        '@typescript-eslint/eslint-plugin': '^2.14.0',
        '@typescript-eslint/parser': '^2.14.0',
      },
    });
    // eslintrc
    eslintrc.parser = '@typescript-eslint/parser';
    eslintrc.plugins = ['@typescript-eslint'];
    eslintrc.extends = [
      ...eslintrc.extends,
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    ];
  } else {
    pkg = _.merge(pkg, {
      devDependencies: {
        'babel-eslint': '^10.0.3',
      },
    });
    // eslintrc
    eslintrc.parser = 'babel-eslint';
    eslintrc.plugins = [...(eslintrc.plugins || []), 'prettier'];
  }
  store.configPkg(pkg);
  const data = `module.exports = ${JSON.stringify(eslintrc, null, 2)};`;
  fs.writeFileSync(path.resolve(store.getProjectPath(), '.eslintrc.js'), data);
  loading.succeed();
}
