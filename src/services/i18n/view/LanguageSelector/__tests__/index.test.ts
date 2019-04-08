import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { WithTranslation } from 'services/i18n';
import { Select } from 'shared/view/elements';

import { LanguageSelector } from '../LanguageSelector';

const props: WithTranslation = {
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(LanguageSelector, props);

describe('(services/i18n) LanguageSelector component', () => {
  it('should render select', () => {
    const component = getComponent();
    expect(component.find(Select).length).toEqual(1);
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

    component.find(Select).simulate('change', { target: { value: 'ru-RU' } });

    expect(changeLanguage).toBeCalledTimes(1);
    expect(changeLanguage).toBeCalledWith('ru-RU');
  });

  it('should render select with en-US default language', () => {
    const component = getComponent();

    expect(component.find(Select).props().value).toEqual('en-US');
  });

  it('should get correct options', () => {
    const expectedOptions = [{
      label: 'English', value: 'en-US',
    }, {
      label: 'Русский', value: 'ru-RU',
    }];
    const component = getComponent();
    const select = component.find(Select);

    expect(select.props().options).toEqual(expectedOptions);
  });
});
