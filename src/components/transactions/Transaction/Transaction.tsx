/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { TNewTransaction } from '../../../types/types';
import './Transaction.css';

type TProps = {
  params: TNewTransaction
}

const Transaction = function Transaction(props: TProps) {
  const { params } = props;
  const transType = params.transactionType;

  return (
    <div className="singleTransaction">
      <div className="leftBar" style={{ backgroundColor: transType === 'Income' ? 'yellowgreen' : '#ff1b41' }} />
      <div
        className="leftSide"
      >
        <div className="theme">
          <h2>{params.category}</h2>
        </div>
        <div className="description">
          <h4>{params.description}</h4>
        </div>

      </div>
      <div
        className="rightSide"
      >
        <div className="date">
          <h3>{params.newDateFormat}</h3>
        </div>
        <div className="amountTr" style={{ color: transType === 'Income' ? 'yellowgreen' : '#ff1b41' }}>
          <h1>
            $
            {params.amount}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
