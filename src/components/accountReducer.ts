import { TAccount, TAccountAction } from '../types/types';

const initialState = {
  inflow: 3156,
  outflow: 606,
};

const accountReducer = (state: TAccount = initialState, action: TAccountAction) => {
  switch (action.type) {
    case 'ADD_THE_AMOUNT_TO_THE_INFLOW':
      return {
        ...state,
        inflow: action.payload,
      };
    case 'ADD_THE_AMOUNT_TO_THE_OUTFLOW':
      return {
        ...state,
        outflow: action.payload,
      };
    case 'ADD_INFLOW':
      return {
        ...state,
        inflow: state.inflow + action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
