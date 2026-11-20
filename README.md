# Studio Digital — sitio web

React 19 + Vite. Tipografías Bricolage Grotesque e Inter (incluidas localmente, sin CDN). Iconos: Lucide React (interfaz) y Simple Icons (tecnologías), integrados localmente como SVG.

## Ejecutar en Windows

1. Instala **Node.js LTS** (https://nodejs.org). Se probó con Node 22.
2. Doble clic en `iniciar.bat` (instala dependencias la primera vez y abre http://localhost:5173).

O desde PowerShell, en esta carpeta:

```powershell
npm install
npm run dev
```

## Compilar y previsualizar

```powershell
npm run build      # genera la carpeta dist
npm run preview    # sirve dist en http://localhost:4173
```

`construir.bat` hace la compilación con un doble clic.

## Publicar

Sube **el contenido** de `dist` a cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).

- Netlify / Vercel / Cloudflare Pages: comando `npm run build`, carpeta de salida `dist`.
- El sitio es de una sola página (anclas `#`), no necesita reglas de redirección.
- No se puede abrir `dist/index.html` con doble clic (`file://`): los módulos JS requieren un servidor. Usa `npm run preview` o un hosting.

## Formulario de contacto

- Por defecto, al enviar abre el cliente de correo con el mensaje listo (`mailto:`), porque el sitio no tiene backend.
- Para envío directo sin abrir el correo, crea un formulario en Formspree (u otro servicio equivalente), copia `.env.example` como `.env` y define `VITE_FORM_ENDPOINT`.
- Protección anti-spam: campo trampa oculto y tiempo mínimo de 3 s antes de enviar.

## Dónde editar contenido

| Qué | Archivo |
| --- | --- |
| Servicios, áreas, FAQ, proceso, WhatsApp, teléfono y correo | `src/data/catalog.js` |
| Tecnologías y logotipos | `src/data/techs.js` |
| Proyectos demostrativos | `src/data/projects.js` (vacío a propósito) |
| Colores y estilos | `src/styles/global.css` (variables en `:root`) |
| Título, descripción y datos SEO | `index.html` |

**Importante:** los nombres de las 22 líneas de servicio en `catalog.js` son una propuesta de organización. Ajústalos a tu catálogo real.

Proyectos: no se inventan casos, clientes ni resultados. Agrega demos reales en `projects.js` cuando las tengas.

## Iconos y licencias

- Lucide: licencia ISC.
- Simple Icons: datos de iconos en CC0; las marcas pertenecen a sus dueños.
- AWS, Azure, Office, OpenAI, SQL Server y C# no tienen logotipo en Simple Icons, por eso se muestran solo con texto.

## Pendientes recomendados antes de publicar

- Cuando tengas dominio: agregar `canonical`, `sitemap.xml` y una imagen Open Graph.
- Revisar el texto de la política de privacidad con tus criterios legales.
- Pruebas con lector de pantalla real (NVDA/JAWS/VoiceOver) y en dispositivos físicos.
