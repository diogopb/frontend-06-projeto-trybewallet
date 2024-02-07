import { Dispatch } from '../../types';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const submitLogin = (email: string) => (
  { type: SUBMIT_LOGIN,
    payload: email }
);

export const CURRENCIES_REQUEST = 'CURRENCIES_REQUEST';
function currenciesRequest() {
  return { CURRENCIES_REQUEST };
}

export const CURRENCIES_SUCCESS = 'CURRENCIES_SUCCESS';
function currenciesSuccess(currencies: object) {
  return { type: CURRENCIES_SUCCESS,
    payload: currencies };
}

export const CURRENCIES_FAIL = 'CURRENCIES_FAIL';
function currenciesFail(error: string) {
  return { type: CURRENCIES_FAIL,
    payload: error };
}

export const REGISTER_EXPENSE = 'REGISTER_EXPENSE';
function registerExpense(expense: object) {
  return {
    type: REGISTER_EXPENSE,
    payload: expense,
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export function deleteExpense(expenseId: number) {
  return {
    type: 'DELETE_EXPENSE',
    payload: expenseId,
  };
}

const url = 'https://economia.awesomeapi.com.br/json/all';

async function handleGetCurrencies(type: string): Promise<any> {
  const response = await fetch(url);
  const data = await response.json();
  if (type === 'expenseObj') {
    return data;
  }
  const { USDT, ...otherCurrencies } = data;
  return Object.keys(otherCurrencies);
}

export function handleFetchCurrencies() {
  return async (dispatch: Dispatch) => {
    dispatch(currenciesRequest);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch currencies from API');
      }
      const currencies = await response.json();
      const filtered = Object.keys(currencies)
        .filter((currency) => currency !== 'USDT');
      dispatch(currenciesSuccess(filtered));
    } catch (error: any) {
      dispatch(currenciesFail(error.message));
    }
  };
}

export function handleFetchExpenses(expense: any) {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const result: { [key: string]: any } = await handleGetCurrencies('expenseObj');
      const updateExpense = {
        ...expense,
        exchangeRates: result,
      };
      dispatch(registerExpense(updateExpense));
    } catch (error: any) {
      dispatch(currenciesFail(error.message));
    }
  };
}
