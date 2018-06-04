import * as React from 'react';
import { StylesProps, provideStyles } from './SimpleList.style';

interface IProps {
  marginFactor?: number;
  children: React.ReactNode;
}

class SimpleList extends React.PureComponent<IProps & StylesProps> {
  public render() {
    const { classes, children } = this.props;
    return (
      <ul className={classes.root}>
        {React.Children.map(children, (child, index) => (
          <li className={classes.item} key={index}>{child}</li>
        ))}
      </ul>
    );
  }
}

export { IProps };
export default provideStyles(SimpleList);
