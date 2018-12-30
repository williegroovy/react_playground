import React from "react";
import { StyledStageContent } from './styledComponents';

const Step = (props) => {
  const { currentNavigationId, num, component } = props;
  return (
    currentNavigationId === num
      ? <StyledStageContent key={num}>
          { component }
        </StyledStageContent>
      : null
  )
};

export default Step;