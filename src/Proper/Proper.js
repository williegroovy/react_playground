import React from 'react';

import useProper from './useProper';
import ProperControlPanel from './ProperControlPanel';

//const reactData =  window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
//console.log('reactData', reactData);

const Proper = (Wrapped) => (wrappedProps) => {
  console.log('Wrapped', Wrapped);
  console.log('Wrapped', Wrapped.prototype);
  console.log('Wrapped', Wrapped);

  const [props, proper, properHandlers ] = useProper(wrappedProps);

  //setTimeout(() => {
  //  const reactDataHelpers = Object.values(reactData.helpers)[0];
  //  const internalInstancesById = reactData.reactDevtoolsAgent.internalInstancesById.entries();
  //
  //  console.log('reactHelpers', reactDataHelpers);
  //    let reactInstance;
  //
  //    for (const internalInstance of internalInstancesById) {
  //      const [key, value] = internalInstance;
  //      if(value && value.type && value.type.name) {
  //        if(value.type.name === 'ProperTester') {
  //          console.log('key', key);
  //          console.log('value', value);
  //          console.log('name', value.type.name);
  //          //reactDataHelpers
  //          reactInstance = internalInstance;
  //        }
  //      }
  //    }
  //
  //      //
  //    console.log('reactInstance', reactInstance);
  //    const callback = function(data) { console.log('data from callback', data); };
  //
  //    const [key, value] = reactInstance;
  //    value.stateNode.updater.enqueueSetState(value.return, { border: false }, callback);
  //  }, 3000);

  return [
    <ProperControlPanel proper={proper} properHandlers={properHandlers} />,
    <Wrapped {...props} />
  ]
};

export default Proper;