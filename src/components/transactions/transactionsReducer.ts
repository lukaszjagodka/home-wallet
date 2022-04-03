/* eslint-disable no-case-declarations */
import { TTransactions, TTransactionAction, TNewTransaction } from '../../types/types';

const initialState = {
  transactions: [],
};

const transactionsReducer = (state: TTransactions = initialState, action: TTransactionAction) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'EDIT_TRANSACTION':
      const updatedTransaction = state.transactions.map((transaction) => (transaction.id === action.payload.id ? { ...transaction, description: action.payload.description, amount: action.payload.amount } : transaction));
      return {
        ...state,
        transactions: updatedTransaction,
      };
    case 'DELETE_TRANSACTION':
      const index = state.transactions.findIndex((item) => item.id === action.payload);
      if (index !== -1) { state.transactions.splice(index, 1); }
      return state;
    default:
      return state;
  }
};

export default transactionsReducer;
