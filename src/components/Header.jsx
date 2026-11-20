import { useEffect, useRef, useState } from 'react';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import { whatsappLink, telLink, PHONE_LABEL, WA_DEFAULT } from '../data/catalog.js';
import BrandMark from './BrandMark.jsx';

export const NAV = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'soluciones', label: 'Soluciones' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Header({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc cierra el menú y devuelve el foco; se bloquea el scroll de fondo mientras está abierto.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const handler = () => mq.matches && setOpen(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const cta = whatsappLink(WA_DEFAULT);

  const links = (
    <ul className="nav-list">
      {NAV.map((item) => (
        <li key={item.id}>
          <a
            className="nav-link"
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={`site-header${scrolled || open ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label="Studio Digital, ir al inicio" onClick={() => setOpen(false)}>
          <BrandMark size={34} />
          <span className="brand-word" aria-hidden="true">Studio <span>Digital</span></span>
        </a>

        <nav className="nav-desktop" aria-label="Principal">{links}</nav>

        <div className="header-actions">
          <a className="icon-btn header-call" href={telLink} aria-label={`Llamar al ${PHONE_LABEL}`}>
            <Phone size={18} aria-hidden="true" />
          </a>
          <a className="btn btn-whatsapp header-cta" href={cta} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" />
            Consulta por WhatsApp
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" className="nav-mobile" aria-label="Principal (móvil)">
          {links}
          <div className="nav-mobile-actions">
            <a className="btn btn-whatsapp" href={cta} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              Consulta por WhatsApp
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
            <a className="btn btn-call" href={telLink}>
              <Phone size={18} aria-hidden="true" />
              Llamar · {PHONE_LABEL}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
