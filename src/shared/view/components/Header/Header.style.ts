import injectSheet, { Theme, WithStyles } from 'react-jss';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  link: rule({
    margin: theme.spacing.unit,
    '&:hover, &:active, &:visited': {
      color: 'inherit',
    },
  }),
  content: rule({
    margin: theme.spacing.unit,
    marginLeft: 'auto',
    paddingLeft: theme.spacing.unit,
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
