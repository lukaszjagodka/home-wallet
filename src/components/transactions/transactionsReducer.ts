/* eslint-disable no-case-declarations */
import { TTransactions, TTransactionAction } from '../../types/types';

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
      let updatedTransaction: any = {};
      const editObj = action.payload;
      if (editObj) {
        updatedTransaction = state.transactions.map((transaction) => (transaction.id === editObj.id ? { ...transaction, description: editObj.description, amount: editObj.amount } : transaction));
      }
      return {
        ...state,
        transactions: updatedTransaction,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
