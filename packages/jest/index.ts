import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const jest = store.getFeature('jest');
  if (!jest) {
    return;
  }
  const loading = ora('Add Jest support ...');
  loading.start();
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());

  /* package.json */
  let pkg = {
    devDependencies: {
      jest: '^24.9.0',
    },
    scripts: {
      test: 'jest',
    },
  };
  store.configPkg(pkg);

  loading.succeed();
}
