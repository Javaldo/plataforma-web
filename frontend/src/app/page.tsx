import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <FeaturedProducts /> 
      
      {/* Footer temporal */}
      <footer className="bg-slate-900 text-white py-10 text-center">
        <p>© 2024 IndustriaTech - Potencia Industrial</p>
      </footer>
    </main>
  );
}