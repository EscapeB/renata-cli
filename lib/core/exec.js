"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./main");
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var ora_1 = __importDefault(require("ora"));
var lodash_1 = __importDefault(require("lodash"));
var chalk_1 = __importDefault(require("chalk"));
var store_1 = __importDefault(require("./store"));
// packages
var base_1 = __importDefault(require("../packages/base"));
var eslint_1 = __importDefault(require("../packages/eslint"));
var typescript_1 = __importDefault(require("../packages/typescript"));
var mock_1 = __importDefault(require("../packages/mock"));
var jest_1 = __importDefault(require("../packages/jest"));
var pre_commit_1 = __importDefault(require("../packages/pre-commit"));
exports.features = ['typescript', 'eslint', 'mock', 'jest'];
function init() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        function commonValidate(input, errMsg) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (lodash_1.default.isString(input) && input.length > 0) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, errMsg];
                    }
                    return [2 /*return*/];
                });
            });
        }
        var dir;
        var _this = this;
        return __generator(this, function (_a) {
            if (!args.slice(1).length) {
                console.info(chalk_1.default.yellow('Please enter project name to generate project dir \n\rUseage : renata-cli init <project-name>'));
                return [2 /*return*/];
            }
            dir = path_1.default.resolve(fs_extra_1.default.realpathSync(process.cwd()), [].concat(args[1]).join());
            if (fs_extra_1.default.existsSync(dir)) {
                console.error(chalk_1.default.red('Directory exsisted !'));
                return [2 /*return*/];
                // fs.removeSync(dir);
            }
            fs_extra_1.default.mkdirSync(dir);
            inquirer_1.default
                .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Please enter the project name',
                    validate: function (input) { return commonValidate(input, 'Please input an valid name'); },
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Please enter the project description',
                    validate: function (input) { return commonValidate(input, 'Please input an valid description'); },
                },
                {
                    type: 'input',
                    name: 'author',
                    message: 'Please enter the author',
                    validate: function (input) { return commonValidate(input, 'Please input an valid author name'); },
                },
                {
                    type: 'input',
                    name: 'version',
                    message: 'Please enter the project version',
                    default: '1.0.0',
                    validate: function (input) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (lodash_1.default.isString(input) && /^[\^|~]*[0-9]+\.[0-9]+\.[0-9]+$/.test(input.trim())) {
                                return [2 /*return*/, true];
                            }
                            else {
                                return [2 /*return*/, 'Please check your input version (eg: 1.0.0 )'];
                            }
                            return [2 /*return*/];
                        });
                    }); },
                },
                {
                    type: 'checkbox',
                    name: 'features',
                    message: 'Choose the feature you want',
                    choices: exports.features,
                },
                {
                    type: 'list',
                    name: 'pre-commit',
                    message: 'add git hooks for pre-comit (eslint check and jest)',
                    choices: ['Yes', 'No'],
                    default: 'Yes',
                    when: function (answer) {
                        if (Array.isArray(answer.features) &&
                            (answer.features.includes('eslint') || answer.features.includes('jest'))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    },
                },
            ])
                .then(function (answer) {
                var Store = new store_1.default(dir, answer);
                Store.setFeatures(answer.features);
                initFlow(Store);
            });
            return [2 /*return*/];
        });
    });
}
function initFlow(store) {
    try {
        base_1.default(store);
        eslint_1.default(store);
        typescript_1.default(store);
        mock_1.default(store);
        jest_1.default(store);
        pre_commit_1.default(store);
        store.generateFiles();
        ora_1.default('Complete ! Enjoy coding :-)').succeed();
    }
    catch (e) {
        console.error(e);
        process.exit(-1);
    }
}
function config() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
function exec(action) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    switch (action) {
        case main_1.ActionType.INIT:
            init.apply(void 0, args);
            break;
        case main_1.ActionType.CONFIG:
            config.apply(void 0, args);
            break;
        default:
            chalk_1.default.red('type renata-cli -h to get help information');
            break;
    }
}
exports.default = exec;
