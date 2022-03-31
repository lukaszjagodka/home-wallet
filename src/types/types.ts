import { IconType } from 'react-icons/lib';

type TCategory = {
  name: string,
  icon: IconType,
}

export type TList = Array<TCategory>

export type TNewTransaction = {
  id: string,
  transactionType: string,
  category: string,
  amount: number,
  selectedDay: Date | null,
  description: string,
  whenObjAdded: Date
};

export type TTransactionAction = {
  type: string,
  payload?: any
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
  outflow: number,
  labelDays: Array<number>,
  editMode: boolean
}

export type TTransactionsOnList = {
  transactions: {
    transactions: Array<TNewTransaction>
  }
}

export type TAccountOnList = {
  account: {
    inflow: number,
    outflow: number,
    labelDays: Array<number>,
    editMode: boolean
  }
}

export type TEditTransaction = {
  id: string,
  description: string,
  amount: number
}
