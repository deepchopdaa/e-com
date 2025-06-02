import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './component/product';
import { Router, Routes, Route } from "react-router-dom"
import Admin from './component/Admin';
import Category from './component/category';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />}>
          <Route path='product' element={<Product />} />
          <Route path='category' element={<Category/>} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
