import { useMemo, useRef, useState } from 'react';
import {
  FolderKanban, MessageCircle, Check, ChevronDown, ArrowRight, ArrowLeft, HardDrive,
  FileSpreadsheet, Network, Database, Code2, Globe, GraduationCap,
  MessagesSquare, ClipboardCheck, Wrench, BadgeCheck, Rocket, MapPin, Clock, MonitorSmartphone,
} from 'lucide-react';
import { process, whatsappLink } from '../data/catalog.js';
import { projects } from '../data/projects.js';
import { techs } from '../data/techs.js';

/* ---------- Datos ---------- */

const CHANNELS = [
  { ...techs.whatsapp, desc: 'Respuesta rápida y seguimiento diario.' },
  { ...techs.googlemeet, desc: 'Videollamadas para explicar y revisar contigo.' },
  { ...techs.anydesk, desc: 'Control remoto seguro, solo con tu autorización.' },
  { ...techs.github, desc: 'Código versionado y trazable.' },
  { name: 'Drive', icon: null, desc: 'Entrega ordenada de archivos y documentos.' },
];

const NEEDS = [
  { label: 'Excel / Office', icon: FileSpreadsheet },
  { label: 'Redes y Cisco', icon: Network },
  { label: 'Bases de datos', icon: Database },
  { label: 'Programación', icon: Code2 },
  { label: 'Sitio web', icon: Globe },
  { label: 'Clases / asesoría', icon: GraduationCap },
];

// Un ícono por paso del proceso (en orden)
const STEP_ICONS = [MessagesSquare, ClipboardCheck, Wrench, BadgeCheck, Rocket];

const FACTS = [
  { icon: Globe, text: '100 % remoto' },
  { icon: MapPin, text: 'Base en Ecuador' },
  { icon: Clock, text: 'Horario coordinado contigo' },
  { icon: MonitorSmartphone, text: 'Ecuador y exterior' },
];

const pad = (n) => String(n).padStart(2, '0');

// Luz que sigue al cursor (se pinta con CSS usando --mx / --my)
const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/* ---------- Proyectos ---------- */

