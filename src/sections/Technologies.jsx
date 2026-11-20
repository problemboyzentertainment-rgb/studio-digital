import { useMemo, useState } from 'react';
import { services } from '../data/catalog.js';
import { techList } from '../data/techs.js';

const GROUPS = [
  { id: 'todas', label: 'Todas' },
  { id: 'web', label: 'Web y lenguajes', ids: ['react', 'javascript', 'typescript', 'html5', 'css', 'php', 'nodejs', 'express', 'java', 'cplusplus', 'csharp', 'python', 'dotnet', 'spring', 'fastapi', 'bash'] },
  { id: 'datos', label: 'Datos', ids: ['mysql', 'postgresql', 'mariadb', 'sqlite', 'mongodb', 'sqlserver', 'excel', 'googlesheets', 'pandas', 'jupyter'] },
  { id: 'cloud', label: 'Cloud y DevOps', ids: ['aws', 'azure', 'googlecloud', 'cloudflare', 'docker', 'kubernetes', 'terraform', 'nginx', 'linux', 'git', 'github', 'githubactions'] },
  { id: 'redes', label: 'Redes y soporte', ids: ['cisco', 'googlemeet', 'anydesk', 'whatsapp', 'postman'] },
  { id: 'ia', label: 'IA y automatización', ids: ['claude', 'gemini', 'openai', 'n8n'] },
  { id: 'oficina', label: 'Ofimática', ids: ['excel', 'word', 'powerpoint'] },
];

export default function Technologies({ selected, onSelect }) {
  const [group, setGroup] = useState('todas');

  const inUse = useMemo(() => {
    const set = new Set();
    services.forEach((s) => s.techs.forEach((t) => set.add(t)));
    return set;
  }, []);

  const list = techList.filter((t) => {
    if (!inUse.has(t.id)) return false;
    if (group === 'todas') return true;
    return GROUPS.find((g) => g.id === group)?.ids.includes(t.id);
  });

  return (
    <section id="tecnologias" className="alt" aria-labelledby="tec-title">
      <div className="container">
        <div className="section-head rv">
          <p className="eyebrow">Tecnologías</p>
          <h2 id="tec-title">Herramientas con las que trabajamos</h2>
          <p>Elige una tecnología para ver qué servicios la usan.</p>
        </div>

        <div className="chips tech-groups" role="group" aria-label="Agrupar tecnologías">
          {GROUPS.map((g) => (
            <button key={g.id} type="button" className="chip-btn" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.label}
            </button>
          ))}
        </div>

        <ul className="tech-cloud" aria-label="Tecnologías">
          {list.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                className="tech-btn"
                aria-pressed={selected === t.id}
                onClick={() => {
                  onSelect(selected === t.id ? 'todas' : t.id);
                  if (selected !== t.id) document.getElementById('explorador')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {t.icon && (
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                    <path d={t.icon.path} fill="currentColor" />
                  </svg>
                )}
                {t.name}
              </button>
            </li>
          ))}
        </ul>


      </div>
    </section>
  );
}
