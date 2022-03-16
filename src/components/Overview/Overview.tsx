import React, { useState } from 'react';
import './Overview.css';

import Collapse from '@mui/material/Collapse';

const Overview = function Overview() {
  const [checked, setChecked] = useState(false);
  const [income, setIncome] = useState<number>(3256);
  const [outflow, setOutflow] = useState<number>(524);
  const balance = income - outflow;

  setTimeout(() => {
    setChecked(true);
  }, 300);

  return (
    <div>
      <Collapse in={checked}>
        <div className="overviewContainer">
          <div className="overviewBar">
            <h2 className="overviewName">Overview</h2>
            <h3 className="monthName">Month</h3>
          </div>
          <div className="counters">
            <div className="incomeMain">
              <h2 className="income">Inflow</h2>
              <h1 className="incomeCounter">
                $
                {income}
              </h1>
            </div>
            <div className="outflowMain">
              <h2 className="outflow">Outflow</h2>
              <h1 className="outflowCounter">
                $
                {outflow}
              </h1>
            </div>
            <div className="balanceMain">
              <h2 className="overviewBalance">Balance</h2>
              <h1 className="balanceCounter">
                $
                {balance}
              </h1>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Overview;
