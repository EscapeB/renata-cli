import { ActionType } from './main';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import _ from 'lodash';
import chalk from 'chalk';
import CLIStore from './store';

// packages
import base from '../packages/base';
import eslint from '../packages/eslint';
import ts from '../packages/typescript';
import mock from '../packages/mock';
import jest from '../packages/jest';
import preCommit from '../packages/pre-commit';
export const features = ['typescript', 'eslint', 'mock', 'jest'];

async function init(...args: any[]) {
  if (!args.slice(1).length) {
    console.info(
      chalk.yellow('Please enter project name to generate project dir \n\rUseage : renata-cli init <project-name>')
    );
    return;
  }
  //
  const dir = path.resolve(fs.realpathSync(process.cwd()), [].concat(args[1]).join());
  if (fs.existsSync(dir)) {
    console.error(chalk.red('Directory exsisted !'));
    return;
    // fs.removeSync(dir);
  }
  fs.mkdirSync(dir);

  async function commonValidate(input: string, errMsg: string): Promise<string | boolean> {
    if (_.isString(input) && input.length > 0) {
      return true;
    } else {
      return errMsg;
    }
  }
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please enter the project name',
        validate: input => commonValidate(input, 'Please input an valid name'),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please enter the project description',
        validate: input => commonValidate(input, 'Please input an valid description'),
      },
      {
        type: 'input',
        name: 'author',
        message: 'Please enter the author',
        validate: input => commonValidate(input, 'Please input an valid author name'),
      },
      {
        type: 'input',
        name: 'version',
        message: 'Please enter the project version',
        default: '1.0.0',
        validate: async input => {
          if (_.isString(input) && /^[\^|~]*[0-9]+\.[0-9]+\.[0-9]+$/.test(input.trim())) {
            return true;
          } else {
            return 'Please check your input version (eg: 1.0.0 )';
          }
        },
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Choose the feature you want',
        choices: features,
      },
      {
        type: 'list',
        name: 'pre-commit',
        message: 'add git hooks for pre-comit (eslint check and jest)',
        choices: ['Yes', 'No'],
        default: 'Yes',
        when: answer => {
          if (
            Array.isArray(answer.features) &&
            (answer.features.includes('eslint') || answer.features.includes('jest'))
          ) {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then(answer => {
      const Store = new CLIStore(dir, answer);
      Store.setFeatures(answer.features);
      initFlow(Store);
    });
}
function initFlow(store: CLIStore) {
  try {
    base(store);
    eslint(store);
    ts(store);
    mock(store);
    jest(store);
    preCommit(store);
    store.generateFiles();
    ora('Complete ! Enjoy coding :-)').succeed();
    console.info(chalk.greenBright(`Project created in ${store.getProjectPath()}. \nEnter this folder and run \nnpm i \nThen run npm start`));
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}
async function config(...args: any[]) {}
export default function exec(action: string, ...args: any[]) {
  switch (action) {
    case ActionType.INIT:
      init(...args);
      break;
    case ActionType.CONFIG:
      config(...args);
      break;
    default:
      chalk.red('type renata-cli -h to get help information');
      break;
  }
}
