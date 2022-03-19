import { TTransactionsState, TAction } from '../../types/types';

const initialState = {
  transactions: [],
};

const transactionsReducer = (state: TTransactionsState = initialState, action: TAction) => {
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
