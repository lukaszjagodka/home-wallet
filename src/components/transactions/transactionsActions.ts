import { TEditTransaction, TNewTransaction } from '../../types/types';

export const addTransaction = (payload: TNewTransaction) => ({
  type: 'ADD_TRANSACTION',
  payload,
});

export const editTransaction = (payload: TEditTransaction) => ({
  type: 'EDIT_TRANSACTION',
  payload,
});
