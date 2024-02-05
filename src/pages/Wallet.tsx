import { useSelector } from 'react-redux';

type GlobalState = {
  user: {
    email: '',
  }

};

function Wallet() {
  const rootState = useSelector((state: GlobalState) => state);

  return (
    <header data-testid="email-field">
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
      <p data-testid="email-field">{rootState.user.email}</p>
    </header>
  );
}

export default Wallet;
