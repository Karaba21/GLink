'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useShopifyCustomer } from '@/hooks/useShopifyCustomer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { customer } = useShopifyCustomer();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push('/#' + sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-green-500/20'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 transition-all duration-300 group-hover:scale-110">
              <Image
                src="/logoo.png"
                alt="GLink Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <span className={`text-2xl font-bold transition-colors ${isScrolled ? 'text-gray-100' : 'text-gray-900'} group-hover:text-green-400`}>
              GLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className={`${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 font-medium transition-colors relative group`}
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('productos')}
              className={`${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 font-medium transition-colors relative group`}
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className={`${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 font-medium transition-colors relative group`}
            >
              Quienes Somos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>


            <button
              onClick={() => scrollToSection('contacto')}
              className={`${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 font-medium transition-colors relative group`}
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <Link
              href="/carrito"
              className={`relative p-2 ${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 transition-colors group`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-green-500/50">
                  {cartCount}
                </span>
              )}
            </Link>

            {customer ? (
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-green-700 transition-colors">
                  {customer.firstName?.charAt(0).toUpperCase()}{customer.lastName?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`p-2 ${isScrolled ? 'text-gray-300' : 'text-gray-600'} hover:text-green-400 transition-colors`}
              >
                <User className="w-6 h-6" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-gray-300' : 'text-gray-600'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-green-500/30 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection('inicio')}
              className="block w-full text-left text-gray-300 hover:text-green-400 font-medium py-2"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('productos')}
              className="block w-full text-left text-gray-300 hover:text-green-400 font-medium py-2"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="block w-full text-left text-gray-300 hover:text-green-400 font-medium py-2"
            >
              Quienes Somos
            </button>

            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left text-gray-300 hover:text-green-400 font-medium py-2"
            >
              Contacto
            </button>
            <div className="flex items-center space-x-4 pt-4 border-t border-green-500/30">
              <Link
                href="/carrito"
                className="relative p-2 text-gray-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              {customer ? (
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    {customer.firstName?.charAt(0).toUpperCase()}{customer.lastName?.charAt(0).toUpperCase()}
                  </div>
                  <span>{customer.firstName}</span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors ml-auto"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-gray-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

