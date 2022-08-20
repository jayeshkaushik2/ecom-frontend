import './App.css';
import * as React from 'react';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { ProductList } from './pages/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsList } from './components/ItemsList'
import { Homepage } from './pages/Homepage'
import AuthState from './context/AuthState'
import CartState from './context/CartState'
import NoDataFound from './pages/NoDataFound';
import Profile from './pages/Profile';

function App() {

  return (
    <Router>
      <AuthState>
        <CartState>
          <Routes>
            <Route path="/" element={<Homepage page="home" />} />

            <Route path="/category" element={<Homepage page="subcategory" />} />

            <Route path="/products" element={<Homepage page="searched_products" />} />

            <Route path="/all-products" element={<Homepage page="all_products" />} />

            <Route path="/order" element={<Homepage page="order" />} />

            <Route path="/profile" element={<Homepage page="profile" />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/signin" element={<Signin />} />

            <Route path="/product-list" element={<ProductList />} />

            <Route path="/items" element={<ItemsList />} />

            <Route path="/no-data-found" element={<NoDataFound />} />
          </Routes>
        </CartState>
      </AuthState>
    </Router>
  );
}

export default App;
