import type { Product, Order } from '../types/types';

const APIUrl = 'http://localhost:3001';

// Getting all products in array
export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${APIUrl}/products`);

    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;
}

// Getting a single product by ID
export async function getProduct(id: number): Promise<Product> {
    const response = await fetch(`${APIUrl}/products/${id}`);

    //TODO: Tabort denna logg
    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
}