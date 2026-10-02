import React, { createContext, useState } from "react";
import type { Product, CartItem } from "../types/types";

type CartContextValue = {
    cart: CartItem[];
    cartItemCount: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
};

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    
    // Update cart item count whenever the cart changes
    const cartItemCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Function to add a product to the cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...prevCart,
                {
                    id: product.id,
                    product,
                    quantity: 1,
                },
            ];
        });
    };

    // Function to remove a product from the cart
    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;