import yosay = require('yosay');
import * as Generator from 'yeoman-generator';
import { ChoiceType } from 'inquirer';

interface IUserAnswers {
  featureName: string;
  featureParts: FeaturePart[];
  reduxConfig: IReduxConfig | null;
  viewConfig: IViewConfig | null;
}

type FeaturePart = 'redux' | 'view';

interface IViewConfig {
  parts: ViewPart[];
}

type ViewPart = 'containers' | 'components';

interface IReduxConfig {
  withSaga: boolean;
  parts: ReduxPart[];
}

type ReduxPart = 'communication' | 'edit' | 'data' | 'ui';

interface ICreateFileConfig {
  templateUrl: string;
  newFileUrl: string;
  context?: object;
}

class CreateFeatureGenerator extends Generator {
  private userAnswers: IUserAnswers = {
    featureName: '',
    featureParts: [],
    reduxConfig: null,
    viewConfig: null,
  };
  private featurePath: string;

  public constructor(args: string | string[], options: {}) {
    super(args, options);
  }

  public initializing() {
    this.log(yosay('Welcome to create feature generator'));
  }

  public async prompting() {
    const featureName = await this._promptFeatureName();
    const featureParts = await this._promptFeatureParts();

    this.featurePath = this.destinationPath(`src/features/${featureName}`);
    this.userAnswers = {
      featureName,
      featureParts,
      reduxConfig: featureParts.includes('redux') ? await this._promptReduxConfig() : null,
      viewConfig: featureParts.includes('view') ? await this._promptViewConfig() : null,
    };
  }

  public writing() {
    const { viewConfig, reduxConfig } = this.userAnswers;

    this._createIndexFiles();
    viewConfig && this._createViewFiles(viewConfig);
    reduxConfig && this._createReduxFiles(reduxConfig);
  }

  private async _promptFeatureName(): Promise<string> {
    const questions: Generator.Question = {
      type: 'input',
      name: 'value',
      message: 'Your feature name',
      validate(value) {
        return !!value || 'Feature name should be not empty';
      },
    };

    const answer = await this.prompt(questions) as { value: string };
    return answer.value;
  }

  private async _promptFeatureParts(): Promise<FeaturePart[]> {
    const choices: FeaturePart[] = (['redux', 'view']);
    const questions: Generator.Question = {
      type: 'checkbox',
      name: 'value',
      message: 'Select feature parts',
      choices: choices.map<ChoiceType>(choice => ({
        name: choice,
        value: choice,
        checked: true,
      })),
      validate(value) {
        return !!value || 'Feature name should be not empty';
      },
    };

    const answer = await this.prompt(questions) as { value: FeaturePart[] };
    return answer.value;
  }

  private async _promptReduxConfig(): Promise<IReduxConfig> {
    const choices: ReduxPart[] = ['communication', 'data', 'edit', 'ui'];
    const questions: Generator.Question[] = [
      {
        type: 'list',
        name: 'withSaga',
        message: 'Does your redux uses sagas?',
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
      }, {
        type: 'checkbox',
        name: 'parts',
        message: 'Select redux parts',
        choices,
      },
    ];

    const answer = await this.prompt(questions) as IReduxConfig;
    return answer;
  }

  private async _promptViewConfig(): Promise<IViewConfig> {
    const choices: ViewPart[] = ['components', 'containers'];
    const questions: Generator.Question = {
      type: 'checkbox',
      name: 'parts',
      message: 'Select view parts',
      choices: choices.map<ChoiceType>(choice => ({
        name: choice,
        value: choice,
        checked: true,
      })),
    };

    const answer = await this.prompt(questions) as IViewConfig;
    return answer;
  }

