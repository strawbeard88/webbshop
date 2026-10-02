import React, { createContext, useContext, useState } from "react";
import type { Product, CartItem } from '../types/types';

type CartContextValue = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    decreaseQuantity: (product: Product) => void;
}


const CartContext = createContext<CartContextValue | null>(null);

const [cart, setCart] = useState<CartItem[]>([]);


//Add to cart function
const addToCart = (product: Product) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.id === product.id);

        if (existingItem) {
            return prevCart.map(item =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        }
        return [...prevCart, { id: product.id, 
            product,
            quantity: 1 }];
    } )
}