import * as React from 'react';
import * as Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import './SelectInput.styl';

interface IProps extends Select.ReactSelectProps {}

function SelectInput (props: IProps) {
  return (
    <Select {...props} />
  );
}

export { IProps };
export default SelectInput;
