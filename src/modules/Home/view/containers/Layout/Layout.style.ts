import injectSheet, { Theme, WithStyles } from 'react-jss';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  description: rule({
    marginBottom: theme.spacing.unit * 4,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
