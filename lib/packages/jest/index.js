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
    var jest = store.getFeature('jest');
    if (!jest) {
        return;
    }
    var loading = ora_1.default('Add Jest support ...');
    loading.start();
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    /* package.json */
    var pkg = {
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
exports.default = default_1;
