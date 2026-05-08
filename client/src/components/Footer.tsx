import { Mail, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-amber-500">
                AG
              </div>
              <div className="text-sm font-semibold text-slate-300">
                <div>JURÍDICO</div>
                <div className="text-amber-500">ESTRATÉGICO</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Advocacia estratégica com técnica, inteligência e resultado.
            </p>
            <div className="text-amber-500 font-semibold text-sm">
              OAB/SE 16.699
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#sobre">
                  <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                    Sobre
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#areas">
                  <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                    Áreas de Atuação
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#diferenciais">
                  <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                    Diferenciais
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#contato">
                  <a className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                    Contato
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Áreas</h4>
            <ul className="space-y-2">
              <li className="text-slate-400 text-sm">Direito Penal</li>
              <li className="text-slate-400 text-sm">Tribunal do Júri</li>
              <li className="text-slate-400 text-sm">Direito Civil</li>
              <li className="text-slate-400 text-sm">Contratos e Licitações</li>
              <li className="text-slate-400 text-sm">Direito Municipal</li>
              <li className="text-slate-400 text-sm">Direito Trabalhista</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-500" />
                <a href="tel:+5579988614292" className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                  (79) 98861-4292
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-500" />
                <a href="mailto:alcivanguimaraes.adv@gmail.com" className="text-slate-400 hover:text-amber-500 transition-colors text-sm">
                  alcivanguimaraes.adv@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 AG Jurídico Estratégico. Todos os direitos reservados.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5579988614292"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-500 transition-colors"
              title="WhatsApp"
            >
              <Phone size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-500 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-500 transition-colors"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-500 transition-colors"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
