import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const loading = ora('Generating base template...');
  loading.start();
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());
  const basePkg = require('./template/package.json');
  const answer = store.getAnswer();
  store.configPkg(
    _.merge(basePkg, {
      name: answer.name ? answer.name : '',
      description: answer.description ? answer.description : '',
      version: answer.version ? answer.version : '',
      author: answer.author ? answer.author : '',
      license: answer.license ? answer.license : '',
    })
  );
  store.getBabelConfig().presets?.push(
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7'],
        },
      },
    ],
    '@babel/react'
  );
  loading.succeed();
}
