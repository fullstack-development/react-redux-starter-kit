import * as React from 'react';
import Select, { ReactSelectProps } from 'react-select';
import 'react-select/dist/react-select.min.css';
import './SelectInput.scss';

type Props = ReactSelectProps;

function SelectInput(props: Props) {
  return (
    <Select {...props} />
  );
}

export { Props };
export default SelectInput;
