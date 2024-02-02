export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (email: string) => ({
  type: SUBMIT_LOGIN,
  payload: email,
});
