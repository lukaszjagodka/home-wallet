import { TNewTransaction } from '../../types/types';

export const addTransaction = (payload: TNewTransaction) => ({
  type: 'ADD_TRANSACTION',
  payload,
});
