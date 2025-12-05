'use client';

import { Target, Users, Award, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Misión',
    description: 'Proporcionar soluciones tecnológicas innovadoras que impulsen el crecimiento y la transformación digital de nuestros clientes.',
  },
  {
    icon: Users,
    title: 'Visión',
    description: 'Ser líderes en innovación tecnológica, reconocidos por nuestra excelencia y compromiso con el éxito de nuestros clientes.',
  },
  {
    icon: Award,
    title: 'Valores',
    description: 'Comprometidos con la excelencia, la innovación constante y el servicio al cliente de clase mundial.',
  },
  {
    icon: Zap,
    title: 'Innovación',
    description: 'Estamos a la vanguardia de la tecnología, siempre buscando nuevas formas de mejorar y optimizar.',
  },
];

export default function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
            <span className="text-gradient">Quienes Somos</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full shadow-lg shadow-green-500/50 mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos un equipo apasionado por la tecnología y comprometido con el éxito de nuestros clientes
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl shadow-green-500/20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-100">
                Transformando el futuro digital
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                En GLink, nos especializamos en crear soluciones tecnológicas que no solo resuelven problemas,
                sino que abren nuevas posibilidades. Nuestro enfoque combina innovación, experiencia y un
                compromiso inquebrantable con la excelencia.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Trabajamos con empresas de todos los tamaños, desde startups hasta corporaciones establecidas,
                ayudándolas a navegar el mundo digital con confianza y éxito.
              </p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-gray-800 shadow-lg"
                    ></div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-100">+500 Clientes</p>
                  <p className="text-sm text-gray-400">Confían en nosotros</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-2xl shadow-green-500/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-8xl font-bold opacity-20">GLink</div>
                </div>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-400/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-600/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 transform"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-green-400 transition-colors">
                  {value.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

