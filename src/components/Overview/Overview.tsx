import React from 'react';
import './Overview.css';

import Collapse from '@mui/material/Collapse';

const Overview = function Overview() {
  const [checked, setChecked] = React.useState(false);

  setTimeout(() => {
    setChecked(true);
  }, 300);

  return (
    <div>
      <Collapse in={checked}>
        <div className="overviewContainer">
          <div className="overviewBar">
            <h2 className="overviewName">Overview</h2>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Overview;
