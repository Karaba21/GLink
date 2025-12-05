'use client';

import { ShoppingCart, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  gradient: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Huevera',
    description: 'Solución innovadora para el almacenamiento y organización de huevos. Diseñada con materiales de alta calidad que garantizan la frescura y protección de tus productos.',
    price: 'Consultar precio',
    features: [
      'Diseño ergonómico y funcional',
      'Materiales de alta calidad',
      'Fácil limpieza y mantenimiento',
      'Protección óptima para tus productos',
    ],
    image: '/huevera.jpeg',
    gradient: 'from-green-500 via-green-600 to-green-700',
  },
  {
    id: 2,
    name: 'Producto2',
    description: 'Producto de excelencia diseñado para satisfacer tus necesidades. Combina funcionalidad, durabilidad y un diseño moderno que se adapta a cualquier entorno.',
    price: 'Consultar precio',
    features: [
      'Calidad superior garantizada',
      'Diseño versátil y moderno',
      'Resistente y duradero',
      'Solución completa para tus necesidades',
    ],
    image: '/producto2.jpeg',
    gradient: 'from-green-400 via-green-500 to-green-600',
  },
];

export default function Productos() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section
      id="productos"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-green-500 mr-2" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-100">
              Nuestros <span className="text-gradient">Productos</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full shadow-lg shadow-green-500/50 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre nuestras soluciones innovadoras diseñadas para transformar tu negocio
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="relative group"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Main Card */}
              <div
                className={`relative bg-gray-800 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-500 ${
                  hoveredProduct === product.id
                    ? 'shadow-green-500/40 scale-[1.02]'
                    : 'shadow-gray-900/50'
                }`}
              >
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                ></div>

                {/* Content - Horizontal Layout */}
                <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Product Image */}
                  <div
                    className={`relative w-full lg:w-80 h-64 lg:h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl shadow-green-500/20 group-hover:shadow-green-500/40 transition-all duration-500`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-100 group-hover:text-green-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 pt-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3 shadow-md shadow-green-500/30">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-gray-700 gap-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Precio</p>
                        <p className="text-2xl font-bold text-gradient">{product.price}</p>
                      </div>
                      <button
                        className={`px-6 py-3 bg-gradient-to-r ${product.gradient} text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center space-x-2 group-hover:scale-110 transform`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Agregar al Carrito</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-green-100/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-200/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Glow Effect */}
              {hoveredProduct === product.id && (
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.gradient} opacity-20 blur-2xl -z-10 animate-pulse`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

