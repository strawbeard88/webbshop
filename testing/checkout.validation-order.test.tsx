import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ContextType } from 'react';
import { vi } from 'vitest';
import CheckoutPage from '../src/components/CheckoutPage';
import { CartContext } from '../src/context/CartContext';
import type { Product } from '../src/types/types';
import { createOrder } from '../src/api/api';


vi.mock('../src/api/api', () => ({
    createOrder: vi.fn(),
}));

const mockedCreateOrder = vi.mocked(createOrder);

const saleProduct: Product = {
    id: 'sale-1',
    title: 'Sale Card',
    price: 200,
    categories: ['blue'],
    onSale: true,
    image: '/sale-card.webp',
    stock: 8,
};

type CartContextValue = NonNullable<ContextType<typeof CartContext>>;

describe('Checkout validation and order flow', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('keeps pay button disabled until forms are valid, then submits order', async () => {
        const clearCart = vi.fn();


        const cartValue: CartContextValue = {
            cart: [
                {
                    id: saleProduct.id,
                    product: saleProduct,
                    quantity: 2,
                },
            ],
            cartItemCount: 2,
            addToCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            clearCart,
        };

        mockedCreateOrder.mockResolvedValue({
            id: 'order-1',
            orderNumber: 'ORD-123456',
            items: [
                {
                    productId: saleProduct.id,
                    title: saleProduct.title,
                    quantity: 2,
                    price: 170,
                },
            ],
            customer: {
                name: 'Kim',
                address: 'Testvägen 1',
            },
            shipping: 'DHL',
            payment: 'Swish',
            date: new Date().toISOString(),
        });

        render(
            <MemoryRouter>
                <CartContext.Provider value={cartValue}>
                    <CheckoutPage />
                </CartContext.Provider>
            </MemoryRouter>
        );

        const payButton = screen.getByRole('button', { name: 'Betala' });


        expect(payButton).toBeDisabled();


        fireEvent.change(screen.getByLabelText('Namn'), {
            target: { value: 'Kim' },
        });
        fireEvent.change(screen.getByLabelText('Adress'), {
            target: { value: 'Testvägen 1' },
        });


        fireEvent.click(screen.getByLabelText('DHL'));
        fireEvent.click(screen.getByLabelText('Swish'));


        await waitFor(() => {
            expect(payButton).toBeEnabled();
        });

        fireEvent.click(payButton);

        await waitFor(() => {
            expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
        });

        expect(clearCart).toHaveBeenCalledTimes(1);
    });
});