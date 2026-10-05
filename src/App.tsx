import "./App.css";
import { Route, Routes } from "react-router-dom";
import CartProvider from "./context/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProductsPage } from "./components/ProductsPage";
import CartPage from "./components/CartPage";

function App() {
    return (
        <div className="App">

            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Routes>
                <Footer />
            </CartProvider>

        </div>
    );
}

export default App;