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
  const onValueKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && onValueClick) {
      onValueClick();
    }
  };

  return (
    <div className={b()}>
      <span className={b('title')}>
        {title}
      </span>
      <span
        tabIndex={0}
        role="button"
        className={b('value', { type })}
        onClick={onValueClick}
        onKeyPress={onValueKeyPress}
      >
        {value}
      </span>
    </div>
  );
}

export { RepositoryAttribute, IProps as IRepositoryAttributeProps };
