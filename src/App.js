import './App.css';
import { Route, Routes,Navigate } from "react-router-dom";

// Components
import Store from './Views/Product/Store';
import ProductDetails from './Views/ProductDetails/ProductDetails';
import Navbar from './components/Navbar/Navbar';
import ShopCart from './Views/ShopCart/ShopCart';
import Login from './Views/Login/Login';

// Context
import ProductContextProvider from './context/ProductContextProvider';
import CartContextProvider from './context/CartContextProvider';
import SignUp from './Views/Signup/SignUp';

function App() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Navbar />
        <Routes>
          <Route path="/products" element={<Store/>} />
           <Route path="/products/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<ShopCart/>} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path='/*' element={<Navigate to="/products" />} />
        </Routes>
      </CartContextProvider>
    </ProductContextProvider>
  );
}

export default App;
