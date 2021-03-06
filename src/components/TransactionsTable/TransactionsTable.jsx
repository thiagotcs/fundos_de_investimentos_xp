import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import {
  getTransactions,
  selectSearch,
} from '../../features/search/searchSlice';
import { Wrapper } from './styles';

export function TransactionsTable() {
  const { transactions } = useSelector(selectSearch);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <Wrapper>
      {transactions.length < 1 && <Loader />}
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Nome</th>
            <th>Cotação</th>
            <th>Percentual no fundo</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.ticker}</td>
              <td>{transaction.name}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.cost)}
              </td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'percent',
                }).format(transaction.percents / 100)}
              </td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
}
