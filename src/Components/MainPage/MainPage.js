import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const expensesUrl = 'http://localhost:3000/expenses';


export default function MainPage() {
    const Url = 'http://localhost:3000/category';
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', imgUrl: '' });

    const fetchData = () => {
        fetch(Url)
            .then(response => response.json())
            .then(data => setData(data));
    };

    useEffect(() => {
        fetchData();
    }, []);


    function handleDeleteCategory(id) {
        fetch(`${Url}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                fetch(expensesUrl)
                    .then(response => response.json())
                    .then(data => {

                        data.forEach(expense => {
                            if (expense.categoryId === id) {
                                fetch(`${expensesUrl}/${expense.id}`, {
                                    method: 'DELETE',
                                });
                            }
                        });
                        fetchData()
                        setData(data.filter(item => item.id !== id));
                    });
            });
    }

    function renderCategory() {
        return data.map(element => (
            <div>
                <div className='containerCategory' key={element.id}>
                    <h1 className='NameCategory'>{element.name}
                        <button className='DeleteCategory' onClick={() => handleDeleteCategory(element.id)}>X</button> </h1>
                    <Link to={`/category_expense/${element.id}`}>
                        <img src={element.imgUrl} alt={element.name} className='ImgCategory'></img>
                    </Link>
                </div>
            </div>
        ));
    }
    function handleAddCategory() {
        fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        })
            .then(response => response.json())
            .then(data => {
                setModalOpen(false);
                fetchData();
            });
    }

    return (
        <div>
            {/* <div className='HeaderContent'>
                <div className='SortAmount'>
                    Сортировать по Цене
                </div>
                <div className='SortCategory'>


                    Сортировать по Категории
                </div>
                <div className='AllBtnHeader'>
                    <div className='btnExpense'>Расходы</div>
                    <div className='btnIncome'>Доходы</div>
                </div>
                <div className='Statistics'>
                    <div className='spent'>Всего потрачено</div>
                    <div className='arrived'>Всего прибыли</div>
                </div>
            </div> */}
            <div className='HeaderContent'><h1>Выберите Категорию</h1></div>
            <div className='CategoryList'>
                {renderCategory()}
                <div className='containerCategory'>
                    <div className='btnAddCategory' id='btnAddCategory' onClick={() => setModalOpen(true)}>
                        <h1 className='NameCategory'>Добавить Категорию</h1>
                        <img className='ImgCategoryAdd' src='https://media.istockphoto.com/id/1206418932/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%B4%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C-%D0%BF%D0%BB%D1%8E%D1%81-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA.jpg?s=612x612&w=0&k=20&c=N9zsg8rkkO-ZtK9vT28rs3FoVaJXr_rG4k1Vg7fuIV0=' alt='Add'></img>

                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className='modalBackground'>
                    <div className='modal'>
                        <h2>Добавить новую категорию</h2>
                        <input type='text' placeholder='Номер' value={newCategory.id} onChange={(e) => setNewCategory({ ...newCategory, id: e.target.value })} />
                        <input type='text' placeholder='Имя' value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
                        <input type='text' placeholder='Ссылка на картинку' value={newCategory.imgUrl} onChange={(e) => setNewCategory({ ...newCategory, imgUrl: e.target.value })} />
                        <button onClick={handleAddCategory}>Добавить</button>
                        <button onClick={() => setModalOpen(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}
