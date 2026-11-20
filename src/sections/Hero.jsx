import { MessageCircle, Phone, ArrowUpRight, Video, FileText, GraduationCap, Layers } from 'lucide-react';
import { areas, services, whatsappLink, telLink, PHONE_LABEL, WA_DEFAULT } from '../data/catalog.js';
import { LucideByName } from '../components/Icons.jsx';
import HeroEyebrow from '../components/HeroEyebrow.jsx';

const TRUST = [
  { icon: Video, text: 'Meet, AnyDesk y WhatsApp' },
  { icon: FileText, text: 'Entrega con documentación' },
  { icon: GraduationCap, text: 'Clases y asesorías puntuales' },
];

export default function Hero({ onPickArea }) {
  return (
    <section id="inicio" className="hero hero-premium" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <span className="hero-orbit hero-orbit-two" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <HeroEyebrow />

          <h1 id="hero-title" className="hero-title">
            <span>Tecnología que</span>
            <span className="hero-title-gradient">se entiende</span>
            <span className="hero-title-last">y se usa.</span>
          </h1>

          <p className="hero-lead">
            Desarrollo de software, datos, redes, cloud y asesoría técnica. Cuéntanos qué necesitas y lo resolvemos a
            distancia, con documentación para que tú continúes.
          </p>

          <div className="hero-actions">
            <a
              className="btn btn-whatsapp btn-lg hero-main-cta"
              href={whatsappLink(WA_DEFAULT)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Consulta por WhatsApp
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
            <a className="btn btn-secondary btn-lg hero-call-cta" href={telLink}>
              <Phone size={18} aria-hidden="true" />
              <span>
                Llamar <span className="hide-sm">· {PHONE_LABEL}</span>
              </span>
            </a>
          </div>

          <ul className="hero-trust" aria-label="Cómo trabajamos">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text} className="hero-trust-item">
                <Icon size={16} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

          <ul className="stats hero-stats" aria-label="Studio Digital en cifras">
            <li><strong>{services.length}</strong><span>líneas de servicio</span></li>
            <li><strong>{areas.length}</strong><span>áreas de trabajo</span></li>
            <li><strong>100 %</strong><span>atención remota</span></li>
          </ul>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-glow" aria-hidden="true" />

          <div className="hero-service-panel">
            <div className="hero-panel-top">
              <div className="hero-panel-heading">
                <span className="hero-panel-icon" aria-hidden="true"><Layers size={20} /></span>
                <div>
                  <span className="hero-panel-kicker">SERVICIOS</span>
                  <p className="hero-panel-title">Qué resolvemos</p>
                </div>
              </div>
              <span className="hero-panel-count">{areas.length} áreas</span>
            </div>
            <div className="hero-panel-divider" aria-hidden="true" />

            <ul className="hero-service-list" aria-label="Áreas de servicio">
              {areas.map((a, i) => (
                <li key={a.id}>
                  <button type="button" className="index-row hero-service-row" onClick={() => onPickArea(a.id)}>
                    <span className="index-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="index-ico"><LucideByName name={a.icon} size={18} /></span>
                    <span className="index-name">{a.name}</span>
                    <ArrowUpRight className="index-arrow" size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

          </div>



        </div>
      </div>
    </section>
  );
}
