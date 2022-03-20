/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

function AddTransaction() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [incexp, setIncexp] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [balance, setBalance] = useState<number>(2732);
  const [amount, setAmount] = useState<number | string>('');
  const [date, setDate] = React.useState<Date | null | string>(new Date());
  const [formatedDate, setFormatedDate] = React.useState<Date | null | string>();
  const [description, setDescription] = useState<string>('');

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleChangeIncexp = (event: any) => {
    setIncexp(event.target.value);
    setCategory('');
  };

  const handleCloseBtn = (event: any) => {
    setOpen(false);
  };

  const handleChangeAmount = (event: any) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setAmount(event.target.value);
    }
  };

  const handleDescription = (event: any) => {
    const capitalizeDescription = capitalizeFirstLetter(event.target.value);
    setDescription(capitalizeDescription);
  };

  const resetForm = () => {
    setIncexp('');
    setCategory('');
    setAmount('');
  };

  const handleAddTransaction = (event: any) => {
    if (incexp !== '' && category !== '' && amount !== undefined) {
      let newDateFormat;
      if (formatedDate !== undefined) {
        newDateFormat = formatedDate;
      } else {
        newDateFormat = formatDateFns(date);
      }
      if (amount !== '') {
        const newTransaction: TNewTransaction = {
          transactionType: incexp,
          category,
          amount: Number(amount),
          newDateFormat,
          description,
        };
        dispatch(addTransaction(newTransaction));
        handleClose();
        resetForm();
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="addTransactionBtn">
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
            <div className="addTransactionPanel">
              <div className="addTransactionBar">
                <h1 className="barsName">
                  Add transaction
                </h1>
              </div>
              <div style={{
                position: 'relative', width: 200,
              }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: 'rgba(0, 89, 255, 0.678)' }}>
                    Actual balance
                  </Typography>
                  <h1 className="balancePosition" style={{ color: balance > 1 ? 'green' : 'red' }}>
                    $
                    {balance}
                  </h1>
                </div>
              </div>
              <div className="borderStyle" />
              <div className="incomeExpense">
                <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: 'rgba(0, 89, 255, 0.678)', marginLeft: '40px' }}>
                  Income / Expense
                </Typography>
                <FormControl variant="standard" sx={{ m: 1, width: 230 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={incexp}
                    onChange={handleChangeIncexp}
                    label="Category"
                  >
                    {
                  choice.map((c) => (
                    <MenuItem key={c} value={c} style={{ height: '45px' }}>
                      <div style={{
                        fontSize: '20px', position: 'absolute', marginLeft: '40px',
                      }}
                      >
                        {c}
                      </div>
                    </MenuItem>
                  ))
                }
                  </Select>
                </FormControl>
              </div>
              {
              incexp !== '' ? (
                <>
                  <div className="categoryStyle">
                    <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: 'rgba(0, 89, 255, 0.678)', marginLeft: '80px' }}>Category</Typography>
                    <FormControl variant="standard" sx={{ m: 1, width: 230 }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={handleChangeCategory}
                        label="Category"
                      >
                        {
                          incexp === 'Income' ? (
                            income.map((expenses:any) => (
                              <MenuItem key={expenses.name} value={expenses.name} style={{ height: '45px' }}>
                                <div className="incomeImg">
                                  {expenses.icon}
                                </div>
                                <div className="incomeName">
                                  {expenses.name}
                                </div>
                              </MenuItem>
                            ))
                          ) : ''
                        }
                        {
                          incexp === 'Expense' ? (
                            expense.map((expenses:any) => (
                              <MenuItem key={expenses.name} value={expenses.name} style={{ height: '45px' }}>
                                <div className="expenseImg">
                                  {expenses.icon}
                                </div>
                                <div className="expenseName">
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
                    className="borderStylee"
                  />
                  <div className="amountStyle">
                    <FormControl sx={{ m: 1 }} variant="standard">
                      <Typography id="transition-modal-title" variant="h6" component="h2" style={{ color: 'rgba(0, 89, 255, 0.678)' }}>
                        Amount
                      </Typography>
                      <Input
                        className="no-spin"
                        type="number"
                        onChange={handleChangeAmount}
                        style={{
                          fontSize: '23px', top: '-5px', fontWeight: 'bold', color: incexp === 'Income' ? 'green' : 'rgba(255, 0, 0, 0.678)',
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
              className="dateAndDescription"
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
                className="descriptionStyle"
              >
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange={handleDescription} />
              </div>
              <div
                className="formBtn"
              >
                <Button variant="contained" color="success" style={{ left: '600px' }} onClick={handleAddTransaction}>Add transaction</Button>
                <Button variant="contained" style={{ left: '330px' }} onClick={handleCloseBtn}>Cancel</Button>
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
  { name: 'Collect Interest', icon: <GiReceiveMoney /> },
  { name: 'Salary', icon: <GiMoneyStack /> },
  { name: 'Other Income', icon: <GiPayMoney /> },
  { name: 'Incoming Transfer', icon: <BiTransfer /> },
];

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

export default AddTransaction;
