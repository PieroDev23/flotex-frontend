import { Route, Routes } from 'react-router';
import { WebLayout } from './layouts/WebLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import SingleProduct from './pages/SingleProduct';
import Checkout from './pages/Checkout';
import OrderReview from './pages/OrderReview';
import Faq from './pages/Faq';
import PrivacyPolicies from './pages/PrivacyPolicies';
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route element={<WebLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderReview />} />
        <Route path="/privacy" element={<PrivacyPolicies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App;
