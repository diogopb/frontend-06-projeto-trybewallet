import { CURRENCIES_FAIL, CURRENCIES_REQUEST, CURRENCIES_SUCCESS,
  REGISTER_EXPENSE }
  from '../actions';
import { WalletReducerType } from '../../types';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = initialState, action: WalletReducerType) => {
  switch (action.type) {
    case CURRENCIES_REQUEST:
      return {
        ...state,
      };
    case CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };
    case CURRENCIES_FAIL:
      return {
        ...state,
        errorMensage: action.payload,
      };
    case REGISTER_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};

export default wallet;
