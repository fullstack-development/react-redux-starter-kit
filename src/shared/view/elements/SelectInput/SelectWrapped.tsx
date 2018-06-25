import * as React from 'react';
import { bind } from 'decko';
import { Omit } from '_helpers';
import Select, { ReactSelectProps, ArrowRendererProps } from 'react-select';

import Chip from '@material-ui/core/Chip';
import ClearIcon from '@material-ui/icons/Clear';
import CancelIcon from '@material-ui/icons/Cancel';
import { InputProps } from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Option from './Option';
import { StylesProps } from './Select.style';

type SelectWrappedProps =
  & Omit<InputProps, 'classes'> & StylesProps
  & {
    selectProps: Omit<
    ReactSelectProps, 'optionComponent' | 'noResultsText' | 'arrowRenderer' | 'clearRenderer' | 'valueComponent'
    >;
  };

class SelectWrapped extends React.Component<SelectWrappedProps> {
  public render() {
    const { classes, selectProps, ...other } = this.props;

    return (
      <Select
        optionComponent={Option}
        noResultsText={<Typography>{'No results found'}</Typography>}
        arrowRenderer={this.arrowRenderer}
        clearRenderer={this.clearRenderer}
        valueComponent={this.valueComponent}
        {...other}
        {...selectProps}
      />
    );
  }

  @bind
  private valueComponent(valueProps: any) {
    const { value, children, onRemove } = valueProps;

    const onDelete: React.EventHandler<any> = event => {
      event.preventDefault();
      event.stopPropagation();
      onRemove(value);
    };

    if (onRemove) {
      return (
        <Chip
          tabIndex={-1}
          label={children}
          className={this.props.classes.chip}
          deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
          onDelete={onDelete}
        />
      );
    }

    return <div className="Select-value">{children}</div>;
  }

  private clearRenderer() {
    return <ClearIcon />;
  }

  private arrowRenderer(arrowProps: ArrowRendererProps) {
    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  }
}

export { SelectWrappedProps };
export default SelectWrapped;
