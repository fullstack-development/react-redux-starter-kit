import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';
import { bind } from 'decko';

import { ToggleButtonGroup } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';

type IProps = GetProps<typeof ToggleButtonGroup> & FieldRenderProps;

class ToggleButtonGroupField extends React.Component<IProps> {
  public render() {
    const { input, meta, ...rest } = this.props;
    return (
      <ToggleButtonGroup {...rest} value={input.value} onChange={this.onChange} onBlur={this.onBlur} />
    );
  }

  @bind
  private onChange(_e: React.MouseEvent<HTMLElement>, value: string) {
    this.props.input.onChange(value);
  }

  @bind
  private onBlur() {
    this.props.input.onBlur(this.props.input.value);
  }
}

export default getFieldWithComponent(ToggleButtonGroupField);
