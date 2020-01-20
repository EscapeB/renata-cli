"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var lodash_1 = __importDefault(require("lodash"));
/**
 * store: CLI Store
 */
function default_1(store) {
    var _a;
    var loading = ora_1.default('Generating base template...');
    loading.start();
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    var basePkg = require('./template/package.json');
    var answer = store.getAnswer();
    store.configPkg(lodash_1.default.merge(basePkg, {
        name: answer.name ? answer.name : '',
        description: answer.description ? answer.description : '',
        version: answer.version ? answer.version : '',
        author: answer.author ? answer.author : '',
        license: answer.license ? answer.license : '',
    }));
    (_a = store.getBabelConfig().presets) === null || _a === void 0 ? void 0 : _a.push([
        '@babel/preset-env',
        {
            targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
            },
        },
    ], '@babel/react');
    loading.succeed();
}
exports.default = default_1;
