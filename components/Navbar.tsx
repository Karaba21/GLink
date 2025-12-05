'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-green-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold text-gray-100 group-hover:text-green-400 transition-colors">
              GLink
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-300 hover:text-green-400 font-medium transition-colors relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('productos')}
              className="text-gray-300 hover:text-green-400 font-medium transition-colors relative group"
            >
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('quienes-somos')}
              className="text-gray-300 hover:text-green-400 font-medium transition-colors relative group"
            >
              Quienes Somos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection('registrate')}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-md shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
            >
              Regístrate
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-gray-300 hover:text-green-400 font-medium transition-colors relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button className="relative p-2 text-gray-300 hover:text-green-400 transition-colors group">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-green-500/50">
                0
              </span>
            </button>
            <button className="p-2 text-gray-300 hover:text-green-400 transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300"
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
              onClick={() => scrollToSection('registrate')}
              className="block w-full text-left px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium"
            >
              Regístrate
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="block w-full text-left text-gray-300 hover:text-green-400 font-medium py-2"
            >
              Contacto
            </button>
            <div className="flex items-center space-x-4 pt-4 border-t border-green-500/30">
              <button className="relative p-2 text-gray-300">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </button>
              <button className="p-2 text-gray-300">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

