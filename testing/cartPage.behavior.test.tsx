import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useContext } from 'react';
import CartProvider, { CartContext } from '../src/context/CartContext';
import CartPage from '../src/components/CartPage';
import type { Product } from '../src/types/types';


const testProduct: Product = {
    id: 'product-1',
    title: 'Testkort',
    price: 100,
    categories: ['test'],
    onSale: false,
    image: '/testkort.webp',
    stock: 10,
};

function CartTestHarness() {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error('CartTestHarness måste ligga inuti CartProvider');
    }

    return (
        <>
            <button onClick={() => cartContext.addToCart(testProduct)}>
                Lägg till testkort
            </button>
            <button onClick={() => cartContext.addToCart(testProduct)}>
                Lägg till testkort igen
            </button>

            <CartPage />
        </>
    );
}

describe('CartPage behavior', () => {
    it('keeps one row per product and updates quantity correctly', async () => {
        render(
            <MemoryRouter>
                <CartProvider>
                    <CartTestHarness />
                </CartProvider>
            </MemoryRouter>
        );


        expect(screen.getByText('Din kundvagn är tom.')).toBeInTheDocument();


        fireEvent.click(screen.getByText('Lägg till testkort'));
        fireEvent.click(screen.getByText('Lägg till testkort igen'));


        await waitFor(() => {
            expect(screen.getByText('Antal: 2')).toBeInTheDocument();
            expect(screen.getAllByText('Radera raden')).toHaveLength(1);
        });


        fireEvent.click(screen.getByText('-'));

        await waitFor(() => {
            expect(screen.getByText('Antal: 1')).toBeInTheDocument();
        });


        fireEvent.click(screen.getByText('Radera raden'));

        await waitFor(() => {
            expect(screen.getByText('Din kundvagn är tom.')).toBeInTheDocument();
        });
    });
});
