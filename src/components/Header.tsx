import '../styling/header.css';

export default function Header() {

    const title = <h1 className="header-title">MagicMarket</h1>;
    const cart = <div className="header-cart">Cart</div>;

    return (
       <header className="header">
           {title}
           {cart}
       </header>
    )
}