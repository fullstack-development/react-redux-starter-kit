import * as React from 'react';
import * as s from './Errors.styl';
import * as block from 'bem-cn'; // default

interface Props {
  errors?: Array<string>;
  hidden?: boolean;
}

const b = block('errors');
s[b({ hidden: true })] = `${s[b()]} ${s['errors_hidden']}`;

function Errors ({ hidden, errors = [] }: Props) {
  return (
    <div className={s[b({ hidden })]}>
      {
        errors.map((error: string, index: number) => (
          <span key={index} className={s[b('error')()]}>{error}</span>
        ))
      }
    </div>
  );
}

export { Props };
export default Errors;
