'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { addItem as addItemAction, getCart as getCartAction, removeItem as removeItemAction, updateQuantity as updateQuantityAction } from '@/app/actions';

type CartContextType = {
    cart: any;
    addItem: (variantId: string) => Promise<void>;
    removeItem: (lineId: string) => Promise<void>;
    updateQuantity: (lineId: string, quantity: number) => Promise<void>;
    cartCount: number;
    checkoutUrl: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<any>(null);

    useEffect(() => {
        const initCart = async () => {
            try {
                const cart = await getCartAction();
                if (cart) setCart(cart);
            } catch (e) {
                console.error(e);
            }
        };
        initCart();
    }, []);

    const addItem = async (variantId: string) => {
        try {
            const newCart = await addItemAction(variantId);
            setCart(newCart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeItem = async (lineId: string) => {
        try {
            const newCart = await removeItemAction(lineId);
            setCart(newCart);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateQuantity = async (lineId: string, quantity: number) => {
        try {
            const newCart = await updateQuantityAction(lineId, quantity);
            setCart(newCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const cartCount = cart?.lines?.edges?.reduce((acc: number, edge: any) => acc + edge.node.quantity, 0) || 0;
    const checkoutUrl = cart?.checkoutUrl || null;

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, cartCount, checkoutUrl }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
