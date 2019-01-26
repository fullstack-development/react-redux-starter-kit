import * as React from 'react';

import { ICakePreview } from 'shared/types/models';

import { provideStyles, StylesProps } from './CakePreview.style';

interface IOwnProps {
  cakePreview: ICakePreview;
}

type IProps = IOwnProps & StylesProps;

class CakePreview extends React.PureComponent<IProps> {
  public render() {
    const { cakePreview: { name, imageURL, description }, classes } = this.props;
    return (
      <div className={classes.root}>
        <img className={classes.image} src={imageURL} alt="Cake image"/>
        <div className={classes.name}>{name}</div>
        <div className={classes.description}>{description}</div>
      </div>
    );
  }
}

export default provideStyles(CakePreview);
