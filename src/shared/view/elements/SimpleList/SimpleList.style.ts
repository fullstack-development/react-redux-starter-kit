import { WithStyles, Theme } from '@material-ui/core/styles';
import { GetClassKey } from 'shared/types/app';
import { rule } from 'shared/helpers/style';
import { IProps } from './SimpleList';

import injectSheet from 'react-jss/lib/injectSheet';

const styles = (theme: Theme) => ({
  root: rule({
    margin: 0,
    padding: 0,
  }),
  item: rule({
    listStyle: 'none',
    marginBottom: (props: IProps) => theme.spacing.unit * (props.marginFactor || 1),

    '&:empty': {
      marginBottom: 0,
    },
  }),
});

export const provideStyles = injectSheet(styles);

export type StylesProps = WithStyles<GetClassKey<typeof styles>>;
