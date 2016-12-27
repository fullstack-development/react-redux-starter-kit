import * as React from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';
import FormEventHandler = React.FormEventHandler;
import Component = React.Component;
import FormEvent = React.FormEvent;

interface Props {
  type: string;
  placeholder?: string;
  name?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  hidden?: boolean;
  onChange?: FormEventHandler<Component<FormControlProps, {}>>;
}

type EventType = FormEvent<Component<ControlProps, {}>>;
type ControlProps = FormControlProps;

function TextInput (props: Props) {
  return (
    <FormControl
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      minLength={props.minLength}
      maxLength={props.maxLength}
      step={props.step}
      pattern={props.pattern}
      onChange={props.onChange}
    />
  );
}

export { Props, ControlProps, EventType };
export default TextInput;
