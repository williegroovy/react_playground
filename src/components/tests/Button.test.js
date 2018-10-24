import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Button from '../Button';

describe('<Button />', () => {
  test('should be defined', () => {
    expect(Button).toBeDefined();
  });

  test('should render correctly ' , () => {
    const wrapper = shallow(
      <Button>Hey, listen!!!</Button>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render button text' , () => {
    const wrapper = shallow(<Button>Click Me</Button>);
    expect(wrapper.children().text()).toBe('Click Me');
  });

  test('should be disabled when disabled prop is true' , () => {
    const wrapper = shallow(<Button disabled>Click Me</Button>);
    expect(wrapper.children().text()).toBe('Click Me');
  });

  test('should be animated if animated prop is true' , () => {
    const wrapper = shallow(<Button animated>Click Me</Button>);
    expect(wrapper.props().animated).toBeTruthy();
  });

  test('should be not be animated if disabled' , () => {
    const wrapper = shallow(<Button disabled animated>Click Me</Button>);
    expect(wrapper.props().animated).toBeFalsy();
  });

  test('should call onClick when button is clicked', () => {
    const clickHandler = jest.fn();
    const wrapper = shallow(<Button onClick={clickHandler}>Click Me</Button>);
    wrapper.simulate('click');
    expect(clickHandler.mock.calls.length).toBe(1);
  })
});