import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Productos from '@/components/Productos';
import QuienesSomos from '@/components/QuienesSomos';
import Registrate from '@/components/Registrate';
import Contacto from '@/components/Contacto';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Productos />
      <QuienesSomos />
      <Registrate />
      <Contacto />
    </main>
  );
}

