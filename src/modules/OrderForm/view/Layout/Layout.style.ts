import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';

const styles = (theme: Theme) => ({
  gridListTile_root: rule({
    height: 'auto',
  }),
  gridListTile_tile: rule({
    overflow: 'unset',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
