import "./App.css";
import { Route, Routes } from "react-router-dom";
import CartProvider from "./context/CartContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProductsPage } from "./components/ProductsPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

function App() {
    return (
        <div className="App">

            <CartProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/order-confirmation/:orderId"
                        element={<OrderConfirmationPage />}
                    />
                </Routes>
                <Footer />
            </CartProvider>

        </div>
    );
}

export default App;