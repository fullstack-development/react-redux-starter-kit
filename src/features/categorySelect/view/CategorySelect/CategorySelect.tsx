import * as React from 'react';
import * as block from 'bem-cn';
import * as Select from 'react-select';
import { ControlLabel, FormGroup } from 'react-bootstrap';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../redux';
import { bind } from 'decko';
import SelectInput from 'shared/view/elements/SelectInput/SelectInput';
import { IReduxState } from '../../namespace';
import './styles.scss';

interface IOwnProps {
  onCategoryChosen(category: number): void;
}

interface IStateProps {
  options: Select.Option[];
  value: number | null;
}

interface IDispatchProps {
  loadCategories: typeof actions.loadCategories;
  chooseCategory: typeof actions.chooseCategory;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

function mapStateToProps(state: any): IStateProps {
  const categoriesState: IReduxState = state.categorySelect;
  const categories = selectors.selectCategories(categoriesState);
  const chosen = selectors.selectChosenCategory(categoriesState);

  return {
    options: categories.map<Select.Option>(category => ({
      label: category.name,
      value: category.uid,
    })),
    value: chosen,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>): IDispatchProps {
  return bindActionCreators({
    loadCategories: actions.loadCategories,
    chooseCategory: actions.chooseCategory,
  }, dispatch);
}

class CategorySelect extends React.PureComponent<IProps, {}> {
  public componentDidMount() {
    this.props.loadCategories();
  }

  public render() {
    const { value, options } = this.props;
    const b = block('categories-select');

    return (
      <FormGroup>
        <ControlLabel className={b('select-label')()}>
          <b>Choose category:</b>
        </ControlLabel>
        <SelectInput
          name="category"
          value={value ? value : void 0}
          options={options}
          onChange={this.onSelect}
        />
      </FormGroup>
    );
  }

  @bind
  private onSelect(selected: Select.Option | Select.Option[] | null) {
    if (!Array.isArray(selected) && selected && typeof selected.value === 'number') {
      // Type Guards allow you to narrow down the type of an object within a conditional block.
      // TypeScript is aware of the usage of the JavaScript instanceof and typeof operators
      // Read "Type Guards and Differentiating Types" of Typescript's docs
      this.props.chooseCategory(selected.value);
      this.props.onCategoryChosen(selected.value);
    }
  }
}

export { IProps, CategorySelect };
export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(CategorySelect);
