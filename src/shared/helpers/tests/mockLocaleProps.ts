import { WithTranslation } from 'services/i18n';

export const getMockedLocaleProps: () => WithTranslation = () => ({
  t: jest.fn(),
  i18n: {
    isInitialized: true,
    language: 'en-US',
    languages: ['en-US', 'ru-RU'],
    options: {},
    services: {
      backendConnector: {},
      i18nFormat: {},
      interpolator: {},
      languageDetector: {},
      languageUtils: {},
      logger: {},
      pluralResolver: {},
      resourceStore: {
        'en-US': {
          translationNamespace: {
            translateMock: 'translate mock',
          },
        },
        'ru-RU': {
          translationNamespace: {
            translateMock: 'заглушка перевода',
          },
        },
      },
    },
    modules: {
      external: [],
    },
    use: jest.fn(),
    format: jest.fn(),
    exists: jest.fn(),
    addResource: jest.fn(),
    addResourceBundle: jest.fn(),
    addResources: jest.fn(),
    changeLanguage: jest.fn(),
    cloneInstance: jest.fn(),
    createInstance: jest.fn(),
    getFixedT: jest.fn(),
    dir: jest.fn(),
    getResource: jest.fn(),
    getResourceBundle: jest.fn(),
    hasResourceBundle: jest.fn(),
    init: jest.fn(),
    loadLanguages: jest.fn(),
    loadResources: jest.fn(),
    loadNamespaces: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
    reloadResources: jest.fn(),
    removeResourceBundle: jest.fn(),
    setDefaultNamespace: jest.fn(),
    t: jest.fn(),
  },
});
