// Catálogo de Studio Digital: 8 áreas, 22 líneas de servicio.
// Los nombres de las líneas son una propuesta de organización: ajústalos a tu catálogo real.

export const WHATSAPP_NUMBER = '593961819794';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = 'crist-18@live.com';
export const PHONE_TEL = '+593961819794';
export const PHONE_LABEL = '+593 961 81 97 94';
export const telLink = `tel:${PHONE_TEL}`;
export const WA_DEFAULT = 'Hola Studio Digital, quiero hacer una consulta.';

export function whatsappLink(message) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const areas = [
  { id: 'desarrollo', name: 'Desarrollo de software', icon: 'Code2' },
  { id: 'ia', name: 'IA y automatización', icon: 'Bot' },
  { id: 'datos', name: 'Datos y bases de datos', icon: 'Database' },
  { id: 'redes', name: 'Redes e infraestructura', icon: 'Network' },
  { id: 'cloud', name: 'Cloud y DevOps', icon: 'Cloud' },
  { id: 'consultoria', name: 'Consultoría tecnológica', icon: 'Compass' },
  { id: 'academica', name: 'Asesoría académica y técnica', icon: 'GraduationCap' },
  { id: 'soporte', name: 'Soporte y mantenimiento', icon: 'Wrench' },
];

