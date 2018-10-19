import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Typography } from '@material-ui/core';

import { IFields, IField } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { IGenericInputProps } from 'shared/view/components';
import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';
import GenericTextInput from 'shared/view/components/GenericTextInput/GenericTextInput';
import GenericIntegerInput from 'shared/view/components/GenericIntegerInput/GenericIntegerInput';
import GenericRadioInput from 'shared/view/components/GenericRadioInput/GenericRadioInput';
import GenericDropdownInput from 'shared/view/components/GenericDropdownInput/GenericDropdownInput';
import GenericDateInput from 'shared/view/components/GenericDateInput/GenericDateInput';
import GenericTimeInput from 'shared/view/components/GenericTimeInput/GenericTimeInput';
import GenericLocationInput from 'shared/view/components/GenericLocationInput/GenericLocationInput';

import { IReduxState } from '../../namespace';
import { actions, selectors } from '../../redux';
import { StylesProps, provideStyles } from './DynamicFields.style';

interface IOwnProps {
  category: number | null;
  onChange?: (fieldName: string, fieldValue: FieldValue, error: string) => void;
}

interface IStateProps {
  fields: IFields;
  communications: { fetching: ICommunication };
}

interface IDispatchProps {
  loadFields: typeof actions.loadFields;
  changeFieldValue: typeof actions.changeFieldValue;
}

type Props = IDispatchProps & IStateProps & IOwnProps & StylesProps;

interface IState {
  values: { [key: string]: string | number | { [key: string]: any } };
  errors: string[];
}

function mapStateToProps(state: any): IStateProps {
  const dynamicFieldsState: IReduxState = state.dynamicFields;
  const fields = selectors.selectFields(dynamicFieldsState);
  const communications = selectors.selectCommunication(dynamicFieldsState);

  return {
    fields,
    communications,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return bindActionCreators({
    loadFields: actions.loadFields,
    changeFieldValue: actions.changeFieldValue,
  }, dispatch);
}

class DynamicFields extends React.Component<Props, IState> {
  public state: IState = { values: {}, errors: [] };

  private components: { [key: string]: React.ComponentClass<any> | React.StatelessComponent<any> } = {
    text: GenericTextInput,
    integer: GenericIntegerInput,
    number: (props) => (<GenericIntegerInput {...props} isFloat />),
    date: GenericDateInput,
    time: GenericTimeInput,
    radio: GenericRadioInput,
    dropdown: GenericDropdownInput,
    location: GenericLocationInput,
  };

  public componentDidMount() {
    if (this.props.category) {
      this.changeCategory(this.props.category);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.category && prevProps.category !== this.props.category) {
      this.changeCategory(this.props.category);
    }
  }

  public render() {
    return (
      <div>
        <Typography variant="title">Dynamic Fields</Typography>
        {this.renderFields()}
      </div>
    );
  }

  @bind
  private changeCategory(uid: number) {
    this.setState({ values: {}, errors: [] });
    this.props.loadFields(uid);
  }

  @bind
  private onFieldChange(fieldName: string) {
    return (value: FieldValue, error: string) => {
      const { changeFieldValue, onChange } = this.props;

      if (onChange) {
        onChange(fieldName, value, error);
      }

      changeFieldValue(fieldName, value);
    };
  }

  private renderFields(): React.ReactNode {
    const { fields, classes } = this.props;
    if (fields && fields.schema && fields.schema.properties) {
      const requiredFields: string[] = fields.schema.required;
      const properties: { [key: string]: IField } = fields.schema.properties;
      const fieldsNode = Object
        .keys(properties)
        .filter((fieldName: string) => {
          const type = properties[fieldName].component;
          return this.components.hasOwnProperty(type);
        })
        .sort((fieldNameFirst: string, fieldNameSecond: string): number => {
          const propsOfFirst = properties[fieldNameFirst];
          const propsOfSecond = properties[fieldNameSecond];
          return propsOfFirst.order - propsOfSecond.order;
        })
        .map((fieldName: string) => {
          const type: string = properties[fieldName].component;
          const Component: React.ComponentType<IGenericInputProps> = this.components[type];
          const isRequired: boolean = Boolean(requiredFields.find((f: string) => f === fieldName));
          const baseProps = properties[fieldName];
          const props = {
            ...baseProps,
            label: isRequired ? `${baseProps.label}*` : baseProps.label,
          };
          const fieldError = this.state.errors.indexOf(fieldName) > -1 ? 'Required Field' : '';

          return (
            <div className={classes.field} key={props.order}>
              <Component
                {...props}
                required={isRequired}
                error={fieldError}
                name={fieldName}
                onChange={this.onFieldChange(fieldName)}
              />
            </div>
          );
        });

      return (<div>{fieldsNode}</div>);
    }
    return [];
  }
}

export { Props, DynamicFields, FieldValue };
export default (
  connect(mapStateToProps, mapDispatchToProps)(
    provideStyles(DynamicFields),
  )
);
