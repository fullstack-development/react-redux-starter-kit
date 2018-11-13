import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { bind } from 'decko';

import { IAppReduxState } from 'shared/types/app';
import { isNumber } from 'shared/types/guards';
import { SelectInput, Option } from 'shared/view/elements';

import { actions, selectors } from '../../../redux';

interface IOwnProps {
  onCategoryChosen(categoryUid: number): void;
}

interface IStateProps {
  options: Option[];
  chosenCategoryUid: number | null;
}

interface IActionProps {
  loadCategories: typeof actions.loadCategories;
  chooseCategory: typeof actions.chooseCategory;
}

type Props = IOwnProps & IActionProps & IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  const categories = selectors.selectCategories(state);
  const options = categories.map<Option>(({ name, uid }) => ({ label: name, value: uid }));
  const chosenCategoryUid = selectors.selectChosenCategoryUid(state).value;

  return { options, chosenCategoryUid };
}

function mapDispatch(dispatch: Dispatch): IActionProps {
  return bindActionCreators({
    loadCategories: actions.loadCategories,
    chooseCategory: actions.chooseCategory,
  }, dispatch);
}

class CategorySelect extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.loadCategories();
  }

  public render() {
    const { chosenCategoryUid, options } = this.props;

    return (
      <SelectInput
        name="category"
        value={chosenCategoryUid || undefined}
        options={options}
        onChange={this.onSelect}
        label="Choose category:"
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  }

  @bind
  private onSelect(selected: Option | null) {
    if (selected && isNumber(selected.value)) {
      this.props.chooseCategory(selected.value);
      this.props.onCategoryChosen(selected.value);
    }
  }
}

export { Props, CategorySelect };
export default connect(mapState, mapDispatch)(CategorySelect);
