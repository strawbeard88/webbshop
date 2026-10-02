import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { ProductsPage } from './components/ProductsPage';
import { CartProvider } from './context/CartContext'; 

function App() {
    return (
        <div className="App">
                <CartProvider>
                    <Header />
                    <ProductsPage />
                    <Footer />
                </CartProvider>
        </div>
    );
}

export default App
