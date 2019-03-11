import React from 'react';
import { shallow } from 'enzyme';

import { UsersSearchForm, IUsersSearchFormProps } from '../UsersSearchForm';
import { IUsersSearchFormFields } from '../../../../namespace';

const props: IUsersSearchFormProps = {
  onSubmit: jest.fn(),
  searchUsers: jest.fn(),
  resetSearchResults: jest.fn(),
  isUsersSearchRequesting: false,
};

describe('(features/usersSearch) UsersSearchForm container', () => {
  const component = shallow(<UsersSearchForm {...props} />);
  const searchForm = component.find('SearchForm');

  it('should call onSubmit and searchUsers with form values on form submit', () => {
    const formValues: IUsersSearchFormFields = {
      searchBy: 'email',
      searchString: '',
      searchType: 'both',
      perPage: 30,
    };
    searchForm.prop<(formValues: object) => void>('onSubmit')(formValues);
    expect(props.searchUsers).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(props.onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetSearchResults on reset search results', () => {
    searchForm.prop<() => void>('resetSearchResults')();
    expect(props.resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
