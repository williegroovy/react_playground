import React from 'react';
import withCustomTransition from '../withCustomTransition';

const StageFour = () => (
  <div>
    Finished
  </div>
);

const customNavProperties = {
  hideForwardButton: true,
  backButtonText: 'Get Back'
};

const onBeforeTransition = () => {
  console.log('StageFour testing onBeforeTransition');
};

const onAfterTransition = () => {
  console.log('StageFour testing onAfterTransition');
};

export default withCustomTransition({ customNavProperties, onBeforeTransition, onAfterTransition })(StageFour);