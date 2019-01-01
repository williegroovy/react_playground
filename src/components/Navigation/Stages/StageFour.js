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
  console.log('onBeforeTransition');
};

const onAfterTransition = () => {
  console.log('onAfterTransition');
};

export default withCustomTransition({ customNavProperties })(StageFour);