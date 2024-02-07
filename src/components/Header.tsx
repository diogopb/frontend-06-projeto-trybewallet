import { useSelector } from 'react-redux';
import { UserAndWalletType } from '../types';

function Header() {
  const { user, wallet } = useSelector((state: UserAndWalletType) => state);

  const expTotal = () => {
    return wallet.expenses.reduce((total, expense) => {
      const { currency } = expense;
      const exchangeRate = expense.exchangeRates[currency]?.ask || 0;
      return total + expense.value * exchangeRate;
    }, 0);
  };

  return (
    <header>
      <h1>Wallet</h1>
      <p data-testid="email-field">{user.email}</p>
      <p data-testid="total-field">{expTotal().toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
