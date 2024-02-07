import { UserType } from '../../types';

const initialState = {
  email: '',
};

const user = (state = initialState, action: UserType) => {
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
