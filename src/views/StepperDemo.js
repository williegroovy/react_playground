import React from 'react';
import Navigation from '../components/Navigation';

import StageOne from '../components/Navigation/Stages/StageOne';
import StageTwo from '../components/Navigation/Stages/StageTwo';
import StageThree from '../components/Navigation/Stages/StageThree';
import { StyledIconImage } from "../components/Navigation/styledComponents";
import padlock from "../icons/padlock.svg";
import clock from '../icons/clock.svg';


const CustomInProgress = <img className="animated fadeIn" style={{ width: '30px'}} src={clock} />;
const CustomLocked = <div>TJ<img className="animated fadeIn" style={{ width: '15px'}} src={clock} /></div>;
const CustomCompleted = <img className="animated fadeIn" style={{ width: '12px'}} src={clock} />;
const LockedIcon = (text) => <div><StyledIconImage src={padlock} />{text}</div>;

const WrappedIcon = ({ check, completed, inProgress }) => {
  if(check) console.log('check');

  if(inProgress) {
    return CustomInProgress;
  }

  if(completed) {
    return CustomCompleted;
  }

  return CustomLocked;
};

const StepperDemo = () => {
  return(
    <Navigation>
        <Navigation.Progress>
          <Navigation.Stage navigationId={1} customCompletedIcon={CustomCompleted} />
          <Navigation.Stage navigationId={2}>
            {
              (completed, inProgress, navigate) =>
                <button style={{ width: '50px', height: '50px' }} onClick={() => inProgress && navigate('forward')} />
            }
          </Navigation.Stage>
          <Navigation.Stage navigationId={3}>
              <WrappedIcon check={true} />
          </Navigation.Stage>
        </Navigation.Progress>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation.Header title="Stepper Header" />
          <Navigation.Steps>
            <Navigation.Step navigationId={1}>
              <StageOne />
            </Navigation.Step>
            <Navigation.Step navigationId={2}>
              {
                (navigationId, currentNavigationId, navigate) =>
                  <div onClick={() => navigate('forward')} >{`NavigationId: ${navigationId} Current ${currentNavigationId}`}</div>
              }
            </Navigation.Step>
            <Navigation.Step navigationId={3} component={StageThree} />
          </Navigation.Steps>
          <Navigation.Footer title="Stepper Footer" />
        </div>
    </Navigation>
  );
};

export default StepperDemo;