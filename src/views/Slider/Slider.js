import React from 'react';
import styled from 'styled-components';
import Navigation from "../../components/Navigation";
import StageOne from "../../components/Navigation/Stages/StageOne";
import StageTwo from "../../components/Navigation/Stages/StageTwo";
import StageThree from "../../components/Navigation/Stages/StageThree";
import StageFour from "../../components/Navigation/Stages/StageFour";

const Circle = ({ inProgress }) => {
  const fill = inProgress ? 'black' : 'transparent';
  return (
    <div>
      <svg height='30' width='30'>
        <circle cx="15" cy="15" r="13" stroke="black" strokeWidth="3" fill={fill} />
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
          <div style={{
            display: "flex", flexDirection: 'row', width: '150px',
            justifyContent: 'space-around', marginTop:"-130px", zIndex: "1"
          }}>
            <Navigation.Progress hideUI={true}>
              <Navigation.Stage
                navigationId={1}
                component={Circle}
              />
              <Navigation.Stage
                navigationId={2}
                customInProgressIcon={<Circle />}
                customCompletedIcon={<Circle />}
                customLockedIcon={<Circle />}
              />
              <Navigation.Stage
                navigationId={3}
                customInProgressIcon={<Circle />}
                customCompletedIcon={<Circle />}
                customLockedIcon={<Circle />}
              />
            </Navigation.Progress>
          </div>
        </div>
    </Navigation>
  );
};

export default Slider