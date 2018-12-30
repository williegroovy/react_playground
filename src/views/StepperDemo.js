import React from 'react';
import Navigation from '../components/Navigation';

import clock from '../icons/clock.svg';

import StageOne from '../components/Navigation/Stages/StageOne';
import StageTwo from '../components/Navigation/Stages/StageTwo';
import StageThree from '../components/Navigation/Stages/StageThree';
import { StyledIconImage } from "../components/Navigation/styledComponents";
import padlock from "../icons/padlock.svg";

const CustomInProgress = <img className="animated fadeIn" style={{ width: '30px'}} src={clock} />;
const CustomLocked = <div>TJ<StyledIconImage src={clock} /></div>;
const CustomCompleted = <img className="animated fadeIn" style={{ width: '12px'}} src={clock} />;

const StepperDemo = () => {
  return(
    <Navigation>
        <Navigation.Progress>
          <Navigation.Stage navigationId={1} customCompletedIcon={CustomCompleted} />
          <Navigation.Stage navigationId={2} customInProgressIcon={CustomInProgress} />
          <Navigation.Stage navigationId={3} customLockedIcon={CustomLocked} />
        </Navigation.Progress>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navigation.Header title="Stepper Header" />
          <Navigation.Steps>
            <Navigation.Step navigationId={1}>
              <StageOne />
            </Navigation.Step>
            <Navigation.Step navigationId={2} component={StageTwo} />
            <Navigation.Step navigationId={3} component={StageThree} />
          </Navigation.Steps>
          <Navigation.Footer title="Stepper Footer" />
        </div>
    </Navigation>
  );
};

export default StepperDemo;