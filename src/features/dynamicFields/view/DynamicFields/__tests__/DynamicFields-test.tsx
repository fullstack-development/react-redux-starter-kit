import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { resetSpies } from 'shared/helpers/testsHelpers';
import { DynamicFields, Props, IState } from '../DynamicFields';
import { defaultProps, actionsProps, fieldsMocks } from './fixtures';

describe('Dynamic Fields Tests', () => {

  afterEach(() => {
    resetSpies(actionsProps);
  });

  it('should render Dynamic Fields components', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps}/>);
    expect(component.find('.dynamic-fields')).to.have.length(1);
  });

  it('should call change category if has category', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps} category={1} />);
    expect(component.prop<sinon.SinonSpy>('loadFields').calledWith(1)).to.equal(true);
  });

  it('should not call change category if not category', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps} />);
    expect(component.prop<sinon.SinonSpy>('loadFields').called).to.equal(false);
  });

  it('should change category if category was changed', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps} />);
    component.setProps({ category: 15 });
    expect(component.prop<sinon.SinonSpy>('loadFields').calledWith(15)).to.equal(true);
  });

  it('should return 0 fields if not fields', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps} />);
    expect(component.find('.dynamic-fields__field')).to.have.length(0);
  });

  it('should return fields if has fields', () => {
    const component = mount<Props, IState>(<DynamicFields {...defaultProps} {...actionsProps} fields={fieldsMocks} />);
    expect(component.find('.dynamic-fields__field')).to.not.length(0);
  });

});