// techs: ids definidos en src/data/techs.js
export const services = [
  // Desarrollo de software
  {
    id: 'web-medida',
    area: 'desarrollo',
    icon: 'Globe',
    title: 'Desarrollo web a medida',
    summary: 'Sitios y aplicaciones web rápidas, accesibles y fáciles de mantener.',
    details: [
      'Sitios corporativos y aplicaciones web con panel de administración.',
      'Diseño responsive y enfoque en accesibilidad.',
      'Entrega con documentación para que puedas continuar por tu cuenta.',
    ],
    techs: ['react', 'javascript', 'typescript', 'nodejs', 'html5', 'css', 'php'],
  },
  {
    id: 'desktop',
    area: 'desarrollo',
    icon: 'AppWindow',
    title: 'Aplicaciones de escritorio',
    summary: 'Programas de escritorio para gestión, registro y procesos internos.',
    details: [
      'Aplicaciones con interfaz gráfica y base de datos.',
      'Patrones de diseño y código ordenado (por ejemplo DAO).',
      'Instaladores y guía de uso.',
    ],
    techs: ['java', 'csharp', 'cplusplus', 'python'],
  },
  {
    id: 'apis',
    area: 'desarrollo',
    icon: 'Webhook',
    title: 'APIs y microservicios',
    summary: 'Servicios backend bien estructurados y documentados.',
    details: [
      'APIs REST con validación y manejo de errores.',
      'Separación por servicios y contratos claros.',
      'Pruebas de endpoints con herramientas estándar.',
    ],
    techs: ['nodejs', 'express', 'fastapi', 'spring', 'dotnet', 'postman'],
  },

  // IA y automatización
  {
    id: 'ia-aplicada',
    area: 'ia',
    icon: 'Sparkles',
    title: 'IA aplicada a tu trabajo',
    summary: 'Uso práctico de asistentes de IA en procesos reales.',
    details: [
      'Integración de modelos de lenguaje en flujos de trabajo.',
      'Plantillas de instrucciones (prompts) para tareas repetitivas.',
      'Criterios para usar IA con control y revisión humana.',
    ],
    techs: ['claude', 'gemini', 'openai', 'python'],
  },
  {
    id: 'automatizacion',
    area: 'ia',
    icon: 'Workflow',
    title: 'Automatización de procesos',
    summary: 'Elimina tareas manuales repetitivas con flujos automáticos.',
    details: [
      'Flujos entre aplicaciones, formularios y hojas de cálculo.',
      'Notificaciones y reportes automáticos.',
      'Documentación de cada flujo.',
    ],
    techs: ['n8n', 'googlesheets', 'python', 'javascript'],
  },
  {
    id: 'scripts',
    area: 'ia',
    icon: 'Terminal',
    title: 'Scripts e integraciones',
    summary: 'Scripts a medida para tareas del día a día.',
    details: [
      'Automatización en PowerShell, Bash y Python.',
      'Procesamiento de archivos y conversión de formatos.',
      'Integración con servicios y APIs existentes.',
    ],
    techs: ['python', 'bash', 'javascript', 'git'],
  },

  // Datos y bases de datos
  {
    id: 'bases-datos',
    area: 'datos',
    icon: 'Database',
    title: 'Bases de datos y SQL',
    summary: 'Diseño, consultas y administración de bases de datos relacionales.',
    details: [
      'Modelado entidad-relación y normalización.',
      'Consultas SQL, procedimientos, vistas y optimización.',
      'Respaldos y recuperación.',
    ],
    techs: ['mysql', 'postgresql', 'mariadb', 'sqlite', 'sqlserver', 'mongodb'],
  },
  {
    id: 'excel-analitica',
    area: 'datos',
    icon: 'Table2',
    title: 'Excel y reportes',
    summary: 'Hojas de cálculo con fórmulas, tablas dinámicas y paneles.',
    details: [
      'Fórmulas, validaciones y tablas dinámicas.',
      'Paneles de indicadores y reportes automatizados.',
      'Limpieza y consolidación de datos.',
    ],
    techs: ['excel', 'googlesheets', 'python', 'pandas'],
  },
  {
    id: 'migracion-datos',
    area: 'datos',
    icon: 'ArrowRightLeft',
    title: 'Migración y análisis de datos',
    summary: 'Mueve, transforma y analiza información con orden.',
    details: [
      'Migración entre sistemas y formatos.',
      'Análisis exploratorio con notebooks.',
      'Replicación de bases de datos.',
    ],
    techs: ['python', 'pandas', 'jupyter', 'postgresql'],
  },

  // Redes e infraestructura
  {
    id: 'redes-diseno',
    area: 'redes',
    icon: 'Network',
    title: 'Diseño y simulación de redes',
    summary: 'Topologías, direccionamiento y pruebas antes de implementar.',
    details: [
      'Simulaciones en Cisco Packet Tracer.',
      'Subredes con VLSM y planes de direccionamiento.',
      'Documentación de topología.',
    ],
    techs: ['cisco'],
  },
  {
    id: 'redes-config',
    area: 'redes',
    icon: 'Router',
    title: 'Configuración de equipos de red',
    summary: 'VLAN, DHCP, enrutamiento y acceso remoto seguro.',
    details: [
      'VLAN, DHCP, enrutamiento y listas de acceso.',
      'Acceso remoto seguro con SSH.',
      'Diagnóstico y corrección de fallas.',
    ],
    techs: ['cisco', 'linux'],
  },

  // Cloud y DevOps
  {
    id: 'cloud-deploy',
    area: 'cloud',
    icon: 'CloudUpload',
    title: 'Despliegue en la nube',
    summary: 'Publica tus aplicaciones y sitios en servicios cloud.',
    details: [
      'Servidores virtuales, bases de datos gestionadas y almacenamiento.',
      'Sitios estáticos y aplicaciones web en plataformas cloud.',
      'Guía de costos y buenas prácticas básicas.',
    ],
    techs: ['aws', 'azure', 'googlecloud', 'cloudflare', 'nginx', 'linux'],
  },
  {
    id: 'devops',
    area: 'cloud',
    icon: 'GitBranch',
    title: 'Contenedores y CI/CD',
    summary: 'Entornos reproducibles y entregas automatizadas.',
    details: [
      'Contenedores con Docker.',
      'Flujos de integración y despliegue continuo.',
      'Control de versiones y flujos de trabajo con Git.',
    ],
    techs: ['docker', 'kubernetes', 'githubactions', 'git', 'github', 'terraform'],
  },

  // Consultoría tecnológica
  {
    id: 'consultoria-ti',
    area: 'consultoria',
    icon: 'Lightbulb',
    title: 'Diagnóstico y consultoría',
    summary: 'Revisamos tu situación técnica y proponemos un camino claro.',
    details: [
      'Evaluación de sistemas y procesos actuales.',
      'Recomendación de herramientas y prioridades.',
      'Plan de trabajo por etapas.',
    ],
    techs: [],
  },
  {
    id: 'arquitectura',
    area: 'consultoria',
    icon: 'Layers',
    title: 'Arquitectura de soluciones',
    summary: 'Diseño técnico antes de construir.',
    details: [
      'Selección de tecnologías según el caso.',
      'Diagramas de arquitectura y de datos.',
      'Criterios de escalabilidad y mantenimiento.',
    ],
    techs: ['react', 'nodejs', 'postgresql', 'docker'],
  },

  // Asesoría académica y técnica
  {
    id: 'clases-ofimatica',
    area: 'academica',
    icon: 'Presentation',
    title: 'Clases de computación y ofimática',
    summary: 'Computación básica e intermedia, Excel, Word y PowerPoint.',
    details: [
      'Excel en niveles básico, intermedio y avanzado.',
      'Word y PowerPoint para trabajo y estudio.',
      'Clases personalizadas según tu ritmo.',
    ],
    techs: ['excel', 'word', 'powerpoint'],
  },
  {
    id: 'clases-programacion',
    area: 'academica',
    icon: 'Laptop',
    title: 'Asesoría en programación',
    summary: 'Acompañamiento en C#, Java, C++, Python y Visual Studio.',
    details: [
      'Lógica de programación y fundamentos.',
      'Revisión de código y buenas prácticas.',
      'Apoyo para entender y mejorar tus proyectos.',
    ],
    techs: ['csharp', 'java', 'cplusplus', 'python'],
  },
  {
    id: 'clases-redes',
    area: 'academica',
    icon: 'Cable',
    title: 'Redes y preparación Cisco',
    summary: 'Cisco Packet Tracer y bases para CCNA.',
    details: [
      'Práctica guiada en Packet Tracer.',
      'Direccionamiento, VLAN y configuración de equipos.',
      'Resolución de ejercicios y laboratorios.',
    ],
    techs: ['cisco'],
  },
  {
    id: 'clases-bd',
    area: 'academica',
    icon: 'DatabaseZap',
    title: 'Asesoría en bases de datos',
    summary: 'SQL y MySQL desde lo básico hasta consultas avanzadas.',
    details: [
      'Diseño de tablas y relaciones.',
      'Consultas, joins y subconsultas.',
      'Práctica con casos reales.',
    ],
    techs: ['mysql', 'postgresql', 'sqlserver'],
  },

  // Soporte y mantenimiento
  {
    id: 'soporte-software',
    area: 'soporte',
    icon: 'LifeBuoy',
    title: 'Soporte de software',
    summary: 'Ayuda remota para que tus herramientas funcionen.',
    details: [
      'Instalación y configuración de programas.',
      'Atención remota por videollamada y escritorio remoto.',
      'Seguimiento hasta resolver el problema.',
    ],
    techs: ['googlemeet', 'anydesk', 'whatsapp'],
  },
  {
    id: 'depuracion',
    area: 'soporte',
    icon: 'Bug',
    title: 'Depuración y corrección de errores',
    summary: 'Encontramos la causa y la corregimos.',
    details: [
      'Análisis de errores en código y bases de datos.',
      'Correcciones explicadas paso a paso.',
      'Recomendaciones para evitar que se repitan.',
    ],
    techs: ['git', 'github'],
  },
  {
    id: 'mantenimiento',
    area: 'soporte',
    icon: 'HardDrive',
    title: 'Mantenimiento de sistemas',
    summary: 'Limpieza, configuración y puesta a punto de equipos Windows.',
    details: [
      'Configuración del sistema con PowerShell.',
      'Limpieza y optimización.',
      'Compatibilidad de periféricos y software.',
    ],
    techs: [],
  },
];

