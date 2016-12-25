import * as React from 'react';
import * as block from 'bem-cn';
import { FormControl, Form, Button, Glyphicon } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as s from './styles.styl';
import Namespace from './../../namespace';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
}


function mapState(state: Namespace.ReduxState): StateProps {
  return {};
}

function mapDispatch(dispatch: Dispatch<Namespace.ReduxState>): DispatchProps {
  return bindActionCreators({}, dispatch);
}

interface Props {
  value?: string;
}

function SearchRepositoriesInput(props: Props): React.ReactElement<Props> {
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


/**
 * Wrapper for container, which allow parametrize state branch,
 * with which feature should work.
 * @param stateSelector - function, which should select correct branch for this feature
 * */
function Wrapper(stateSelector: Namespace.StateSelector) {
  function mapStateToProps(state: { [key: string]: any }): StateProps {
    return mapState(stateSelector(state));
  }

  return connect(mapStateToProps, mapDispatch)(SearchRepositoriesInput);
}

export { Props };
export default Wrapper;
