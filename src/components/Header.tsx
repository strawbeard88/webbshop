import '../styling/header.css';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';


export default function Header() {
    const title = <h1 className="header-title">MagicMarket</h1>;
    const cart = <div className="header-cart">🛒</div>;
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