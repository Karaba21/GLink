'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, Package, Minus, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CarritoPage() {
    const router = useRouter();
    const { cart, removeItem, updateQuantity, checkoutUrl } = useCart();
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [loadingCheckout, setLoadingCheckout] = useState(false);

    const handleCheckout = async () => {
        setLoadingCheckout(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
            });

            if (res.status === 401) {
                router.push('/login');
                return;
            }

            const data = await res.json();
            if (data.checkoutUrl) {
                window.location.href = data.checkoutUrl;
            } else {
                console.error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Error initiating checkout:', error);
        } finally {
            setLoadingCheckout(false);
        }
    };

    const handleRemove = async (lineId: string) => {
        setRemovingId(lineId);
        await removeItem(lineId);
        setRemovingId(null);
    };

    const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setUpdatingId(lineId);
        await updateQuantity(lineId, newQuantity);
        setUpdatingId(null);
    };

    const cartLines = cart?.lines?.edges || [];
    const isEmpty = cartLines.length === 0;

    // Calculate total
    const total = cartLines.reduce((acc: number, edge: any) => {
        const price = parseFloat(edge.node.merchandise?.priceV2?.amount || 0);
        const quantity = edge.node.quantity;
        return acc + (price * quantity);
    }, 0);

    const currency = cartLines[0]?.node?.merchandise?.priceV2?.currencyCode || 'ARS';

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-300/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Volver a la tienda
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                            <ShoppingCart className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">Tu Carrito</h1>
                            <p className="text-gray-600 mt-1">
                                {isEmpty ? 'No hay productos' : `${cartLines.length} ${cartLines.length === 1 ? 'producto' : 'productos'}`}
                            </p>
                        </div>
                    </div>
                </div>

                {isEmpty ? (
                    /* Empty State */
                    <div className="glass-effect rounded-3xl p-12 text-center">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-100 mb-2">Tu carrito está vacío</h2>
                        <p className="text-gray-400 mb-8">Agrega productos para comenzar tu compra</p>
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transform"
                        >
                            Explorar Productos
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartLines.map((edge: any) => {
                                const item = edge.node;
                                const merchandise = item.merchandise;
                                const product = merchandise?.product;
                                const price = parseFloat(merchandise?.priceV2?.amount || 0);
                                const lineTotal = price * item.quantity;

                                return (
                                    <div
                                        key={item.id}
                                        className="glass-effect rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300"
                                    >
                                        <div className="flex gap-6">
                                            {/* Product Image */}
                                            <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-lg shadow-green-500/20">
                                                {product?.featuredImage?.url ? (
                                                    <img
                                                        src={product.featuredImage.url}
                                                        alt={product.featuredImage.altText || product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                        <Package className="w-12 h-12 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-gray-100 mb-1">
                                                    {product?.title || 'Producto'}
                                                </h3>
                                                {merchandise?.title && merchandise.title !== 'Default Title' && (
                                                    <p className="text-sm text-gray-400 mb-2">{merchandise.title}</p>
                                                )}
                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <p className="text-sm text-gray-400">Precio unitario</p>
                                                        <p className="text-lg font-semibold text-gradient">
                                                            {formatPrice(price)}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-400 mb-2">Cantidad</p>
                                                        <div className="flex items-center space-x-3">
                                                            <button
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                                disabled={updatingId === item.id || item.quantity <= 1}
                                                                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-green-400 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-lg font-bold text-gray-100 min-w-[2rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                                disabled={updatingId === item.id}
                                                                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-green-400 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 text-right">
                                                    <p className="text-sm text-gray-400">Total</p>
                                                    <p className="text-xl font-bold text-gray-100">
                                                        {formatPrice(lineTotal)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                disabled={removingId === item.id}
                                                className="flex-shrink-0 p-3 h-fit text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 disabled:opacity-50"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="glass-effect rounded-2xl p-6 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-100 mb-6">Resumen</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-300">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-300">
                                        <span>Envío</span>
                                        <span className="text-sm text-gray-400">Calculado en checkout</span>
                                    </div>
                                    <div className="border-t border-green-500/30 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-100">Total</span>
                                            <span className="text-2xl font-bold text-gradient">{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={loadingCheckout}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transform flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loadingCheckout ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5" />
                                            <span>Proceder al Pago</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-4">
                                    Serás redirigido a la página segura de pago de Shopify
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
