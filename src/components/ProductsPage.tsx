import { useEffect, useState, useContext } from 'react';
import type { Product } from '../types/types';
import { getProducts } from '../api/api';
import '../styling/productsPage.css';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
      throw new Error("ProductsPage måste ligga inuti CartProvider");
  }

  const { addToCart } = cartContext;

  useEffect(() => {
      getProducts()
          .then((data) => setProducts(data))
          .catch((error) => console.error(error));
  }, []);

  return (
      <div className="products-page">
          <div className="products-list">
              {products.map((product) => (
                  <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                  />
              ))}
          </div>
      </div>
  );
}