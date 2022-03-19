import { combineReducers } from 'redux';
import transactionsReducer from './components/transactions/transactionsReducer';

const rootReducer = combineReducers({
  transactionsReducer,
});

export default rootReducer;
