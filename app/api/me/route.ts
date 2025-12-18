import { getCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('shopifyCustomerToken')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const customer = await getCustomer(accessToken);

        if (!customer) {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        return NextResponse.json({ customer });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
