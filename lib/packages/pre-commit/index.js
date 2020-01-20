"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
/**
 * store: CLI Store
 */
function default_1(store) {
    var preCommit = store.getFeature('pre-commit');
    var jest = store.getFeature('jest');
    if (!preCommit) {
        return;
    }
    var loading = ora_1.default('Add pre commit support ...');
    loading.start();
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    /* package.json */
    var pkg = {
        devDependencies: {
            husky: '^4.0.10',
        },
    };
    var huskyrc = {
        hooks: {
            'pre-commit': "npm lint " + (jest ? ' && npm test' : ''),
        },
    };
    store.configPkg(pkg);
    fs_extra_1.default.writeFileSync(store.getProjectPath() + "/.huskyrc.js", "module.export=" + JSON.stringify(huskyrc, null, 2));
    loading.succeed();
}
exports.default = default_1;
