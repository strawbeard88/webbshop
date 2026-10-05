import type { Product } from '../types/types';
import '../styling/productInformation.css';
import { formatPrice, getUnitPrice } from '../utils/pricing';

type ProductInformationProps = {
    product: Product;
    onClose: () => void;
    onBuyNow: (product: Product) => void;
};

export default function ProductInformation({
    product,
    onClose,
    onBuyNow,
}: ProductInformationProps) {
    const discountedPrice = getUnitPrice(product);

    return (
        <div
            className="product-information-overlay"
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <article
                className="product-information"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="product-information__close"
                    aria-label="Stäng produktinformation"
                    onClick={onClose}
                >
                    X
                </button>

                <img
                    className="product-information__image"
                    src={product.image}
                    alt={product.title}
                />
                <h2 className="product-information__title">{product.title}</h2>
                {product.onSale ? (
                    <p className="product-information__price">
                        <span className="price-original">
                            {formatPrice(product.price)}
                        </span>{' '}
                        <span className="price-sale">
                            {formatPrice(discountedPrice)}
                        </span>
                    </p>
                ) : (
                    <p className="product-information__price">
                        {formatPrice(product.price)}
                    </p>
                )}
                <p className="product-information__stock">
                    Lagersaldo: {product.stock}
                </p>
                <button
                    type="button"
                    className="product-information__buy-button"
                    onClick={() => onBuyNow(product)}
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? 'Köp nu' : 'Tillfälligt slut'}
                </button>
            </article>
        </div>
    );
}
