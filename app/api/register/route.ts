import { createCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, password, acceptsMarketing } = body;

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const data = await createCustomer({ firstName, lastName, email, password, acceptsMarketing });

        if (data.customerUserErrors && data.customerUserErrors.length > 0) {
            return NextResponse.json({ error: data.customerUserErrors[0].message }, { status: 400 });
        }

        return NextResponse.json({ success: true, customer: data.customer });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