function NeedBuilder() {
  const [selected, setSelected] = useState([]);
  const toggle = (n) => setSelected((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const message = useMemo(
    () =>
      selected.length === 0
        ? 'Hola Studio Digital, me gustaría ver un ejemplo de trabajo relacionado con lo que necesito.'
        : `Hola Studio Digital, me gustaría ver un ejemplo de trabajo relacionado con: ${selected.join(', ')}.`,
    [selected]
  );

  return (
    <div className="need-builder">
      <p className="panel-label" id="need-label">¿Qué necesitas? Elige una o varias</p>
      <ul className="pick-group" aria-labelledby="need-label">
        {NEEDS.map(({ label, icon: Icon }) => {
          const on = selected.includes(label);
          return (
            <li key={label}>
              <button type="button" className="pick" aria-pressed={on} onClick={() => toggle(label)}>
                <Icon size={16} aria-hidden="true" className="pick-ico" />
                {label}
                <Check size={14} aria-hidden="true" className="pick-check" />
              </button>
            </li>
          );
        })}
      </ul>

      <p className="need-preview" aria-live="polite">{message}</p>

      <a className="btn btn-whatsapp" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} aria-hidden="true" />
        {selected.length ? 'Enviar por WhatsApp' : 'Consulta por WhatsApp'}
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    </div>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  const panelId = `proj-${p.id}`;

  return (
    <li className="card proj-card" onPointerMove={spot}>
      <h3>{p.title}</h3>
      <p>{p.description}</p>

      {p.tags?.length > 0 && (
        <ul className="proj-tags">
          {p.tags.map((t) => (
            <li key={t} className="tech-chip">{t}</li>
          ))}
        </ul>
      )}

      {p.details && (
        <>
          <button
            type="button"
            className="proj-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Ocultar detalles' : 'Ver detalles'}
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          <div id={panelId} className={`proj-expand${open ? ' is-open' : ''}`}>
            <div>
              <p>{p.details}</p>
            </div>
          </div>
        </>
      )}

      {p.url && (
        <a className="proj-link" href={p.url} target="_blank" rel="noopener noreferrer">
          Ver demostración <ArrowRight size={16} aria-hidden="true" />
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      )}
    </li>
  );
}

export function Projects() {
  const categories = useMemo(() => ['Todos', ...new Set(projects.map((p) => p.category).filter(Boolean))], []);
  const [cat, setCat] = useState('Todos');
  const visible = cat === 'Todos' ? projects : projects.filter((p) => p.category === cat);

  return (
    <section id="proyectos" className="alt" aria-labelledby="proy-title">
      <div className="container">
        <div className="section-head rv">
          <p className="eyebrow">Proyectos</p>
          <h2 id="proy-title">Proyectos demostrativos</h2>
        </div>

        {projects.length === 0 ? (
          <div className="notice rv">
            <span className="notice-ico"><FolderKanban size={22} aria-hidden="true" /></span>
            <div>
              <h3>Estamos preparando demostraciones verificables.</h3>
              <p>
                No publicamos casos ni resultados que no podamos comprobar. Cuéntanos qué necesitas y te
                mostramos un ejemplo de trabajo relacionado.
              </p>
              <NeedBuilder />
            </div>
          </div>
        ) : (
          <>
            {categories.length > 2 && (
              <ul className="pick-group rv" aria-label="Filtrar proyectos por categoría">
                {categories.map((c) => (
                  <li key={c}>
                    <button type="button" className="pick" aria-pressed={cat === c} onClick={() => setCat(c)}>
                      {c}
                      <Check size={14} aria-hidden="true" className="pick-check" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <ul className="service-list">
              {visible.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Nosotros ---------- */

function Channels() {
  return (
    <div className="ab-channels rv" onPointerMove={spot}>
      <p className="panel-label">Trabajamos por</p>
      <ul className="ab-channel-list">
        {CHANNELS.map((c, idx) => (
          <li key={c.name} className="ab-channel" style={{ '--d': idx }}>
            <span className="ab-channel-ico" aria-hidden="true">
              {c.icon ? (
                <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                  <path d={c.icon.path} fill="currentColor" />
                </svg>
              ) : (
                <HardDrive size={18} />
              )}
            </span>
            <span className="ab-channel-txt">
              <strong>{c.name}</strong>
              <small>{c.desc}</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProcessStepper() {
  const total = process.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const refs = useRef([]);
  const touchX = useRef(0);

  const select = (n) => {
    const next = Math.min(Math.max(n, 0), total - 1);
    if (next === i) return;
    setDir(next > i ? 1 : -1);
    setI(next);
  };

  const onKey = (e) => {
    const map = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: total - 1 };
    if (e.key in map) {
      e.preventDefault();
      const n = Math.min(Math.max(map[e.key], 0), total - 1);
      select(n);
      refs.current[n]?.focus();
    }
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) select(i + (dx < 0 ? 1 : -1));
  };

  const step = process[i];
  const StepIcon = STEP_ICONS[i % STEP_ICONS.length];

  return (
    <div className="ab-stepper rv">
      <div className="ab-rail" role="tablist" aria-label="Cómo trabajamos" onKeyDown={onKey} style={{ '--n': total }}>
        {process.map((s, idx) => {
          const TabIcon = STEP_ICONS[idx % STEP_ICONS.length];
          return (
            <button
              key={s.title}
              ref={(el) => (refs.current[idx] = el)}
              id={`ab-tab-${idx}`}
              role="tab"
              type="button"
              aria-selected={i === idx}
              aria-controls="ab-panel"
              tabIndex={i === idx ? 0 : -1}
              className={`ab-tab${idx < i ? ' is-done' : ''}`}
              onClick={() => select(idx)}
            >
              <span className="ab-tab-top">
                <span className="ab-tab-num">{pad(idx + 1)}</span>
                <span className="ab-tab-ico" aria-hidden="true">
                  {idx < i ? <Check size={15} /> : <TabIcon size={15} />}
                </span>
              </span>
              <span className="ab-tab-name">{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="ab-panel-wrap" onPointerMove={spot}>
        <div
          key={i}
          id="ab-panel"
          role="tabpanel"
          aria-labelledby={`ab-tab-${i}`}
          className={`ab-panel ${dir > 0 ? 'to-next' : 'to-prev'}`}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <span className="ab-ghost" aria-hidden="true">{pad(i + 1)}</span>
          <span className="ab-badge" aria-hidden="true">
            <StepIcon size={22} />
          </span>
          <h4>{step.title}</h4>
          <p>{step.text}</p>

          <div className="ab-nav">
            <span className="ab-count" aria-hidden="true">
              {pad(i + 1)} <i>/ {pad(total)}</i>
            </span>
            <div className="ab-nav-btns">
              <button
                type="button"
                className="ab-arrow"
                onClick={() => select(i - 1)}
                disabled={i === 0}
                aria-label="Paso anterior"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ab-arrow ab-arrow-primary"
                onClick={() => select(i + 1)}
                disabled={i === total - 1}
                aria-label="Paso siguiente"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">Paso {i + 1} de {total}: {step.title}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nos-title">
      <div className="container">
        <div className="about-grid">
          <div className="section-head rv">
            <p className="eyebrow">Nosotros</p>
            <h2 id="nos-title">
              Un estudio tecnológico, <span className="ab-grad">100 % remoto.</span>
            </h2>
            <p>
              Somos un estudio de servicios tecnológicos con base en Ecuador. Atendemos a clientes de Ecuador y del
              exterior sin que tengas que desplazarte: coordinamos horario y trabajamos a distancia.
            </p>
            <p className="tagline">Resolvemos. Tú continúas.</p>
            <ul className="ab-facts">
              {FACTS.map(({ icon: Icon, text }, idx) => (
                <li key={text} style={{ '--d': idx }}>
                  <Icon size={16} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <Channels />
        </div>

        <h3 className="steps-title rv">Cómo trabajamos</h3>
        <ProcessStepper />
      </div>
    </section>
  );
}
