import './App.css';
import * as React from 'react';
import { Signup } from './pages/Signup';
import { ProductList } from './pages/ProductList';
import { Routes, Route } from 'react-router-dom';
import { ItemsList } from './components/ItemsList'
import { Homepage } from './pages/Homepage'
import AuthState from './context/AuthState'
import CartState from './context/CartState'
import NoDataFound from './pages/NoDataFound';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar'
import { CategoryList } from './components/CategoryList';
import OrderList from './pages/CartList';
import Profile from './pages/Profile';
import { Checkout } from './pages/Checkout';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Signin } from './pages/Signin';
import Authentication from './pages/Authentication';
import { ValidateOtp } from './components/ValidateOtp';
import ForgotPassword from './components/ForgotPassword';


const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: "#1769aa",
      dark: "#4dabf5",
    },
    secondary: {
      main: "#ffe0b2",
      light: "#ffe6c1",
      dark: "#b29c7c",
    }
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <CartState>
          <Navbar />
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/all-products" element={<ProductList />} />
            <Route path="/products" element={<ItemsList />} />
            <Route path="/subcategory" element={<CategoryList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/:page" element={<Authentication />} />
            <Route path="*" element={<NoDataFound />} />
          </Routes>
          {/* <Footer /> */}
        </CartState>
      </AuthState>
    </ThemeProvider>
  );
}

export default App;
