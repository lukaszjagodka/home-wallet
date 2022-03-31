/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';

import { TNewTransaction, TList } from '../../../types/types';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';
import { addTransaction } from '../transactionsActions';
import { addInflow, addOutflow, editMode } from '../../accountActions';
import { BudgetTypeEnum } from '../../../helpers/enum/enum';

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

function AddTransaction() {
  const dispatch = useDispatch();
  const { inflow, outflow, editModeSelector } = useSelector(({ account }: any) => ({
    inflow: account.inflow,
    outflow: account.outflow,
    editModeSelector: account.editMode,
  }));
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [balance, setBalance] = useState<number>(inflow - outflow);
  const [amount, setAmount] = useState<number | string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [formatedDate, setFormatedDate] = useState<Date | null | string>();
  const [burgetType, setBurgetType] = useState<TList>();
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    budget === BudgetTypeEnum.Income ? setBurgetType(income) : setBurgetType(expense);
  }, [budget]);

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  const handleChangeBudget = (event: any) => {
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
    const newTransaction: TNewTransaction = {
      id: uuidv4(),
      transactionType: budget,
      category,
      amount: Number(amount),
      selectedDay: date,
      description,
      whenObjAdded: new Date(),
    };
    dispatch(addTransaction(newTransaction));
    if (budget === BudgetTypeEnum.Income) {
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
        <Button onClick={handleOpen} disabled={editModeSelector}>Add Transaction</Button>
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

              <div className="income-expense">
                <p className="income-expense-name">Income / Expense</p>
                <FormControl className="bdg-form-control" variant="standard" sx={{ m: 1 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={budget}
                    onChange={handleChangeBudget}
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
              budget !== '' && (
                <>
                  <div className="category-style">
                    <p className="category-name">Category</p>
                    <FormControl className="cat-form-control" variant="standard" sx={{ m: 1 }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={handleChangeCategory}
                        label="Category"
                      >
                        {
                          burgetType !== undefined && (
                            burgetType.map((obj) => (
                              <MenuItem key={obj.name} value={obj.name} style={{ height: '45px' }}>
                                <div className="income-image">
                                  {obj.icon({})}
                                </div>
                                <div className="incomeName">
                                  {obj.name}
                                </div>
                              </MenuItem>
                            ))
                          )
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div className="amount-style">
                    <FormControl sx={{ m: 1 }} variant="standard">
                      <p className="amount-name">Amount</p>
                      <Input
                        className="input-amount"
                        type="number"
                        onChange={handleChangeAmount}
                        style={{
                          color: budget === BudgetTypeEnum.Income ? 'green' : 'rgba(255, 0, 0, 0.678)', fontSize: '1.5rem',
                        }}
                        value={amount}
                      />
                    </FormControl>
                  </div>
                </>
              )
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
                <Button className="cancel-btn-adf" variant="contained" onClick={handleCloseBtn}>Cancel</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const choice = ['Income', 'Expense'];

export default AddTransaction;