export const faq = [
  {
    q: '¿Cómo funciona la atención remota?',
    a: 'Trabajamos por WhatsApp, Google Meet, AnyDesk, GitHub y Drive. No necesitas desplazarte: coordinamos horario y resolvemos a distancia.',
  },
  {
    q: '¿Atienden fuera de Ecuador?',
    a: 'Sí. La atención es remota, así que podemos trabajar con clientes de Ecuador y de otros países.',
  },
  {
    q: '¿Puedo pedir solo una clase o una asesoría puntual?',
    a: 'Sí. Puedes pedir una sesión puntual o un acompañamiento continuo. Cuéntanos qué necesitas y lo definimos juntos.',
  },
  {
    q: '¿Qué pasa después de la entrega de un proyecto?',
    a: 'Entregamos con documentación para que puedas continuar por tu cuenta. Si lo necesitas, también puedes pedir soporte adicional.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Escríbenos por WhatsApp con «Consulta por WhatsApp» o usa el formulario. Respondemos con los siguientes pasos.',
  },
];

export const process = [
  { title: 'Cuéntanos', text: 'Nos explicas qué necesitas, aunque no tengas todos los términos técnicos.' },
  { title: 'Definimos', text: 'Acordamos alcance, tiempos y forma de trabajo.' },
  { title: 'Resolvemos', text: 'Trabajamos de forma remota y te mantenemos al tanto.' },
  { title: 'Tú continúas', text: 'Te entregamos todo con documentación para seguir con autonomía.' },
];

export const solutions = [
  {
    id: 'negocios',
    tab: 'Negocios',
    title: 'Para negocios y emprendimientos',
    points: ['Sitio web profesional', 'Sistemas de gestión y registro', 'Automatización de reportes y tareas'],
    areaIds: ['desarrollo', 'ia', 'datos'],
  },
  {
    id: 'estudiantes',
    tab: 'Estudiantes',
    title: 'Para estudiantes y aprendices',
    points: ['Clases personalizadas', 'Asesoría en proyectos técnicos', 'Práctica de redes y bases de datos'],
    areaIds: ['academica', 'redes', 'datos'],
  },
  {
    id: 'equipos',
    tab: 'Equipos técnicos',
    title: 'Para equipos técnicos',
    points: ['Despliegue en la nube', 'Contenedores y CI/CD', 'Arquitectura y revisión técnica'],
    areaIds: ['cloud', 'consultoria', 'desarrollo'],
  },
];
