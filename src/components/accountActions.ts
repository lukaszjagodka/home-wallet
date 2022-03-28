export const addInflow = (payload: number) => ({
  type: 'ADD_INFLOW',
  payload,
});

export const addOutflow = (payload: number) => ({
  type: 'ADD_OUTFLOW',
  payload,
});

export const changeDaysInChart = (payload: Array<number>) => ({
  type: 'CHANGE_DAYS_IN_CHART',
  payload,
});

export const editMode = (payload: boolean) => ({
  type: 'EDIT_MODE',
  payload,
});
