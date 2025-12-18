// Force re-compile
import { getCustomer, getCart, createCartWithIdentity } from '@/lib/shopify';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('shopifyCustomerToken')?.value;
        const cartId = cookieStore.get('cartId')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'Debes iniciar sesión para comprar' }, { status: 401 });
        }

        if (!cartId) {
            return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
        }

        // 1. Get Customer Email from token
        const customer = await getCustomer(accessToken);
        if (!customer || !customer.email) {
            return NextResponse.json({ error: 'No se pudo obtener información del usuario' }, { status: 401 });
        }

        // 2. Attach Email to Cart (Guest Checkout flow)
        // We use updateCartBuyerIdentity to set the email, which pre-fills it in checkout
        // but keeps it as a guest checkout if the shop is configured that way, 
        // or just associates it. The prompt specifically asked for Guest Checkout flow
        // effectively, so we supply the email but not the access token to the checkout itself
        // unless we wanted a fully logged-in checkout. 
        // The user prompted: "Checkout como invitado... usando el email del customer".

        // 2. Attach Email to Cart (Guest Checkout flow)
        // INSTESO of using updateCartBuyerIdentity (which forces login if the email matches an account),
        // we will append the email to the checkout URL. This allows a true Guest Checkout experience
        // with the email pre-filled.

        // 2. Fetch current cart to get items
        const cart = await getCart(cartId);

        if (!cart || !cart.lines || cart.lines.edges.length === 0) {
            return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
        }

        // 3. Create a FRESH Checkout (not Cart) to avoid "Tainted" Cart Identity issues
        // We map the cart items to CheckoutLineItemInput
        const lineItems = cart.lines.edges.map((edge: any) => ({
            variantId: edge.node.merchandise.id,
            quantity: edge.node.quantity
        }));

        console.log('--- CHECKOUT DEBUG ---');
        console.log('Customer Email:', customer.email);
        console.log('Line Items:', JSON.stringify(lineItems, null, 2));

        // 3. Create a FRESH Cart (Standard API) to ensures a clean state
        // This avoids any "tainted" identity from previous attempts on the old cart.
        // We map the cart items to CartLineInput (merchandiseId, quantity)
        // 3. Create a FRESH Cart (Standard API) ensures a clean state and AUTHENTICATED
        // By passing 'customerAccessToken', Shopify knows this is the authorized user.
        const lines = cart.lines.edges.map((edge: any) => ({
            merchandiseId: edge.node.merchandise.id,
            quantity: edge.node.quantity
        }));

        const newCart = await createCartWithIdentity(lines, {
            email: customer.email,
            customerAccessToken: accessToken // Sending the token avoids "Forced Login" screen
        });

        if (!newCart || !newCart.checkoutUrl) {
            console.error('Failed to create new cart via API');
            return NextResponse.json({ error: 'No se pudo generar el checkout' }, { status: 500 });
        }

        // 4. Append Email to Checkout URL
        // This pre-fills the email for the user but keeps them as "Guest" 
        // because we haven't associated the cart with a Customer Access Token via API.
        const checkoutUrlObj = new URL(newCart.checkoutUrl);
        checkoutUrlObj.searchParams.set('checkout[email]', customer.email);

        // Log for debugging
        console.log('Generated Fresh Checkout URL:', checkoutUrlObj.toString());

        return NextResponse.json({ checkoutUrl: checkoutUrlObj.toString() });



    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
