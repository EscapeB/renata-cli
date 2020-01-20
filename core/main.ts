import commander from 'commander';
import chalk from 'chalk';
import { VERSION } from './constant';
import exec from './exec';

type Actions = {
  [action: string]: {
    alias?: string;
    description: string;
    usage?: string[];
  };
};
export enum ActionType {
  INIT = 'init',
  CONFIG = 'config',
}

// all actions support
const actions: Actions = {
  [ActionType.INIT]: {
    description: 'generate an project with renata-cli',
    usage: ['renata-cli init <project-name>'],
  },
  [ActionType.CONFIG]: {
    description: 'change config for renata-cli',
    usage: ['renata-cli config set <key> <value>', 'renata-cli config get <key>', 'renata-cli config remove <key>'],
  },
};
// register all actions for cli
Object.keys(actions).forEach(action => {
  commander
    .command(action)
    .description(actions[action].description)
    .alias(actions[action].alias || '')
    .action((...args) => {
      // exec different action
      exec(action, ...args);
    });
});

// renata-cli help info
function helper() {
  console.log('\r\nUsage');
  Object.keys(actions).forEach(action => {
    const usages = actions[action].usage;
    if (usages) {
      usages.forEach(usage => {
        console.log(' - ' + usage);
      });
    }
  });
  console.log('\r');
}
function showHelp(txt: string) {
  return chalk.green(txt);
}
commander.on('-h', helper);
commander.on('--help', helper);
commander.usage('<command> [options]');
commander.version(VERSION.toString(), '-v --version');

// accept args
commander.parse(process.argv);
// when there is no args, show help info
if (!process.argv.slice(2).length) {
  commander.outputHelp(showHelp);
}
// when unknown action
if (process.argv.slice(2, 3)) {
  let action = process.argv.slice(2, 3)?.[0];
  if (!Object.keys(actions).includes(action)) {
    helper();
  }
}
