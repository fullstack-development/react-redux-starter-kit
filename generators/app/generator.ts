import yosay = require('yosay');
import * as Generator from 'yeoman-generator';

interface IUserAnswers {
  featureName: string;
  isRedux: boolean;
}

class CustomGenerator extends Generator {
  private userAnswers: IUserAnswers = {
    featureName: '',
    isRedux: false,
  };
  private featurePath: string;

  public constructor(args: string | string[], options: {}) {
    super(args, options);
  }

  public initializing() {
    this.log(yosay('Welcome to create feature generator'));
  }

  public async prompting() {
    const questions: Generator.Question[] = [
      {
        type: 'input',
        name: 'featureName',
        message: 'Your feature name',
        validate(value) {
          return !!value || 'Feature name should be not empty';
        },
      },
      {
        type: 'list',
        name: 'isRedux',
        message: 'Are your feature with redux?',
        choices: [
          {
            name: 'Yes',
            value: true as any,
          },
          {
            name: 'No',
            value: false as any,
          },
        ],
      },
    ];

    this.userAnswers = await this.prompt(questions) as IUserAnswers;
    this.featurePath = this.destinationPath(`src/features/${this.userAnswers.featureName}`);

    this._controller();
  }

  private _createFileFromTemplate(templateUrl: string, newFileUrl: string, context: object = {}) {
    this.fs.copyTpl(this.templatePath(templateUrl), newFileUrl, { ...this.userAnswers, ...context });
  }

  private _controller() {
    this._setViewFolderFiles();
    this._setNamespaceFolderFiles();
    if (this.userAnswers.isRedux) {
      this._setReduxFolderFiles();
    }
  }

  private _setViewFolderFiles() {
    this._createFileFromTemplate('index.txt', `${this.featurePath}/index.ts`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/components/index.ts`);
    this._createFileFromTemplate('emptyExport.txt', `${this.featurePath}/view/containers/index.ts`);
  }

  private _setNamespaceFolderFiles() {
    this._createFileFromTemplate('namespace/actionTypes.txt', `${this.featurePath}/namespace/actionTypes.ts`);
    this._createFileFromTemplate('namespace/index.txt', `${this.featurePath}/namespace/index.ts`);
  }

  private _setReduxFolderFiles() {
    this._createFileFromTemplate('redux/index.txt', `${this.featurePath}/redux/index.ts`);
    this._createFileFromTemplate('redux/initial.txt', `${this.featurePath}/redux/initial.ts`);
    this._createFileFromTemplate('redux/reducers/index.txt', `${this.featurePath}/redux/reducers/index.ts`);
    this._createFileFromTemplate(
      'redux/actions/communication.txt',
      `${this.featurePath}/redux/actions/communication.ts`,
    );
    this._createFileFromTemplate('redux/actions/data.txt', `${this.featurePath}/redux/actions/data.ts`);
    this._createFileFromTemplate('redux/actions/index.txt', `${this.featurePath}/redux/actions/index.ts`);
    this._createFileFromTemplate('redux/actions/sagas.txt', `${this.featurePath}/redux/actions/sagas.ts`);
    this._createFileFromTemplate('redux/actions/ui.txt', `${this.featurePath}/redux/actions/ui.ts`);
  }
}

module.exports = CustomGenerator;
