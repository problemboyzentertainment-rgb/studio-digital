import { useMemo, useState, useId } from 'react';
import { Search, ChevronDown, MessageCircle, Phone, X, ArrowUpRight } from 'lucide-react';
import { areas, services, whatsappLink, telLink } from '../data/catalog.js';
import { techs } from '../data/techs.js';
import { LucideByName, TechChip } from '../components/Icons.jsx';

const PAGE = 6;

const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export default function Services({ filters, setFilters }) {
  const { query, area, tech } = filters;
  const [open, setOpen] = useState(() => new Set());
  const [visible, setVisible] = useState(PAGE);
  const uid = useId();

  const areaName = useMemo(() => Object.fromEntries(areas.map((a) => [a.id, a.name])), []);

  const results = useMemo(() => {
    const q = norm(query.trim());
    return services.filter((s) => {
      if (area !== 'todas' && s.area !== area) return false;
      if (tech !== 'todas' && !s.techs.includes(tech)) return false;
      if (!q) return true;
      const haystack = norm(
        [s.title, s.summary, areaName[s.area], ...s.details, ...s.techs.map((t) => techs[t]?.name || '')].join(' '),
      );
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query, area, tech, areaName]);

  const shown = results.slice(0, visible);
  const hasFilters = query || area !== 'todas' || tech !== 'todas';

  const update = (patch) => {
    setVisible(PAGE);
    setFilters((f) => ({ ...f, ...patch }));
  };

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const pickArea = (id) => {
    update({ area: id, query: '', tech: 'todas' });
    document.getElementById('explorador')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="servicios" aria-labelledby="servicios-title">
      <div className="container">
        <div className="section-head rv">
          <p className="eyebrow">Servicios</p>
          <h2 id="servicios-title">Elige un área y descubre lo que necesitas</h2>
          <p>Ocho áreas de trabajo. Selecciona una para ver sus servicios; el resto queda oculto hasta que lo pidas.</p>
        </div>

        <ul className="area-grid rv" aria-label="Áreas de servicio">
          {areas.map((a, i) => {
            const list = services.filter((s) => s.area === a.id);
            return (
              <li key={a.id}>
                <button type="button" className="area-card" onClick={() => pickArea(a.id)}>
                  <span className="area-top">
                    <span className="ico"><LucideByName name={a.icon} /></span>
                    <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <strong>{a.name}</strong>
                  <span className="area-sample">{list.map((x) => x.title).join(' · ')}</span>
                  <span className="area-more">
                    {list.length} {list.length === 1 ? 'servicio' : 'servicios'}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div id="explorador" className="explorer">
          <h3>Explorador de servicios</h3>
          <div className="explorer-controls">
            <div className="field">
              <label htmlFor={`${uid}-q`} className="sr-only">Buscar servicios</label>
              <div className="search-wrap">
                <Search size={18} aria-hidden="true" />
                <input
                  id={`${uid}-q`}
                  type="search"
                  className="input"
                  placeholder="Busca: Excel, redes, SQL, Java…"
                  value={query}
                  onChange={(e) => update({ query: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </div>

            <div role="group" aria-label="Filtrar por área" className="chips">
              <button
                type="button"
                className="chip-btn"
                aria-pressed={area === 'todas'}
                onClick={() => update({ area: 'todas' })}
              >
                Todas
              </button>
              {areas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="chip-btn"
                  aria-pressed={area === a.id}
                  onClick={() => update({ area: a.id })}
                >
                  {a.name}
                </button>
              ))}
            </div>

            {tech !== 'todas' && (
              <div>
                <button type="button" className="chip-btn" aria-pressed="true" onClick={() => update({ tech: 'todas' })}>
                  Tecnología: {techs[tech]?.name}
                  <X size={14} aria-hidden="true" style={{ marginLeft: 6, verticalAlign: 'middle' }} />
                  <span className="sr-only"> (quitar filtro)</span>
                </button>
              </div>
            )}
          </div>

          <p className="results-info" role="status" aria-live="polite">
            {results.length === 0
              ? 'Sin resultados.'
              : `${results.length} ${results.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}.`}
            {hasFilters && (
              <>
                {' '}
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ minHeight: 44 }}
                  onClick={() => {
                    setVisible(PAGE);
                    setFilters({ query: '', area: 'todas', tech: 'todas' });
                  }}
                >
                  Limpiar filtros
                </button>
              </>
            )}
          </p>

          {results.length === 0 ? (
            <div className="empty">
              <p>No encontramos servicios con esa búsqueda. Prueba otra palabra o cuéntanos qué necesitas.</p>
              <a
                className="btn btn-whatsapp"
                href={whatsappLink(`Hola Studio Digital, busco ayuda con: ${query || 'un servicio que no encuentro en la web'}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Consulta por WhatsApp
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            </div>
          ) : (
            <ul className="service-list">
              {shown.map((s) => {
                const isOpen = open.has(s.id);
                const panelId = `${uid}-${s.id}`;
                return (
                  <li key={s.id} className="card service-card reveal">
                    <h4 style={{ margin: 0 }}>
                      <button
                        type="button"
                        className="service-head"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(s.id)}
                      >
                        <span className="ico"><LucideByName name={s.icon} size={20} /></span>
                        <span className="txt">
                          <strong>{s.title}</strong>
                          <small>{s.summary}</small>
                        </span>
                        <ChevronDown className="chev" size={20} aria-hidden="true" />
                      </button>
                    </h4>
                    {isOpen && (
                      <div id={panelId} className="service-body">
                        <p className="eyebrow" style={{ marginBottom: 6 }}>{areaName[s.area]}</p>
                        <ul className="points">
                          {s.details.map((d) => <li key={d}>{d}</li>)}
                        </ul>
                        {s.techs.length > 0 && (
                          <>
                            <p style={{ marginBottom: 6, fontSize: '0.875rem' }}>Tecnologías relacionadas</p>
                            <ul className="tech-chips" aria-label={`Tecnologías de ${s.title}`}>
                              {s.techs.map((t) => techs[t] && <TechChip key={t} tech={techs[t]} />)}
                            </ul>
                          </>
                        )}
                        <div className="service-actions">
                          <a
                            className="btn btn-whatsapp"
                            href={whatsappLink(`Hola Studio Digital, me interesa el servicio «${s.title}». ¿Podemos conversar?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle size={18} aria-hidden="true" />
                            Consulta por WhatsApp
                            <span className="sr-only"> sobre {s.title} (se abre en una pestaña nueva)</span>
                          </a>
                          <a className="btn btn-secondary" href={telLink}>
                            <Phone size={18} aria-hidden="true" />
                            Llamar
                            <span className="sr-only"> para consultar sobre {s.title}</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {results.length > visible && (
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setVisible((v) => v + PAGE)}>
                Ver más servicios ({results.length - visible} restantes)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
