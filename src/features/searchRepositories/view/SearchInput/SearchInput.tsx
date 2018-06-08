import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { FormControl, Input, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { IAppReduxState as IAppReduxState } from 'shared/types/app';

import { provideStyles, StylesProps } from './SearchInput.style';

interface IOwnProps {
  value?: string;
}

function mapState(state: IAppReduxState): {} {
  return {};
}

function mapDispatch(dispatch: Dispatch): {} {
  return bindActionCreators({}, dispatch);
}

type IProps = IOwnProps & StylesProps;

function SearchRepositoriesInput(props: IProps): React.ReactElement<IProps> {
  return (
    <FormControl>
      <Input
        type="search"
        placeholder="Repository name"
        color="secondary"
        classes={{ root: props.classes.inputRoot }}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export { IProps };
export default (
  connect(mapState, mapDispatch)(
    provideStyles(SearchRepositoriesInput),
  )
);
