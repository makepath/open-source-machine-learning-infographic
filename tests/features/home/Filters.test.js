import React from 'react';
import { shallow } from 'enzyme';
import { Filters } from '../../../src/features/home/Filters';

describe('home/Filters', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<Filters {...props} />);

    expect(renderedComponent.find('.home-filters').length).toBe(1);
  });
});
//TODO: add tests to see if we are received the correct amount of tools
//Popup renders and closes
