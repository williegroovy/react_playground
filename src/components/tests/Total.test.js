import React from 'react';
import { shallow } from 'enzyme';

import Total from '../Total'

describe('<Total />', () => {
  test('Renders $1.00 when 1 is passed as amount' , () => {
    const wrapper = shallow(<Total amount={1} />);
    expect(wrapper.text()).toBe('$1.00');
  });

  test('Renders $10,000.00 when 10000 is passed as amount' , () => {
    const wrapper = shallow(<Total amount={10000} />);
    expect(wrapper.text()).toBe('$10,000.00');
  });

  test('Renders $10,000,000.00 when 10000000 is passed as amount' , () => {
    const wrapper = shallow(<Total amount={10000000} />);
    expect(wrapper.text()).toBe('$10,000,000.00');
  });

  test('Renders $NaN when no amount is passed' , () => {
    const wrapper = shallow(<Total />);
    expect(wrapper.text()).toBe('$NaN');
  });
});