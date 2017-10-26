'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

  _createFileFromTemplate(templateUrl, newFileUrl) {
    this.fs.copyTpl(this.templatePath(`${this.language}/${templateUrl}`), newFileUrl);
  }

  init() {
    this.log(yosay('Welcome to create feature generator'));
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'featureName',
        message: 'Your feature name',
      },
      {
        type: 'list',
        name: 'language',
        message: 'Which language are you using?',
        choices: [
          {
            name: 'Typescript',
            value: 'ts',
          },
          {
            name: 'Flow',
            value: 'flow',
          }
        ],
      },
    ])
    .then((answers) => {
      this.featureName = answers.featureName;
      this.language = answers.language;
      this.format = answers.language === 'ts' ? '.ts' : '.js';
    })
  }

  createDirectoriesStructure() {
    this.featurePath = this.destinationPath(`src/features/${this.featureName}`);
    mkdirp(`${this.featurePath}/redux`);
    mkdirp(`${this.featurePath}/redux/actions`);
    mkdirp(`${this.featurePath}/redux/reducers`);
    mkdirp(`${this.featurePath}/view`);
    mkdirp(`${this.featurePath}/view/components`);
    mkdirp(`${this.featurePath}/view/containers`);
    mkdirp(`${this.featurePath}/namespace`);
  }

  setViewFolderFiles() {
    this._createFileFromTemplate('index.txt', `${this.featurePath}/index${this.format}`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/components/index${this.format}`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/containers/index${this.format}`);
  }

  setNamespaceFolderFiles() {
    this._createFileFromTemplate('namespaceTemplates/actionTypes.txt', `${this.featurePath}/namespace/actionTypes${this.format}`);
    this._createFileFromTemplate('namespaceTemplates/index.txt', `${this.featurePath}/namespace/index${this.format}`);
  }

  setReduxFolderFiles() {
    this._createFileFromTemplate('reduxTemplates/reduxEntry.txt', `${this.featurePath}/redux/index${this.format}`);

    this._createFileFromTemplate('reduxTemplates/initial.txt', `${this.featurePath}/redux/initial${this.format}`);

    this._createFileFromTemplate('reduxTemplates/reducers.txt', `${this.featurePath}/redux/reducers/index${this.format}`);

    this._createFileFromTemplate('actionsTemplates/communication.txt', `${this.featurePath}/redux/actions/communication${this.format}`);

    this._createFileFromTemplate('actionsTemplates/data.txt', `${this.featurePath}/redux/actions/data${this.format}`);

    this._createFileFromTemplate('actionsTemplates/index.txt', `${this.featurePath}/redux/actions/index${this.format}`);

    this._createFileFromTemplate('actionsTemplates/sagas.txt', `${this.featurePath}/redux/actions/sagas${this.format}`);

    this._createFileFromTemplate('actionsTemplates/ui.txt', `${this.featurePath}/redux/actions/ui${this.format}`);
  }
};
