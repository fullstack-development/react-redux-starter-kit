import * as React from 'react';
import * as block from 'bem-cn';
import * as s from './InputGroup.styl';

interface IProps {
  label?: string;
  children?: React.ReactNode;
}

function InputGroup({ label, children }: IProps) {
  const b = block('input-group');
  return (
    <div className={s[b()]}>
      <label className={s[b('label-wrapper')()]}>
        <span className={s[b('label')()]}>{label}</span>
        <div className={s[b('input-wrapper')()]}>
          {children}
        </div>
      </label>
    </div>
  );
}

export { IProps };
export default InputGroup;
