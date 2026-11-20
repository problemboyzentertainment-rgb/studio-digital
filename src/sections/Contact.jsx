import { useRef, useState, useId } from 'react';
import { Mail, MessageCircle, Phone, Send, CircleAlert, Loader2 } from 'lucide-react';
import { areas, EMAIL, whatsappLink, telLink, PHONE_LABEL, WA_DEFAULT } from '../data/catalog.js';
import Modal from '../components/Modal.jsx';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre (mínimo 2 caracteres).';
  if (!v.correo.trim()) e.correo = 'Escribe tu correo electrónico.';
  else if (!EMAIL_RE.test(v.correo.trim())) e.correo = 'Revisa el formato del correo, por ejemplo: nombre@dominio.com.';
  if (!v.servicio) e.servicio = 'Elige el tipo de servicio.';
  if (v.mensaje.trim().length < 15) e.mensaje = 'Cuéntanos un poco más (mínimo 15 caracteres).';
  else if (v.mensaje.length > 2000) e.mensaje = 'El mensaje es muy largo (máximo 2000 caracteres).';
  if (!v.privacidad) e.privacidad = 'Debes aceptar la política de privacidad para enviar.';
  return e;
}

function Field({ uid, name, label, hint, error, children }) {
  return (
    <div className="field">
      <label htmlFor={`${uid}-${name}`}>{label}</label>
      {children}
      {hint && !error && <span className="hint" id={`${uid}-${name}-hint`}>{hint}</span>}
      {error && (
        <p className="error" id={`${uid}-${name}-err`}>
          <CircleAlert size={16} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ notify }) {
  const uid = useId();
  const loadedAt = useRef(Date.now());
  const [values, setValues] = useState({ nombre: '', correo: '', servicio: '', mensaje: '', privacidad: false, web: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const refs = { nombre: useRef(), correo: useRef(), servicio: useRef(), mensaje: useRef(), privacidad: useRef() };

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    // Anti-spam básico: campo trampa + tiempo mínimo
    if (values.web) return;
    if (Date.now() - loadedAt.current < 3000) {
      notify('error', 'Espera unos segundos antes de enviar el formulario.');
      return;
    }
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      refs[firstKey].current?.focus();
      notify('error', 'Revisa los campos marcados.');
      return;
    }

    const areaName = areas.find((a) => a.id === values.servicio)?.name || values.servicio;
    setSending(true);
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ nombre: values.nombre, correo: values.correo, servicio: areaName, mensaje: values.mensaje }),
        });
        if (!res.ok) throw new Error('bad status');
        notify('success', 'Mensaje enviado. Te responderemos pronto.');
      } else {
        // Sin backend: abre tu cliente de correo con el mensaje listo.
        const subject = encodeURIComponent(`Consulta Studio Digital — ${areaName}`);
        const body = encodeURIComponent(`Nombre: ${values.nombre}\nCorreo: ${values.correo}\nServicio: ${areaName}\n\n${values.mensaje}`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        notify('success', 'Abrimos tu correo con el mensaje listo. Si no se abrió, usa WhatsApp.');
      }
      setValues({ nombre: '', correo: '', servicio: '', mensaje: '', privacidad: false, web: '' });
      loadedAt.current = Date.now();
    } catch {
      notify('error', 'No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  const areaLabel = areas.find((a) => a.id === values.servicio)?.name;
  const waText =
    values.nombre.trim() || areaLabel || values.mensaje.trim()
      ? [
          `Hola Studio Digital${values.nombre.trim() ? `, soy ${values.nombre.trim()}` : ''}.`,
          areaLabel ? `Necesito ayuda con: ${areaLabel}.` : '',
          values.mensaje.trim(),
        ].filter(Boolean).join(' ')
      : WA_DEFAULT;

  const describe = (name) => (errors[name] ? `${uid}-${name}-err` : `${uid}-${name}-hint`);

  return (
    <section id="contacto" aria-labelledby="con-title">
      <div className="container">
        <div className="section-head rv">
          <p className="eyebrow">Contacto</p>
          <h2 id="con-title">Cuéntanos qué necesitas</h2>
          <p>Escríbenos por WhatsApp para una respuesta directa, o deja tu mensaje en el formulario.</p>
        </div>

        <div className="contact-grid">
          <form className="form" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-intro`}>
            <p id={`${uid}-intro`} style={{ margin: 0 }}>Todos los campos son obligatorios.</p>

            <Field uid={uid} error={errors.nombre} name="nombre" label="Nombre">
              <input
                ref={refs.nombre} id={`${uid}-nombre`} className="input" type="text" autoComplete="name"
                value={values.nombre} onChange={set('nombre')}
                aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? describe('nombre') : undefined}
              />
            </Field>

            <Field uid={uid} error={errors.correo} name="correo" label="Correo electrónico" hint="Para responderte.">
              <input
                ref={refs.correo} id={`${uid}-correo`} className="input" type="email" autoComplete="email" inputMode="email"
                value={values.correo} onChange={set('correo')}
                aria-invalid={!!errors.correo} aria-describedby={describe('correo')}
              />
            </Field>

            <Field uid={uid} error={errors.servicio} name="servicio" label="Tipo de servicio">
              <select
                ref={refs.servicio} id={`${uid}-servicio`} className="select"
                value={values.servicio} onChange={set('servicio')}
                aria-invalid={!!errors.servicio} aria-describedby={errors.servicio ? describe('servicio') : undefined}
              >
                <option value="">Selecciona una opción</option>
                {areas.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                <option value="otro">Otro / no estoy seguro</option>
              </select>
            </Field>

            <Field uid={uid} error={errors.mensaje} name="mensaje" label="Descripción del proyecto" hint="Qué necesitas y para cuándo, en pocas líneas.">
              <textarea
                ref={refs.mensaje} id={`${uid}-mensaje`} className="textarea" maxLength={2100}
                value={values.mensaje} onChange={set('mensaje')}
                aria-invalid={!!errors.mensaje} aria-describedby={describe('mensaje')}
              />
            </Field>

            {/* Campo trampa anti-spam: invisible para personas */}
            <div className="honeypot" aria-hidden="true">
              <label>No llenar<input type="text" tabIndex={-1} autoComplete="off" value={values.web} onChange={set('web')} /></label>
            </div>

            <div className="field">
              <div className="check">
                <input
                  ref={refs.privacidad} id={`${uid}-privacidad`} type="checkbox"
                  checked={values.privacidad} onChange={set('privacidad')}
                  aria-invalid={!!errors.privacidad} aria-describedby={errors.privacidad ? describe('privacidad') : undefined}
                />
                <label htmlFor={`${uid}-privacidad`} className="check-label">
                  Acepto el uso de mis datos para responder esta consulta.
                </label>
              </div>
              <button type="button" className="link-btn" onClick={() => setPrivacyOpen(true)}>
                Leer la política de privacidad
              </button>
              {errors.privacidad && (
                <p className="error" id={`${uid}-privacidad-err`}><CircleAlert size={16} aria-hidden="true" /> {errors.privacidad}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={sending} aria-busy={sending}>
              {sending ? <Loader2 size={18} aria-hidden="true" className="spin" /> : <Send size={18} aria-hidden="true" />}
              {sending ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>

          <div className="contact-side">
            <a className="contact-card contact-wa" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
              <span className="ico"><MessageCircle size={22} aria-hidden="true" /></span>
              <span>
                <strong>Consulta por WhatsApp</strong>
                <small>La vía más directa</small>
              </span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
            <a className="contact-card" href={telLink}>
              <span className="ico"><Phone size={22} aria-hidden="true" /></span>
              <span>
                <strong>Llamar</strong>
                <small>{PHONE_LABEL}</small>
              </span>
            </a>
            <a className="contact-card" href={`mailto:${EMAIL}`}>
              <span className="ico"><Mail size={22} aria-hidden="true" /></span>
              <span>
                <strong>Correo</strong>
                <small>{EMAIL}</small>
              </span>
            </a>
            <p className="contact-note">Atención remota para Ecuador e internacional.</p>
          </div>
        </div>
      </div>

      {privacyOpen && (
        <Modal title="Política de privacidad" onClose={() => setPrivacyOpen(false)}>
          <p>Usamos los datos del formulario (nombre, correo, tipo de servicio y descripción) únicamente para responder tu consulta.</p>
          <p>No vendemos ni compartimos tus datos con terceros con fines comerciales. Si envías el formulario por correo o por WhatsApp, esos servicios aplican sus propias políticas.</p>
          <p>Puedes pedir que eliminemos tu información escribiendo a {EMAIL}.</p>
          <button type="button" className="btn btn-primary" onClick={() => setPrivacyOpen(false)}>Entendido</button>
        </Modal>
      )}
    </section>
  );
}
