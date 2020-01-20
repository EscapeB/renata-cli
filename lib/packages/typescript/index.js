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
    var _a;
    var typescript = store.getFeature('typescript');
    if (!typescript) {
        return;
    }
    var loading = ora_1.default('Add Typescript support...');
    loading.start();
    // delete base src
    fs_extra_1.default.emptyDirSync(store.getProjectPath() + "/src");
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    store.configPkg({
        devDependencies: {
            '@types/react': '^16.9.17',
            '@types/react-dom': '^16.9.4',
            typescript: '^3.7.4',
            '@babel/preset-typescript': '^7.7.7',
        },
    });
    (_a = store.getBabelConfig().presets) === null || _a === void 0 ? void 0 : _a.push('@babel/typescript');
    loading.succeed();
}
exports.default = default_1;
