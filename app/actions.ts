'use server';

import { createCart, addToCart, getCart as getShopifyCart, removeFromCart as removeFromShopifyCart, updateCartLineQuantity } from '@/lib/shopify';
import { cookies } from 'next/headers';

export async function addItem(variantId: string) {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;
    let cart;

    if (cartId) {
        cart = await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
    } else {
        cart = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
        if (cart && cart.id) {
            cookieStore.set('cartId', cart.id);
        }
    }
    return cart;
}

export async function getCart() {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;
    if (cartId) {
        return await getShopifyCart(cartId);
    }
    return null;
}

export async function removeItem(lineId: string) {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;
    if (cartId) {
        return await removeFromShopifyCart(cartId, [lineId]);
    }
    return null;
}

export async function updateQuantity(lineId: string, quantity: number) {
    const cookieStore = await cookies();
    const cartId = cookieStore.get('cartId')?.value;
    if (cartId && quantity > 0) {
        return await updateCartLineQuantity(cartId, lineId, quantity);
    }
    return null;
}

export async function getCartUrl() {
    // This is a helper to get the checkout URL if needed, or we can just return it from addItem
    // For now addItem returns the cart including checkoutUrl
    return null;
}
