import * as React from 'react';
import * as block from 'bem-cn';
import { FormControl, Form, Button, Glyphicon } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as s from './styles.styl';
import { IReduxState as IAppReduxState } from 'shared/types/app';

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {}

function mapState(state: IAppReduxState): IStateProps {
  return {};
}

function mapDispatch(dispatch: Dispatch<IAppReduxState>): IDispatchProps {
  return bindActionCreators({}, dispatch);
}

interface IProps {
  value?: string;
}

function SearchRepositoriesInput(props: IProps): React.ReactElement<IProps> {
  const b = block('search-repositories-input');

  return (
    <Form className={s[b()]}>
      <FormControl className={s[b('input')()]} type="text" placeholder="Repository name"/>
      <Button className={s[b('submit')()]}>
        <Glyphicon glyph="search"/>
      </Button>
    </Form>
  );
}

export { IProps };
export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(SearchRepositoriesInput);
