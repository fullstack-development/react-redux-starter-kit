import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { ITranslationProps } from 'services/i18n';

import { LanguageSelector } from '../LanguageSelector';

const props: ITranslationProps = {
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(LanguageSelector, props);

describe('(services/i18n) LanguageSelector component', () => {
  it('should render select', () => {
    const component = getComponent();
    expect(component.find('select').length).toEqual(1);
  });

  it('should call changeLanguage', () => {
    const changeLanguage = jest.fn();
    const newProps = {
      ...props,
      i18n: {
        ...props.i18n,
        changeLanguage,
      },
    };
    const component = getComponent(newProps);

    component.find('select').simulate('change', { target: { value: 'ru' } });

    expect(changeLanguage).toBeCalledTimes(1);
    expect(changeLanguage).toBeCalledWith('ru');
  });
});
