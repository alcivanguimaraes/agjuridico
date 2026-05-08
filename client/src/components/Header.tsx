import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    if (location === '/' && sectionId) {
      scrollToSection(sectionId);
    } else {
      // Se estiver em outra página, navega para home com o hash
      setLocation(sectionId ? `/#${sectionId}` : '/');
    }
    setIsMenuOpen(false);
  };

  const externalLinks = [
    { label: 'Blog', url: '#', target: '_blank' },
    { label: 'Jurisprudência', url: '#', target: '_blank' },
    { label: 'Recursos', url: '#', target: '_blank' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-amber-500">
            AG
          </div>
          <div className="text-sm font-semibold text-slate-300">
            <div>JURÍDICO</div>
            <div className="text-amber-500">ESTRATÉGICO</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation('/', 'sobre')}
            className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium"
          >
            Sobre
          </button>
          <button
            onClick={() => handleNavigation('/', 'areas')}
            className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium"
          >
            Áreas de Atuação
          </button>
          <button
            onClick={() => handleNavigation('/', 'diferenciais')}
            className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium"
          >
            Diferenciais
          </button>

            {/* External Links Dropdown */}
          <div className="relative group">
            <button className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium">
              Recursos
            </button>
            <div className="absolute left-0 mt-0 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link href="/blog">
                <a className="block px-4 py-2 text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors first:rounded-t-lg">
                  Blog Jurídico
                </a>
              </Link>
              <Link href="/faq">
                <a className="block px-4 py-2 text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors">
                  Perguntas Frequentes
                </a>
              </Link>
              <Link href="/estudos-de-caso">
                <a className="block px-4 py-2 text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors">
                  Estudos de Caso
                </a>
              </Link>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors"
              >
                Jurisprudência
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-slate-300 hover:text-amber-500 hover:bg-slate-800/50 transition-colors last:rounded-b-lg"
              >
                Publicações
              </a>
            </div>
          </div>

          <Link href="/agendamento">
            <a className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium">
              Agendamento
            </a>
          </Link>
          <button
            onClick={() => scrollToSection('contato')}
            className="text-slate-300 hover:text-amber-500 transition-colors duration-300 font-medium"
          >
            Contato
          </button>
          <a
            href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium text-sm"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-amber-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-slate-900 border-t border-slate-800 py-4 px-4 space-y-4">
          <button
            onClick={() => handleNavigation('/', 'sobre')}
            className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
          >
            Sobre
          </button>
          <button
            onClick={() => handleNavigation('/', 'areas')}
            className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
          >
            Áreas de Atuação
          </button>
          <button
            onClick={() => handleNavigation('/', 'diferenciais')}
            className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
          >
            Diferenciais
          </button>

          {/* Mobile Recursos Links */}
          <div className="space-y-2 pl-4 border-l-2 border-amber-500">
            <Link href="/blog">
              <a className="block text-slate-300 hover:text-amber-500 transition-colors py-1 text-sm">
                Blog Jurídico
              </a>
            </Link>
            <Link href="/faq">
              <a className="block text-slate-300 hover:text-amber-500 transition-colors py-1 text-sm">
                Perguntas Frequentes
              </a>
            </Link>
            <Link href="/estudos-de-caso">
              <a className="block text-slate-300 hover:text-amber-500 transition-colors py-1 text-sm">
                Estudos de Caso
              </a>
            </Link>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-300 hover:text-amber-500 transition-colors py-1 text-sm"
            >
              Jurisprudência
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-300 hover:text-amber-500 transition-colors py-1 text-sm"
            >
              Publicações
            </a>
          </div>

          <Link href="/agendamento">
            <a className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium">
              Agendamento
            </a>
          </Link>
          <button
            onClick={() => handleNavigation('/', 'contato')}
            className="block w-full text-left text-slate-300 hover:text-amber-500 transition-colors py-2 font-medium"
          >
            Contato
          </button>
          <a
            href="https://wa.me/5579988614292?text=Olá%20Alcivan%2C%20gostaria%20de%20agendar%20uma%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full btn-premium text-center text-sm"
          >
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
