import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop Component
 * 
 * Gerencia o scroll automático ao topo quando a rota muda.
 * Evita que páginas fiquem "congeladas" durante navegação em SPA.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash) {
      const elementId = hash.replace('#', '');
      const element = document.getElementById(elementId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}
