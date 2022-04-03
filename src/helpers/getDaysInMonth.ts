export const getDaysInMonth = (date: Date = new Date()) => {
  const now = new Date();
  const month = date.getMonth();
  const year = now.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const array = [daysInMonth, month];
  return array;
};
