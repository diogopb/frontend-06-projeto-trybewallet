import { useSelector, useDispatch } from 'react-redux';
import { UserAndWalletType } from '../types';
import { deleteExpense } from '../redux/actions';

function Table() {
  const expenses = useSelector((state: UserAndWalletType) => state.wallet.expenses);
  const dispatch = useDispatch();

  const bodyTable = expenses.map((expense: any) => {
    const valueExp = Number(expense.exchangeRates[expense.currency].ask)
      * Number(expense.value);

    return (
      <tr key={ expense.id }>
        <td>{ expense.description }</td>
        <td>{ expense.tag }</td>
        <td>{ expense.method }</td>
        <td>{ Number(expense.value).toFixed(2) }</td>
        <td>{ expense.exchangeRates[expense.currency].name }</td>
        <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
        <td>{ valueExp.toFixed(2) }</td>
        <td>Real</td>
        <td>
          <button
            data-testid="delete-btn"
            onClick={ () => dispatch(deleteExpense(expense.id)) }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{bodyTable}</tbody>
      </table>
    </div>
  );
}

export default Table;
