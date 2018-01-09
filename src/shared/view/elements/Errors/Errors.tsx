import * as React from 'react';
import block from 'bem-cn';
import './Errors.scss';

interface IProps {
  errors?: string[];
  hidden?: boolean;
}

const b = block('errors');

function Errors({ hidden, errors = [] }: IProps) {
  return (
    <div className={b({ hidden: Boolean(hidden) })()}>
      {
        errors.map((error: string, index: number) => (
          <span key={index} className={b('error')()}>{error}</span>
        ))
      }
    </div>
  );
}

export { IProps };
export default Errors;