  private _createViewFiles({ parts }: IViewConfig) {
    const viewPath = `${this.featurePath}/view`;
    const containers: ICreateFileConfig[] = [
      {
        templateUrl: 'view/containers/SomeContainer/SomeContainer.scss',
        newFileUrl: `${viewPath}/containers/SomeContainer/SomeContainer.scss`,
      }, {
        templateUrl: 'view/containers/SomeContainer/SomeContainer.tsx',
        newFileUrl: `${viewPath}/containers/SomeContainer/SomeContainer.tsx`,
      }, {
        templateUrl: 'view/containers/index.ts',
        newFileUrl: `${viewPath}/containers/index.ts`,
      },
    ];
    const components: ICreateFileConfig[] = [
      {
        templateUrl: 'view/components/SomeComponent/SomeComponent.scss',
        newFileUrl: `${viewPath}/components/SomeComponent/SomeComponent.scss`,
      }, {
        templateUrl: 'view/components/SomeComponent/SomeComponent.tsx',
        newFileUrl: `${viewPath}/components/SomeComponent/SomeComponent.tsx`,
      }, {
        templateUrl: 'view/components/index.ts',
        newFileUrl: `${viewPath}/components/index.ts`,
      },
    ];

    const files = ([] as ICreateFileConfig[])
      .concat(parts.includes('components') ? components : [])
      .concat(parts.includes('containers') ? containers : []);

    files.forEach(file => this._createFileFromTemplate(file));
  }

  private _createReduxFiles({ parts, withSaga }: IReduxConfig) {
    const reduxPath = `${this.featurePath}/redux`;

    const index: ICreateFileConfig[] = [
      {
        templateUrl: 'redux/index.ts',
        newFileUrl: `${reduxPath}/index.ts`,
      }, {
        templateUrl: 'redux/initial.ts',
        newFileUrl: `${reduxPath}/initial.ts`,
      }, {
        templateUrl: 'redux/selectors.ts',
        newFileUrl: `${reduxPath}/selectors.ts`,
      },
    ];
    const actions: ICreateFileConfig[] = parts
      .map<ICreateFileConfig>(part => ({
        templateUrl: 'redux/actions/base.ts',
        newFileUrl: `${reduxPath}/actions/${part}.ts`,
      }))
      .concat([{
        templateUrl: 'redux/actions/index.ts',
        newFileUrl: `${reduxPath}/actions/index.ts`,
      }]);
    const reducers: ICreateFileConfig[] = parts
      .filter(part => part !== 'communication')
      .map<ICreateFileConfig>(part => ({
        templateUrl: 'redux/reducers/base.ts',
        newFileUrl: `${reduxPath}/reducers/${part}.ts`,
        context: { partName: part },
      }))
      .concat(parts.includes('communication') ? [{
        templateUrl: 'redux/reducers/communication.ts',
        newFileUrl: `${reduxPath}/reducers/communication.ts`,
      }] : [])
      .concat([{
        templateUrl: 'redux/reducers/index.ts',
        newFileUrl: `${reduxPath}/reducers/index.ts`,
      }]);
    const sagas: ICreateFileConfig[] = [{
      templateUrl: 'redux/sagas/index.ts',
      newFileUrl: `${reduxPath}/sagas/index.ts`,
    }];

    const files = [...index, ...actions, ...reducers].concat(withSaga ? sagas : []);

    files.forEach(file => this._createFileFromTemplate(file));
  }

  private _createIndexFiles() {
    const files: ICreateFileConfig[] = [
      {
        templateUrl: 'entry.ts',
        newFileUrl: `${this.featurePath}/entry.ts`,
      }, {
        templateUrl: 'index.ts',
        newFileUrl: `${this.featurePath}/index.ts`,
      }, {
        templateUrl: 'loader.ts',
        newFileUrl: `${this.featurePath}/loader.ts`,
      },
    ].concat(this.userAnswers.featureParts.includes('redux') ? {
      templateUrl: 'namespace.ts',
      newFileUrl: `${this.featurePath}/namespace.ts`,
    } : []);

    files.forEach(file => this._createFileFromTemplate(file));
  }

  private _createFileFromTemplate({ context = {}, newFileUrl, templateUrl }: ICreateFileConfig) {
    this.fs.copyTpl(this.templatePath(templateUrl), newFileUrl, { ...this.userAnswers, ...context });
  }
}

module.exports = CreateFeatureGenerator;
