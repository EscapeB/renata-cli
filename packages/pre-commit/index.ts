import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const preCommit = store.getFeature('pre-commit');
  const jest = store.getFeature('jest');
  if (!preCommit) {
    return;
  }
  const loading = ora('Add pre commit support ...');
  loading.start();
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());

  /* package.json */
  let pkg = {
    devDependencies: {
      husky: '^4.0.10',
    },
  };

  const huskyrc = {
    hooks: {
      'pre-commit': `npm lint ${jest ? ' && npm test' : ''}`,
    },
  };
  store.configPkg(pkg);
  fs.writeFileSync(`${store.getProjectPath()}/.huskyrc.js`, `module.export=${JSON.stringify(huskyrc, null, 2)}`);

  loading.succeed();
}
