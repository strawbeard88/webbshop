import { useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '../types/types';
import { getProducts } from '../api/api';
import '../styling/productsPage.css';
import { CartContext } from '../context/CartContext';
import ProductCard from './ProductCard';
import ProductInformation from './ProductInformation';
import ProductSorting from './ProductSorting';

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('ProductsPage måste ligga inuti CartProvider');
    }

    const { addToCart } = cartContext;

    const handleBuyNow = (product: Product) => {
        addToCart(product);
        setSelectedProduct(null);
    };

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    const categories = useMemo(
        () =>
            Array.from(new Set(products.flatMap((product) => product.categories))).sort(
                (a, b) => a.localeCompare(b, 'sv')
            ),
        [products]
    );

    const filteredProducts = useMemo(() => {
        const normalizedNameFilter = nameFilter.trim().toLowerCase();

        return products.filter((product) => {
            const matchesName = product.title
                .toLowerCase()
                .includes(normalizedNameFilter);
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.some((category) =>
                    product.categories.includes(category)
                );

            return matchesName && matchesCategory;
        });
    }, [products, nameFilter, selectedCategories]);

    const handleToggleCategory = (category: string) => {
        setSelectedCategories((previousCategories) => {
            if (previousCategories.includes(category)) {
                return previousCategories.filter(
                    (selectedCategory) => selectedCategory !== category
                );
            }

            return [...previousCategories, category];
        });
    };

    return (
        <div className="products-page">
            <ProductSorting
                categories={categories}
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
                nameFilter={nameFilter}
                onNameFilterChange={setNameFilter}
            />

            <div className="products-list">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onOpenInformation={setSelectedProduct}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 ? (
                <p>Inga produkter matchar filtreringen.</p>
            ) : null}

            {selectedProduct ? (
                <ProductInformation
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onBuyNow={handleBuyNow}
                />
            ) : null}
        </div>
    );
}
