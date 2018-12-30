import * as React from 'react';

import { SimpleList, Typography, ToggleButton, Tooltip } from 'shared/view/elements';
import { ToggleButtonGroupField } from 'shared/view/redux-form';
import { Question } from 'shared/view/elements/Icons';

import { StylesProps, provideStyles } from './ToggleButtons.style';
import { reduxForm, InjectedFormProps } from 'redux-form';
import uuid = require('uuid');

interface IFormData {
  selectedGroup: string;
}

function ToggleButtons(props: StylesProps & InjectedFormProps<IFormData>) {
  const { classes } = props;
  return (
    <SimpleList marginFactor={2} gutter>
      <Typography variant="h4">Toggle button group</Typography>
      <ToggleButtonGroupField name="selectedGroup" exclusive nullable={false}>
        <ToggleButton value="beneficiary">
          Beneficiary
          <Tooltip placement="top" title="qweqwe">
            <Question className={classes.rightIcon} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="fund owner">
          Fund owner
          <Tooltip placement="top" title="qweqwe">
            <Question className={classes.rightIcon} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="board member">
          Board member
          <Tooltip placement="top" title="qweqwe">
            <Question className={classes.rightIcon} />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="asset manager">
          Asset manager
          <Tooltip placement="top" title="qweqwe">
            <Question className={classes.rightIcon} />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroupField>
    </SimpleList>
  );
}

export default (
  reduxForm<IFormData>({ form: uuid(), initialValues: { selectedGroup: 'beneficiary' } })(
    provideStyles(ToggleButtons),
  )
);
