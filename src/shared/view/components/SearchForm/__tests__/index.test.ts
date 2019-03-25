import { makeMountRenderer } from 'shared/helpers';
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
});
