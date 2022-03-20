export const addAmountToInflow = (payload: number) => ({
  type: 'ADD_THE_AMOUNT_TO_THE_INFLOW',
  payload,
});

export const addAmountToOutflow = (payload: number) => ({
  type: 'ADD_THE_AMOUNT_TO_THE_OUTFLOW',
  payload,
});

export const addInflow = (payload: number) => ({
  type: 'ADD_INFLOW',
  payload,
});
