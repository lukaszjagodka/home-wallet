/* eslint-disable no-case-declarations */
import { TAccount, TAccountAction } from '../types/types';

const initialState = {
  inflow: 0,
  outflow: 0,
  labelDays: [0, 0],
  editMode: false,
  updateChart: false,
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
    case 'EDIT_MODE':
      return {
        ...state,
        editMode: action.payload,
      };
    case 'UPDATE_CHART':
      return {
        ...state,
        updateChart: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
