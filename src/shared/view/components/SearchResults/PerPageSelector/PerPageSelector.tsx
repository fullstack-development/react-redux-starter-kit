import React from "react";
import block from 'bem-cn';
import {autobind} from 'core-decorators';
import BaseRadio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import './PerPageSelector.scss';
import {withStyles} from "@material-ui/core";

interface IOwnProps {
  onChange(perPage: number): void;
}

type IProps = IOwnProps;

const b = block('per-page-selector');


interface IState {
  value?: string;
}

const Radio = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
      width: '1.2rem',
      height: '1.2rem',
    }
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
})(BaseRadio)


class PerPageSelectorComponent extends React.PureComponent<IProps> {
  state:IState = {
    value: "30"
  }

  public render() {
    const {value} = this.state;

    return (
      <label className={b()}>
        <div className={b('label')}>Результатов на странице</div>
        <span className={b('radio-buttons')}>
            <RadioGroup name="perPage1" row value={value} onChange={this.handleChange}>
              <FormControlLabel value="30"
                                label="30"
                                control={<Radio size="small" color='primary'/>}
                                className={b('button-label').toString()}
              />
              <FormControlLabel value="50"
                                label="50"
                                control={<Radio size="small" color='primary'/>}
                                className={b('button-label').toString()}
              />
              <FormControlLabel value="100"
                                label="100"
                                control={<Radio size="small" color='primary'/>}
                                className={b('button-label').toString()}
              />
            </RadioGroup>
        </span>
      </label>
    )
  }

  @autobind
  private handleChange(event: any) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value)
  }
}

export {
  PerPageSelectorComponent as PerPageSelector,
  IProps as IPerPageSelectorComponentProps
}
