import { useState } from 'react';

const useProper = (init) => {
  // Needs to accept a config to either augment or replace prop/state form
  // Ideally we'd just use whichever props we have access to if no override is passed.
  // Wondering how I am going to handle a scenario with nested proper components.
  // Need to find a design pattern that will handle a nested scenario.

  const properInit = Object.entries(init).reduce((accum, [id, value]) => {
    const name = id.charAt(0).toUpperCase() + id.slice(1);
    const type = 'input';
    return {...accum, [ id ]: { id, name, type, value }}
  }, {});

  const [ proper, setProper ] = useState(properInit);

  const handleSet = ({ id, value }) => {
    setProper({...proper, [id] : { ...proper[id], value }});
  };

  const props = Object.entries(proper).reduce((accum, [id, { value }]) =>  ({...accum, [id]: value }), []);

  return [props, Object.values(proper), { set: handleSet }] ;
};

export default useProper;

/*
const properMapNameToProp =   {
  'title': {
    id: 'title',
    name: 'Title',
    type: 'input',
    value: 'Hey WTF man, where you at?'
  },

  'bgColor': {
    id: 'bgColor',
    name: 'BgColor',
    type: 'input',
    value: 'pink'
  },

  'color': {
    id: 'color',
    name: 'Color',
    type: 'input',
    value: 'black'
  }
};
*/