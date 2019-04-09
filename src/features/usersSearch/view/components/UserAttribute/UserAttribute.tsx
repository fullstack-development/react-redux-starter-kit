import React from 'react';
import block from 'bem-cn';

import './UserAttribute.scss';

interface IProps {
  URL: string;
  title: string;
  value: number;
}

const b = block('user-attribute');

function UserAttribute(props: IProps) {
  const { title, value, URL } = props;
  return (
    <a href={URL} target="_blank" className={b()} rel="noopener noreferrer">
      {title}
      <span className={b('value')}>{value}</span>
    </a>
  );
}

export { IProps as IUserAttributeProps };
export default UserAttribute;
