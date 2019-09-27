import React from 'react';
import block from 'bem-cn';

import './RepositoryAttribute.scss';

interface IProps {
  title: string;
  value: string | number;
  type?: 'owner';
  onValueClick?(): void;
}

const b = block('repository-attribute');

function RepositoryAttribute(props: IProps) {
  const { title, value, onValueClick, type } = props;
  return (
    <div className={b()}>
      <span className={b('title')}>{title}:</span>
      <span className={b('value', { type })} onClick={onValueClick}>{value}</span>
    </div>
  );
}

export { IProps as IRepositoryAttributeProps };
export default RepositoryAttribute;
