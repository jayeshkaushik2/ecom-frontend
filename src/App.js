import './App.css';
import * as React from 'react';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { ProductList } from './pages/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoryList } from './pages/CategoryList';
import NoDataFound from './pages/NoDataFound';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/category" element={<CategoryList />} />
        
        <Route path="/no-data-found" element={<NoDataFound />} />
      </Routes>
    </Router>
  );
}

export default App;
