import React from 'react';
import classNames from 'classnames';
import { StylesProps, provideStyles } from './SimpleList.style';

interface IProps {
  marginFactor?: number;
  gutter?: boolean;
  children: React.ReactNode;
  direction?: 'column' | 'row';
  alignItems?: 'stretch' | 'flex-start';
}

class SimpleList extends React.PureComponent<IProps & StylesProps> {
  public render() {
    const { classes, children, gutter } = this.props;
    const rootClasses = classNames(classes.root, {
      [classes.withoutGutterRoot]: !gutter,
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
