import { createCustomerAccessToken } from '@/lib/shopify';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
        }

        const data = await createCustomerAccessToken({ email, password });

        if (data.customerUserErrors && data.customerUserErrors.length > 0) {
            return NextResponse.json({ error: data.customerUserErrors[0].message }, { status: 401 });
        }

        const { accessToken, expiresAt } = data.customerAccessToken;
        const cookieStore = await cookies();

        cookieStore.set('shopifyCustomerToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(expiresAt)
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
