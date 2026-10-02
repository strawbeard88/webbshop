import { useEffect, useState, useContext } from 'react';
import type { Product } from '../types/types';
import { getProducts } from '../api/api';
import '../styling/productsPage.css';
import { CartContext } from '../context/CartContext';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
      throw new Error("ProductsPage måste ligga inuti CartProvider");
  }

  const { addToCart, removeFromCart } = cartContext;

  useEffect(() => {
      getProducts()
          .then((data) => setProducts(data))
          .catch((error) => console.error(error));
  }, []);

  return (
      <div className="products-page">
          <div className="products-list">
              {products.map((product) => (
                  <div key={product.id} className="product-item">
                      <h3>{product.title}</h3>
                      <p>${product.price}</p>
                      <button onClick={() => addToCart(product)}> Add to Cart </button>
                      <button onClick={() => removeFromCart(product.id)}> Remove from Cart </button>
                  </div>
              ))}
          </div>
      </div>
  );
}