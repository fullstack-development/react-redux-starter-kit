import React from 'react';
import MuiTooltip, { TooltipProps } from '@material-ui/core/Tooltip';
// eslint-disable-next-line import/no-unresolved
import { Omit } from '_helpers';

import { StylesProps, provideStyles } from './Tooltip.styles';

type IProps = Omit<TooltipProps, 'classes' | 'PopperProps'> & StylesProps;

interface IState {
  arrowRef: HTMLSpanElement | null;
}

class TooltipComponent extends React.Component<IProps> {
  public state: IState = {
    arrowRef: null,
  };

  public render() {
    const { classes, title, ...restProps } = this.props;
    const { arrowRef } = this.state;

    return (
      <MuiTooltip
        title={(
          <>
            <span className={classes.title}>{title}</span>
            <span className={classes.arrow} ref={this.handleArrowRef} />
          </>
        )}
        classes={{ popper: classes.arrowPopper }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(arrowRef),
                element: arrowRef,
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
  };
}

export const Tooltip = provideStyles(TooltipComponent);
