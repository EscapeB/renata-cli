import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const typescript = store.getFeature('typescript');
  if (!typescript) {
    return;
  }
  const loading = ora('Add Typescript support...');
  loading.start();
  // delete base src

  fs.emptyDirSync(`${store.getProjectPath()}/src`);
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());
  store.configPkg({
    devDependencies: {
      '@types/react': '^16.9.17',
      '@types/react-dom': '^16.9.4',
      typescript: '^3.7.4',
      '@babel/preset-typescript': '^7.7.7',
    },
  });
  store.getBabelConfig().presets?.push('@babel/typescript');
  loading.succeed();
}
