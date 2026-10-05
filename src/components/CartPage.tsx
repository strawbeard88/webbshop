import '../styling/cartpage.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';


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
                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-row">
                            <img
                                className="cart-row-image"
                                src={item.product.image}
                                alt={item.product.title}
                            />
                            <p>Antal: {item.quantity}</p>
                            <p>Pris: ${item.product.price}</p>
                            <button onClick={() => addToCart(item.product)}>+</button>
                            <button onClick={() => removeOneFromCart(item.id)}>-</button>
                            <button onClick={() => removeFromCart(item.id)}>
                                Radera raden
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <p className="cart-total-price">Totalpris: ${totalPrice}</p>

            <div className="cart-actions">
                <Link to="/" className="cart-link-button">
                    Shoppa mer
                </Link>
                <button type="button">Checka ut</button>
            </div>
        </section>
    );
}