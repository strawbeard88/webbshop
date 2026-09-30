import type { Product, Order } from '../types/types';

const APIUrl = 'http://localhost:3001';


export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${APIUrl}/products`);

    console.log("Status:", response.status);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;
}