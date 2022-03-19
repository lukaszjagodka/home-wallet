type TCategory = {
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

export type TAction = {
  type: string,
  payload?: TNewTransaction
}

export type TTransactionsState = {
  transactions: Array<TNewTransaction>
}
