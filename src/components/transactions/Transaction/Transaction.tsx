/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './Transaction.css';

import { IoFastFoodSharp, IoBusOutline, IoTvSharp } from 'react-icons/io5';
import { AiFillHome, AiFillPhone } from 'react-icons/ai';
import { BsWater } from 'react-icons/bs';
import { FcElectricity } from 'react-icons/fc';
import {
  GiGasStove, GiScarecrow, GiReceiveMoney, GiMoneyStack, GiPayMoney,
} from 'react-icons/gi';
import { FaInternetExplorer } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { MdCastForEducation } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

import { TList, TNewTransaction } from '../../../types/types';

type TProps = {
  params: TNewTransaction
}

const Transaction = function Transaction(props: TProps) {
  const { params } = props;
  const transType = params.transactionType;
  const foundExpense = expense.find((element) => element.name === params.category);
  const foundIncome = income.find((element) => element.name === params.category);

  return (
    <div className="singleTransaction">
      <div className="leftBar" style={{ backgroundColor: transType === 'Income' ? 'yellowgreen' : '#ff1b41' }} />
      <div className="img">
        {foundExpense?.icon}
        {foundIncome?.icon}
      </div>
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

const expense: TList = [
  { name: 'Food & Beverage', icon: <IoFastFoodSharp /> },
  { name: 'Transportation', icon: <IoBusOutline /> },
  { name: 'Rentals', icon: <AiFillHome /> },
  { name: 'Water Bill', icon: <BsWater /> },
  { name: 'Phone Bill', icon: <AiFillPhone /> },
  { name: 'Electricity Bill', icon: <FcElectricity /> },
  { name: 'Gas Bill', icon: <GiGasStove /> },
  { name: 'Television Bill', icon: <IoTvSharp /> },
  { name: 'Internet Bill', icon: <FaInternetExplorer /> },
  { name: 'Other Utility Bills', icon: <RiBillFill /> },
  { name: 'Insurances', icon: <GiScarecrow /> },
  { name: 'Education', icon: <MdCastForEducation /> },
];

const income: TList = [
  { name: 'Collect Interest', icon: <GiReceiveMoney /> },
  { name: 'Salary', icon: <GiMoneyStack /> },
  { name: 'Other Income', icon: <GiPayMoney /> },
  { name: 'Incoming Transfer', icon: <BiTransfer /> },
];

export default Transaction;
