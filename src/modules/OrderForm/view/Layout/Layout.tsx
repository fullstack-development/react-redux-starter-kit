import * as React from 'react';
import * as block from 'bem-cn';
import { Panel, Form, FormGroup, Button } from 'react-bootstrap';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { bind } from 'decko';
import { IAppReduxState, IModuleEntryData } from 'shared/types/app';
import RowsLayout from 'shared/view/elements/RowsLayout';
import Header from 'shared/view/components/Header';
import * as locationSelectFeature from 'features/locationSelect';
import * as categorySelectFeature from 'features/categorySelect';
import * as dynamicFieldsFeature from 'features/dynamicFields';
import { FieldValue } from 'features/dynamicFields/view/DynamicFields/DynamicFields';
import { actions } from './../../redux';
import './Layout.scss';
import FormEvent = React.FormEvent;

interface IDispatchProps {
  saveFields: typeof actions.saveFields;
}

interface IStateProps {
  submittingResult: string;
  isSubmitting: boolean;
}

interface IState {
  categoryUid?: number;
  location?: locationSelectFeature.Namespace.SelectedLocationData;
  dynamicFields: {
    [key: string]: {
      value: FieldValue,
      errors: string[],
    },
  };
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<void>;

function mapDispatch(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    saveFields: actions.saveFields,
  }, dispatch);
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isSubmitting: state.orderForm.communications.saving.isRequesting,
    submittingResult: state.orderForm.data ? state.orderForm.data.message : '',
  };
}

const { DynamicFields } = dynamicFieldsFeature;
const { CategorySelect } = categorySelectFeature;
const { LocationSelect } = locationSelectFeature;

class OrderFormLayout extends React.Component<IProps, IState> {

  private b = block('home-page');

  constructor(props: IProps) {
    super(props);
    this.state = {
      dynamicFields: {},
      categoryUid: undefined,
    };
  }

  public render() {
    const b = this.b;
    const { submittingResult, isSubmitting, history } = this.props;
    const { categoryUid, location } = this.state;
    const canSubmit: boolean = Boolean(typeof categoryUid === 'number') &&
      !isSubmitting && this.isDynamicFieldsValid && Boolean(location);
    const dynamicFieldsComponent = <DynamicFields category={categoryUid} onChange={this.onDynamicValueChanged} />;

    return (
      <RowsLayout
        footerContent={<a href="http://fullstack-development.com/">FullStackDevelopment</a>}
        headerContent={<Header onLinkClick={history.push} />}
      >
        <div className={b()}>
          <div className={b('content')()}>
            <Form onSubmit={this.onFormSubmit}>
              <Panel header={<LocationSelect onChange={this.onLocationSelected} />} />
              <Panel header={<CategorySelect onCategoryChosen={this.onCategorySelected} />} />
              <Panel header={categoryUid ? dynamicFieldsComponent : null} />

              <FormGroup className="clearfix">
                {isSubmitting ? <span>Saving...</span> : null}
                {submittingResult ? <span className={b('result')()}>{submittingResult}</span> : null}
                <Button type="submit" bsStyle="primary" className={b('submit')()} disabled={!canSubmit}>
                  Submit
                </Button>
              </FormGroup>

            </Form>
          </div>
        </div>
      </RowsLayout>
    );
  }

  @bind
  private onLocationSelected(location: locationSelectFeature.Namespace.SelectedLocationData): void {
    this.setState({
      ...this.state,
      location,
    });
  }

  @bind
  private onCategorySelected(uid: number): void {
    this.setState({
      ...this.state,
      categoryUid: uid,
      dynamicFields: {},
    });
  }

  @bind
  private onFormSubmit(e: FormEvent<Form>): void {
    e.preventDefault();
    this.props.saveFields();
  }

  @bind
  private onDynamicValueChanged(name: string, value: FieldValue, errors: string[]) {
    this.setState((prevState: IState) => ({
      ...prevState,
      dynamicFields: {
        ...prevState.dynamicFields,
        [name]: { value, errors },
      },
    }));
  }

  get isDynamicFieldsValid(): boolean {
    const fields = this.state.dynamicFields;
    return !Object.keys(fields).some(
      (key: string) => Boolean(fields[key].errors.length),
    );
  }
}

const connectedComponent = connect<IStateProps, IDispatchProps, {}>(mapState, mapDispatch)(OrderFormLayout);

function getView(): IModuleEntryData {
  return {
    component: connectedComponent,
    reducers: [
      { name: 'categorySelect', reducer: categorySelectFeature.reducer },
      { name: 'dynamicFields', reducer: dynamicFieldsFeature.reducer },
      { name: 'locationSelect', reducer: locationSelectFeature.reducer },
    ],
    sagas: [
      categorySelectFeature.actions.saga,
      dynamicFieldsFeature.actions.saga,
    ],
  };
}

export { IProps, getView };
export default connectedComponent;
