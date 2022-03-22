import React from 'react';
import './Charts.css';

import Collapse from '@mui/material/Collapse';

const Charts = function Charts() {
  const [checked, setChecked] = React.useState(false);

  setTimeout(() => {
    setChecked(true);
  }, 300);

  return (
    <div>
      <Collapse in={checked}>
        <div className="chartsContainer">
          <div className="chartsBar">
            <h2 className="chartsName">Chart</h2>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Charts;
