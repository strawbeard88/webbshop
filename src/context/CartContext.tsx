import React, { createContext, useState } from "react";
import type { Product, CartItem } from "../types/types";

type CartContextValue = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
};

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);


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
        //TODO: Ta bort detta
        console.log("Cart updated:", cart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;