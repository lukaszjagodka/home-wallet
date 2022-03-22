import React, { useEffect, useMemo, useState } from 'react';
import './Overview.css';

import Collapse from '@mui/material/Collapse';
import { useSelector } from 'react-redux';
import { TAccountOnList } from '../../types/types';

const Overview = function Overview() {
  const { inflow, outflow } = useSelector(({ account }: TAccountOnList) => ({
    inflow: account.inflow,
    outflow: account.outflow,
  }));
  const [checked, setChecked] = useState(false);
  const balance = useMemo(() => inflow - outflow, [inflow, outflow]);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 300);
  }, []);

  return (
    <div>
      <Collapse in={checked}>
        <div className="overview-container">
          <div className="overview-bar">
            <h2 className="overview-name">Overview</h2>
            <h3 className="month-name">Month</h3>
          </div>
          <div className="counters">
            <div className="income-main">
              <h2 className="income">Inflow</h2>
              <h1 className="income-counter">
                $
                {inflow}
              </h1>
            </div>
            <div className="outflow-main">
              <h2 className="outflow">Outflow</h2>
              <h1 className="outflow-counter">
                $
                {outflow}
              </h1>
            </div>
            <div className="balance-main">
              <h2 className="overview-balance">Balance</h2>
              <h1 className="balance-counter">
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
