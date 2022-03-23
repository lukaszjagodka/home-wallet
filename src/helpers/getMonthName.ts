const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const getMonthName = (props: number) => {
  const actualMonth: number = props;
  const dateFormat = new Date(2020, actualMonth, 1);
  const sMonth = String(monthNames[dateFormat.getMonth()]);
  return sMonth;
};
