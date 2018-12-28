import React from "react";
import { StyledStageContent } from './styledComponents';

const Step = ({ stage, num, text }) => (
  stage === num
    ? <StyledStageContent key={num}>
        {text}
      </StyledStageContent>
    : null
);

export default Step;