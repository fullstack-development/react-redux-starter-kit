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

  _controller() {
    this._createDirectoriesStructure(this.isRedux);
    this._setViewFolderFiles();
    this._setNamespaceFolderFiles();
    if (this.isRedux) {
      this._setReduxFolderFiles();
    }
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
      {
        type: 'list',
        name: 'isRedux',
        message: 'Are your feature with redux?',
        choices: [
          {
            name: 'Yes',
            value: true,
          },
          {
            name: 'No',
            value: false,
          }
        ]
      }
    ]).then((answers) => {
      this.featureName = answers.featureName;
      this.language = answers.language;
      this.format = answers.language === 'ts' ? '.ts' : '.js';
      this.isRedux = answers.isRedux;
      this._controller();
    })
  }

  _createDirectoriesStructure(isRedux) {
    this.featurePath = this.destinationPath(`src/features/${this.featureName}`);
    if (isRedux) {
      mkdirp(`${this.featurePath}/redux`);
      mkdirp(`${this.featurePath}/redux/actions`);
      mkdirp(`${this.featurePath}/redux/reducers`);
    }
    mkdirp(`${this.featurePath}/view`);
    mkdirp(`${this.featurePath}/view/components`);
    mkdirp(`${this.featurePath}/view/containers`);
    mkdirp(`${this.featurePath}/namespace`);
  }

  _setViewFolderFiles() {
    this._createFileFromTemplate('index.txt', `${this.featurePath}/index${this.format}`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/components/index${this.format}`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/containers/index${this.format}`);
  }

  _setNamespaceFolderFiles() {
    this._createFileFromTemplate('namespace/actionTypes.txt', `${this.featurePath}/namespace/actionTypes${this.format}`);
    this._createFileFromTemplate('namespace/index.txt', `${this.featurePath}/namespace/index${this.format}`);
  }

  _setReduxFolderFiles() {
    this._createFileFromTemplate('redux/index.txt', `${this.featurePath}/redux/index${this.format}`);

    this._createFileFromTemplate('redux/initial.txt', `${this.featurePath}/redux/initial${this.format}`);

    this._createFileFromTemplate('redux/reducers/index.txt', `${this.featurePath}/redux/reducers/index${this.format}`);

    this._createFileFromTemplate('redux/actions/communication.txt', `${this.featurePath}/redux/actions/communication${this.format}`);

    this._createFileFromTemplate('redux/actions/data.txt', `${this.featurePath}/redux/actions/data${this.format}`);

    this._createFileFromTemplate('redux/actions/index.txt', `${this.featurePath}/redux/actions/index${this.format}`);

    this._createFileFromTemplate('redux/actions/sagas.txt', `${this.featurePath}/redux/actions/sagas${this.format}`);

    this._createFileFromTemplate('redux/actions/ui.txt', `${this.featurePath}/redux/actions/ui${this.format}`);
  }
};
