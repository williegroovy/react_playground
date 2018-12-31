import React from 'react';
import withCustomTransition from '../withCustomTransition';

const StageOne = () => (
  <div>
    Stage One in the house
  </div>
);

export default withCustomTransition(() => console.log('Custom Nav From S1'))(StageOne);