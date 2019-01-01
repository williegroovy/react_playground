import React from 'react';
import withCustomTransition from '../withCustomTransition';

const StageOne = () => (
  <div>
    Stage One in the house
  </div>
);

const customNavProperties = {
  useSecondaryButton: true
};

const onBeforeTransition = () => {
  console.log('onBeforeTransition');
};

const onAfterTransition = () => {
  console.log('onAfterTransition');
};

export default withCustomTransition({ customNavProperties, onBeforeTransition, onAfterTransition })(StageOne);