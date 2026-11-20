import { useCallback, useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Phone, Mail } from 'lucide-react';
import Header, { NAV } from './components/Header.jsx';
import BrandMark from './components/BrandMark.jsx';
import Toasts from './components/Toasts.jsx';
import Hero from './sections/Hero.jsx';
import TechStrip from './sections/TechStrip.jsx';
import Services from './sections/Services.jsx';
import Technologies from './sections/Technologies.jsx';
import Solutions from './sections/Solutions.jsx';
import { Projects, About } from './sections/About.jsx';
import Faq from './sections/Faq.jsx';
import Contact from './sections/Contact.jsx';
import { EMAIL, PHONE_LABEL, WA_DEFAULT, telLink, whatsappLink } from './data/catalog.js';

export default function App() {
  const [active, setActive] = useState('');
  const [filters, setFilters] = useState({ query: '', area: 'todas', tech: 'todas' });
  const [toasts, setToasts] = useState([]);
  const [showTop, setShowTop] = useState(false);

  const notify = useCallback((type, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 6000);
  }, []);
  const dismiss = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  // Estado activo de la navegación según la sección visible (el hero no marca ningún enlace).
  useEffect(() => {
    const els = ['inicio', ...NAV.map((n) => n.id)].map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Aparición suave al hacer scroll (sin JS o con movimiento reducido todo se ve de inmediato).
  useEffect(() => {
    const items = document.querySelectorAll('.rv');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pickArea = (id) => {
    setFilters({ query: '', area: id, tech: 'todas' });
    document.getElementById('explorador')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const wa = whatsappLink(WA_DEFAULT);

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header active={active} />
      <main id="contenido" tabIndex={-1}>
        <Hero onPickArea={pickArea} />
        <TechStrip />
        <Services filters={filters} setFilters={setFilters} />
        <Technologies selected={filters.tech} onSelect={(tech) => setFilters((f) => ({ ...f, tech, query: '' }))} />
        <Solutions onPickArea={pickArea} />
        <Projects />
        <About />
        <Faq />
        <Contact notify={notify} />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand" href="#inicio" aria-label="Studio Digital, ir al inicio">
              <BrandMark size={34} />
              <span className="brand-word" aria-hidden="true">Studio <span>Digital</span></span>
            </a>
            <p>Resolvemos. Tú continúas.</p>
          </div>
          <nav aria-label="Pie de página">
            <p className="footer-title">Navegación</p>
            <ul>
              {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}
            </ul>
          </nav>
          <div>
            <p className="footer-title">Contacto</p>
            <ul>
              <li><a href={wa} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> WhatsApp<span className="sr-only"> (se abre en una pestaña nueva)</span></a></li>
              <li><a href={telLink}><Phone size={16} aria-hidden="true" /> {PHONE_LABEL}</a></li>
              <li><a href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true" /> {EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <small>© {new Date().getFullYear()} Studio Digital. Atención remota para Ecuador e internacional.</small>
        </div>
      </footer>

      {showTop && (
        <button type="button" className="fab-top" aria-label="Volver al inicio de la página" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}

      {/* Escritorio: botón flotante. Móvil/tablet: barra inferior con las dos acciones de contacto. */}
      <a className="fab-wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Consulta por WhatsApp (se abre en una pestaña nueva)">
        <MessageCircle size={20} aria-hidden="true" />
        <span className="fab-label" aria-hidden="true">WhatsApp</span>
      </a>
      <div className="dock">
        <a className="btn btn-call" href={telLink} aria-label={`Llamar al ${PHONE_LABEL}`}>
          <Phone size={18} aria-hidden="true" /> Llamar
        </a>
        <a className="btn btn-whatsapp" href={wa} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </div>

      <Toasts toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
