import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { WithTranslation } from 'services/i18n';

import { LanguageSelector } from '../LanguageSelector';

const props: WithTranslation = {
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

    component.find('select').simulate('change', { target: { value: 'ru-RU' } });

    expect(changeLanguage).toBeCalledTimes(1);
    expect(changeLanguage).toBeCalledWith('ru-RU');
  });

  it('should render select with en-US default language', () => {
    const component = getComponent();

    expect(component.find('select').props().value).toEqual('en-US');
  });

  it('should render right options value', () => {
    const component = getComponent();
    const options = component.find('option');

    expect(options.length).toEqual(2);
    expect(options.at(0).props().value).toEqual('en-US');
    expect(options.at(1).props().value).toEqual('ru-RU');
  });

  it('should render right labels', () => {
    const component = getComponent();
    const options = component.find('option');

    expect(options.length).toEqual(2);
    expect(options.at(0).props().children).toEqual('English');
    expect(options.at(1).props().children).toEqual('Русский');
  });
});
