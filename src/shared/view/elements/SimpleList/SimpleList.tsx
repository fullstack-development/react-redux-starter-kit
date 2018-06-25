import * as React from 'react';
import * as classNames from 'classnames';
import { StylesProps, provideStyles } from './SimpleList.style';

interface IProps {
  marginFactor?: number;
  gutterBottom?: boolean;
  children: React.ReactNode;
}

class SimpleList extends React.PureComponent<IProps & StylesProps> {
  public render() {
    const { classes, children, gutterBottom } = this.props;
    const rootClasses = classNames(classes.root, {
      [classes.gutterBottom]: gutterBottom,
    });

    return (
      <ul className={rootClasses}>
        {React.Children.toArray(children).map((child, index) => (
          <li className={classes.item} key={index}>{child}</li>
        ))}
      </ul>
    );
  }
}

export { IProps };
export default provideStyles(SimpleList);
