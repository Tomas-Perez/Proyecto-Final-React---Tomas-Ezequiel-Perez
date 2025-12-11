import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import ProductForm from './components/ProductForm';
import Header from './components/Header';
import Home from './components/Home';
import Ofertas from './components/Ofertas';
import Infaltables from './components/Infaltables';
import Login from './components/Login'; 
import Footer from './components/Footer';
import Carrito from "./components/Carrito";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductsProvider>
          <Router>
            <Header />
            <Routes>
              {/* Rutas Publicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/infaltables" element={<Infaltables />} />

              {/* Rutas Protegidas */}
              <Route 
                path="/carrito" 
                element={
                  <ProtectedRoute>
                    <Carrito />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/producto/nuevo" 
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/producto/editar/:id" 
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                } 
              />
              
            </Routes>
            <Footer/>
          </Router>
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;