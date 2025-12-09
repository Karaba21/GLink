import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Productos from '@/components/Productos';
import QuienesSomos from '@/components/QuienesSomos';
import Registrate from '@/components/Registrate';
import Contacto from '@/components/Contacto';
import { getProducts } from '@/lib/shopify';

export default async function Home() {
  const shopifyProducts = await getProducts();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Productos shopifyProducts={shopifyProducts} />
      <QuienesSomos />
      <Registrate />
      <Contacto />
    </main>
  );
}

