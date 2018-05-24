import * as React from 'react';
import block from 'bem-cn';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import { IAppReduxState as IAppReduxState } from 'shared/types/app';

import { FormControl, Form, Button, Glyphicon } from 'react-bootstrap';
import './SearchInput.scss';

interface IProps {
  value?: string;
}

function mapState(state: IAppReduxState): {} {
  return {};
}

function mapDispatch(dispatch: Dispatch<IAppReduxState>): {} {
  return bindActionCreators({}, dispatch);
}

const b = block('search-repositories-input');

function SearchRepositoriesInput(props: IProps): React.ReactElement<IProps> {
  return (
    <Form className={b()}>
      <FormControl className={b('input')()} type="text" placeholder="Repository name" />
      <Button className={b('submit')()}>
        <Glyphicon glyph="search" />
      </Button>
    </Form>
  );
}

export { IProps };
export default connect<{}, {}, IProps>(mapState, mapDispatch)(SearchRepositoriesInput);
