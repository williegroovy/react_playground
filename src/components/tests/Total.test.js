import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Total from '../Total'

describe('<Total />', () => {
  test('should be defined', () => {
    expect(Total).toBeDefined();
  });

  test('should render correctly' , () => {
    const wrapper = shallow(
      <Total amount={100} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render $1.00 when 1 is passed as amount prop' , () => {
    const wrapper = shallow(<Total amount={1} />);
    expect(wrapper.props().children).toEqual(expect.arrayContaining(['Total: $', '1.00']));
  });

  test('should render $10,000.00 when 10000 is passed as amount prop' , () => {
    const wrapper = shallow(<Total amount={10000} />);
    expect(wrapper.props().children).toEqual(expect.arrayContaining(['Total: $', '10,000.00']));
  });

  test('should render $10,000,000.00 when 10000000 is passed as amount prop' , () => {
    const wrapper = shallow(<Total amount={10000000} />);
    expect(wrapper.props().children).toEqual(expect.arrayContaining(['Total: $', '10,000,000.00']));
  });
});