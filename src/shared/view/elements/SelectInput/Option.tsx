import * as React from 'react';
import { bind } from 'decko';
import { OptionComponentProps } from 'react-select';

import MenuItem from '@material-ui/core/MenuItem';

class Option extends React.Component<OptionComponentProps> {
  public render() {
    const { children, isFocused, isSelected } = this.props;

    return (
      <MenuItem
        onFocus={this.handleFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }

  @bind
  private handleClick(event: React.MouseEvent<HTMLElement>) {
    this.props.onSelect && this.props.onSelect(this.props.option, event);
  }

  @bind
  private handleFocus(event: React.FocusEvent<HTMLElement>) {
    this.props.onFocus && this.props.onFocus(this.props.option, event);
  }
}

export default Option;
