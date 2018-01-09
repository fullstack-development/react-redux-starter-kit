import * as React from 'react';
import block from 'bem-cn';
import './InputGroup.scss';

interface IProps {
  label?: string;
  children?: React.ReactNode;
}

function InputGroup({ label, children }: IProps) {
  const b = block('input-group');
  return (
    <div className={b()}>
      <label className={b('label-wrapper')()}>
        <span className={b('label')()}>{label}</span>
        <div className={b('input-wrapper')()}>
          {children}
        </div>
      </label>
    </div>
  );
}

export { IProps };
export default InputGroup;
