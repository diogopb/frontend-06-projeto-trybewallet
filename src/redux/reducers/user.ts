import { AnyAction } from 'redux';

const initialState = {
  email: '',
};

const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SUBMIT_LOGIN':
      return {
        ...state,
        email: action.payload,
      };
    default: return state;
  }
};

export default user;
