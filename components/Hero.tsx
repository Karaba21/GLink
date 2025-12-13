'use client';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            <span className="text-gradient">Bienvenido a GLink</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-400 mx-auto rounded-full shadow-lg shadow-green-500/50"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Conectamos tu futuro con tecnología innovadora
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <button
              onClick={() => {
                document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 transform"
            >
              Explorar Productos
            </button>
            <button
              onClick={() => {
                document.getElementById('quienes-somos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gray-800 text-green-400 text-lg font-semibold rounded-xl border-2 border-green-500 hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 transform"
            >
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

