import React from 'react';
import styled from 'styled-components';
import Navigation from "../../components/Navigation";
import StageOne from "../../components/Navigation/Stages/StageOne";
import StageTwo from "../../components/Navigation/Stages/StageTwo";
import StageThree from "../../components/Navigation/Stages/StageThree";
import StageFour from "../../components/Navigation/Stages/StageFour";

const circle = (inProgress) => {
  const fill = inProgress ? 'black' : 'transparent';
  const cxcy = inProgress ? '25' : '15';
  const r = inProgress ? '20' : '15';
  return (
    <div>
      <svg height={inProgress ? '50' : '30'} width={inProgress ? '50' : '30'}>
        <circle cx={cxcy} cy={cxcy} r={r} stroke="black" strokeWidth="3" fill={fill} />
      </svg>
    </div>
  );
};

const Slider = () => {
  return(
    <Navigation>
        <div style={{
          display: "flex", flexDirection: "column", minWidth: '100%',
          width: '100%', alignItems: 'center', height: '90vh'
        }}>
          <Navigation.Steps>
            <Navigation.Step navigationId={1}>
              <StageOne />
            </Navigation.Step>
            <Navigation.Step navigationId={2} component={StageTwo} />
            <Navigation.Step navigationId={3} component={StageThree} />
            <Navigation.Step navigationId={4} component={StageFour} />
          </Navigation.Steps>
          <div style={{ display: "flex", flexDirection: 'row', width: '150px', justifyContent: 'space-around', marginTop:"-150px"}}>
            <Navigation.Progress>
              {
                (currentNavigationId) => (
                  <React.Fragment>
                    <Navigation.Stage navigationId={1}
                      customInProgressIcon={circle(true)}
                      customCompletedIcon={circle()}
                      customLockedIcon={circle()}
                    />
                    <Navigation.Stage navigationId={2}
                      customInProgressIcon={circle(true)}
                      customCompletedIcon={circle()}
                      customLockedIcon={circle()}
                    />
                    <Navigation.Stage navigationId={3}
                      customInProgressIcon={circle(true)}
                      customCompletedIcon={circle()}
                      customLockedIcon={circle()}
                    />
                  </React.Fragment>
                )
              }
            </Navigation.Progress>
          </div>
        </div>
    </Navigation>
  );
};

export default Slider