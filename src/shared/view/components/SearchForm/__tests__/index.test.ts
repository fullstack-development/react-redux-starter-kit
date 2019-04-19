import { makeMountRenderer } from 'shared/helpers';
import { Button } from 'shared/view/elements';
import { makeRequired } from 'shared/validators';

import SearchSettingsDialog from '../SearchSettingsDialog/SearchSettingsDialog';
import SearchForm, { ISearchFormProps } from '../SearchForm';

interface IFormFields {
  search: string;
}

const props: ISearchFormProps<IFormFields> = {
  settingsButtonText: 'settings',
  submitButtonText: 'submit',
  isSearchRequesting: false,
  searchInputName: 'search',
  dialogSubmitText: 'ok',
  dialogTitleText: 'Search settings',
  validators: makeRequired('submit error'),
  t: jest.fn(),
  onSubmit: jest.fn(),
  resetSearchResults: jest.fn(),
  initialValues: {
    search: 'abc',
  },
};

const getComponent = makeMountRenderer(SearchForm, props);

describe('(shared/view) SearchForm component', () => {
  it('should call onSubmit on submit', () => {
    const onSubmit = jest.fn();
    const component = getComponent({ onSubmit });
    component.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not submit without a search string', () => {
    const onSubmit = jest.fn();
    const component = getComponent({ onSubmit });
    component.find('input').simulate('change', { target: { value: '' } });
    component.find('form').simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should not submit while requesting', () => {
    const onSubmit = jest.fn();
    const component = getComponent({ onSubmit, isSearchRequesting: true });
    component.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should reset search results on unmount', () => {
    const resetSearchResults = jest.fn();
    const component = getComponent({ resetSearchResults });
    component.unmount();
    expect(resetSearchResults).toHaveBeenCalledTimes(1);
  });

  it('should render settings when renderSettings prop is provided', () => {
    const componentWithoutSettings = getComponent();
    const componentWithSettings = getComponent({ renderSettings: jest.fn() });

    expect(componentWithoutSettings.find('.search-form__settings-button').length).toBe(0);
    expect(componentWithSettings.find('.search-form__settings-button').length).toBe(1);
  });

  it('should open SettingsDialog on settings button click & hide on onClose call', () => {
    const component = getComponent({ renderSettings: jest.fn() });

    const settingsButton = component.find('.search-form__settings-button').find(Button);
    settingsButton.prop('onClick')();
    component.update();
    const settingsDialog = component.find(SearchSettingsDialog);
    expect(settingsDialog.prop('isOpen')).toBe(true);

    settingsDialog.prop('onClose')();
    component.update();
    expect(component.find(SearchSettingsDialog).prop('isOpen')).toBe(false);
  });
});
