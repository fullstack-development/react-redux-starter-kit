import { makeShallowRenderer, getMockedLocaleProps } from 'shared/helpers';
import { SearchForm } from 'shared/view/components';

import { UsersSearchForm, IUsersSearchFormProps } from '../UsersSearchForm';

const props: IUsersSearchFormProps = {
  onSubmit: jest.fn(),
  searchUsers: jest.fn(),
  resetSearchResults: jest.fn(),
  isUsersSearchRequesting: false,
  ...getMockedLocaleProps(),
};

const getComponent = makeShallowRenderer(UsersSearchForm, props);

describe('(features/usersSearch) UsersSearchForm container', () => {
  it('should call onSubmit and searchUsers with form values on form submit', () => {
    const searchUsers = jest.fn();
    const onSubmit = jest.fn();
    const component = getComponent({ searchUsers, onSubmit });
    const formValues = {};
    component.find(SearchForm).prop('onSubmit')(formValues);
    expect(searchUsers).toHaveBeenCalledWith({ searchOptions: formValues, page: 1 });
    expect(onSubmit).toHaveBeenCalledWith(formValues);
  });

  it('should call resetSearchResults on reset search results', () => {
    const resetSearchResults = jest.fn();
    const component = getComponent({ resetSearchResults });
    component.find(SearchForm).prop('resetSearchResults')();
    expect(resetSearchResults).toHaveBeenCalledTimes(1);
  });
});
