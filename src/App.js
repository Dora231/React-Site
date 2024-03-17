import './App.css';
import MainPage from './Components/MainPage/MainPage';
import Header from './Components/Header/Header';
import Expenses from './Components/Expenses/Expenses';
import Income from './Components/Income/Income';
import CategoryExpenses from './Components/Expenses/CategoryExpenses';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <Routes>
      <Route path='/' element={<MainPage></MainPage>}></Route>
      <Route path='income' element={<Income></Income>}></Route>
      <Route path='expense' element={<Expenses></Expenses>}></Route>  
      <Route path='category_expense/:id' element={<CategoryExpenses></CategoryExpenses>}></Route>

      </Routes>
      </BrowserRouter>
      
      
      
      
    </div>
  );
}

export default App;
