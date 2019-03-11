import buildTranslationKeys from './';

describe('(services/i18n/helpers) buildTranslationKey', () => {
  const locales = {
    shared: {
      error: {
        bug: 'bug',
      },
    },
  };
  const tKeys = buildTranslationKeys(locales);

  it('should correctly build translation key', () => {
    expect(tKeys.shared.error.bug.getKey()).toEqual('shared.error.bug');
  });

  it('should correctly concat key to path', () => {
    expect(tKeys.shared.error.concat('bug')).toEqual('shared.error.bug');
  });
});
