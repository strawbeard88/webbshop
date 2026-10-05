import type { Product, Order, NewOrder } from '../types/types';

const APIUrl = 'http://localhost:3001';

function normalizeImagePath(image: string): string {
    const hasExtension = /\.[a-z0-9]+$/i.test(image);
    const normalizedPath = hasExtension ? image : `${image}.webp`;

    if (normalizedPath.startsWith('/')) {
        return normalizedPath;
    }

    return `/${normalizedPath}`;
}

// Getting all products in array
export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${APIUrl}/products`);

    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return (data as Product[]).map((product) => ({
        ...product,
        image: normalizeImagePath(product.image),
    }));
}

// Getting a single product by ID
export async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`${APIUrl}/products/${id}`);

    //TODO: Tabort denna logg
    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return {
        ...(data as Product),
        image: normalizeImagePath((data as Product).image),
    };
}

// Post new order
export async function createOrder(order: NewOrder): Promise<Order> {
    const response = await fetch(`${APIUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to create order");
    }

    const data = await response.json();

    return data;
}

export async function getOrder(id: string): Promise<Order> {
    const response = await fetch(`${APIUrl}/orders/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch order');
    }

    const data = await response.json();

    return data;
}