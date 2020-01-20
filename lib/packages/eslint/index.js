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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var lodash_1 = __importDefault(require("lodash"));
/**
 * store: CLI Store
 */
function default_1(store) {
    var eslint = store.getFeature('eslint');
    var typescript = store.getFeature('typescript');
    if (!eslint) {
        return;
    }
    var loading = ora_1.default('Add ESLint support ...');
    loading.start();
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    var eslintrc = require(path_1.default.resolve(__dirname, './template/.eslintrc.js'));
    /* package.json */
    var pkg = {
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
        pkg = lodash_1.default.merge(pkg, {
            devDependencies: {
                '@typescript-eslint/eslint-plugin': '^2.14.0',
                '@typescript-eslint/parser': '^2.14.0',
            },
        });
        // eslintrc
        eslintrc.parser = '@typescript-eslint/parser';
        eslintrc.plugins = ['@typescript-eslint'];
        eslintrc.extends = __spreadArrays(eslintrc.extends, [
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended',
        ]);
    }
    else {
        pkg = lodash_1.default.merge(pkg, {
            devDependencies: {
                'babel-eslint': '^10.0.3',
            },
        });
        // eslintrc
        eslintrc.parser = 'babel-eslint';
        eslintrc.plugins = __spreadArrays((eslintrc.plugins || []), ['prettier']);
    }
    store.configPkg(pkg);
    var data = "module.exports = " + JSON.stringify(eslintrc, null, 2) + ";";
    fs_extra_1.default.writeFileSync(path_1.default.resolve(store.getProjectPath(), '.eslintrc.js'), data);
    loading.succeed();
}
exports.default = default_1;
