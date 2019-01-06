import React from 'react';
import styled from 'styled-components';
import Navigation from "../../components/Navigation";
import StageOne from "../../components/Navigation/Stages/StageOne";
import StageTwo from "../../components/Navigation/Stages/StageTwo";
import StageThree from "../../components/Navigation/Stages/StageThree";

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

const CarouselProgressWrapper = styled.div`
  display: flex;
  margin-top: -50px;
  justify-content: space-around;
  
  div {
    margin-left: 5px;
  }
    
  div:first-child {
    margin-left: 0;
  }
`;


const Slider = () => {
  return(
    <Navigation transitionType={{ type: 'auto', delay: 3000 }}>
      <div style={{ display: "flex", flexDirection: "column", margin: '0 auto', width: '75%', alignItems: 'center', height: '500px' }}>
        <Navigation.Steps hideUI={true}>
          <Navigation.Step navigationId={1}>
            <StageOne />
          </Navigation.Step>
          <Navigation.Step navigationId={2} component={StageTwo} />
          <Navigation.Step navigationId={3} component={StageThree} />
        </Navigation.Steps>

        <CarouselProgressWrapper>
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
        </CarouselProgressWrapper>
      </div>
    </Navigation>
  );
};


export default Slider;
