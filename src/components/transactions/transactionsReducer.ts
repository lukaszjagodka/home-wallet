import { TTransactions, TTransactionAction } from '../../types/types';

const initialState = {
  transactions: [
    {
      amount: 141,
      category: 'Transportation',
      description: 'Is it bungla?',
      newDateFormat: '16/03/2022',
      transactionType: 'Expense',
    },
    {
      amount: 465,
      category: 'Rentals',
      description: 'Lorem ipsum dolor',
      newDateFormat: '15/03/2022',
      transactionType: 'Expense',
    },
    {
      amount: 3156,
      category: 'Salary',
      description: 'Lorem ipsum dolor',
      newDateFormat: '10/03/2022',
      transactionType: 'Income',
    },
  ],
};

const transactionsReducer = (state: TTransactions = initialState, action: TTransactionAction) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

export default transactionsReducer;
