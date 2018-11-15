import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Card from '../Card';

describe('<Card />', () => {
  test('should be defined', () => {
    expect(Card).toBeDefined();
  });

  test('should render correctly' , () => {
    const wrapper = shallow(
      <Card face={10}>0</Card>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render face={5} correctly' , () => {
    const wrapper = shallow(<Card face={5} />);
    expect(wrapper.contains(5)).toBeTruthy();
  });

  test('should render children correctly' , () => {
    const wrapper = shallow(<Card>16</Card>);
    expect(wrapper.children().text()).toBe("16");
  });

  test('should render children and face correctly' , () => {
    const wrapper = shallow(<Card face={3}>16</Card>);
    console.log('children', wrapper.props().children);
    expect(wrapper.props().children).toEqual([ 3, '16']);
  });
});