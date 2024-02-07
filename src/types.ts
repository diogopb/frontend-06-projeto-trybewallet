import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserType = {
  type: string,
  payload: string
};

export type WalletReducerType = {
  type: string,
  payload: WalletType,
};

export type ExchangeRates = {
  code: string,
  codein: string,
  name: string,
  high: number,
  low: number,
  varBid: number,
  pctChange: number,
  bid: number,
  ask: number,
  timestamp: number,
  create_date: string,
};

export type Expenses = {
  id: number,
  value: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  formatedValue: number,
  exchangeRates: { [key: string]: ExchangeRates },
};

export type UserAndWalletType = {
  user: {
    email: string,
  };
  wallet: {
    currencies: any,
    expenses: [Expenses],
    editor: boolean,
    idToEdit: BigInteger,
  }; };

export type WalletType = {
  currencies: any,
  expenses: [],
  editor: boolean,
  idToEdit: BigInteger,
  errorMessage: string,
};

export type Dispatch = ThunkDispatch<WalletType, null, AnyAction>;
