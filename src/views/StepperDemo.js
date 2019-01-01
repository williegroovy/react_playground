import React from 'react';
import Navigation from '../components/Navigation';

import StageOne from '../components/Navigation/Stages/StageOne';
import StageTwo from '../components/Navigation/Stages/StageTwo';
import StageThree from '../components/Navigation/Stages/StageThree';
import StageFour from '../components/Navigation/Stages/StageFour';
// import { StyledIconImage } from "../components/Navigation/styledComponents";
// import padlock from "../icons/padlock.svg";
// import clock from '../icons/clock.svg';


// const CustomInProgress = <img alt="In Progress" className="animated fadeIn" style={{ width: '30px'}} src={clock} />;
// const CustomLocked = <div>TJ<img alt="Locked" className="animated fadeIn" style={{ width: '15px'}} src={clock} /></div>;
// const CustomCompleted = <img alt="Completed" className="animated fadeIn" style={{ width: '12px'}} src={clock} />;
// const LockedIcon = (text) => <div><StyledIconImage alt="Locked" src={padlock} />{text}</div>;

/*
  const WrappedIcon = ({ check, completed, inProgress }) => {
  if(inProgress) {
    return CustomInProgress;
  }

  if(completed) {
    return CustomCompleted;
  }

  return CustomLocked;
};
*/
const StepperDemo = () => {
  console.log('Navigation', <Navigation />);
  return(
    <Navigation>
        <Navigation.Progress>
          <Navigation.Stage navigationId={1} />
          <Navigation.Stage navigationId={2} />
          <Navigation.Stage navigationId={3} />
        </Navigation.Progress>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation.Header title="Stepper Header" />
          <Navigation.Steps>
            <Navigation.Step navigationId={1}>
              <StageOne />
            </Navigation.Step>
            <Navigation.Step navigationId={2} component={StageTwo} />
            <Navigation.Step navigationId={3} component={StageThree} />
            <Navigation.Step navigationId={4} component={StageFour} />
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