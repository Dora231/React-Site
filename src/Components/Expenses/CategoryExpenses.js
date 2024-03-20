import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryExpenses() {
  const { id: categoryId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ price: '', comment: '', date: '' });
  const expensesUrl = 'http://localhost:3000/expenses';

  useEffect(() => {
    fetch(expensesUrl)
      .then(response => response.json())
      .then(data => {
        const categoryExpenses = data.filter(expense => expense.categoryId === categoryId);
        setExpenses(categoryExpenses);
      });
  }, [categoryId]);

  const addExpense = (event) => {
    event.preventDefault();
    fetch(expensesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newExpense, categoryId }),
    })
      .then(response => response.json())
      .then(data => {
        setExpenses(prevExpenses => [...prevExpenses, data]);
        setShowModal(false);
      });
  };

  return (
    <div className='AllContainerCategoryExpense'>
      {expenses.map(expense => (
        <div key={expense.id}>
          <div className='ContainerCategoryExpense'>
            <p>Цена: {expense.price}</p>
            <p>Коментарий: {expense.comment}</p>
            <p>Дата: {expense.date}</p>

          </div>
        </div>
      ))}
      <div className='ContainerCategoryExpense' id='AddExpense' onClick={() => setShowModal(true)}>
        <img className='ImgExpenseAdd' src='https://media.istockphoto.com/id/1206418932/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D0%BF%D0%BB%D1%8E%D1%81-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA.jpg?s=612x612&w=0&k=20&c=N9zsg8rkkO-ZtK9vT28rs3FoVaJXr_rG4k1Vg7fuIV0=' alt='Add'></img>
      </div>
      {showModal && (
        <div className='modalBackground'>
          <div className='modal'>
            <form onSubmit={addExpense}>
              <label>
                Цена:
                <input type='number' value={newExpense.price} onChange={e => setNewExpense({ ...newExpense, price: e.target.value })} required />
              </label>
              <label>
                Коментарий:
                <input type='text' value={newExpense.comment} onChange={e => setNewExpense({ ...newExpense, comment: e.target.value })} required />
              </label>
              <label>
                Дата:
                <input type='date' value={newExpense.date} onChange={e => setNewExpense({ ...newExpense, date: e.target.value })} required />
              </label>
              <button type='submit'>Добавить</button>
              <button onClick={() => setShowModal(false)}>Закрыть</button>
            </form>
          </div>
        </div>)}
    </div>
  );
}
