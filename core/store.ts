import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import { features } from './exec';

type Features = {
  [k: string]: boolean;
};
type BabelConfig = {
  presets?: Array<[string, object?] | string>;
  plugins?: Array<string>;
};
type Answers = {
  [k: string]: any;
};
export default class CLIStore {
  private projectPath: string;
  private features: Features = {};
  private answers: Answers;
  constructor(proPath: string, answer: Answers) {
    this.projectPath = proPath;
    this.answers = answer;
    features.forEach(v => {
      this.features[v] = false;
    });
  }
  public getProjectPath() {
    return this.projectPath;
  }
  public getAnswer() {
    return this.answers;
  }
  public getFeature(key: string) {
    return this.features[key] || this.answers[key];
  }
  public setFeatures(features: string[]) {
    features.forEach(v => {
      this.features[v] = true;
    });
  }
  // package.json file
  private pkg: Object = {};
  public configPkg(pkg: Object) {
    this.pkg = _.mergeWith(this.pkg, pkg);
  }
  public getPkg() {
    return this.pkg;
  }
  // babel config
  private babelConfig: BabelConfig = {
    presets: [],
    plugins: [],
  };
  public confiBabel(babelConfig: BabelConfig) {
    this.babelConfig = _.merge(this.babelConfig, babelConfig);
  }
  public getBabelConfig() {
    return this.babelConfig;
  }
  // eslint
  // ...
  // generate file based on pkg and babel config and ....
  public generateFiles() {
    this.writeBabelrc();
    this.writePkg();
  }
  private writePkg() {
    fs.writeFileSync(path.resolve(this.projectPath, 'package.json'), JSON.stringify(this.pkg, null, 2));
  }
  private writeBabelrc() {
    fs.writeFileSync(path.resolve(this.projectPath, '.babelrc'), JSON.stringify(this.babelConfig, null, 2));
  }
}
