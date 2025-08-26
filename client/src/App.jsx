import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
 import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from './components/Cart'
import Address from './components/Address'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";



const App = () => {
  // const {} = useContext(AppContext)
  return (
    <Router>
      <Navbar />
      <Carousel />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/oderconfirmation" element={<OrderConfirmation />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
