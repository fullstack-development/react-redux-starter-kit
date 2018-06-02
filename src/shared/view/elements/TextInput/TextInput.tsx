import * as React from 'react';
import { FormControl, FormControlProps } from 'react-bootstrap';

interface IProps {
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
  onChange?: React.FormEventHandler<React.Component<FormControlProps, {}>>;
}

type EventType = React.FormEvent<React.Component<ControlProps, {}>>;
type ControlProps = FormControlProps;

function TextInput(props: IProps) {
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

export { IProps, ControlProps, EventType };
export default TextInput;
