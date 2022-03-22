import { IconType } from 'react-icons/lib';

type TCategory = {
  name: string,
  icon: IconType,
}

export type TList = Array<TCategory>

export type TNewTransaction = {
  transactionType: string,
  category: string,
  amount: number,
  newDateFormat: Date | null | string,
  description: string,
};

export type TTransactionAction = {
  type: string,
  payload?: TNewTransaction
}

export type TAccountAction = {
  type: string,
  payload: number
}

export type TTransactions = {
  transactions: Array<TNewTransaction>
}

export type TAccount = {
  inflow: number,
  outflow: number
}

export type TTransactionsOnList = {
  transactions: {
    transactions: Array<TNewTransaction>
  }
}

export type TAccountOnList = {
  account: {
    inflow: number,
    outflow: number
  }
}
