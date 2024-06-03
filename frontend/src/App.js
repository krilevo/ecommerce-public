import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import { AuthProvider } from './utils/AuthContext';
import Checkout from './components/Checkout/PersonalDetails';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './utils/CartContext';
import ThankYouPage from './pages/ThankYouPage';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import AdminRouteWrapper from './utils/AdminRouteWrapper';
import { PopupProvider } from './utils/PopupContext';
import Popup from './components/common/Popup/Popup';

function App() {

  return (
    <div className="app-container">
      <BrowserRouter>
        <AuthProvider>
          <PopupProvider>
            <CartProvider>
              <Header/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route exact path="/category/:category" element={<CategoryPage />} />
                  <Route exact path="/product/:productID/:productName" element={<ProductPage/>} />
                  <Route exact path="/login" element={<LoginPage/>} />
                  <Route exact path="/create-account" element={<CreateAccount/>}/>
                  <Route exact path="/cart" element={<CheckoutPage/>}/>
                  <Route exact path="/cart/checkout" element={<Checkout/>}/>
                  <Route exact path="/thank-you" element={<ThankYouPage/>}/>
                  <Route
                    path="/admin/*"
                    element={
                      <AdminRouteWrapper />
                    }
                  />
                </Routes>
              <Footer/>
              <Popup/>
            </CartProvider>
          </PopupProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
