'use client';

import { useState, useEffect } from 'react';

type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
} | null;

export function useShopifyCustomer() {
    const [customer, setCustomer] = useState<Customer>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    setCustomer(data.customer);
                } else {
                    setCustomer(null);
                }
            } catch (error) {
                console.error('Failed to check auth status', error);
                setCustomer(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return { customer, loading };
}
