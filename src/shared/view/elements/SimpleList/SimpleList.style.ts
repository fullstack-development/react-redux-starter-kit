import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';
import { IProps } from './SimpleList';

const getMargin = (theme: Theme, props: IProps) => theme.spacing.unit * (props.marginFactor || 1);

const getDirection = (props: IProps) => props.direction || 'column';

const marginTypeByDirection: Record<NonNullable<IProps['direction']>, string> = {
  column: 'marginBottom',
  row: 'marginRight',
};

const styles = (theme: Theme) => ({
  root: rule({
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: getDirection,
    justifyContent: 'flex-start',
    alignItems: (props: IProps) => props.alignItems || 'flex-start',
  }),
  withoutGutterRoot: (props: IProps) => {
    return {
      [marginTypeByDirection[getDirection(props)]]: -getMargin(theme, props),
    };
  },
  item: (props: IProps) => {
    return {
      listStyle: 'none',
      [marginTypeByDirection[getDirection(props)]]: getMargin(theme, props),
    };
  },
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
