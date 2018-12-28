import React from 'react';
import PropTypes from 'prop-types';

import { ControlPanel, CPRow, CPInput } from './styledComponents';

const ProperControlPanel = ({ proper, properHandlers}) => {

  // This should generate a unique 'control' element based on the passed type;
  // Should utilize combos, inputs and radio.
  const handleInputEvent = (id) => (e) => {
    e.preventDefault();
    console.log(`Handle Input Event with id ${id} | value: ${e.target.value}`);
    properHandlers.set({ id: [id], value: e.target.value })
  };

  return (
    <ControlPanel>
      {
        proper.map(({ id, name, value }) =>
          <CPRow key={id}>
            <p>{name}</p>
            <CPInput
              value={value}
              onChange={handleInputEvent(id)}
            />
          </CPRow>
        )
      }
    </ControlPanel>
  )
};

ProperControlPanel.propTypes = {
  props: PropTypes.objectOf(PropTypes.object),
  proper: PropTypes.arrayOf(PropTypes.object),
  properHandlers: PropTypes.objectOf(PropTypes.func)
};

export default ProperControlPanel;