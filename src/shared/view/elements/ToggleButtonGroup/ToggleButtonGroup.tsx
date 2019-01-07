import * as React from 'react';
import { Omit } from '_helpers';
import MuiToggleButtonGroup, { ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup';

import { StylesProps, provideStyles } from './ToggleButtonGroup.style';

type IProps = Omit<ToggleButtonGroupProps, 'classes'> & StylesProps & {
  nullable?: false;
};

class ToggleButtonGroup extends React.Component<IProps> {
  public render() {
    return (
      <MuiToggleButtonGroup {...normalizeProps(this.props)} onChange={this.onChange} />
    );
  }

  private onChange: ToggleButtonGroupProps['onChange'] = (event, value) => {
    const { onChange, nullable = true } = this.props;

    (value || nullable) && onChange && onChange(event, value);
  }
}

function normalizeProps(props: IProps): ToggleButtonGroupProps {
  const { theme, nullable, ...rest } = props;

  return rest;
}

export default provideStyles(ToggleButtonGroup);
