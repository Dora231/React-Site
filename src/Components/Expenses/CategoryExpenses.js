import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CategoryExpenses() {
  const { id: categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const expensesUrl = 'http://localhost:3000/expenses';

  useEffect(() => {
    fetch(expensesUrl)
      .then(response => response.json())
      .then(data => {
        const categoryExpenses = data.filter(expense => expense.categoryId === categoryId);
        setExpenses(categoryExpenses);
      });
  }, [categoryId]);

  return (
    <div className='AllContainerCategoryExpense'>
      {expenses.map(expense => (
        <div  key={expense.id}>
          <div className='ContainerCategoryExpense'>
            {/* <p>Номер: {expense.id}</p> */}
            <p>Цена: {expense.price}</p>
            <p>Коментарий: {expense.comment}</p>
            <p>Дата: {expense.data}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

