import '../styling/cartpage.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartProductList from './CartProductList';


export default function CartPage() { 
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartPage måste ligga inuti CartProvider');
    }

    const { cart, addToCart, removeOneFromCart, removeFromCart } = cartContext;
    const totalPrice = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    return (
        <section className="cart-page">
            <h1>Produkter</h1>

            {cart.length === 0 ? (
                <p>Din kundvagn är tom.</p>
            ) : (
                <CartProductList
                    cart={cart}
                    addToCart={addToCart}
                    removeOneFromCart={removeOneFromCart}
                    removeFromCart={removeFromCart}
                />
            )}

            <p className="cart-total-price">Totalpris: ${totalPrice}</p>

            <div className="cart-actions">
                <Link to="/" className="cart-link-button">
                    Shoppa mer
                </Link>
                <Link to="/checkout" className="cart-link-button">
                    Checka ut
                </Link>
            </div>
        </section>
    );
}