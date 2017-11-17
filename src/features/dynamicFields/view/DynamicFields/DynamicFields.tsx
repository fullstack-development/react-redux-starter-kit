import * as React from 'react';
import * as block from 'bem-cn';
import { Form, FormGroup } from 'react-bootstrap';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../redux';
import { IFields, ICommunication, IReduxState, IField } from '../../namespace';
import { bind } from 'decko';
import GenericTextInput from 'shared/view/components/GenericTextInput/GenericTextInput';
import GenericIntegerInput from 'shared/view/components/GenericIntegerInput/GenericIntegerInput';
import GenericRadioInput from 'shared/view/components/GenericRadioInput/GenericRadioInput';
import GenericDropdownInput from 'shared/view/components/GenericDropdownInput/GenericDropdownInput';
import GenericDateInput from 'shared/view/components/GenericDateInput/GenericDateInput';
import GenericTimeInput from 'shared/view/components/GenericTimeInput/GenericTimeInput';
import GenericLocationInput from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import { FieldValue } from 'shared/view/components/GenericInput/GenericInput';
import './DynamicFields.scss';

import EventHandler = React.EventHandler;
import FormEvent = React.FormEvent;
import ComponentClass = React.ComponentClass;
import StatelessComponent = React.StatelessComponent;

interface IOwnProps {
  category?: number;
  onSetField?: (fieldName: string, fieldValue: FieldValue) => void;
  onSubmit?: EventHandler<FormEvent<Form>>;
  onChange?: (fieldName: string, fieldValue: FieldValue, errors: string[]) => void;
}

interface IStateProps {
  fields: IFields;
  communications: { fetching: ICommunication };
}

interface IDispatchProps {
  loadFields: typeof actions.loadFields;
  changeFieldValue: typeof actions.changeFieldValue;
}

type Props = IDispatchProps & IStateProps & IOwnProps;

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

function mapDispatchToProps(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    loadFields: actions.loadFields,
    changeFieldValue: actions.changeFieldValue,
  }, dispatch);
}

class DynamicFields extends React.Component<Props, IState> {
  public state: IState = { values: {}, errors: [] };

  private b = block('dynamic-fields');
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

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.category && this.props.category !== nextProps.category) {
      this.changeCategory(nextProps.category);
    }
  }

  public render() {
    const b = this.b;

    return (
      <div className={b()}>
        <FormGroup>
          <h4>Dynamic Fields</h4>
          {this.renderFields()}
        </FormGroup>
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
    return (value: FieldValue, errors: string[]) => {
      const { changeFieldValue, onChange } = this.props;

      if (onChange) {
        onChange(fieldName, value, errors);
      }

      changeFieldValue(fieldName, value);
    };
  }

  private renderFields(): React.ReactNode {
    const { fields } = this.props;
    if (fields && fields.schema && fields.schema.properties) {
      const requriedFields: string[] = fields.schema.required;
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
          const Component: ComponentClass<any> | StatelessComponent<any> = this.components[type];
          const props = { ...properties[fieldName] }; // avoid mutations in future
          const isRequired: boolean = Boolean(requriedFields.find((f: string) => f === fieldName));
          const fieldErrors = this.state.errors.indexOf(fieldName) > -1 ? ['Required Field'] : [];
          props.label = isRequired ? `${props.label}*` : props.label;

          return (
            <div className={this.b('field')()} key={props.order}>
              <Component
                {...props}
                required={isRequired}
                errors={fieldErrors}
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
export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(DynamicFields);
