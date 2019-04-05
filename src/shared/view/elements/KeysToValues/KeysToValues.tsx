import React from 'react';
import block from 'bem-cn';
import './KeysToValues.scss';

const b = block('keys-to-values');

interface IProps {
  items: Record<string, string | number>;
}

function KeysToValues(props: IProps) {
  const { items } = props;
  return (
    <ul className={b()}>
      {Object.keys(items).map(item => (
        <li className={b('item')} key={item}>
          <span className={b('key')}>
            {item.concat(': ')}
          </span>
          <span className={b('value')}>
            {items[item]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export { IProps as IKeysToValuesProps };
export default KeysToValues;
