import React from 'react';
import StepNavigation from '../components/Stepper_Example/StepNavigation';


// Can't use component unless said component is a class.
const StepOne = () => (<div>Step One</div>);
const StepTwo = () => (<div>Step Two</div>);
const StepThree = () => (<div>Step Three</div>);
class StepFour extends React.Component { render() { return (<div>Step Four</div>) }; }

class StepNavigationDemo extends React.Component {
  render() {
    const shouldRender = false;

    return(
      <StepNavigation>
        <StepNavigation.Step render={() => <StepOne />} />
        <StepNavigation.Step render={() => (shouldRender ? <StepTwo /> : <StepNavigation.SkipStep />)} />
        <StepNavigation.Step render={() => <StepThree />} />
        <StepNavigation.Step component={StepFour} />
      </StepNavigation>
    );
  }
}

export default StepNavigationDemo;