import type { Product } from '../types/types';

const SALE_DISCOUNT = 0.15;

export function getUnitPrice(product: Product): number {
    if (!product.onSale) {
        return product.price;
    }

    return Math.round(product.price * (1 - SALE_DISCOUNT) * 100) / 100;
}

export function formatPrice(price: number): string {
    return `${price.toLocaleString('sv-SE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })} kr`;
}
