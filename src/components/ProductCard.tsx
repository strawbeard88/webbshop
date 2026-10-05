import type { Product } from "../types/types"; 
import "../styling/productCard.css"; 

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-card__image-container">
                <img className="product-card__image" src={product.image} alt={product.title} />
            </div>
            <h2 className="product-card__title">
                {product.title}
            </h2>
            <p className="product-card__price">
                {product.price} kr
            </p>
            <button className="product-card__button" onClick={() => onAddToCart(product)} disabled={product.stock <= 0} >
                {product.stock > 0 ? "Köp" : "Tillfälligt slut"}
            </button>
        </article>
    );
}

export default ProductCard;