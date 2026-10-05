import type { CartItem, Product } from '../types/types';
import { formatPrice, getUnitPrice } from '../utils/pricing';

type CartProductListProps = {
    cart: CartItem[];
    addToCart?: (product: Product) => void;
    removeOneFromCart?: (productId: string) => void;
    removeFromCart?: (productId: string) => void;
    showActions?: boolean;
};

export default function CartProductList({
    cart,
    addToCart,
    removeOneFromCart,
    removeFromCart,
    showActions = true,
}: CartProductListProps) {
    if (showActions && (!addToCart || !removeOneFromCart || !removeFromCart)) {
        throw new Error(
            'CartProductList kräver addToCart, removeOneFromCart och removeFromCart när showActions är true.'
        );
    }

    return (
        <div className="cart-list">
            {cart.map((item) => (
                <div key={item.id} className="cart-row">
                    <img
                        className="cart-row-image"
                        src={item.product.image}
                        alt={item.product.title}
                    />
                    <p>Antal: {item.quantity}</p>
                    {item.product.onSale ? (
                        <p className="cart-row-price">
                            Pris:{' '}
                            <span className="price-original">
                                {formatPrice(item.product.price)}
                            </span>{' '}
                            <span className="price-sale">
                                {formatPrice(getUnitPrice(item.product))}
                            </span>
                        </p>
                    ) : (
                        <p className="cart-row-price">
                            Pris: {formatPrice(item.product.price)}
                        </p>
                    )}
                    {showActions ? (
                        <>
                            <button onClick={() => addToCart!(item.product)}>+</button>
                            <button onClick={() => removeOneFromCart!(item.id)}>-</button>
                            <button onClick={() => removeFromCart!(item.id)}>
                                Radera raden
                            </button>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
