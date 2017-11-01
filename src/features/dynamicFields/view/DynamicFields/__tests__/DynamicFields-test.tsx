import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { DynamicFields } from '../DynamicFields';
import { communicationsFixtures } from './fixtures';

describe('Dynamic Fields Tests', () => {
  let component: ReactWrapper;

  before(() => {
    const loadFieldsSpy = spy();
    const changeFieldValueSpy = spy();
    component = mount(
      <DynamicFields
        fields={{}}
        communications={communicationsFixtures}
        loadFields={loadFieldsSpy}
        changeFieldValue={changeFieldValueSpy}
      />,
    );
  });

  it('should render Dynamic Fields components', () => {
    expect(component.find('.dynamic-fields')).to.have.length(1);
  });

});
