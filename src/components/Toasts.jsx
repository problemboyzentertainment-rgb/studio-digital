import { CircleCheck, CircleAlert, X } from 'lucide-react';

// Región aria-live para notificaciones de éxito y error.
export default function Toasts({ toasts, onDismiss }) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
          {t.type === 'error' ? (
            <CircleAlert size={20} aria-hidden="true" />
          ) : (
            <CircleCheck size={20} aria-hidden="true" />
          )}
          <span>{t.message}</span>
          <button type="button" onClick={() => onDismiss(t.id)} aria-label="Cerrar notificación">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      ))}
    </div>
  );
}
