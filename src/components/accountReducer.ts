import { TAccount, TAccountAction } from '../types/types';

const initialState = {
  inflow: 3156,
  outflow: 606,
  labelDays: [0, 0],
};

const accountReducer = (state: TAccount = initialState, action: TAccountAction) => {
  switch (action.type) {
    case 'ADD_INFLOW':
      return {
        ...state,
        inflow: state.inflow + action.payload,
      };
    case 'ADD_OUTFLOW':
      return {
        ...state,
        outflow: state.outflow + action.payload,
      };
    case 'CHANGE_DAYS_IN_CHART':
      return {
        ...state,
        labelDays: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
