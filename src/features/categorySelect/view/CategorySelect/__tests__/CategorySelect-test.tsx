import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { CategorySelect } from '../CategorySelect';
import SelectInput from 'shared/view/elements/SelectInput/SelectInput';
import { FormGroup } from 'react-bootstrap';
import { categorySelectFixtures } from './fixtures';

describe('CategorySelect tests', () => {
  let component: ReactWrapper;

  before(() => {
    const onCategoryChosenSpy = spy();
    const loadCategoriesSpy = spy();
    const chooseCategorySpy = spy();
    component = mount(
      <CategorySelect
        chooseCategory={chooseCategorySpy}
        loadCategories={loadCategoriesSpy}
        onCategoryChosen={onCategoryChosenSpy}
        {...categorySelectFixtures}
      />,
    );
  });

  it('should render CategorySelect', () => {
    expect(component.find(FormGroup)).to.have.length(1);
  });

  it('should call load categories action', () => {
    expect(component.prop<sinon.SinonSpy>('loadCategories').calledOnce).to.equal(true);
  });

  it('should simulate change of SelectInput', () => {
    const selectInput = component.find(SelectInput);
    const onChange = selectInput.prop('onChange');
    if (onChange) {
      onChange({ label: 'label', value: 13 });
    }
    expect(component.prop<sinon.SinonSpy>('onCategoryChosen').called).to.equal(true);
    expect(component.prop<sinon.SinonSpy>('chooseCategory').called).to.equal(true);
  });

});
