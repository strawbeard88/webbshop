import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProductsPage } from '../src/components/ProductsPage';
import CartProvider from '../src/context/CartContext';


describe('ProductsPage filter logic', () => {

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                id: '1',
                title: 'Blue hoodie',
                price: 299,
                categories: ['blue', 'hoodie'],
                onSale: false,
                image: '/fake-blue.webp',
                stock: 5,
              },
              {
                id: '2',
                title: 'Red hoodie',
                price: 399,
                categories: ['red', 'hoodie'],
                onSale: true,
                image: '/fake-red.webp',
                stock: 2,
              },
              {
                id: '3',
                title: 'Green tee',
                price: 199,
                categories: ['green', 'shirt'],
                onSale: false,
                image: '/fake-green.webp',
                stock: 9,
              },
            ]),
        })
      )
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows only products that match selected category and title search', async () => {

    render(
      <CartProvider>
        <ProductsPage />
      </CartProvider>
    );


    await waitFor(() => {
      expect(screen.getByText('Blue hoodie')).toBeInTheDocument();
      expect(screen.getByText('Red hoodie')).toBeInTheDocument();
      expect(screen.getByText('Green tee')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('blue'));

    await waitFor(() => {
      expect(screen.getByText('Blue hoodie')).toBeInTheDocument();
      expect(screen.queryByText('Red hoodie')).not.toBeInTheDocument();
      expect(screen.queryByText('Green tee')).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Sök kortnamn/i), {
      target: { value: 'hoodie' },
    });

    await waitFor(() => {
      expect(screen.getByText('Blue hoodie')).toBeInTheDocument();
      expect(screen.queryByText('Red hoodie')).not.toBeInTheDocument();
      expect(screen.queryByText('Green tee')).not.toBeInTheDocument();
    });


    fireEvent.click(screen.getByLabelText('red'));

    await waitFor(() => {
      expect(screen.getByText('Blue hoodie')).toBeInTheDocument();
      expect(screen.getByText('Red hoodie')).toBeInTheDocument();
      expect(screen.queryByText('Green tee')).not.toBeInTheDocument();
    });
  });
});
