import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/expenses')
      .then(response => {
        setExpenses(response.data);
        setTotal(response.data.reduce((acc, curr) => acc + Number(curr.price), 0));
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:3000/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sort === 'price') {
      return a.price - b.price;
    } else if (sort === 'category') {
      const aCategory = categories.find(category => category.id === a.categoryId);
      const bCategory = categories.find(category => category.id === b.categoryId);
      if (aCategory && bCategory) {
        return aCategory.name.localeCompare(bCategory.name);
      } else {
        return 0;
      }
    } else {
      return expenses;
    }
  });

  return (
    <div>
      <div className='HeaderContent'>
        <div className='SortAmount' onClick={() => setSort('price')}>
          Сортировать по Цене
        </div>
        <div className='SortCategory' onClick={() => setSort('category')}>
          Сортировать по Категории
        </div>
        <div className='Statistics'>
          <div className='spent'>Всего потрачено: {total}</div>
        </div>
      </div>
      <div className='AllContainerCategoryExpense'>
        {sortedExpenses.map(expense => {
          const category = categories.find(category => category.id === expense.categoryId);
          return (

            <div key={expense.id} className='ContainerCategoryExpense'>
              <div>Цена: {expense.price}</div>
              <div>Категория: {category ? category.name : 'Неизвестно'}</div>
              <div>Коментарий: {expense.comment}</div>
            </div>

          );
        })}
      </div>
    </div>
  );
}
