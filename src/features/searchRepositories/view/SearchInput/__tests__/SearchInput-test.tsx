import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Form } from 'react-bootstrap';
import { SearchRepositoriesInput } from '../index';

describe('Search Input', () => {

  it('should render Search Input', () => {
    const component = mount(<SearchRepositoriesInput />);
    expect(component.find(Form)).to.have.length(1);
  });

});
