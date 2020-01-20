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
    var features = (_a = store.getAnswer()) === null || _a === void 0 ? void 0 : _a.features;
    if (!(features && lodash_1.default.isArray(features) && features.includes('mock'))) {
        return;
    }
    var loading = ora_1.default('Add Mock support...');
    loading.start();
    fs_extra_1.default.copySync(path_1.default.resolve(__dirname, './template'), store.getProjectPath());
    store.configPkg({
        devDependencies: {
            mockjs: '^1.0.0',
            'http-proxy-middleware': '^0.20.0',
        },
    });
    loading.succeed();
}
exports.default = default_1;
