import React from 'react';
import Navigation from '../components/Stepper/Navigation';
import Stepper from '../components/Stepper';

const StepperDemo = () => {
  return(
    <Navigation>
        <Navigation.Progress>
          <Navigation.Stage num={1} />
          <Navigation.Stage num={2} />
          <Navigation.Stage num={3} />
        </Navigation.Progress>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation.Header title="Stepper Header" />
          <Navigation.Steps>
            <Navigation.Step num={1} component="Stage 1" />
            <Navigation.Step num={2} component="Stage 2" />
            <Navigation.Step num={3} component="Stage 3" />
          </Navigation.Steps>
          <Navigation.Footer title="Stepper Footer" />
        </div>
    </Navigation>
  );
};

export default StepperDemo;