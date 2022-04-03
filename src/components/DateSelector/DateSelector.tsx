import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MonthPicker from '@mui/lab/MonthPicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { changeDaysInChart } from '../accountActions';
import { getMonthName } from '../../helpers/getMonthName';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

function DateSelector() {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date | null>(new Date());
  const [chosenMonth, setChosenMonth] = useState<string>('January');
  const [open, setOpen] = useState(false);
  const { labelDays } = useSelector(({ account }: any) => ({
    labelDays: account.labelDays,
  }));

  useEffect(() => {
    setChosenMonth(getMonthName(labelDays[1]));
  });

  useEffect(() => {
    if (date) {
      const month = date.getMonth();
      const year = date.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const array = [daysInMonth, month];
      dispatch(changeDaysInChart(array));
    }
    setOpen(false);
  }, [date]);

  const closeDateSelector = () => setOpen(false);
  const openDateSelector = () => setOpen(true);

  return (
    <div>
      <Button type="button" onClick={openDateSelector}>{chosenMonth}</Button>
      <div className="modal-style">
        <Modal
          open={open}
          onClose={closeDateSelector}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} md={6}>
                <MonthPicker
                  date={date}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={(newDate) => setDate(newDate)}
                />
              </Grid>
            </LocalizationProvider>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '260px',
  left: '750px',
  transform: 'translate(-50%, -50%)',
  width: 310,
  height: 220,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default DateSelector;
