import * as React from 'react';
import * as block from 'bem-cn';
import { Form, FormGroup } from 'react-bootstrap';
import * as s from './DynamicFields.styl';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../redux';
import Namespace from './../../namespace';
import GenericTextInput from 'shared/view/components/GenericTextInput/GenericTextInput';
import GenericIntegerInput from 'shared/view/components/GenericIntegerInput/GenericIntegerInput';
import GenericRadioInput from 'shared/view/components/GenericRadioInput/GenericRadioInput';
import GenericDropdownInput from 'shared/view/components/GenericDropdownInput/GenericDropdownInput';
import GenericDateInput from 'shared/view/components/GenericDateInput/GenericDateInput';
import GenericTimeInput from 'shared/view/components/GenericTimeInput/GenericTimeInput';
import GenericLocationInput from 'shared/view/components/GenericLocationInput/GenericLocationInput';
import GenericInputsNamespace from './../../../../shared/view/components/GenericInput/GenericInput';
import EventHandler = React.EventHandler;
import FormEvent = React.FormEvent;
import ComponentClass = React.ComponentClass;
import StatelessComponent = React.StatelessComponent;
import FieldValue = GenericInputsNamespace.FieldValue;

interface OwnProps {
  category: number;
  onSetField?: (fieldName: string, fieldValue: FieldValue) => void;
  onSubmit?: EventHandler<FormEvent<Form>>;
  onChange?: (fieldName: string, fieldValue: FieldValue, errors: string[]) => void;
}

interface StateProps {
  fields: Namespace.Fields;
  communications: { fetching: Namespace.Communication };
}

interface DispatchProps {
  loadFields: typeof actions.loadFields;
  changeFieldValue: typeof actions.changeFieldValue;
}

interface Props extends DispatchProps, StateProps, OwnProps {}

interface State {
  values: {[key: string]: string | number | {[key: string]: any}};
  errors: Array<string>;
}

function mapStateToProps(state: any): StateProps {
  const dynamicFieldsState: Namespace.InitialState = state.dynamicFields;
  const fields = selectors.selectFields(dynamicFieldsState);
  const communications = selectors.selectCommunication(dynamicFieldsState);

  return {
    fields,
    communications,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
  return bindActionCreators({
    loadFields: actions.loadFields,
    changeFieldValue: actions.changeFieldValue
  }, dispatch);
}

class DynamicFields extends React.Component<Props, State> {
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

  constructor(props: Props) {
    super(props);
    this.state = {
      values: {},
      errors: [],
    };
  }

  componentDidMount() {
    if (this.props.category) {
      this.changeCategory(this.props.category);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.category !== nextProps.category) {
      this.changeCategory(nextProps.category);
    }
  }

  changeCategory(uid: number) {
    this.setState({ values: {}, errors: [] });
    this.props.loadFields(uid);
  }

  onFieldChange = (fieldName: string) => {
    return (value: FieldValue, errors: string[]) => {
      const { changeFieldValue, onChange } = this.props;

      if (onChange) {
        onChange(fieldName, value, errors);
      }

      changeFieldValue(fieldName, value);
    };
  }

  renderFields(): React.ReactNode {
    const { fields } = this.props;
    if (fields && fields.schema && fields.schema.properties) {
      const requriedFields: string[] = fields.schema.required;
      const properties: {[key: string]: Namespace.Field} = fields.schema.properties;
      return (
        <div>
          {
            Object
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
                  <div className={s[this.b('field')]} key={props.order}>
                    <Component
                      {...props}
                      required={isRequired}
                      errors={fieldErrors}
                      name={fieldName}
                      onChange={this.onFieldChange(fieldName)}
                    />
                  </div>
                );
              })
          }
        </div>
      );
    }
    return [];
  }

  render() {
    const b = this.b;

    return (
      <div className={s[b()]}>
        <FormGroup>
          <h4>Dynamic Fields</h4>
          {this.renderFields()}
        </FormGroup>
      </div>
    );
  }
}

export { Props, DynamicFields, FieldValue };
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DynamicFields);
