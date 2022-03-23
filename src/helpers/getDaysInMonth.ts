/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux';
import { changeDaysInChart } from '../components/accountActions';

export const getDaysInMonth = (date: Date = new Date()) => {
  const dispatch = useDispatch();
  const now = new Date();
  const month = date.getMonth();
  const year = now.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const array = [daysInMonth, month];
  dispatch(changeDaysInChart(array));
};
