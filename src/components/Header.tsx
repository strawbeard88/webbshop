import '../styling/header.css';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


export default function Header() {
    const title = <Link to="/" className="header-title">MagicMarket</Link>;
    const cart = <Link to="/cart" className="header-cart">🛒</Link>;
    const { cartItemCount } = useContext(CartContext)!;

    return (
       <header className="header">
           {title}
           <div>
                {cart}
                <p>{cartItemCount}</p>
           </div>
       </header>
    )
}