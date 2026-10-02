export interface Product {
    id: string;
    title: string;
    price: number;
    categories: string[];
    onSale: boolean;
    image: string;
    stock: number;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: OrderItem[];
    customer: {
        name: string;
        address: string;
    };
    shipping: string;
    payment: string;
    date: string;
}