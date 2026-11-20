import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Modal accesible: role=dialog, aria-modal, foco atrapado, Esc cierra, devuelve el foco, bloquea el scroll.
export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const titleId = 'modal-title';

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const dialog = dialogRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = dialog.querySelector(FOCUSABLE);
    (first || dialog).focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE));
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused.current && previouslyFocused.current.focus) previouslyFocused.current.focus();
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}>
        <div className="modal-head">
          <h2 id={titleId} style={{ fontSize: '1.4rem' }}>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar ventana">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
