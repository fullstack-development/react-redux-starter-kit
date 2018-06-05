import injectSheet, { WithStyles } from 'react-jss';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = {
  inputRoot: rule({
    color: 'inherit',
  }),
};

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
