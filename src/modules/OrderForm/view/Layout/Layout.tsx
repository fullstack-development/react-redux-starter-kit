import * as React from 'react';
import block from 'bem-cn';
import { bind } from 'decko';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { featureConnect } from 'core';

import { RouteComponentProps } from 'react-router-dom';
import { IAppReduxState, Key } from 'shared/types/app';
import { IFlatFormProperties, ILocationProperties, ILocation, INormalizedLocation } from 'shared/types/models';
import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';

import * as locationSelect from 'features/locationSelect';
import * as categorySelect from 'features/categorySelect';
import * as dynamicFields from 'features/dynamicFields';

import { actions } from './../../redux';

import { Panel, Form, FormGroup, Button } from 'react-bootstrap';
import RowsLayout from 'shared/view/elements/RowsLayout';
import Header from 'shared/view/components/Header';
import './Layout.scss';
import { AnyAction } from 'react-redux/node_modules/redux';

interface IOwnProps {
  locationSelectEntry: locationSelect.Entry;
  categorySelectEntry: categorySelect.Entry;
  dynamicFieldsEntry: dynamicFields.Entry;
}

interface IDispatchProps {
  saveFields: typeof actions.saveFields;
}

interface IStateProps {
  submittingResult: string;
  isSubmitting: boolean;
  dynamicValues: IFlatFormProperties;
  locationValues: ILocationProperties;
  chosenLocation: INormalizedLocation | null;
  chosenCategoryUid: number | null;
}

interface IState {
  categoryUid: number | null;
  location: ILocation | null;
  dynamicFields: {
    [key: string]: {
      value: FieldValue,
      errors: string[],
    },
  };
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{}> & IOwnProps;

function mapDispatch(dispatch: Dispatch<AnyAction>): IDispatchProps {
  return bindActionCreators<AnyAction, Key<IDispatchProps>>({
    saveFields: actions.saveFields,
  }, dispatch);
}

function mapState(state: IAppReduxState, ownProps: IOwnProps): IStateProps {
  const { dynamicFieldsEntry, locationSelectEntry, categorySelectEntry } = ownProps;
  // console.log(locationSelectEntry);
  // const
  return {
    isSubmitting: state.orderForm.communications.saving.isRequesting,
    submittingResult: state.orderForm.data ? state.orderForm.data.message : '',
    dynamicValues: dynamicFieldsEntry.selectors.selectFlatValues(state.dynamicFields),
    locationValues: dynamicFieldsEntry.selectors.selectLocationValues(state.dynamicFields),
    chosenLocation: locationSelectEntry.selectors.selectSelectedLocation(state),
    chosenCategoryUid: categorySelectEntry.selectors.selectChosenCategoryUid(state).value,
  };
}

class OrderFormLayout extends React.Component<IProps, IState> {

  public state: IState = { dynamicFields: {}, categoryUid: null, location: null };
  private b = block('home-page');

  public render() {
    const b = this.b;
    const { CategorySelect } = this.props.categorySelectEntry.containers;
    const { DynamicFields } = this.props.dynamicFieldsEntry.containers;
    const { LocationSelect } = this.props.locationSelectEntry.containers;
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
  private onLocationSelected(location: ILocation | null): void {
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
  private onFormSubmit(e: React.FormEvent<Form>): void {
    e.preventDefault();
    const { dynamicValues, locationValues, chosenLocation, chosenCategoryUid, saveFields } = this.props;
    saveFields({ dynamicValues, chosenLocation, chosenCategoryUid, locationValues });
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

const connectedComponent = connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(OrderFormLayout);
const withFeatures = featureConnect({
  locationSelectEntry: locationSelect.loadEntry,
  categorySelectEntry: categorySelect.loadEntry,
  dynamicFieldsEntry: dynamicFields.loadEntry,
})(connectedComponent);

export default withFeatures;
