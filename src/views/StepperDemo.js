import React from 'react';
import Stepper from '../components/Stepper';

const StepperDemo = () => {
  return(
    <Stepper initialStage={1}>
      {(stage, onNavigate) => (
        <React.Fragment>
          <Stepper.Progress>
            <Stepper.Stage stage={stage} num={1} />
            <Stepper.Stage stage={stage} num={2} />
            <Stepper.Stage stage={stage} num={3} />
          </Stepper.Progress>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Stepper.Header title="Stepper Header" />
            <Stepper.Steps stage={stage} navigate={onNavigate}>
              <Stepper.Step stage={stage} num={1} id={1} text="Stage 1" />
              <Stepper.Step stage={stage} num={2} id={2} text="Stage 2" />
              <Stepper.Step stage={stage} num={3} id={3} text="Stage 3" />
            </Stepper.Steps>
            <Stepper.Footer title="Stepper Footer" />
          </div>
        </React.Fragment>
      )}
    </Stepper>
  );
};

export default StepperDemo;