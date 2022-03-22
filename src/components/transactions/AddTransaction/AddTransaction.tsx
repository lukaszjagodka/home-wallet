/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import './AddTransaction.css';

import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { format } from 'date-fns';

import { TNewTransaction, TList } from '../../../types/types';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';
import { addTransaction } from '../transactionsActions';
import { addInflow, addOutflow } from '../../accountActions';

enum BudgetTypeEnum {
  Inflow = 'Inflow',
  Outflow = 'Outflow'
}

function AddTransaction() {
  const dispatch = useDispatch();
  const { inflow, outflow } = useSelector(({ account }: any) => ({
    inflow: account.inflow,
    outflow: account.outflow,
  }));
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [balance, setBalance] = useState<number>(inflow - outflow);
  const [amount, setAmount] = useState<number | string>('');
  const [date, setDate] = React.useState<Date | null | string>(new Date());
  const [formatedDate, setFormatedDate] = React.useState<Date | null | string>();
  const [description, setDescription] = useState<string>('');

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleChangeIncexp = (event: any) => {
    setBudget(event.target.value);
    setCategory('');
  };

  const handleCloseBtn = (event: any) => {
    setOpen(false);
  };

  const handleChangeAmount = (event: any) => {
    const numberRegex = /^[0-9\b]+$/;
    if (event.target.value === '' || numberRegex.test(event.target.value)) {
      setAmount(event.target.value);
    }
  };

  const handleDescription = (event: any) => {
    const capitalizeDescription = capitalizeFirstLetter(event.target.value);
    setDescription(capitalizeDescription);
  };

  const resetForm = () => {
    setBudget('');
    setCategory('');
    setAmount('');
    setDescription('');
  };

  const handleAddTransaction = (event: any) => {
    if (budget === '' || category === '' || amount === undefined || amount === '') return;

    const newDateFormat = formatedDate !== undefined ? formatedDate : formatDateFns(date);

    const newTransaction: TNewTransaction = {
      transactionType: budget,
      category,
      amount: Number(amount),
      newDateFormat,
      description,
    };
    dispatch(addTransaction(newTransaction));
    if (budget === BudgetTypeEnum.Inflow) {
      dispatch(addInflow(Number(amount)));
    } else {
      dispatch(addOutflow(Number(amount)));
    }
    handleClose();
    resetForm();
  };

  const handleOpen = () => {
    setOpen(true);
    const resetBalance = inflow - outflow;
    setBalance(resetBalance);
  };
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  return (
    <div>
      <div className="add-transaction-btn">
        <Button onClick={handleOpen}>Add Transaction</Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="add-transaction-panel">
              <div className="add-transaction-bar">
                <h1 className="bars-name">
                  Add transaction
                </h1>
              </div>
              <div
                className="actual-balance-position"
              >
                <div className="text-center">
                  <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: 'rgba(0, 89, 255, 0.678)' }}>
                    Actual balance
                  </Typography>
                  <h1 className="balance-position" style={{ color: balance > 1 ? 'green' : 'red' }}>
                    $
                    {balance}
                  </h1>
                </div>
              </div>
              <div className="border-style" />
              <div className="income-expense">
                <Typography className="bdg-modal-title" id="bdg-modal-title" variant="h6" component="h2">
                  Income / Expense
                </Typography>
                <FormControl className="bdg-form-control" variant="standard" sx={{ m: 1 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={budget}
                    onChange={handleChangeIncexp}
                    label="Category"
                  >
                    {
                  choice.map((c) => (
                    <MenuItem key={c} value={c} className="choice-menu-item">
                      <div className="choice-menu-item-position">
                        {c}
                      </div>
                    </MenuItem>
                  ))
                }
                  </Select>
                </FormControl>
              </div>
              {
              budget !== '' ? (
                <>
                  <div className="category-style">
                    <Typography id="category-modal-title" variant="h6" component="h2">Category</Typography>
                    <FormControl variant="standard" sx={{ m: 1, width: 230 }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={handleChangeCategory}
                        label="Category"
                      >
                        {
                          budget === BudgetTypeEnum.Inflow ? (
                            income.map((expenses) => (
                              <MenuItem key={expenses.name} value={expenses.name} style={{ height: '45px' }}>
                                <div className="income-image">
                                  {expenses.icon({})}
                                </div>
                                <div className="incomeName">
                                  {expenses.name}
                                </div>
                              </MenuItem>
                            ))
                          ) : ''
                        }
                        {
                          budget === BudgetTypeEnum.Outflow ? (
                            expense.map((expenses) => (
                              <MenuItem key={expenses.name} value={expenses.name} style={{ height: '45px' }}>
                                <div className="expense-image">
                                  {expenses.icon({})}
                                </div>
                                <div className="expense-name">
                                  {expenses.name}
                                </div>
                              </MenuItem>
                            ))
                          ) : ''
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div
                    className="border-stylee"
                  />
                  <div className="amount-style">
                    <FormControl sx={{ m: 1 }} variant="standard">
                      <Typography className="amount-modal-title" id="amount-modal-title" variant="h6" component="h2">
                        Amount
                      </Typography>
                      <Input
                        className="no-spin input-amount"
                        type="number"
                        onChange={handleChangeAmount}
                        style={{
                          color: budget === BudgetTypeEnum.Inflow ? 'green' : 'rgba(255, 0, 0, 0.678)',
                        }}
                        value={amount}
                      />
                    </FormControl>
                  </div>
                </>
              ) : ''
            }
            </div>
            <div
              className="date-and-description"
            >
              <div className="calender">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Today"
                    value={date}
                    minDate={new Date(2014, 1, 11)}
                    onChange={(newValue) => {
                      if (newValue !== null) {
                        const newValueFormated = format(newValue, 'dd/MM/yyyy');
                        setFormatedDate(newValueFormated);
                      }
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </div>
              <div
                className="description-style"
              >
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={handleDescription} />
              </div>
              <div
                className="form-btn"
              >
                <Button className="submit-btn" variant="contained" color="success" onClick={handleAddTransaction}>Add transaction</Button>
                <Button className="cancel-btn" variant="contained" onClick={handleCloseBtn}>Cancel</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

function formatDateFns(date: any) {
  return format(date, 'dd/MM/yyyy');
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 820,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const choice = ['Income', 'Expense'];

const income: TList = [
  { name: 'Collect Interest', icon: () => <GiReceiveMoney /> },
  { name: 'Salary', icon: () => <GiMoneyStack /> },
  { name: 'Other Income', icon: () => <GiPayMoney /> },
  { name: 'Incoming Transfer', icon: () => <BiTransfer /> },
];

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

export default AddTransaction;
