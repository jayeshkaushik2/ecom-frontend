import './App.css';
import * as React from 'react';
import { Signup } from './pages/Signup';
import { ProductList } from './pages/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ItemsList } from './components/ItemsList'
import { Homepage } from './pages/Homepage'
import AuthState from './context/AuthState'
import CartState from './context/CartState'
import NoDataFound from './pages/NoDataFound';
import Authentication from './pages/Authentication'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light:"#1769aa",
      dark:"#4dabf5",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
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

              <Route path="/checkout" element={<Homepage page="checkout" />} />

              <Route path="/signup" element={<Signup />} />


              <Route path="/authentication" element={<Authentication />} />

              <Route path="/product-list" element={<ProductList />} />

              <Route path="/items" element={<ItemsList />} />

              <Route path="/no-data-found" element={<NoDataFound />} />
            </Routes>
          </CartState>
        </AuthState>
      </Router>
    </ThemeProvider>
  );
}

export default App;
