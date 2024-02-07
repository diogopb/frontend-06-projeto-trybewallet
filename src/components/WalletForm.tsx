import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchCurrencies, handleFetchExpenses }
  from '../redux/actions';
import { UserAndWalletType, Dispatch } from '../types';

function WalletForm() {
  const wallet = useSelector((state: UserAndWalletType) => state.wallet);
  const dispatch: Dispatch = useDispatch();

  const [form, setForm] = useState({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  const getNewId = () => {
    const lastExpense = wallet.expenses[wallet.expenses.length - 1];
    return lastExpense ? lastExpense.id + 1 : 0;
  };

  useEffect(() => {
    dispatch(handleFetchCurrencies());
  }, [dispatch]);

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(handleFetchExpenses({
      id: getNewId(),
      ...form,
    }));
    setForm({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <label htmlFor="value">
          Valor:
          {' '}
          <input
            id="value"
            name="value"
            type="text"
            value={ form.value }
            onChange={ handleChange }
            data-testid="value-input"
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Descrição:
          {' '}
          <input
            id="description"
            name="description"
            type="text"
            value={ form.description }
            onChange={ handleChange }
            data-testid="description-input"
          />
        </label>
      </div>
      <select
        id="currency"
        name="currency"
        value={ form.currency }
        onChange={ handleChange }
        data-testid="currency-input"
      >
        {wallet.currencies.map((curr: any) => (
          <option key={ curr } value={ curr }>{curr}</option>
        ))}
      </select>
      <select
        id="method"
        name="method"
        value={ form.method }
        onChange={ handleChange }
        data-testid="method-input"
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <select
        id="tag"
        name="tag"
        onChange={ handleChange }
        data-testid="tag-input"
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="submit">
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;
