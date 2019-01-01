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
  console.log('StageOne testing onBeforeTransition');
};

const onAfterTransition = () => {
  console.log('StageOne testing onAfterTransition');
};

export default withCustomTransition({ customNavProperties, onBeforeTransition, onAfterTransition })(StageOne);