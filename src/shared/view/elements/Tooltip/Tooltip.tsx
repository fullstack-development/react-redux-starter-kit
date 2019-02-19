import React from 'react';
import MuiTooltip, { TooltipProps } from '@material-ui/core/Tooltip';

import { StylesProps, provideStyles } from './Tooltip.styles';
import { Omit } from '_helpers';

type IProps = Omit<TooltipProps, 'classes' | 'PopperProps'> & StylesProps;

interface IState {
  arrowRef: HTMLSpanElement | null;
}

class Tooltip extends React.Component<IProps> {
  public state: IState = {
    arrowRef: null,
  };

  public render() {
    const { classes, title, ...restProps } = this.props;

    return (
      <MuiTooltip
        title={<>
          <span className={classes.title}>{title}</span>
          <span className={classes.arrow} ref={this.handleArrowRef} />
        </>}
        classes={{ popper: classes.arrowPopper }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
        {...restProps}
      />
    );
  }

  private handleArrowRef = (node: HTMLSpanElement | null) => {
    this.setState({
      arrowRef: node,
    });
  }
}

export default provideStyles(Tooltip);
