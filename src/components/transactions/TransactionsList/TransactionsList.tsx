import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './TransactionsList.css';

import Collapse from '@mui/material/Collapse';
import TransactionItem from '../Transaction/TransactionItem';
import { TNewTransaction, TTransactionsOnList } from '../../../types/types';

const TransactionsList = function TransactionsList() {
  const transactions = useSelector((state: TTransactionsOnList) => state.transactions.transactions);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 500);
  });

  return (
    <div className="transactions-list">
      <Collapse in={checked}>
        <div className="transactions-component">
          <div className="box-transactions-component" />
          {
          transactions.length ? transactions.map((transactionObj: TNewTransaction) => (
            <TransactionItem key={transactionObj.id} params={transactionObj} />
          )) : (
            <div className="emptyList">
              <h3>
                Add new transaction
              </h3>
            </div>
          )
        }
        </div>
      </Collapse>
    </div>
  );
};

export default TransactionsList;
