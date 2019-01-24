import * as React from 'react';

import { Button } from 'shared/view/elements';

import { provideStyles, StylesProps } from './BuyCakeProposal.style';

interface IOwnProps {
  onBuyCakeButtonClick(): void;
}

type IProps = IOwnProps & StylesProps;

class BuyCakeProposal extends React.PureComponent<IProps> { // TODO: Layout?
  public render() {
    const { onBuyCakeButtonClick, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <img src="https://media.giphy.com/media/IKqrlWZZGJ0FW/giphy.gif" />
          <Button onClick={onBuyCakeButtonClick} variant="outlined">
            Buy a cake
          </Button>
          <Button variant="outlined">
            No, thanks
          </Button>
        </div>
      </div>
    );
  }
}

export default provideStyles(BuyCakeProposal);
