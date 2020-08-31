import React from 'react';
import block from 'bem-cn';

import './RepositoryAttribute.scss';

interface IProps {
  title: string;
  value: string | number;
  type?: 'owner';
  icon?: React.ReactChild;
  onValueClick?(): void;
}

const b = block('repository-attribute');

function RepositoryAttribute(props: IProps) {
  const { title, value, onValueClick, type, icon } = props;
  const handleValueKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' && onValueClick) {
      onValueClick();
    }
  };

  return (
    <div className={b()}
         tabIndex={0}
         role="button"
         onClick={onValueClick}
         onKeyPress={handleValueKeyPress}
    >
      <span className={b('title')}>
        {title}
      </span>
      {
        icon &&
        <span className={b('icon')}>
          {icon}
        </span>
      }
      <span
        className={b('value', { type })}
      >
        {value}
      </span>
    </div>
  );
}

export { RepositoryAttribute, IProps as IRepositoryAttributeProps };
