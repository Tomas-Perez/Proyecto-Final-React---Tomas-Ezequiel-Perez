import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Ofertas from './components/Ofertas';
import Infaltables from './components/Infaltables';
import Login from './components/Login'; 
import Footer from './components/Footer';
import Carrito from "./components/Carrito";

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/infaltables" element={<Infaltables />} />
            <Route path="/carrito" element={<Carrito />}/>
          </Routes>
          <Footer/>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App