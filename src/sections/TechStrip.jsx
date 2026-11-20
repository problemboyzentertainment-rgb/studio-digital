import { techs } from '../data/techs.js';

const IDS = ['react', 'nodejs', 'python', 'java', 'postgresql', 'mysql', 'docker', 'git', 'linux', 'cisco'];

export default function TechStrip() {
  return (
    <div className="strip" role="region" aria-label="Algunas de las tecnologías con las que trabajamos">
      <ul className="container strip-list">
        {IDS.map((id) => {
          const t = techs[id];
          return (
            <li key={id}>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                <path d={t.icon.path} fill="currentColor" />
              </svg>
              {t.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
