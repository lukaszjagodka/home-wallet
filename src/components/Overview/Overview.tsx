import React, { useState } from 'react';
import './Overview.css';

import Collapse from '@mui/material/Collapse';
import { useSelector } from 'react-redux';
import { TAccountOnList } from '../../types/types';

const Overview = function Overview() {
  const { inflow, outflow } = useSelector((state: TAccountOnList) => ({
    inflow: state.account.inflow,
    outflow: state.account.outflow,
  }));
  const [checked, setChecked] = useState(false);
  const balance = inflow - outflow;

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
                {inflow}
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
