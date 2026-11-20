import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { solutions, areas } from '../data/catalog.js';

export default function Solutions({ onPickArea }) {
  const [active, setActive] = useState(solutions[0].id);
  const tabRefs = useRef({});

  // Navegación por teclado (flechas, Inicio, Fin) según el patrón WAI-ARIA de pestañas.
  function onKeyDown(e, index) {
    let next = null;
    if (e.key === 'ArrowRight') next = (index + 1) % solutions.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + solutions.length) % solutions.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = solutions.length - 1;
    if (next === null) return;
    e.preventDefault();
    const id = solutions[next].id;
    setActive(id);
    tabRefs.current[id]?.focus();
  }

  const current = solutions.find((s) => s.id === active);

  return (
    <section id="soluciones" aria-labelledby="sol-title">
      <div className="container">
        <div className="section-head rv">
          <p className="eyebrow">Soluciones</p>
          <h2 id="sol-title">¿Para quién trabajamos?</h2>
          <p>Elige tu perfil y te mostramos por dónde empezar.</p>
        </div>

        <div className="tabs rv">
          <div role="tablist" aria-label="Perfiles" className="seg">
            {solutions.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => (tabRefs.current[s.id] = el)}
                role="tab"
                id={`tab-${s.id}`}
                type="button"
                className="tab"
                aria-selected={active === s.id}
                aria-controls={`panel-${s.id}`}
                tabIndex={active === s.id ? 0 : -1}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                {s.tab}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="tab-panel">
            <div>
              <h3>{current.title}</h3>
              <ul className="points">
                {current.points.map((p) => (
                  <li key={p}><Check size={18} aria-hidden="true" />{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="panel-label">Áreas recomendadas</p>
              <div className="chips">
                {current.areaIds.map((id) => {
                  const a = areas.find((x) => x.id === id);
                  return (
                    <button key={id} type="button" className="chip-btn" onClick={() => onPickArea(id)}>
                      {a.name}
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
