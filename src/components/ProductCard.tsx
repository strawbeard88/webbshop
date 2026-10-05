import type { Product } from "../types/types"; 
import "../styling/productCard.css"; 
import { formatPrice, getUnitPrice } from "../utils/pricing";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onOpenInformation: (product: Product) => void;
}

function ProductCard({
    product,
    onAddToCart,
    onOpenInformation,
}: ProductCardProps) {
    const discountedPrice = getUnitPrice(product);

    return (
        <article className="product-card">
            <button
                type="button"
                className="product-card__details-trigger"
                onClick={() => onOpenInformation(product)}
            >
                <div className="product-card__image-container">
                    <img
                        className="product-card__image"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <h2 className="product-card__title">{product.title}</h2>
                {product.onSale ? (
                    <p className="product-card__price">
                        <span className="price-original">
                            {formatPrice(product.price)}
                        </span>{' '}
                        <span className="price-sale">
                            {formatPrice(discountedPrice)}
                        </span>
                    </p>
                ) : (
                    <p className="product-card__price">
                        {formatPrice(product.price)}
                    </p>
                )}
            </button>
            <button
                type="button"
                className="product-card__button"
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? "Köp" : "Tillfälligt slut"}
            </button>
        </article>
    );
}

export default ProductCard;