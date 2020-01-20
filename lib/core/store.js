"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var exec_1 = require("./exec");
var CLIStore = /** @class */ (function () {
    function CLIStore(proPath, answer) {
        var _this = this;
        this.features = {};
        // package.json file
        this.pkg = {};
        // babel config
        this.babelConfig = {
            presets: [],
            plugins: [],
        };
        this.projectPath = proPath;
        this.answers = answer;
        exec_1.features.forEach(function (v) {
            _this.features[v] = false;
        });
    }
    CLIStore.prototype.getProjectPath = function () {
        return this.projectPath;
    };
    CLIStore.prototype.getAnswer = function () {
        return this.answers;
    };
    CLIStore.prototype.getFeature = function (key) {
        return this.features[key] || this.answers[key];
    };
    CLIStore.prototype.setFeatures = function (features) {
        var _this = this;
        features.forEach(function (v) {
            _this.features[v] = true;
        });
    };
    CLIStore.prototype.configPkg = function (pkg) {
        this.pkg = lodash_1.default.mergeWith(this.pkg, pkg);
    };
    CLIStore.prototype.getPkg = function () {
        return this.pkg;
    };
    CLIStore.prototype.confiBabel = function (babelConfig) {
        this.babelConfig = lodash_1.default.merge(this.babelConfig, babelConfig);
    };
    CLIStore.prototype.getBabelConfig = function () {
        return this.babelConfig;
    };
    // eslint
    // ...
    // generate file based on pkg and babel config and ....
    CLIStore.prototype.generateFiles = function () {
        this.writeBabelrc();
        this.writePkg();
    };
    CLIStore.prototype.writePkg = function () {
        fs_extra_1.default.writeFileSync(path_1.default.resolve(this.projectPath, 'package.json'), JSON.stringify(this.pkg, null, 2));
    };
    CLIStore.prototype.writeBabelrc = function () {
        fs_extra_1.default.writeFileSync(path_1.default.resolve(this.projectPath, '.babelrc'), JSON.stringify(this.babelConfig, null, 2));
    };
    return CLIStore;
}());
exports.default = CLIStore;
