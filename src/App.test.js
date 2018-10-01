import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';


it('renders without crashing', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(<Router />));
});
