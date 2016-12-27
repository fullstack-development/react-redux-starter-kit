import * as React from 'react';
import * as block from 'bem-cn'; // default
import * as s from './InputGroup.styl';

interface Props {
  label?: string;
  children?: React.ReactNode;
}

function InputGroup ({ label, children }: Props) {
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

export { Props };
export default InputGroup;
