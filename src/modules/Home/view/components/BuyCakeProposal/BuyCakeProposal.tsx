import * as React from 'react';
import { bind } from 'decko';
import { RouteComponentProps } from 'react-router';

import { Button } from 'shared/view/elements';
import routes from '../../../../routes';

import { provideStyles, StylesProps } from './BuyCakeProposal.style';

type IProps = StylesProps & RouteComponentProps;

class BuyCakeProposal extends React.PureComponent<IProps> { // TODO: Layout?
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <img src="https://media.giphy.com/media/IKqrlWZZGJ0FW/giphy.gif" />
          <Button onClick={this.handleBuyCakeButtonClick} variant="outlined">
            Buy a cake
          </Button>
          <Button variant="outlined">
            No, thanks
          </Button>
        </div>
      </div>
    );
  }

  @bind
  private handleBuyCakeButtonClick() {
    this.props.history.push(routes.store.getRoutePath());
  }
}

export default provideStyles(BuyCakeProposal);
