"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  // TypeScript infiere que esto es boolean, pero podemos ser explícitos:
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900 shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded-sm"></div>
          INDUSTRIA<span className="text-yellow-500">TECH</span>
        </Link>

        {/* MENU ESCRITORIO */}
        <div className="hidden md:flex items-center space-x-8 text-white">
          <Link href="/#catalogo" className="hover:text-yellow-500 transition">Catálogo</Link>
          <Link href="/servicios" className="hover:text-yellow-500 transition">Servicios</Link>
          <Link href="/empresa" className="hover:text-yellow-500 transition">Empresa</Link>
          <Link href="/contactar" className="bg-yellow-500 text-slate-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition flex items-center gap-2">
            <Phone size={18} /> Contactar
          </Link>
        </div>

        {/* BOTON MENU MOVIL */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENU MOVIL */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 absolute top-full left-0 w-full p-6 flex flex-col gap-4 text-white border-t border-slate-800">
          <Link href="/#catalogo" onClick={() => setIsOpen(false)}>Catálogo</Link>
          <Link href="/servicios" onClick={() => setIsOpen(false)}>Servicios</Link>
          <Link href="/contactar" onClick={() => setIsOpen(false)} className="text-yellow-500 font-bold">Solicitar Cotización</Link>
        </div>
      )}
    </nav>
  );
}