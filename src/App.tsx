import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProductsPage } from "./components/ProductsPage";
import CartProvider from "./context/CartContext";
import CartPage from "./components/CartPage";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <CartProvider>
                    <Header />
                    <ProductsPage />
                    <CartPage />
                    <Footer />
                </CartProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;