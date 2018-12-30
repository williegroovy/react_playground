import React from "react";

const NavigationContext = React.createContext({
  navigationSequence: [],
  registerNavigationSequence: () => {},
  navigationSequenceSet: () => {},
  currentNavigationId: 1,
  transition:() => {},
  onTransition: () => {},
});

export default NavigationContext;