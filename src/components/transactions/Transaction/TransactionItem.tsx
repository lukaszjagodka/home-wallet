/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import './TransactionItem.css';
import Input from '@mui/material/Input';

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

import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { TAccountOnList, TList, TNewTransaction } from '../../../types/types';
import { editMode } from '../../accountActions';
import { editTransaction } from '../transactionsActions';

type TProps = {
  params: TNewTransaction
}

enum BudgetTypeEnum {
  Income = 'Income',
}

const Transaction = function Transaction(props: TProps) {
  const dispatch = useDispatch();
  const { params } = props;
  const { editModeSelector } = useSelector(({ account }: TAccountOnList) => ({
    editModeSelector: account.editMode,
  }));
  const [date, setDate] = useState<string>('');
  const [inputDescription, setInputDescription] = useState<string>('');
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const transType = params.transactionType;
  const foundExpense = expense.find((element) => element.name === params.category);
  const foundIncome = income.find((element) => element.name === params.category);
  const dateObj = params.selectedDay;

  const ariaLabel = { 'aria-label': 'description' };

  useEffect(() => {
    if (dateObj) {
      const dateFormated = format(dateObj, 'dd/MM/yyyy');
      setDate(dateFormated);
    }
  });

  const editOpen = () => {
    setInputDescription(params.description);
    setInputAmount(params.amount);
    if (!editModeSelector) {
      setIsEdit(true);
      dispatch(editMode(true));
    }
  };

  const editInput = () => {
    const editObj = {
      id: params.id,
      description: inputDescription,
      amount: inputAmount,
    };
    dispatch(editTransaction(editObj));
    setIsEdit(false);
    dispatch(editMode(false));
  };

  const deleteItem = () => { console.log('delete'); };
  const cancelEdit = () => {
    setIsEdit(false);
    dispatch(editMode(false));
  };

  const handleChangeInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDescription(event.target.value);
  };

  const handleChangeInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAmount(Number(event.target.value));
  };

  return (
    <div className="single-transaction" onClick={editOpen} aria-hidden="true">
      {
        isEdit && (
          <div
            className="btns-display"
            style={{
              width: '300px', position: 'absolute', marginTop: '25px', marginLeft: '250px',
            }}
          >
            <button type="button" onClick={editInput} style={{ position: 'relative' }}>edit</button>
            <button type="button" onClick={deleteItem} style={{ position: 'relative', marginLeft: '5px' }}>delete</button>
            <button type="button" onClick={cancelEdit} style={{ position: 'relative', marginLeft: '5px' }}>cancel</button>
          </div>
        )
      }
      <div className={`left-bar ${transType === BudgetTypeEnum.Income ? 'bc-yellowgreen' : 'bc-red'}`} />
      <div className="img">
        {foundExpense?.icon({})}
        {foundIncome?.icon({})}
      </div>
      <div
        className="left-side"
      >
        <div className="theme">
          <h3>{params.category}</h3>
        </div>
        <div className="description">
          {
            !isEdit && <p>{params.description}</p>
          }
          {
            isEdit
              && <Input value={inputDescription} onChange={handleChangeInputDescription} style={{ width: '370px' }} />
          }
        </div>

      </div>
      <div
        className="right-side"
      >
        <div className="date">
          <p>{date}</p>
        </div>
        <div className={`amount-tr ${transType === BudgetTypeEnum.Income ? 'c-yellowgreen' : 'c-red'}`}>
          <h2>
            {
            !isEdit && (
            <p>
              $
              {params.amount}
            </p>
            )
          }
            {
            isEdit
              && <Input value={inputAmount} inputProps={ariaLabel} onChange={handleChangeInputAmount} style={{ width: '100px' }} />
          }
          </h2>
        </div>
      </div>
    </div>
  );
};

const expense: TList = [
  { name: 'Food & Beverage', icon: () => <IoFastFoodSharp /> },
  { name: 'Transportation', icon: () => <IoBusOutline /> },
  { name: 'Rentals', icon: () => <AiFillHome /> },
  { name: 'Water Bill', icon: () => <BsWater /> },
  { name: 'Phone Bill', icon: () => <AiFillPhone /> },
  { name: 'Electricity Bill', icon: () => <FcElectricity /> },
  { name: 'Gas Bill', icon: () => <GiGasStove /> },
  { name: 'Television Bill', icon: () => <IoTvSharp /> },
  { name: 'Internet Bill', icon: () => <FaInternetExplorer /> },
  { name: 'Other Utility Bills', icon: () => <RiBillFill /> },
  { name: 'Insurances', icon: () => <GiScarecrow /> },
  { name: 'Education', icon: () => <MdCastForEducation /> },
];

const income: TList = [
  { name: 'Collect Interest', icon: () => <GiReceiveMoney /> },
  { name: 'Salary', icon: () => <GiMoneyStack /> },
  { name: 'Other Income', icon: () => <GiPayMoney /> },
  { name: 'Incoming Transfer', icon: () => <BiTransfer /> },
];

export default Transaction;
