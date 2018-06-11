import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bind } from 'decko';
import * as block from 'bem-cn';
import { ControlLabel, FormGroup } from 'react-bootstrap';

import { IAppReduxState } from 'shared/types/app';
import { SelectInput, Option } from 'shared/view/elements';

import { actions, selectors } from '../../../redux';
import './CategorySelect.scss';
import { isNumber } from 'shared/types/guards';

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

const b = block('categories-select');

class CategorySelect extends React.PureComponent<Props> {
  public componentDidMount() {
    this.props.loadCategories();
  }

  public render() {
    const { chosenCategoryUid, options } = this.props;

    return (
      <FormGroup>
        <ControlLabel className={b('select-label')()}>
          <b>Choose category:</b>
        </ControlLabel>
        <SelectInput
          name="category"
          value={chosenCategoryUid || undefined}
          options={options}
          onChange={this.onSelect}
        />
      </FormGroup>
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
