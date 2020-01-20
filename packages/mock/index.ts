import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import _ from 'lodash';
import CLIStore from '../../core/store';
/**
 * store: CLI Store
 */
export default function(store: CLIStore) {
  const features = store.getAnswer()?.features;
  if (!(features && _.isArray(features) && features.includes('mock'))) {
    return;
  }
  const loading = ora('Add Mock support...');
  loading.start();
  fs.copySync(path.resolve(__dirname, './template'), store.getProjectPath());
  store.configPkg({
    devDependencies: {
      mockjs: '^1.0.0',
      'http-proxy-middleware': '^0.20.0',
    },
  });
  loading.succeed();
}
