import React from 'react';
import { StyledIconImage } from '../components/Navigation/styledComponents';


import Navigation from '../components/Navigation';
import StageOne from '../components/Navigation/Stages/StageOne';
import StageTwo from '../components/Navigation/Stages/StageTwo';
import StageThree from '../components/Navigation/Stages/StageThree';
import StageFour from '../components/Navigation/Stages/StageFour';
 import padlock from '../icons/padlock.svg';
 import clock from '../icons/clock.svg';
import withCustomTransition from "../components/Navigation/withCustomTransition";


const CustomInProgress = <img alt="In Progress" className="animated fadeIn" style={{ width: '30px'}} src={clock} />;
const CustomLocked = <div style={{ width: 50, height: 50 }}>16<img alt="Locked" className="animated fadeIn" style={{ width: '15px'}} src={padlock} /></div>;
const CustomCompleted = <img alt="Completed" className="animated fadeIn" style={{ width: '12px'}} src={clock} />;
const LockedIcon = <div style={{ width: 36, height: 36, position: 'absolute' }}><StyledIconImage alt="Locked" src={padlock} />15</div>;

  const WrappedIcon = ({ completed, inProgress }) => {
  if(inProgress) {
    return CustomInProgress;
  }

  if(completed) {
    return CustomCompleted;
  }

  return LockedIcon;
};

const NestedSteps = ({ ids }) => {
  //TODO: I suspect that I could automatically turn off the UI if the Steps component is the second child of it's kind.
  // Something ^ interesting to look into.
  return (
    <Navigation.Steps hideUI={true}>
      <Navigation.Step navigationId={ids[0]}>
        <StageThree />
      </Navigation.Step>
      <Navigation.Step navigationId={ids[1]} component={StageTwo} />
      <Navigation.Step navigationId={ids[2]} component={StageOne} />
    </Navigation.Steps>
  )
};

//const customNavProperties = {
//  hideNavigationUI: true
//};

//const StepsAsStep = withCustomTransition({ customNavProperties })(
//  () => {
//    //TODO: What if I wanted to pass a Steps component to a Step as it's component.
//    // You'd want to hide the UI of the previous Steps, which should trigger the nested UI to take over.
//    return (
//      <Navigation>
//        <Navigation.Steps>
//          <Navigation.Step navigationId={1}>
//            <StageThree />
//          </Navigation.Step>
//          <Navigation.Step navigationId={2} component={StageTwo} />
//          <Navigation.Step navigationId={3} component={StageOne} />
//        </Navigation.Steps>
//      </Navigation>
//    )
//  }
//);
//<Navigation.Step navigationId={7} component={StepsAsStep} />} />

const StepperDemo = () => {
  return(
    <Navigation>
        <Navigation.Progress>
          <Navigation.Stage navigationId={1}>
            <WrappedIcon />
          </Navigation.Stage>
          <Navigation.Stage navigationId={2} customCompletedIcon={CustomCompleted} />
          <Navigation.Stage navigationId={3}>
            <WrappedIcon />
          </Navigation.Stage>
        </Navigation.Progress>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation.Header title="Stepper Header" />
          <Navigation.Steps>
            <Navigation.Step navigationId={1}>
              <StageOne />
            </Navigation.Step>
            <Navigation.Step navigationId={2} component={StageTwo} />
            <Navigation.Step navigationId={3} component={StageThree} />
            <NestedSteps ids={[4, 5, 6]}/>
            <Navigation.Step navigationId={7} component={StageFour} />
          </Navigation.Steps>

          <Navigation.Footer title="Stepper Footer" />
        </div>
    </Navigation>
  );
};

export default StepperDemo;

/*
  {
    (navigationId, currentNavigationId, navigate) =>
      <div onClick={() => navigate('forward')} >{`NavigationId: ${navigationId} Current ${currentNavigationId}`}</div>
  }
 */