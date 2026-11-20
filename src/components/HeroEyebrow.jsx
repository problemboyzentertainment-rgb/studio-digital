import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { techs } from '../data/techs.js';

// Canales reales de atención (los mismos del FAQ y de "Nosotros").
const CHANNELS = [techs.whatsapp, techs.googlemeet, techs.anydesk, techs.github, { name: 'Drive', icon: null }];

const fmt = new Intl.DateTimeFormat('es-EC', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Guayaquil' });

function useEcuadorTime() {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function HeroEyebrow() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const popId = useId();
  const time = useEcuadorTime();

  // Cierra con Esc (devuelve el foco al botón) o al hacer clic fuera.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div className="hero-eyebrow">
      <div className="status-wrap" ref={wrapRef}>
        <button
          ref={btnRef}
          type="button"
          className="hero-status status-btn"
          aria-expanded={open}
          aria-controls={popId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="ping" aria-hidden="true">
            <span className="ping-ring" />
            <span className="dot" />
          </span>
          Atención 100 % remota
          <ChevronDown className="status-chev" size={16} aria-hidden="true" />
        </button>

        {open && (
          <div id={popId} className="status-pop" role="group" aria-label="Canales de atención">
            <p className="status-pop-title">Te atendemos por</p>
            <ul>
              {CHANNELS.map((c) => (
                <li key={c.name}>
                  {c.icon && (
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
                      <path d={c.icon.path} fill="currentColor" />
                    </svg>
                  )}
                  {c.name}
                </li>
              ))}
            </ul>
            <p className="status-pop-note">Sin desplazarte: coordinamos horario y trabajamos a distancia.</p>
          </div>
        )}
      </div>

      <span className="hero-location">
        <Globe size={15} aria-hidden="true" />
        Ecuador e internacional
        <span className="hero-time">
          <span aria-hidden="true">·</span>
          <time>{time}</time> hora Ecuador
        </span>
      </span>
    </div>
  );
}
