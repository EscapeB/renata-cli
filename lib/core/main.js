"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var chalk_1 = __importDefault(require("chalk"));
var constant_1 = require("./constant");
var exec_1 = __importDefault(require("./exec"));
var ActionType;
(function (ActionType) {
    ActionType["INIT"] = "init";
    ActionType["CONFIG"] = "config";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
// all actions support
var actions = (_a = {},
    _a[ActionType.INIT] = {
        description: 'generate an project with renata-cli',
        usage: ['renata-cli init <project-name>'],
    },
    _a[ActionType.CONFIG] = {
        description: 'change config for renata-cli',
        usage: ['renata-cli config set <key> <value>', 'renata-cli config get <key>', 'renata-cli config remove <key>'],
    },
    _a);
// register all actions for cli
Object.keys(actions).forEach(function (action) {
    commander_1.default
        .command(action)
        .description(actions[action].description)
        .alias(actions[action].alias || '')
        .action(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // exec different action
        exec_1.default.apply(void 0, __spreadArrays([action], args));
    });
});
// renata-cli help info
function helper() {
    console.log('\r\nUsage');
    Object.keys(actions).forEach(function (action) {
        var usages = actions[action].usage;
        if (usages) {
            usages.forEach(function (usage) {
                console.log(' - ' + usage);
            });
        }
    });
    console.log('\r');
}
function showHelp(txt) {
    return chalk_1.default.green(txt);
}
commander_1.default.on('-h', helper);
commander_1.default.on('--help', helper);
commander_1.default.usage('<command> [options]');
commander_1.default.version(constant_1.VERSION.toString(), '-v --version');
// accept args
commander_1.default.parse(process.argv);
// when there is no args, show help info
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp(showHelp);
}
// when unknown action
if (process.argv.slice(2, 3)) {
    var action = (_b = process.argv.slice(2, 3)) === null || _b === void 0 ? void 0 : _b[0];
    if (!Object.keys(actions).includes(action)) {
        helper();
    }
}
