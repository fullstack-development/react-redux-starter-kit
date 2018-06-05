import injectSheet, { Theme, WithStyles } from 'react-jss';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  title: rule({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.35em',
    ...theme.typography.display2,
  }),
  githubIcon: rule({
    marginRight: theme.spacing.unit,
    height: theme.spacing.unit * 8,
  }),
  dividerRoot: {
    marginBottom: '0.35em',
    ...theme.typography.display2,
  },
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
