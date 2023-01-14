import "./App.css";
import * as React from "react";
import { Signup } from "./pages/Signup";
import { ProductList } from "./pages/ProductList";
import { Routes, Route } from "react-router-dom";
import { ItemsList } from "./components/ItemsList";
import { Homepage } from "./pages/Homepage";
import AuthState from "./context/AuthState";
import CartState from "./context/CartState";
import NoDataFound from "./pages/NoDataFound";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import { CategoryList } from "./components/CategoryList";
import OrderList from "./pages/CartList";
import Profile from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Signin } from "./pages/Signin";
import Authentication from "./pages/Authentication";
import { ValidateOtp } from "./components/ValidateOtp";
import ForgotPassword from "./components/ForgotPassword";
import { getFooter, getHomepageData, getSubCategory } from "./context/Apis";
import NotificationState from "./context/NotificationState";
import { ProductDetailView } from "./pages/ProductDetailView";

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
    },
  },
});

function App() {
  const [FooterData, setFooterData] = React.useState(null);
  const [HomepageData, setHomepageData] = React.useState(null);
  const [SubCategory, setSubCategory] = React.useState(null);

  const getData = async () => {
    try {
      const footerData = await getFooter();
      setFooterData(footerData);
      const homepageData = await getHomepageData();
      setHomepageData(homepageData);
      const data = await getSubCategory();
      setSubCategory(data["results"]);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NotificationState>
        <AuthState>
          <CartState>
            <Navbar />
            <Header SubCategory={SubCategory} />
            <Routes>
              <Route
                path="/"
                element={<Homepage HomepageData={HomepageData} />}
              />
              <Route path="/all-products" element={<ItemsList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/category" element={<CategoryList />} />
              <Route path="/order" element={<OrderList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product-view" element={<ProductDetailView />} />
              <Route path="*" element={<NoDataFound />} />
              <Route path="/:page" element={<Authentication />} />
            </Routes>
            <Footer FooterData={FooterData} />
          </CartState>
        </AuthState>
      </NotificationState>
    </ThemeProvider>
  );
}

export default App;
