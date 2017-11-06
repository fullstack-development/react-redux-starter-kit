import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Select from 'react-select';
import { bind } from 'decko';
import * as block from 'bem-cn';

import { ControlLabel, FormGroup } from 'react-bootstrap';
import SelectInput from 'shared/view/elements/SelectInput/SelectInput';

import { actions, selectors } from '../../../redux';

import { IAppReduxState } from 'shared/types/app';

import './styles.scss';

interface IOwnProps {
  onCategoryChosen(category: number): void;
}

interface IStateProps {
  options: Select.Option[];
  value: number | null;
}

interface IActionProps {
  loadCategories: typeof actions.loadCategories;
  chooseCategory: typeof actions.chooseCategory;
}

type Props = IOwnProps & IActionProps & IStateProps;

function mapState(state: IAppReduxState): IStateProps {
  const categories = selectors.selectCategories(state);
  const chosen = selectors.selectChosenCategory(state);

  return {
    options: categories.map<Select.Option>(category => ({
      label: category.name,
      value: category.uid,
    })),
    value: chosen.value,
  };
}

function mapDispatch(dispatch: Dispatch<any>): IActionProps {
  return bindActionCreators({
    loadCategories: actions.loadCategories,
    chooseCategory: actions.chooseCategory,
  }, dispatch);
}

const b = block('categories-select');

class CategorySelect extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    this.props.loadCategories();
  }

  public render() {
    const { value, options } = this.props;

    return (
      <FormGroup>
        <ControlLabel className={b('select-label')()}>
          <b>Choose category:</b>
        </ControlLabel>
        <SelectInput
          name="category"
          value={value ? value : undefined}
          options={options}
          onChange={this.onSelect}
        />
      </FormGroup>
    );
  }

  @bind
  private onSelect(selected: Select.Option[] | Select.Option | null) {
    if (selected && !Array.isArray(selected) && typeof selected.value === 'number') {
      // Type Guards allow you to narrow down the type of an object within a conditional block.
      // TypeScript is aware of the usage of the JavaScript instanceof and typeof operators
      // Read "Type Guards and Differentiating Types" of Typescript's docs
      this.props.chooseCategory(selected.value);
      this.props.onCategoryChosen(selected.value);
    }
  }
}

export { Props, CategorySelect };
export default connect<IStateProps, IActionProps, IOwnProps>(mapState, mapDispatch)(CategorySelect);
