export type TCategory = {
  name: string,
  icon: any
}

export type TList = Array<TCategory>

export type TNewTransaction = {
  transactionType: string,
  category: string,
  amount: number,
  newDateFormat: Date | null | string,
  description: string,
};
