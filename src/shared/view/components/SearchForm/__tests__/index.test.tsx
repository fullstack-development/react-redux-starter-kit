import React from 'react';
import { mount } from 'enzyme';

import SearchForm, { ISearchFormProps } from '../SearchForm';

interface IFormFields {
  search: string;
}

const props: ISearchFormProps<IFormFields> = {
  isSearchRequesting: false,
  searchInputName: 'search',
  onSubmit: jest.fn(),
  resetSearchResults: jest.fn(),
  renderSettings: jest.fn(),
  initialValues: {
    search: 'abc',
  },
};

describe('SearchForm component', () => {
  const component = mount(<SearchForm<IFormFields> {...props}/>);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit on submit', () => {
    component.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not submit without a search string', () => {
    component.find('input').simulate('change', { target: { value: '' } });
    component.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should not submit while requesting', () => {
    component.setProps({ isSearchRequesting: true }, () => {
      component.find('form').simulate('submit');
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('should reset search results on unmount', () => {
    component.unmount();
    expect(props.resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
