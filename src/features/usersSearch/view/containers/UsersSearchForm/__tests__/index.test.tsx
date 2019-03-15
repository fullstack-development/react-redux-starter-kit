import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { SearchForm } from 'shared/view/components';

import { UsersSearchForm, IUsersSearchFormProps } from '../UsersSearchForm';

const props: IUsersSearchFormProps = {
  onSubmit: jest.fn(),
  searchUsers: jest.fn(),
  resetSearchResults: jest.fn(),
  isUsersSearchRequesting: false,
};

describe('(features/usersSearch) UsersSearchForm container', () => {
  let component: ShallowWrapper<IUsersSearchFormProps>;
  beforeEach(() => component = shallow(<UsersSearchForm {...props} />));

  it('should call onSubmit and searchUsers with form values on form submit', () => {
    const formValues = {};
    const searchForm = component.find(SearchForm);
    searchForm.prop('onSubmit')(formValues);
    expect(props.searchUsers).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(props.onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetSearchResults on reset search results', () => {
    const searchForm = component.find(SearchForm);
    searchForm.prop('resetSearchResults')();
    expect(props.resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
