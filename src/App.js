import './App.css';
import * as React from 'react';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { ProductList } from './pages/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CategoryList } from './pages/CategoryList';
import NoDataFound from './pages/NoDataFound';
import Profile from './pages/Profile';
// import { PrivateRoute } from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ItemsList } from './pages/ItemsList';
import { Homepage } from './pages/Homepage'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          
          <Route path="/category" element={<Homepage page="subcategory" />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/product-list" element={<ProductList />} />

          <Route path="/items" element={<ItemsList />} />

          <Route path="/no-data-found" element={<NoDataFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
