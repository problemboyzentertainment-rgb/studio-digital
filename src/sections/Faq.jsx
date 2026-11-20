import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/catalog.js';

export default function Faq() {
  const [open, setOpen] = useState(null);
  const uid = useId();

  return (
    <section id="faq" className="alt" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="section-head rv">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title">Antes de escribirnos</h2>
        </div>
        <div className="accordion">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                <h3 className="faq-q">
                  <button
                    type="button"
                    className="acc-btn"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && (
                  <div id={`${uid}-${i}`} className="acc-panel" role="region" aria-label={item.q}>
                    <p style={{ margin: 0 }}>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
