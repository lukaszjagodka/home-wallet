import { combineReducers } from 'redux';
import accountReducer from './components/accountReducer';
import transactionsReducer from './components/transactions/transactionsReducer';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  account: accountReducer,
});

export default rootReducer;
