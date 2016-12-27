import * as React from 'react';
import * as block from 'bem-cn'; // default
import { Panel, Form, FormGroup, Button } from 'react-bootstrap';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppRedux from 'shared/types/app';
import RowsLayout from 'shared/view/elements/RowsLayout';
import Header from 'shared/view/components/Header';
import { LocationSelect, Namespace as LocationSelectNamespace } from 'features/locationSelect';
import { CategorySelect } from 'features/categorySelect';
import { DynamicFields } from 'features/dynamicFields';
import { FieldValue } from 'features/dynamicFields/view/DynamicFields/DynamicFields';
import { actions } from './../../redux';
import Namespace from './../../namespace';
import * as s from './Layout.styl';
import FormEvent = React.FormEvent;
import InitialState = Namespace.InitialState;
import ReduxState = AppRedux.ReduxState;

interface OwnProps {}

interface DispatchProps {
  saveFields: () => AppRedux.AsyncActionCreatorResult;
}

interface StateProps {
  submittingResult: string;
  isSubmitting: boolean;
}

interface State {
  categoryUid?: number;
  location?: LocationSelectNamespace.SelectedLocationData;
  dynamicFields: {
    [key: string]: {
      value: FieldValue,
      errors: string[]
    }
  };
}

interface Props extends StateProps, DispatchProps, OwnProps {}


function mapDispatch(dispatch: Dispatch<any>): DispatchProps {
  return bindActionCreators(actions, dispatch);
}

function mapState(state: ReduxState): StateProps {
  return {
    isSubmitting: state.orderForm.communications.saving.isRequesting,
    submittingResult: state.orderForm.data ? state.orderForm.data.message : ''
  };
}

class OrderFormLayout extends React.Component<Props, State> {

  private b = block('home-page');

  constructor(props: Props) {
    super(props);
    this.state = {
      dynamicFields: {},
      categoryUid: undefined,
    };
  }

  onLocationSelected = (location: LocationSelectNamespace.SelectedLocationData) : void => {
    this.setState({
      ...this.state,
      location
    });
  }

  onCategorySelected = (uid: number) : void => {
    this.setState({
      ...this.state,
      categoryUid: uid,
      dynamicFields: {}
    });
  }

  onFormSubmit = (e: FormEvent<Form>) : void => {
    e.preventDefault();
    this.props.saveFields();
  }

  onDynamicValueChanged = (name: string, value: FieldValue, errors: string[]) => {
    this.setState((prevState: State) => ({
      ...prevState,
      dynamicFields: {
        ...prevState.dynamicFields,
        [name]: { value, errors }
      }
    }));
  }

  get isDynamicFieldsValid(): boolean {
    const fields = this.state.dynamicFields;
    return !Object.keys(fields).some(
      (key: string) => Boolean(fields[key].errors.length),
    );
  }

  render() {
    const b = this.b;
    const { submittingResult, isSubmitting } = this.props;
    const { categoryUid, location } = this.state;
    const canSubmit: boolean = Boolean(typeof categoryUid === 'number') &&
      !isSubmitting && this.isDynamicFieldsValid && Boolean(location);

    return (
      <RowsLayout
        footerContent={<a href="http://fullstack-development.com/">FullStackDevelopment</a>}
        headerContent={<Header />}
      >
        <div className={s[b()]}>
          <div className={s[b('content')()]}>
            <Form onSubmit={this.onFormSubmit}>
              <Panel header={<LocationSelect onChange={this.onLocationSelected} />} />
              <Panel header={<CategorySelect onCategoryChosen={this.onCategorySelected} />} />
              <Panel header={categoryUid ? <DynamicFields category={categoryUid} onChange={this.onDynamicValueChanged} /> : null} />
              <FormGroup className="clearfix">
                {isSubmitting ? <span>Saving...</span> : null}
                {submittingResult ? <span className={s[b('result')]}>{submittingResult}</span> : null}
                <Button type="submit" bsStyle="primary" className={s[b('submit')()]} disabled={!canSubmit}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </RowsLayout>
    );
  }
}

export { Props };
export default connect<StateProps, DispatchProps, OwnProps>(mapState, mapDispatch)(OrderFormLayout
);