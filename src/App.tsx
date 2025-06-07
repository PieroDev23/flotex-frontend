import { Routes, Route } from 'react-router';
import { WebLayout } from './layouts/WebLayout';
import { CheckoutProvider } from './context/CheckoutContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import Cart from "./pages/Cart";
import Checkout from './pages/Checkout';
import Faq from './pages/Faq';
import Home from './pages/Home';
import HomeDashboard from './pages/HomeDashboard';
import Login from "./pages/Login";
import Metrics from "./pages/Metrics";
import OrderReview from './pages/OrderReview';
import PrivacyPolicies from './pages/PrivacyPolicies';
import Productos from './pages/Productos';
import CrearProducto from './pages/CrearProducto';
import EditarProducto from './pages/EditarProducto';
import Register from "./pages/Register";
import Shop from './pages/Shop';
import SingleProduct from './pages/SingleProduct';
import Usuarios from './pages/Usuarios';
import UserFrom from './pages/UserFrom';

function App() {
  return (
    <Routes>
      <Route element={<WebLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={
          <CheckoutProvider>
            <Checkout />
          </CheckoutProvider>
        } />
        <Route path="/order/:id" element={<OrderReview />} />
        <Route path="/privacy" element={<PrivacyPolicies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path="/dashboard/" index element={<HomeDashboard />} />
        <Route path="/dashboard/usuarios" element={<Usuarios />} />
        <Route path="/dashboard/usuarios/editar/:id" element={<UserFrom />} />
        <Route path="/dashboard/usuarios/crear" element={<UserFrom />} />
        <Route path="/dashboard/productos" element={<Productos />} />
        <Route path="/dashboard/productos/crear" element={<CrearProducto />} />
        <Route path="/dashboard/productos/editar/:productId" element={<EditarProducto />} />
        <Route path="/dashboard/metricas" element={<Metrics />} />
      </Route>
    </Routes>
  )
}

export default App;
