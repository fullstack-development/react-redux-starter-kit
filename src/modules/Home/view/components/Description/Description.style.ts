import injectSheet, { Theme, WithStyles } from 'react-jss';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  dividerRoot: rule({
    marginBottom: '0.35em',
    ...theme.typography.display3,
  }),
  label: rule({
    padding: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    borderRadius: theme.spacing.unit / 2,
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    color: theme.palette.getContrastText(theme.palette.primary.light),
    backgroundColor: theme.palette.primary.light,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
