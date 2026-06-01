/* =====================================================================
   Data Governance Academy — Currículo completo (36 módulos)
   Fuente troncal: DAMA-DMBOK2 | Benchmark: DCAM, DGI, CMMI DMM, ISO
   Capa propia: Minsait Business Consulting. Bloque 6: Gobierno de la IA.
   Generado desde el proyecto gobierno-datos-academy. No editar a mano:
   regenerar desde la fuente si cambia el contenido.
   ===================================================================== */

export interface QuizQuestion {
  q: string;
  opciones: string[];
  respuesta: number; // índice 0-based de la opción correcta
  explica: string;
}

export interface Seccion {
  h: string;
  html: string;
}

export interface Termino {
  t: string;
  d: string;
}

export interface Modulo {
  id: string;
  dia: number;
  bloque: string;
  area: string;
  icono: string;
  estado: string;
  titulo: string;
  tiempo?: string;
  objetivos: string[];
  secciones: Seccion[];
  terminos: Termino[];
  minsait: string;
  quiz: QuizQuestion[];
}

export interface Bloque { id: string; nombre: string; }

export interface CurriculumMeta {
  titulo: string;
  subtitulo: string;
  aprobacion: number;
  bloques: Bloque[];
}

export interface Curriculum {
  meta: CurriculumMeta;
  modulos: Modulo[];
}

export const DATA_GOVERNANCE_CURRICULUM: Curriculum = {
  "meta": {
    "titulo": "Gobierno del Dato — Academia Personal",
    "subtitulo": "De cero a profundidad · DAMA-DMBOK + Metodología Minsait",
    "aprobacion": 0.6,
    "bloques": [
      {
        "id": "b1",
        "nombre": "Bloque 1 · Fundamentos"
      },
      {
        "id": "b2",
        "nombre": "Bloque 2 · Áreas de conocimiento (DAMA)"
      },
      {
        "id": "b3",
        "nombre": "Bloque 3 · Madurez & Plataforma"
      },
      {
        "id": "b4",
        "nombre": "Bloque 4 · Implantación & IA"
      },
      {
        "id": "b5",
        "nombre": "Bloque 5 · Integrador & Examen"
      },
      {
        "id": "b6",
        "nombre": "Bloque 6 · Gobierno de la IA"
      }
    ]
  },
  "modulos": [
    {
      "id": "d1",
      "dia": 1,
      "bloque": "b1",
      "area": "Método de estudio",
      "icono": "🧭",
      "estado": "full",
      "titulo": "Cómo aprender Gobierno del Dato (de cero y a profundidad)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Entender el método de aprendizaje top-down que seguiremos.",
        "Conocer la fuente troncal (DAMA-DMBOK2) y las fuentes de apoyo.",
        "Adoptar el ciclo diario: leer → resumir → recuperar → aplicar."
      ],
      "secciones": [
        {
          "h": "1. El principio: marco mental antes que detalle",
          "html": "<p>Aprender un dominio complejo desde cero funciona mejor <strong>de arriba hacia abajo</strong>:\n          primero construyes un <em>mapa mental</em> (qué es, para qué sirve, cómo se estructura) y recién después\n          rellenas el detalle. Si empiezas por el detalle, te pierdes; si empiezas por el mapa, cada pieza nueva\n          \"encuentra su lugar\".</p>\n          <p>En Gobierno del Dato ese mapa es la <strong>Rueda DAMA</strong> (las 11 áreas de conocimiento) más la\n          idea central de que <strong>el dato es un activo</strong> que se gestiona con disciplina, igual que las\n          personas o el capital.</p>"
        },
        {
          "h": "2. Fuente troncal + fuentes de apoyo (benchmark)",
          "html": "<p>Para no dispersarte, usa <strong>una fuente troncal</strong> y trata el resto como\n          complemento:</p>\n          <ul>\n            <li><strong>Troncal — DAMA-DMBOK2</strong> (<em>Data Management Body of Knowledge</em>): el estándar de\n            facto. Define la Rueda DAMA, los principios y las 11 áreas.</li>\n            <li><strong>Madurez/Evaluación — DCAM</strong> (EDM Council) y <strong>CMMI DMM</strong>.</li>\n            <li><strong>Marco organizativo — DGI Framework</strong> (Data Governance Institute).</li>\n            <li><strong>Normas ISO</strong> — 8000 (calidad), 11179 (metadatos), 38505 (gobierno de datos).</li>\n            <li><strong>Tendencias — Gartner/Forrester</strong>: Data Mesh, Data Fabric, metadatos activos, gobierno de IA.</li>\n            <li><strong>Capa Minsait</strong>: Estrategia + Gobierno + Plataforma, modelo de madurez y metodología de implantación.</li>\n          </ul>"
        },
        {
          "h": "3. Aprendizaje activo: por qué los quizzes funcionan",
          "html": "<p>Leer es pasivo y engaña: \"lo entendí\" no es \"lo sé\". Lo que consolida el conocimiento es\n          <strong>recuperarlo de memoria</strong> (testing effect) y <strong>espaciarlo en el tiempo</strong>\n          (repetición espaciada). Por eso esta plataforma cierra cada módulo con preguntas de opción múltiple y\n          feedback inmediato: no son un examen, son la herramienta principal de aprendizaje.</p>"
        },
        {
          "h": "4. El ciclo diario recomendado",
          "html": "<ol>\n            <li><strong>Leer</strong> el material del día (20–30 min), subrayando 3–5 ideas clave.</li>\n            <li><strong>Resumir</strong> con tus propias palabras en 4–5 líneas (sin mirar).</li>\n            <li><strong>Recuperar</strong>: responder el quiz del módulo.</li>\n            <li><strong>Feedback</strong>: leer la explicación de cada respuesta, acertada o no.</li>\n            <li><strong>Aplicar</strong>: conectar lo aprendido con un caso real (Alpayana, Pacasmayo, UNACEM).</li>\n          </ol>\n          <p>Regla de oro: <strong>un módulo por día</strong>. La repetición espaciada hace el resto.</p>"
        }
      ],
      "terminos": [
        {
          "t": "DAMA-DMBOK",
          "d": "Cuerpo de conocimiento de gestión de datos de DAMA International; nuestra fuente troncal."
        },
        {
          "t": "Recuperación activa",
          "d": "Traer información de memoria (responder preguntas) en lugar de releer; el mecanismo de aprendizaje más eficaz."
        },
        {
          "t": "Repetición espaciada",
          "d": "Revisar un tema en intervalos crecientes para fijarlo a largo plazo."
        },
        {
          "t": "Aprendizaje basado en casos",
          "d": "Anclar la teoría en situaciones reales para hacerla aplicable."
        }
      ],
      "minsait": "<strong>Hilo conductor Minsait:</strong> usaremos el modelo de Minsait Business Consulting —\n      <em>Estrategia del dato + Gobierno del dato + gestión de la Plataforma de datos</em>— como columna vertebral del\n      curso. La meta de fondo de Minsait es convertir a la organización en una <em>Data Driven Organization (DDO)</em>:\n      pasar de <strong>Datos → Información → Conocimiento → Inteligencia</strong> apoyándose en el gobierno del dato.",
      "quiz": [
        {
          "q": "¿Cuál es la mejor secuencia para aprender un dominio complejo desde cero?",
          "opciones": [
            "Construir un marco mental general y luego rellenar el detalle (top-down)",
            "Memorizar todos los detalles técnicos primero",
            "Leer la fuente entera de corrido sin tomar notas",
            "Empezar por las herramientas y proveedores del mercado"
          ],
          "respuesta": 0,
          "explica": "El enfoque top-down crea un 'mapa' donde cada pieza nueva encuentra su lugar; empezar por el detalle dispersa."
        },
        {
          "q": "¿Cuál es la fuente troncal de este plan de estudio?",
          "opciones": [
            "ISO 38505",
            "DAMA-DMBOK2",
            "DCAM del EDM Council",
            "El Framework DGI"
          ],
          "respuesta": 1,
          "explica": "DAMA-DMBOK2 es el estándar de facto y la fuente troncal; las demás son complementos."
        },
        {
          "q": "¿Por qué los quizzes son tan importantes en este método?",
          "opciones": [
            "Porque sirven solo para calificar al final",
            "Porque permiten saltar el material de lectura",
            "Porque la recuperación activa consolida el conocimiento mejor que releer",
            "Porque reemplazan la necesidad de aplicar lo aprendido"
          ],
          "respuesta": 2,
          "explica": "El 'testing effect': recuperar de memoria fija el aprendizaje mucho más que la lectura pasiva."
        },
        {
          "q": "La meta de fondo del modelo Minsait es convertir a la organización en…",
          "opciones": [
            "Una empresa sin área de TI",
            "Una organización sin reglas",
            "Un único data lake",
            "Una Data Driven Organization (Datos → Información → Conocimiento → Inteligencia)"
          ],
          "respuesta": 3,
          "explica": "La DDO escala del dato a la inteligencia (analítica avanzada/IA), sostenida por el gobierno del dato."
        }
      ]
    },
    {
      "id": "d2",
      "dia": 2,
      "bloque": "b1",
      "area": "Fundamentos",
      "icono": "🏛️",
      "estado": "full",
      "titulo": "¿Qué es el Gobierno del Dato? El dato como activo y la Rueda DAMA",
      "tiempo": "45–60 min",
      "objetivos": [
        "Definir gobierno del dato y diferenciarlo de la gestión de datos.",
        "Entender el dato como activo corporativo y su valor.",
        "Conocer la Rueda DAMA y reconocer el 'reto' que aborda el gobierno."
      ],
      "secciones": [
        {
          "h": "1. Definición",
          "html": "<p><strong>Gobierno del dato (Data Governance)</strong> es el ejercicio de <em>autoridad, control y\n          toma de decisiones compartida</em> sobre la gestión de los activos de datos. En simple: el conjunto de\n          <strong>políticas, roles, procesos y métricas</strong> que aseguran que los datos se gestionen de forma\n          <strong>formal, consistente y responsable</strong> en toda la organización.</p>\n          <p>Como lo define Minsait, \"genera un entendimiento común y conduce a una toma de decisiones compartida\"\n          entre <strong>negocio, tecnología y terceros</strong>, para tratar el dato como <strong>activo de alto\n          valor</strong>.</p>"
        },
        {
          "h": "2. Gobierno ≠ Gestión",
          "html": "<p>Es la distinción más importante del tema:</p>\n          <ul>\n            <li><strong>Gobierno del dato</strong> = define <em>qué se debe hacer</em> y <em>quién decide</em>\n            (estrategia, políticas, estándares, roles, control). Es la \"capa de dirección\".</li>\n            <li><strong>Gestión de datos</strong> = <em>ejecuta</em> esas decisiones (modelar, almacenar, integrar,\n            asegurar la calidad, etc.). Son las 10 áreas operativas de la Rueda DAMA.</li>\n          </ul>\n          <p>Analogía: el gobierno es el <em>directorio y las políticas</em>; la gestión es la <em>operación</em>.</p>"
        },
        {
          "h": "3. El dato como activo",
          "html": "<p>El gobierno parte de una premisa: <strong>los datos son un activo</strong> con valor económico.\n          Como cualquier activo, requieren propiedad (ownership), mantenimiento (calidad), protección (seguridad) y\n          rendición de cuentas. El objetivo, en palabras de Minsait, es que los datos sean <strong>\"confiables, de\n          calidad, conocidos y se usen de forma universal\"</strong>. Datos mal gobernados → decisiones erróneas,\n          reprocesos, multas y proyectos de IA que fracasan por \"basura entra, basura sale\".</p>"
        },
        {
          "h": "4. La Rueda DAMA y las 11 áreas",
          "html": "<p>El DAMA-DMBOK2 organiza la disciplina en una <strong>rueda</strong> con el\n          <strong>Gobierno del Dato en el centro</strong> y 10 áreas de gestión alrededor:</p>\n          <ol>\n            <li><strong>Data Governance</strong> (centro)</li>\n            <li>Arquitectura de datos</li><li>Modelado y diseño de datos</li>\n            <li>Almacenamiento y operaciones</li><li>Seguridad de datos</li>\n            <li>Integración e interoperabilidad</li><li>Gestión documental y de contenidos</li>\n            <li>Datos maestros y de referencia (MDM/RDM)</li><li>Data Warehousing & BI</li>\n            <li>Gestión de metadatos</li><li>Calidad de datos</li>\n          </ol>\n          <p>El gobierno está al centro porque <strong>coordina y da coherencia</strong> a todas las demás. Minsait lo\n          usa como \"área central de balance y sinergia entre todas las funciones\".</p>"
        },
        {
          "h": "5. El reto (visión Minsait, caso minería)",
          "html": "<p>El punto de partida típico es una gestión <strong>reactiva</strong> del dato. En el assessment de\n          <strong>Alpayana</strong> (minería), Minsait identificó síntomas muy ilustrativos:</p>\n          <ul>\n            <li><strong>Silos de información</strong>: datos repartidos entre Excel, SAP, LIMS, Canary, etc., con baja\n            integración (incluida la <em>desconexión IT–OT</em> entre sistemas de gestión y de operación).</li>\n            <li><strong>Gobierno \"en papel\"</strong>: las normas existen en documentos que los equipos no usan.</li>\n            <li><strong>KPIs sin definición única</strong>: un mismo indicador significa cosas distintas según el área.</li>\n            <li><strong>Brecha de data literacy</strong> y resistencia al cambio en el frente operativo.</li>\n          </ul>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno del dato",
          "d": "Autoridad y control sobre la gestión de datos: políticas, roles, procesos y métricas."
        },
        {
          "t": "Gestión de datos",
          "d": "Ejecución operativa de las decisiones de gobierno (las 10 áreas de la Rueda DAMA)."
        },
        {
          "t": "Dato como activo",
          "d": "Principio de tratar los datos como recurso de alto valor: confiables, de calidad, conocidos y de uso universal."
        },
        {
          "t": "Rueda DAMA",
          "d": "Las 11 áreas de conocimiento con el gobierno en el centro como eje de balance y sinergia."
        },
        {
          "t": "Desconexión IT–OT",
          "d": "Falta de integración entre sistemas de gestión (IT) y de operación (OT); pain point típico en industria/minería."
        },
        {
          "t": "Silos de información",
          "d": "Datos dispersos por área, con definiciones inconsistentes y sin visión única."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el modelo se sostiene en tres pilares que evolucionan juntos —\n      <em>Estrategia</em> (el QUÉ y el PORQUÉ), <em>Gobierno</em> (el QUIÉN y el CÓMO) y <em>Plataforma</em>\n      (el CON QUÉ). El \"Gobierno del Dato\" del centro de la Rueda DAMA equivale al pilar de Gobierno de Minsait, cuyos\n      componentes de implantación son: <em>estrategia del dato, modelo organizativo, roles de gobierno, modelo\n      operativo (normativas y procesos) y herramientas</em>.",
      "quiz": [
        {
          "q": "¿Cuál es la diferencia esencial entre gobierno y gestión de datos?",
          "opciones": [
            "El gobierno define qué hacer y quién decide; la gestión ejecuta esas decisiones",
            "Son sinónimos",
            "La gestión define políticas y el gobierno las ejecuta",
            "El gobierno es solo tecnología y la gestión solo personas"
          ],
          "respuesta": 0,
          "explica": "Gobierno = dirección (políticas, roles, control). Gestión = ejecución operativa de esas decisiones."
        },
        {
          "q": "En la Rueda DAMA, ¿qué área ocupa el centro?",
          "opciones": [
            "Calidad de datos",
            "Gobierno del dato",
            "Arquitectura de datos",
            "Metadatos"
          ],
          "respuesta": 1,
          "explica": "El gobierno del dato está en el centro: es el eje de balance y sinergia entre las 10 áreas restantes."
        },
        {
          "q": "¿Cuántas áreas de conocimiento define la Rueda DAMA (DMBOK2)?",
          "opciones": [
            "7",
            "5",
            "11",
            "20"
          ],
          "respuesta": 2,
          "explica": "Son 11: el gobierno en el centro más 10 áreas de gestión alrededor."
        },
        {
          "q": "En el caso Alpayana, ¿qué significa 'gobierno en papel'?",
          "opciones": [
            "Que el gobierno se imprime en reportes",
            "Que el gobierno depende solo de TI",
            "Que no hay ninguna política escrita",
            "Que las normas de datos existen en documentos pero los equipos no las usan"
          ],
          "respuesta": 3,
          "explica": "Es un pain point clásico: normativa documentada sin adopción operativa real."
        },
        {
          "q": "Según Minsait, el objetivo del gobierno es que los datos sean…",
          "opciones": [
            "Confiables, de calidad, conocidos y de uso universal",
            "Numerosos y antiguos",
            "Exclusivos del área de TI",
            "Eliminados periódicamente"
          ],
          "respuesta": 0,
          "explica": "Esa es la definición de Minsait del propósito del Data Governance."
        }
      ]
    },
    {
      "id": "d3",
      "dia": 3,
      "bloque": "b1",
      "area": "Benchmark de mercado",
      "icono": "📊",
      "estado": "full",
      "titulo": "Benchmark: marcos del mercado (DAMA, DCAM, DGI, CMMI, ISO) y cómo hacerles challenge",
      "tiempo": "50–60 min",
      "objetivos": [
        "Conocer los principales marcos de gobierno y gestión de datos.",
        "Saber cuándo conviene cada uno y cómo se complementan ('challenge').",
        "Identificar tendencias y el marco regulatorio relevante (incl. Perú)."
      ],
      "secciones": [
        {
          "h": "1. Los grandes marcos (un poco de cada uno)",
          "html": "<ul>\n            <li><strong>DAMA-DMBOK2</strong> — Estándar de facto, integral (11 áreas). Ideal como\n            <em>lenguaje común</em> y base de cualquier programa.</li>\n            <li><strong>DCAM</strong> (EDM Council) — <em>Data Management Capability Assessment Model</em>. ~8 componentes\n            (estrategia, gobierno, calidad, arquitectura, operaciones…). Muy usado en banca/finanzas para\n            <strong>evaluar capacidades y madurez</strong>.</li>\n            <li><strong>DGI Framework</strong> (Data Governance Institute) — 10 componentes centrados en\n            <strong>personas, reglas y derechos de decisión</strong>: misión, métricas, reglas y definiciones,\n            <em>derechos de decisión</em>, accountability, controles, stakeholders, DGO y procesos.</li>\n            <li><strong>CMMI DMM</strong> (Data Management Maturity) — modelo de <strong>madurez</strong> por niveles.</li>\n            <li><strong>Normas ISO</strong> — <em>ISO 8000</em> (calidad), <em>ISO/IEC 11179</em> (metadatos y registros),\n            <em>ISO/IEC 38505</em> (gobierno de datos, deriva de ISO 38500 de gobierno de TI).</li>\n          </ul>"
        },
        {
          "h": "2. Cuándo usar cada uno",
          "html": "<table class=\"cmp\">\n            <thead><tr><th>Marco</th><th>Mejor para</th><th>Naturaleza</th></tr></thead>\n            <tbody>\n              <tr><td>DAMA-DMBOK2</td><td>Lenguaje común y cobertura integral</td><td>Cuerpo de conocimiento</td></tr>\n              <tr><td>DCAM</td><td>Evaluar capacidades (banca/finanzas)</td><td>Modelo de evaluación</td></tr>\n              <tr><td>DGI</td><td>Diseñar la organización y los derechos de decisión</td><td>Marco organizativo</td></tr>\n              <tr><td>CMMI DMM</td><td>Medir nivel de madurez</td><td>Modelo de madurez</td></tr>\n              <tr><td>ISO</td><td>Certificación y rigor normativo</td><td>Normas</td></tr>\n            </tbody>\n          </table>"
        },
        {
          "h": "3. El 'challenge': cómo se combinan (no son excluyentes)",
          "html": "<p>En consultoría rara vez se usa un solo marco. La práctica es <strong>combinarlos</strong> según para\n          qué sirve cada uno:</p>\n          <ul>\n            <li>Usa <strong>DAMA</strong> como <em>vocabulario</em> y mapa de áreas.</li>\n            <li>Usa <strong>DCAM o CMMI DMM</strong> para <em>medir madurez</em> y comparar contra un benchmark.</li>\n            <li>Usa <strong>DGI</strong> para diseñar la <em>organización</em> (roles, comités, derechos de decisión).</li>\n            <li>Usa <strong>ISO</strong> para dar <em>rigor normativo</em> y soportar certificación/cumplimiento.</li>\n          </ul>\n          <p>Saber \"challenge-ar\" un marco es preguntarse: ¿cubre estrategia <em>y</em> ejecución? ¿mide o solo\n          describe? ¿es prescriptivo u orientativo? Así eliges el adecuado para cada decisión.</p>"
        },
        {
          "h": "4. Tendencias (Gartner / Forrester)",
          "html": "<ul>\n            <li><strong>Gobierno adaptativo/federado</strong>: menos comité central, más responsabilidad distribuida.</li>\n            <li><strong>Data Mesh</strong>: datos como producto, propiedad por dominio de negocio.</li>\n            <li><strong>Data Fabric</strong>: capa de integración inteligente basada en metadatos activos.</li>\n            <li><strong>Active Metadata & Data Catalog</strong>: catálogos que automatizan linaje y descubrimiento.</li>\n            <li><strong>DataOps</strong> y <strong>Gobierno de la IA (AI/GenAI Governance)</strong>.</li>\n          </ul>"
        },
        {
          "h": "5. Marco regulatorio",
          "html": "<ul>\n            <li><strong>GDPR</strong> (UE) — privacidad y protección de datos personales.</li>\n            <li><strong>BCBS 239</strong> — agregación de datos de riesgo en banca.</li>\n            <li><strong>ISO 27001</strong> — seguridad de la información (referenciada por Minsait en el modelo de seguridad).</li>\n            <li><strong>Perú — Ley N.º 29733</strong> de Protección de Datos Personales y su reglamento.</li>\n          </ul>"
        }
      ],
      "terminos": [
        {
          "t": "DCAM",
          "d": "Modelo de evaluación de capacidades de gestión de datos del EDM Council (~8 componentes); fuerte en finanzas."
        },
        {
          "t": "DGI Framework",
          "d": "Marco de 10 componentes del Data Governance Institute, centrado en personas, reglas y derechos de decisión."
        },
        {
          "t": "CMMI DMM",
          "d": "Modelo de madurez de gestión de datos por niveles."
        },
        {
          "t": "Derechos de decisión",
          "d": "Quién tiene autoridad para decidir sobre un dato; concepto central del DGI."
        },
        {
          "t": "ISO 8000 / 11179 / 38505 / 27001",
          "d": "Calidad de datos; metadatos/registros; gobierno de datos; seguridad de la información."
        },
        {
          "t": "Data Mesh / Data Fabric",
          "d": "Mesh: datos como producto por dominio. Fabric: integración basada en metadatos activos."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> Minsait usa <strong>DAMA</strong> como lenguaje común (analizando por sus\n      áreas funcionales, con el gobierno como eje central) y construye su propia <em>herramienta de diagnóstico de\n      madurez</em> combinando DAMA con modelos de referencia (<em>Stanford, IBM, CMMI</em>) y su estudio de madurez\n      digital <em>Ascendant</em>. Lo verás en el Día 16.",
      "quiz": [
        {
          "q": "¿Qué marco es el más apropiado como 'lenguaje común' integral de gestión de datos?",
          "opciones": [
            "DCAM",
            "DAMA-DMBOK2",
            "BCBS 239",
            "ISO 27001"
          ],
          "respuesta": 1,
          "explica": "DAMA-DMBOK2 cubre las 11 áreas y funciona como vocabulario estándar del dominio."
        },
        {
          "q": "Para diseñar la organización del gobierno (roles, comités, derechos de decisión), el marco más enfocado es…",
          "opciones": [
            "Data Fabric",
            "ISO 8000",
            "DGI Framework",
            "BCBS 239"
          ],
          "respuesta": 2,
          "explica": "El DGI se centra en personas, reglas y derechos de decisión: ideal para el diseño organizativo."
        },
        {
          "q": "El DCAM del EDM Council es especialmente fuerte en…",
          "opciones": [
            "Manufactura",
            "Educación",
            "Retail",
            "Servicios financieros"
          ],
          "respuesta": 3,
          "explica": "DCAM nació y se consolidó en servicios financieros para evaluar capacidades de datos."
        },
        {
          "q": "¿Cuál es la idea correcta sobre combinar marcos ('challenge')?",
          "opciones": [
            "Se combinan: DAMA como lenguaje, DCAM/CMMI para medir, DGI para organizar, ISO para el rigor",
            "Son excluyentes entre sí",
            "Hay que elegir uno solo y descartar el resto",
            "Todos miden madurez de la misma forma"
          ],
          "respuesta": 0,
          "explica": "Cada marco aporta algo distinto; lo profesional es combinarlos según la decisión a tomar."
        },
        {
          "q": "La herramienta de diagnóstico de madurez de Minsait combina DAMA con…",
          "opciones": [
            "Solo opiniones internas",
            "Modelos de referencia (Stanford, IBM, CMMI) y su estudio Ascendant",
            "Únicamente la norma GDPR",
            "Un único proveedor de software"
          ],
          "respuesta": 1,
          "explica": "Minsait mezcla DAMA, modelos de madurez de referencia y su estudio de madurez digital Ascendant."
        }
      ]
    },
    {
      "id": "d4",
      "dia": 4,
      "bloque": "b1",
      "area": "Estrategia del dato",
      "icono": "🎯",
      "estado": "full",
      "titulo": "Estrategia del dato y caso de valor (Pilar Minsait: Estrategia)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Alinear el dato con la estrategia corporativa (el QUÉ y el PORQUÉ).",
        "Distinguir estrategia de dato 'defensiva' vs 'ofensiva'.",
        "Construir el caso de valor y entender los ejes de una Data Driven Organization."
      ],
      "secciones": [
        {
          "h": "1. Del negocio al dato (el QUÉ y el PORQUÉ)",
          "html": "<p>Un programa de gobierno no se justifica por sí mismo: se justifica porque <strong>habilita\n          objetivos de negocio</strong> (crecer, reducir costos, cumplir, decidir mejor, escalar IA). La\n          <strong>estrategia del dato</strong> —primer pilar del modelo Minsait— define una <em>visión en torno al\n          dato que genere impacto tangible en la estrategia empresarial</em> a medio/largo plazo, con una misión y\n          entregables que componen la hoja de ruta. Responde al <em>QUÉ</em> y al <em>PORQUÉ</em>.</p>"
        },
        {
          "h": "2. Defensa vs. ofensa",
          "html": "<p>Un marco útil (DalleMule & Davenport, HBR) clasifica la estrategia de datos en dos polos que hay\n          que <strong>balancear</strong>:</p>\n          <ul>\n            <li><strong>Defensiva</strong>: control, cumplimiento, seguridad, calidad, \"una sola verdad\". Domina en\n            sectores regulados (banca, salud, minería).</li>\n            <li><strong>Ofensiva</strong>: explotar el dato para crecer — analítica, personalización, nuevos productos,\n            IA. Domina en sectores competitivos.</li>\n          </ul>\n          <p>El gobierno debe <strong>sostener ambas</strong>: sin control no hay confianza; sin explotación no hay valor.</p>"
        },
        {
          "h": "3. Caso de valor y ejes de una Data Driven Organization",
          "html": "<p>Para conseguir patrocinio ejecutivo, el gobierno necesita un <strong>caso de valor</strong> con\n          palancas concretas: eficiencia, riesgo/cumplimiento e ingresos/decisión. Minsait describe la transformación en\n          una <strong>Data Driven Organization (DDO)</strong> sobre seis ejes:</p>\n          <ul>\n            <li><strong>Estrategia</strong> (apuesta y esponsorización de alto nivel)</li>\n            <li><strong>Cultura</strong> (marco colaborativo, nuevas preguntas)</li>\n            <li><strong>Tecnología</strong> (repositorio analítico, casos de uso con retorno)</li>\n            <li><strong>Dato</strong> (calidad, diccionario, confianza)</li>\n            <li><strong>Inteligencia</strong> (casos de uso analíticos, gobierno de la analítica)</li>\n            <li><strong>Innovación y Negocio</strong> (metodologías ágiles, ecosistemas)</li>\n          </ul>"
        }
      ],
      "terminos": [
        {
          "t": "Estrategia del dato",
          "d": "Pilar que define el QUÉ y el PORQUÉ: visión del dato con impacto en la estrategia empresarial."
        },
        {
          "t": "Estrategia defensiva",
          "d": "Enfoque en control, cumplimiento, seguridad y 'una sola verdad'."
        },
        {
          "t": "Estrategia ofensiva",
          "d": "Enfoque en explotar el dato para crecer (analítica, IA, nuevos productos)."
        },
        {
          "t": "Caso de valor",
          "d": "Justificación de valor (eficiencia, riesgo, ingresos) que asegura el patrocinio ejecutivo."
        },
        {
          "t": "Data Driven Organization (DDO)",
          "d": "Organización que decide con datos; Minsait la articula en 6 ejes (estrategia, cultura, tecnología, dato, inteligencia, negocio)."
        }
      ],
      "minsait": "<strong>Capa Minsait — Pilar Estrategia:</strong> es el primero de los tres pilares\n      (Estrategia + Gobierno + Plataforma). Minsait lo aterriza con su enfoque <em>DaDO</em>: identificación de\n      necesidades → selección de casos de uso → definición de iniciativas → <em>roadmap</em>. Es decir, se decide en\n      qué casos de uso empezar antes de bajar al gobierno y a la plataforma.",
      "quiz": [
        {
          "q": "El pilar 'Estrategia del dato' de Minsait responde sobre todo a…",
          "opciones": [
            "El CON QUÉ (herramientas)",
            "El DÓNDE (infraestructura)",
            "El QUÉ y el PORQUÉ",
            "El CUÁNTO (presupuesto de TI)"
          ],
          "respuesta": 2,
          "explica": "La Estrategia define el QUÉ y el PORQUÉ; el Gobierno el QUIÉN/CÓMO y la Plataforma el CON QUÉ."
        },
        {
          "q": "Una estrategia de datos 'defensiva' prioriza…",
          "opciones": [
            "Personalización y nuevos productos",
            "Reducir la calidad para ahorrar",
            "Marketing y ventas",
            "Control, cumplimiento, seguridad y una sola verdad"
          ],
          "respuesta": 3,
          "explica": "La defensa busca control y confianza; la ofensa busca explotar el dato para crecer."
        },
        {
          "q": "¿Cuál NO es uno de los seis ejes de una Data Driven Organization según Minsait?",
          "opciones": [
            "Logística de almacén",
            "Tecnología",
            "Cultura",
            "Inteligencia"
          ],
          "respuesta": 0,
          "explica": "Los seis ejes son Estrategia, Cultura, Tecnología, Dato, Inteligencia e Innovación/Negocio."
        },
        {
          "q": "El enfoque 'DaDO' de Minsait ordena la estrategia como…",
          "opciones": [
            "Comprar herramientas → contratar gente",
            "Identificar necesidades → seleccionar casos de uso → definir iniciativas → roadmap",
            "Roadmap → necesidades → herramientas",
            "Solo definir el presupuesto"
          ],
          "respuesta": 1,
          "explica": "DaDO va de las necesidades a un roadmap priorizado de iniciativas y casos de uso."
        }
      ]
    },
    {
      "id": "d5",
      "dia": 5,
      "bloque": "b1",
      "area": "Organización & Roles",
      "icono": "👥",
      "estado": "full",
      "titulo": "Organización y roles: CDO, Owners, Stewards, comités y modelos organizativos",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer los roles clave del gobierno y sus responsabilidades.",
        "Entender los modelos organizativos (centralizado, descentralizado, federado).",
        "Saber qué órganos de gobierno (comités) se necesitan."
      ],
      "secciones": [
        {
          "h": "1. Los roles clave (modelo Minsait)",
          "html": "<ul>\n            <li><strong>CDO (Chief Data Officer)</strong>: máximo responsable de la estrategia y el gobierno del dato.</li>\n            <li><strong>Data Owner (Propietario)</strong>: tiene control y aprobación sobre un proceso de negocio o\n            ámbito funcional del dato. Rinde cuentas por su valor y riesgo.</li>\n            <li><strong>Data Steward (Custodio funcional)</strong>: trabaja junto a negocio para definir y aplicar los\n            controles y prácticas de gestión del dato (calidad, glosario, metadatos). Rol operativo clave.</li>\n            <li><strong>Data Custodian (Custodio técnico)</strong>: asegura/supervisa la aplicación de controles a nivel\n            técnico (almacenamiento, accesos, seguridad).</li>\n            <li><strong>Experto de Negocio</strong>: conoce el proceso y ayuda a interpretar y definir el dato.</li>\n            <li><strong>CISO</strong> (seguridad) y <strong>DPO</strong> (privacidad/datos personales) colaboran en el\n            gobierno.</li>\n          </ul>"
        },
        {
          "h": "2. Modelos organizativos",
          "html": "<ul>\n            <li><strong>Centralizado</strong>: una unidad central define y guía la estrategia y normativas de forma\n            transversal. Es el modelo más maduro, pero puede ser cuello de botella.</li>\n            <li><strong>Descentralizado</strong>: cada línea de negocio gestiona sus datos con sus propios roles. Ágil\n            pero inconsistente.</li>\n            <li><strong>Federado</strong> (recomendado para grandes corporaciones): capa híbrida con grupos en cada\n            línea + una <em>unidad central de excelencia</em> que busca sinergia. Equilibra coherencia y agilidad.</li>\n          </ul>"
        },
        {
          "h": "3. Órganos de gobierno (comités)",
          "html": "<p>Minsait define una estructura de comités con su periodicidad, integrantes, agenda y funciones:</p>\n          <ul>\n            <li><strong>Sponsor / Comité Directivo</strong>: patrocinio ejecutivo; alinea con la estrategia de negocio.</li>\n            <li><strong>Comité de Gobierno del Dato</strong> (y de <strong>Calidad del Dato</strong>): toma de\n            decisiones de los ámbitos de gobierno, calidad y seguridad.</li>\n            <li><strong>Comités operativos</strong>: visión operativa, seguimiento de impactos y mejora.</li>\n          </ul>\n          <p>Una <strong>matriz RACI</strong> (Responsable, Aprobador, Consultado, Informado) se aplica a cada paso de\n          los procedimientos para clarificar responsabilidades.</p>"
        }
      ],
      "terminos": [
        {
          "t": "CDO",
          "d": "Chief Data Officer: máximo responsable de la estrategia y el gobierno del dato."
        },
        {
          "t": "Data Owner",
          "d": "Propietario de negocio con control y aprobación sobre un ámbito del dato; accountable por su valor y riesgo."
        },
        {
          "t": "Data Steward",
          "d": "Custodio funcional que define y aplica controles y prácticas (calidad, glosario, metadatos)."
        },
        {
          "t": "Data Custodian",
          "d": "Custodio técnico que supervisa la aplicación de controles a nivel tecnológico."
        },
        {
          "t": "CISO / DPO",
          "d": "Responsables de seguridad de la información y de privacidad/datos personales, respectivamente."
        },
        {
          "t": "Modelo federado",
          "d": "Grupos en cada línea + unidad central de excelencia; equilibra coherencia y agilidad."
        }
      ],
      "minsait": "<strong>Capa Minsait — Pilar Gobierno:</strong> el diseño del modelo organizativo (roles, comités y\n      RACI) junto con las políticas y procesos es el entregable central de la fase <em>MODELO DG</em> de la metodología\n      de implantación (Día 22). Minsait propone adecuar los roles al <em>tamaño, cultura y objetivos</em> de la\n      organización, no copiar un organigrama estándar.",
      "quiz": [
        {
          "q": "¿Cuál es el rol operativo del día a día del gobierno del dato?",
          "opciones": [
            "CDO",
            "Data Custodian (TI)",
            "Data Steward",
            "Auditor externo"
          ],
          "respuesta": 2,
          "explica": "El Data Steward define y aplica los controles y prácticas: calidad, glosario, metadatos."
        },
        {
          "q": "¿Quién tiene control y aprobación sobre un ámbito funcional del dato?",
          "opciones": [
            "Data Custodian",
            "Help Desk",
            "Experto de Negocio",
            "Data Owner"
          ],
          "respuesta": 3,
          "explica": "El Data Owner es accountable por su ámbito: reglas, accesos y prioridades."
        },
        {
          "q": "El modelo organizativo recomendado por Minsait para grandes corporaciones es…",
          "opciones": [
            "Federado (híbrido con unidad central de excelencia)",
            "Descentralizado puro",
            "Centralizado puro",
            "Sin estructura"
          ],
          "respuesta": 0,
          "explica": "El federado combina grupos por línea con una unidad central de excelencia que busca sinergia."
        },
        {
          "q": "El Data Custodian se encarga principalmente de…",
          "opciones": [
            "Aprobar el presupuesto corporativo",
            "Supervisar la aplicación de controles a nivel técnico",
            "Definir la estrategia de negocio",
            "Vender datos a terceros"
          ],
          "respuesta": 1,
          "explica": "Es el rol técnico que asegura los controles que el gobierno define."
        },
        {
          "q": "¿Para qué sirve una matriz RACI?",
          "opciones": [
            "Para calcular el ROI",
            "Para cifrar los datos",
            "Para clarificar quién es Responsable, Aprobador, Consultado e Informado en cada paso",
            "Para elegir el proveedor de nube"
          ],
          "respuesta": 2,
          "explica": "RACI clarifica responsabilidades en los procedimientos, evitando vacíos y duplicidades."
        }
      ]
    },
    {
      "id": "d6",
      "dia": 6,
      "bloque": "b2",
      "area": "Políticas & Estándares",
      "icono": "📜",
      "estado": "full",
      "titulo": "Políticas, estándares y procesos de gobierno",
      "tiempo": "45–60 min",
      "objetivos": [
        "Entender la jerarquía normativa del dato (principios → procedimientos).",
        "Conocer las políticas típicas de un programa de gobierno.",
        "Diseñar procesos de gobierno con roles (RACI) y notación BPMN."
      ],
      "secciones": [
        {
          "h": "1. La jerarquía normativa",
          "html": "<p>El marco normativo del dato se ordena de lo general a lo concreto:</p>\n          <ul>\n            <li><strong>Principios</strong>: enunciados rectores (\"el dato tiene un único propietario\"). La\n            \"constitución\" del dato.</li>\n            <li><strong>Política de gobierno</strong>: establece directrices, principios de guía, alcance, estructura y\n            órganos de gobierno, roles, y la lista de procesos y procedimientos.</li>\n            <li><strong>Estándares</strong>: reglas concretas y medibles (nomenclatura, formatos, umbrales).</li>\n            <li><strong>Procedimientos</strong>: el cómo paso a paso, con puntos de decisión y controles.</li>\n          </ul>"
        },
        {
          "h": "2. Políticas típicas",
          "html": "<ul>\n            <li><strong>Calidad de datos</strong>: principios, alcance, responsabilidades y flujo de calidad.</li>\n            <li><strong>Seguridad y clasificación</strong>: niveles de sensibilidad y controles (alineada a ISO 27001).</li>\n            <li><strong>Privacidad</strong>: tratamiento de datos personales (Ley 29733 en Perú; anonimización, derecho al olvido).</li>\n            <li><strong>Metadatos y glosario</strong>: definición y aprobación de términos de negocio.</li>\n            <li><strong>Ciclo de vida y retención</strong>: conservación, historificación y eliminación.</li>\n          </ul>"
        },
        {
          "h": "3. Procesos y procedimientos de gobierno",
          "html": "<p>Los <strong>procesos</strong> agrupan <strong>procedimientos</strong> por ámbito de gobierno\n          (glosario, catálogo, linaje, calidad, seguridad), organizados según el ciclo de vida del dato. Cada\n          procedimiento se documenta con <strong>descripción, flujograma (notación BPMN) y matriz RACI</strong>.</p>\n          <p>Ejemplo (Minsait) — <em>Proceso: Glosario de negocio</em> · <em>Procedimiento: Alta de un concepto</em>:\n          alta en borrador → revisión → aprobación → publicación → asociación al catálogo. Como mínimo, todo proceso\n          cubre <strong>alta, actualización y baja</strong> de conceptos y activos.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Principio de datos",
          "d": "Enunciado rector que guía todas las decisiones sobre el dato."
        },
        {
          "t": "Política de gobierno",
          "d": "Documento que fija directrices, alcance, órganos, roles y la lista de procesos/procedimientos."
        },
        {
          "t": "Estándar",
          "d": "Regla concreta y medible que operacionaliza una política."
        },
        {
          "t": "Procedimiento",
          "d": "Instrucción paso a paso con puntos de decisión y controles."
        },
        {
          "t": "BPMN",
          "d": "Business Process Modelling Notation: notación estándar para documentar los flujos de gobierno."
        },
        {
          "t": "Clasificación de la información",
          "d": "Asignación de niveles de sensibilidad para aplicar controles proporcionales."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en la fase <em>MODELO DG</em>, Minsait define la <em>política de\n      gobierno</em>, los <em>procesos</em> (glosario, catálogo, linaje) y sus <em>procedimientos</em> documentados en\n      <strong>BPMN con matriz RACI</strong>, priorizando automatizarlos en la herramienta de gobierno. Todo se orienta\n      al <em>ciclo de vida del dato</em>.",
      "quiz": [
        {
          "q": "Ordena de lo general a lo concreto la jerarquía normativa del dato:",
          "opciones": [
            "Procedimientos → Estándares → Políticas → Principios",
            "Estándares → Principios → Política → Procedimientos",
            "Política → Principios → Procedimientos → Estándares",
            "Principios → Política → Estándares → Procedimientos"
          ],
          "respuesta": 3,
          "explica": "Principios (constitución) → Política (directrices) → Estándares (regla medible) → Procedimientos (cómo)."
        },
        {
          "q": "¿Con qué notación documenta Minsait los flujos de los procesos de gobierno?",
          "opciones": [
            "BPMN",
            "UML",
            "JSON",
            "SQL"
          ],
          "respuesta": 0,
          "explica": "BPMN (Business Process Modelling Notation), priorizando su automatización en la herramienta de gobierno."
        },
        {
          "q": "Como mínimo, todo proceso de glosario/catálogo debe cubrir…",
          "opciones": [
            "Solo el alta de conceptos",
            "Alta, actualización y baja de conceptos y activos",
            "Únicamente reportes",
            "La compra de licencias"
          ],
          "respuesta": 1,
          "explica": "El ciclo completo del concepto/activo: alta, actualización y baja."
        },
        {
          "q": "¿Qué define la 'política de gobierno' según Minsait?",
          "opciones": [
            "El color de los dashboards",
            "Solo el presupuesto anual",
            "Directrices, principios, alcance, órganos de gobierno, roles y lista de procesos/procedimientos",
            "El proveedor de nube"
          ],
          "respuesta": 2,
          "explica": "Es el documento marco que ordena todo el modelo de gobierno."
        },
        {
          "q": "La política de clasificación de la información sirve para…",
          "opciones": [
            "Contratar personal de TI",
            "Elegir el color del dashboard",
            "Calcular el presupuesto anual",
            "Definir niveles de sensibilidad y aplicar controles proporcionales"
          ],
          "respuesta": 3,
          "explica": "Clasificar permite aplicar controles de seguridad acordes a la sensibilidad del dato (alineado a ISO 27001)."
        }
      ]
    },
    {
      "id": "d7",
      "dia": 7,
      "bloque": "b2",
      "area": "Metadatos & Glosario",
      "icono": "🏷️",
      "estado": "full",
      "titulo": "Gestión de metadatos, glosario de negocio y catálogo de datos",
      "tiempo": "45–60 min",
      "objetivos": [
        "Distinguir los tipos de metadatos que define Minsait.",
        "Diferenciar glosario, diccionario de datos y catálogo.",
        "Entender el valor del linaje (data lineage)."
      ],
      "secciones": [
        {
          "h": "1. Qué son los metadatos y sus tipos (modelo Minsait)",
          "html": "<p><strong>Metadatos = datos sobre los datos.</strong> Describen el significado, la estructura y el\n          comportamiento de la información. Minsait distingue:</p>\n          <ul>\n            <li><strong>Metadata de negocio</strong>: descripción funcional del dato y los conceptos asociados.</li>\n            <li><strong>Metadata técnica</strong>: punto de almacenamiento, esquema, tablas y campos.</li>\n            <li><strong>Metadata de seguridad y privacidad</strong>: clasificación de datos sensibles.</li>\n            <li><strong>Metadata de origen y destino</strong>: trazabilidad del dato y sus fuentes (linaje).</li>\n            <li><strong>Otros</strong>: relaciones entre catálogos y con los roles organizativos.</li>\n          </ul>"
        },
        {
          "h": "2. Glosario vs diccionario vs catálogo",
          "html": "<ul>\n            <li><strong>Glosario de negocio</strong>: términos de negocio con definiciones <em>consensuadas</em>. Evita\n            que \"cliente\" o \"venta\" signifiquen cosas distintas según el área (la \"verdad única\").</li>\n            <li><strong>Diccionario / catálogo técnico</strong>: la estructura técnica (tablas, campos, formatos).</li>\n            <li><strong>Catálogo de datos</strong>: inventario navegable que <em>une</em> glosario + catálogo técnico +\n            linaje, y permite buscar y descubrir activos de datos.</li>\n          </ul>"
        },
        {
          "h": "3. Linaje y por qué todo esto importa",
          "html": "<p>El <strong>linaje (data lineage)</strong> muestra de dónde viene y a dónde va un dato (origen →\n          transformaciones → reporte). Es clave para la <strong>confianza</strong> (¿puedo fiarme de este número?), el\n          <strong>análisis de impacto</strong> (si cambio esta fuente, ¿qué se rompe?) y el <strong>cumplimiento</strong>\n          (trazabilidad). Sin metadatos no hay calidad sostenible, ni descubrimiento, ni base confiable para la IA.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Metadato",
          "d": "Dato sobre el dato: describe su significado, estructura o comportamiento."
        },
        {
          "t": "Metadata de negocio",
          "d": "Descripción funcional del dato y los conceptos asociados."
        },
        {
          "t": "Metadata de origen y destino",
          "d": "Trazabilidad del dato y sus fuentes (base del linaje)."
        },
        {
          "t": "Glosario de negocio",
          "d": "Términos de negocio con definiciones consensuadas: la 'verdad única'."
        },
        {
          "t": "Catálogo de datos",
          "d": "Inventario navegable que une glosario, catálogo técnico y linaje para descubrir activos."
        },
        {
          "t": "Linaje (data lineage)",
          "d": "Trazabilidad del recorrido de un dato: origen, transformaciones y destino."
        }
      ],
      "minsait": "<strong>Capa Minsait — Pilar Plataforma:</strong> el <em>diccionario de datos</em> integra glosario de\n      negocio y catálogo técnico, y se nutre de los cinco tipos de metadata (negocio, técnica, seguridad/privacidad,\n      origen/destino y otros). El glosario de negocio por ámbito es responsabilidad de los <em>Data Stewards</em> y\n      suele ser uno de los primeros procesos de gobierno en implantarse.",
      "quiz": [
        {
          "q": "¿Qué son los metadatos?",
          "opciones": [
            "Datos sobre los datos",
            "Copias de seguridad",
            "Datos personales",
            "Datos sin valor"
          ],
          "respuesta": 0,
          "explica": "Metadatos = datos sobre los datos: describen significado, estructura y comportamiento."
        },
        {
          "q": "Según Minsait, la 'metadata de origen y destino' aporta sobre todo…",
          "opciones": [
            "El color de los reportes",
            "La trazabilidad del dato y sus fuentes (linaje)",
            "El presupuesto del proyecto",
            "La clasificación de sensibilidad"
          ],
          "respuesta": 1,
          "explica": "Es la base del linaje: de dónde viene y a dónde va el dato."
        },
        {
          "q": "El 'glosario de negocio' sirve sobre todo para…",
          "opciones": [
            "Guardar contraseñas",
            "Almacenar los datos transaccionales",
            "Tener definiciones consensuadas de los términos (la 'verdad única')",
            "Reemplazar al catálogo técnico"
          ],
          "respuesta": 2,
          "explica": "Evita que un mismo término signifique cosas distintas en cada área."
        },
        {
          "q": "¿Qué une glosario, catálogo técnico y linaje en un inventario navegable?",
          "opciones": [
            "El data warehouse",
            "El firewall",
            "El ERP",
            "El catálogo de datos"
          ],
          "respuesta": 3,
          "explica": "El catálogo de datos integra los distintos metadatos para descubrir y entender los activos."
        },
        {
          "q": "El linaje de datos es clave principalmente para…",
          "opciones": [
            "Confianza, análisis de impacto y trazabilidad para cumplimiento",
            "Acelerar la red",
            "Reducir el costo de las licencias",
            "Diseñar la interfaz gráfica"
          ],
          "respuesta": 0,
          "explica": "Saber de dónde viene un dato permite confiar en él, evaluar impactos y cumplir auditorías."
        }
      ]
    },
    {
      "id": "d8",
      "dia": 8,
      "bloque": "b2",
      "area": "Calidad de datos",
      "icono": "🎯",
      "estado": "full",
      "titulo": "Calidad de datos: dimensiones, perfilado y remediación",
      "tiempo": "50–60 min",
      "objetivos": [
        "Definir la calidad del dato y los componentes de una validación de calidad (regla, dimensión, peso, nivel de aceptación).",
        "Dominar las 7 dimensiones de calidad y el ciclo definición → implantación → monitorización → mejora.",
        "Diseñar un cuadro de mando de calidad apoyado en un Data Quality Indicator para sostener la remediación."
      ],
      "secciones": [
        {
          "h": "1. Qué es calidad de datos y por qué es el corazón del gobierno",
          "html": "<p>Desde la óptica de <strong>DAMA-DMBOK2</strong>, la calidad del dato no es la ausencia de errores, sino la <strong>aptitud del dato para el uso</strong> (fitness for purpose) que esperan los procesos de negocio y los modelos analíticos que lo consumen. Un dato puede estar técnicamente bien grabado y, aun así, ser inútil si llega tarde, está incompleto o significa cosas distintas en cada área.</p>\n        <p>La calidad es la disciplina que cierra el círculo entre el gobierno (¿quién decide?), los metadatos (¿qué significa?) y la confianza del negocio (¿puedo decidir con esto?). Sin calidad medible, las políticas de gobierno se quedan en el papel: por eso se la considera el área central que da <em>balance y sinergia</em> al resto de funciones de gestión del dato.</p>\n        <p>El reto ejecutivo es traducir un concepto difuso (calidad) en algo <strong>cuantificable, monitorizable y accionable</strong>. Eso exige descomponerlo en reglas atómicas que un sistema pueda ejecutar de forma periódica y reportar sobre un cuadro de mando.</p>"
        },
        {
          "h": "2. Anatomía de una validación de calidad",
          "html": "<p>Una validación (o regla) de calidad es la unidad mínima de medida. Para que sea ejecutable y auditable, debe definir con precisión cada uno de sus componentes:</p>\n        <table class=\"cmp\"><thead><tr><th>Componente</th><th>Qué responde</th></tr></thead>\n        <tbody>\n        <tr><td>Ámbito de negocio</td><td>A qué proceso o dominio funcional pertenece el dato evaluado.</td></tr>\n        <tr><td>Perímetro</td><td>Qué entidades, tablas o atributos concretos quedan dentro de la medición.</td></tr>\n        <tr><td>Regla / acción de validación</td><td>La condición lógica que el dato debe cumplir (la prueba en sí).</td></tr>\n        <tr><td>Dimensión de calidad</td><td>Qué faceta de la calidad mide (completitud, exactitud, etc.).</td></tr>\n        <tr><td>Periodicidad</td><td>Cada cuánto se ejecuta la regla (diaria, semanal, mensual).</td></tr>\n        <tr><td>Propietario</td><td>El rol responsable del resultado y de su remediación.</td></tr>\n        <tr><td>Peso</td><td>La importancia relativa de la regla al agregar el indicador.</td></tr>\n        <tr><td>Nivel de aceptación</td><td>El umbral mínimo a partir del cual el resultado se considera aceptable.</td></tr>\n        </tbody></table>\n        <p>Definir estos ocho elementos para cada regla es lo que permite pasar de un comentario subjetivo (<em>estos datos están mal</em>) a un veredicto objetivo (<em>la regla 14 está al 87 por ciento frente a un umbral del 95 por ciento</em>).</p>"
        },
        {
          "h": "3. Las 7 dimensiones de calidad",
          "html": "<p>Toda regla mide una dimensión. Marcos como DAMA e ISO proponen catálogos amplios; el modelo de referencia que aplicamos en metodología se concentra en <strong>siete dimensiones</strong> que cubren los modos de fallo más relevantes en la práctica:</p>\n        <table class=\"cmp\"><thead><tr><th>Dimensión</th><th>Pregunta de control</th></tr></thead>\n        <tbody>\n        <tr><td>Consistencia</td><td>¿El dato coincide consigo mismo y entre sistemas y áreas?</td></tr>\n        <tr><td>Actualidad</td><td>¿El dato refleja el estado vigente y llega a tiempo?</td></tr>\n        <tr><td>Exactitud</td><td>¿El valor representa fielmente la realidad que describe?</td></tr>\n        <tr><td>Completitud</td><td>¿Están presentes todos los datos que deberían existir?</td></tr>\n        <tr><td>Integridad</td><td>¿Se respetan las relaciones y referencias entre entidades?</td></tr>\n        <tr><td>Unicidad</td><td>¿Existe un único registro por entidad real, sin duplicados?</td></tr>\n        <tr><td>Conformidad</td><td>¿El dato cumple el formato, estándar o catálogo definido?</td></tr>\n        </tbody></table>\n        <p>En contextos de minería e industria estas dimensiones se vuelven tangibles: la <strong>consistencia semántica</strong> de un KPI que significa cosas distintas en Planta y en Mantenimiento, o la <strong>unicidad</strong> de un mismo activo registrado dos veces en sistemas diferentes, son brechas que distorsionan cualquier decisión.</p>"
        },
        {
          "h": "4. Perfilado (profiling) y el flujo de calidad",
          "html": "<p>El <strong>perfilado o profiling</strong> es el escaneo exploratorio del dato real para descubrir su forma antes de fijar reglas: distribuciones, valores nulos, patrones, cardinalidades, rangos atípicos y dependencias ocultas. Es el diagnóstico que evita inventar reglas a ciegas; alimenta el <em>enfoque de abajo hacia arriba</em> de la exploración técnica.</p>\n        <p>Una vez perfilado el dato, la calidad se gestiona como un ciclo continuo de cuatro etapas:</p>\n        <ol>\n        <li><strong>Definición</strong>: delimitación del perímetro, definición de la regla, revisión y aprobación.</li>\n        <li><strong>Implantación</strong>: configuración técnica y mantenimiento de las reglas en la herramienta.</li>\n        <li><strong>Monitorización</strong>: ejecución periódica y revisión de resultados.</li>\n        <li><strong>Mejora</strong>: identificación de causas, plan de acción y remediación.</li>\n        </ol>\n        <p>Este ciclo es el equivalente operativo del bucle PDCA (Planificar–Hacer–Comprobar–Actuar): cada vuelta debe dejar el dato mejor que la anterior.</p>"
        },
        {
          "h": "5. Cuadro de mando y Data Quality Indicator",
          "html": "<p>La monitorización se materializa en un <strong>cuadro de mando de calidad</strong>: la herramienta que visualiza de forma ágil el estado y la evolución de la ejecución periódica de las reglas. Su valor no es decorativo: sirve como mecanismo de <em>identificación de incidentes</em> y como base para el <strong>análisis de causa raíz</strong> de cada desviación.</p>\n        <p>Para agregar muchas reglas en una señal de dirección se utiliza el <strong>Data Quality Indicator (DQI)</strong>, un índice ponderado que combina el resultado de cada regla según su peso y su nivel de aceptación. El DQI permite comunicar la salud del dato en una sola cifra trazable hacia abajo hasta la regla concreta que la degrada.</p>\n        <p>La regla práctica: <strong>lo que no se mide no se remedia</strong>. Un programa de calidad sin DQI ni cuadro de mando tiende a discutir percepciones; con ellos, la conversación pasa a priorizar remediaciones por impacto.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Validación de calidad",
          "d": "Regla atómica que evalúa una condición sobre un perímetro de datos según una dimensión."
        },
        {
          "t": "Dimensión de calidad",
          "d": "Faceta medible del dato: consistencia, actualidad, exactitud, completitud, integridad, unicidad o conformidad."
        },
        {
          "t": "Perfilado (profiling)",
          "d": "Escaneo exploratorio del dato real para descubrir distribuciones, nulos, patrones y anomalías."
        },
        {
          "t": "Nivel de aceptación",
          "d": "Umbral mínimo a partir del cual el resultado de una regla se considera satisfactorio."
        },
        {
          "t": "Cuadro de mando de calidad",
          "d": "Tablero que visualiza la evolución de las reglas y habilita el análisis de causa de incidentes."
        },
        {
          "t": "Data Quality Indicator (DQI)",
          "d": "Índice ponderado que agrega el resultado de las reglas según su peso para resumir la salud del dato."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en la metodología de implantación, el modelo de calidad se estructura en política, procesos y procedimientos, con un flujo metodológico de cuatro etapas (definición funcional y técnica de ámbitos → implantación y mantenimiento técnico → monitorización periódica y revisión → identificación de mejoras y plan de acción). Una validación de calidad contiene ámbito de negocio, perímetro, regla o acción de validación, dimensión, periodicidad, propietario, peso y nivel de aceptación; y las dimensiones aplicadas son consistencia, actualidad, exactitud, completitud, integridad, unicidad y conformidad. El cuadro de mando de calidad se usa como herramienta de identificación de incidentes y base para el análisis de causa, y el Data Quality Indicator figura entre las métricas de monitorización del modelo.",
      "quiz": [
        {
          "q": "Según el modelo de metodología, ¿cuál de estos NO es una de las 7 dimensiones de calidad consideradas?",
          "opciones": [
            "Disponibilidad",
            "Consistencia",
            "Unicidad",
            "Conformidad"
          ],
          "respuesta": 0,
          "explica": "Las 7 dimensiones son consistencia, actualidad, exactitud, completitud, integridad, unicidad y conformidad. Disponibilidad no forma parte de ese conjunto."
        },
        {
          "q": "¿Qué componente de una validación de calidad define el umbral mínimo a partir del cual el resultado se considera aceptable?",
          "opciones": [
            "El peso",
            "El nivel de aceptación",
            "La periodicidad",
            "El perímetro"
          ],
          "respuesta": 1,
          "explica": "El nivel de aceptación fija el umbral de aprobado; el peso pondera la importancia de la regla y la periodicidad determina cada cuánto se ejecuta."
        },
        {
          "q": "¿Para qué sirve principalmente el perfilado (profiling) del dato?",
          "opciones": [
            "Para asignar pesos a los comités de gobierno",
            "Para publicar el cuadro de mando ejecutivo",
            "Para descubrir distribuciones, nulos y patrones reales antes de fijar reglas",
            "Para cifrar los datos sensibles"
          ],
          "respuesta": 2,
          "explica": "El profiling es el diagnóstico exploratorio del dato real (enfoque bottom-up) que evita definir reglas a ciegas."
        },
        {
          "q": "¿Cuál es el orden correcto del flujo de calidad del dato?",
          "opciones": [
            "Monitorización → definición → mejora → implantación",
            "Implantación → definición → monitorización → mejora",
            "Mejora → monitorización → implantación → definición",
            "Definición → implantación → monitorización → mejora"
          ],
          "respuesta": 3,
          "explica": "El ciclo continuo va de definir la regla a implantarla, monitorizarla periódicamente y, con base en los resultados, mejorarla."
        },
        {
          "q": "¿Qué función cumple un Data Quality Indicator (DQI)?",
          "opciones": [
            "Agrega el resultado ponderado de las reglas en un índice de salud del dato",
            "Sustituye a la política de calidad",
            "Define los roles del comité de calidad",
            "Elimina la necesidad de un cuadro de mando"
          ],
          "respuesta": 0,
          "explica": "El DQI combina los resultados de las reglas según su peso para resumir la salud del dato en una métrica trazable; complementa, no sustituye, al cuadro de mando."
        }
      ]
    },
    {
      "id": "d9",
      "dia": 9,
      "bloque": "b2",
      "area": "MDM / RDM",
      "icono": "🗂️",
      "estado": "full",
      "titulo": "Datos maestros y de referencia (MDM/RDM)",
      "tiempo": "50–60 min",
      "objetivos": [
        "Distinguir datos maestros, de referencia, transaccionales y metadatos, y por qué cada uno se gobierna distinto.",
        "Conocer los estilos de implantación de MDM y los mecanismos de golden record, match & merge y jerarquías.",
        "Conectar el MDM con la capa de datos maestros de la arquitectura y con la verdad única del negocio."
      ],
      "secciones": [
        {
          "h": "1. El problema de fondo: una entidad, muchas versiones",
          "html": "<p>En cualquier organización, una misma entidad de negocio (un cliente, un proveedor, un activo, un material) vive replicada en decenas de sistemas, cada uno con su propia versión ligeramente distinta. El resultado es el síntoma clásico que describen los proyectos de gobierno: indicadores que no cuadran, duplicados y la imposibilidad de tener una <strong>visión integrada</strong> del desempeño.</p>\n        <p>El <strong>Master Data Management (MDM)</strong> es la disciplina que ataca este problema de raíz: crear y mantener una versión fiable, única y compartida de las entidades críticas del negocio. Su primo cercano, el <strong>Reference Data Management (RDM)</strong>, hace lo mismo con los catálogos y códigos que clasifican esas entidades.</p>\n        <p>La promesa ejecutiva del MDM/RDM es la <strong>verdad única</strong>: que cuando dos áreas hablen del mismo cliente o del mismo equipo, estén hablando literalmente del mismo registro.</p>"
        },
        {
          "h": "2. Cuatro tipos de dato que se gobiernan distinto",
          "html": "<p>No todo el dato es igual ni se gobierna igual. La distinción es la base de toda la disciplina:</p>\n        <table class=\"cmp\"><thead><tr><th>Tipo</th><th>Qué es</th><th>Ejemplo</th></tr></thead>\n        <tbody>\n        <tr><td>Maestro</td><td>Entidades de negocio clave, estables y compartidas entre procesos.</td><td>Cliente, proveedor, producto, activo.</td></tr>\n        <tr><td>De referencia</td><td>Catálogos y códigos que clasifican o estandarizan otros datos.</td><td>País, moneda, unidad de medida, estado.</td></tr>\n        <tr><td>Transaccional</td><td>Hechos que registran eventos del negocio en el tiempo.</td><td>Una venta, una orden de mantenimiento, una lectura de sensor.</td></tr>\n        <tr><td>Metadatos</td><td>Dato sobre el dato: su significado, origen y estructura.</td><td>Definición de un concepto del glosario, esquema de una tabla.</td></tr>\n        </tbody></table>\n        <p>El maestro y la referencia son los <em>sustantivos</em> del negocio; lo transaccional son los <em>verbos</em>. Como el transaccional apunta constantemente al maestro, un maestro sucio contamina millones de transacciones aguas abajo.</p>"
        },
        {
          "h": "3. Estilos de implantación de MDM",
          "html": "<p>No existe un único modo de implantar MDM; se elige el estilo según el grado de control y la tolerancia al cambio en los sistemas fuente:</p>\n        <ul>\n        <li><strong>Registro (registry)</strong>: el hub solo cruza referencias y mantiene un índice de coincidencias; el dato sigue viviendo en las fuentes. Mínima intrusión, pero no consolida valores.</li>\n        <li><strong>Consolidación</strong>: el dato se copia a un repositorio central donde se limpia y se calcula el golden record para consumo analítico, sin devolverlo a las fuentes.</li>\n        <li><strong>Coexistencia</strong>: se construye el golden record en el hub y se sincroniza de vuelta con los sistemas fuente, que siguen pudiendo editar.</li>\n        <li><strong>Transaccional o centralizado</strong>: el hub es la única fuente de alta y modificación; los sistemas consumen desde él. Es el modelo más maduro y el de mayor control.</li>\n        </ul>\n        <p>La progresión de registro a centralizado refleja la misma curva de madurez que en los modelos organizativos: de lo descentralizado a lo federado y, finalmente, a lo centralizado.</p>"
        },
        {
          "h": "4. Golden record, match & merge y jerarquías",
          "html": "<p>El <strong>golden record</strong> es el registro dorado: la versión consolidada y autoritativa de una entidad, construida tomando los mejores atributos disponibles entre todas las fuentes. No es un sistema, es un resultado.</p>\n        <p>Se llega a él mediante <strong>match &amp; merge</strong>: primero el <em>matching</em> identifica qué registros de distintos sistemas se refieren a la misma entidad real (resolviendo errores tipográficos, abreviaturas y formatos), y luego el <em>merge</em> los fusiona aplicando reglas de supervivencia que deciden qué valor gana atributo por atributo. Es la materialización técnica de la dimensión de <strong>unicidad</strong>.</p>\n        <p>Sobre los datos maestros se definen además <strong>jerarquías</strong>: estructuras que organizan las entidades en niveles (un grupo corporativo y sus filiales, una familia de productos y sus variantes, un activo y sus componentes). Las jerarquías permiten agregar y analizar el dato de forma coherente en toda la organización.</p>"
        },
        {
          "h": "5. El MDM en la arquitectura de datos",
          "html": "<p>En una arquitectura moderna, el MDM no es una pieza suelta: ocupa una <strong>capa propia</strong> que se relaciona transversalmente con el resto. Los datos maestros gobernados alimentan tanto a los sistemas operacionales como a las capas analíticas, garantizando que la misma definición de entidad viaja por todo el ciclo de vida del dato.</p>\n        <p>El gobierno del MDM se apoya en los roles ya conocidos: el <strong>Data Owner</strong> aprueba las reglas de la entidad maestra de su dominio, el <strong>Data Steward</strong> define y aplica los controles de matching y supervivencia, y el <strong>Data Custodian</strong> asegura su implantación técnica. Sin esa gobernanza, un hub de MDM se degrada hasta volver a ser otro silo más.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Datos maestros",
          "d": "Entidades de negocio clave, estables y compartidas entre procesos (cliente, proveedor, producto, activo)."
        },
        {
          "t": "Datos de referencia",
          "d": "Catálogos y códigos que clasifican o estandarizan otros datos (país, moneda, unidad)."
        },
        {
          "t": "Golden record",
          "d": "Versión consolidada y autoritativa de una entidad, construida con los mejores atributos de cada fuente."
        },
        {
          "t": "Match & merge",
          "d": "Proceso de identificar registros que son la misma entidad y fusionarlos con reglas de supervivencia."
        },
        {
          "t": "Estilo de MDM",
          "d": "Modo de implantación: registro, consolidación, coexistencia o transaccional/centralizado."
        },
        {
          "t": "Jerarquía",
          "d": "Estructura que organiza las entidades maestras en niveles para agregar y analizar el dato de forma coherente."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> la diferenciación de tipologías de información conecta con la definición de tipología de información y los tipos de metadata del diccionario (metadata de negocio, técnica, de origen y destino, de seguridad y privacidad). En la arquitectura de referencia, los datos maestros constituyen una capa propia (MDM Layer / Datos Maestros) que sostiene la verdad única reclamada en el enfoque (calidad, estructura y verdad única). La unicidad como dimensión de calidad es justamente la que el golden record y el match & merge materializan, y su gobierno recae en los roles Data Owner, Data Steward y Data Custodian descritos en el modelo organizacional.",
      "quiz": [
        {
          "q": "¿Cuál de estas afirmaciones describe correctamente a los datos de referencia frente a los maestros?",
          "opciones": [
            "Son los hechos que registran eventos del negocio en el tiempo",
            "Son catálogos y códigos que clasifican o estandarizan otros datos",
            "Son dato sobre el dato, como el esquema de una tabla",
            "Son siempre datos sensibles que requieren enmascarado"
          ],
          "respuesta": 1,
          "explica": "Los datos de referencia son catálogos (país, moneda, estado); los maestros son las entidades clave; los hechos son transaccionales y el dato sobre el dato son metadatos."
        },
        {
          "q": "En el estilo de MDM transaccional o centralizado, ¿dónde se realizan las altas y modificaciones del dato maestro?",
          "opciones": [
            "En cada sistema fuente de forma independiente",
            "Solo en el data lake analítico",
            "Únicamente en el hub central, del que consumen los demás sistemas",
            "En el cuadro de mando de calidad"
          ],
          "respuesta": 2,
          "explica": "El estilo centralizado convierte al hub en la única fuente de alta y modificación; es el modelo de mayor control y madurez."
        },
        {
          "q": "¿Qué es el golden record?",
          "opciones": [
            "Un sistema transaccional de alto rendimiento",
            "Una métrica del Data Quality Indicator",
            "Un catálogo de datos de referencia",
            "El registro consolidado y autoritativo de una entidad, con los mejores atributos de cada fuente"
          ],
          "respuesta": 3,
          "explica": "El golden record es el resultado de consolidar una entidad tomando los mejores valores disponibles; no es un sistema sino un resultado."
        },
        {
          "q": "El proceso de match & merge materializa principalmente, ¿qué dimensión de calidad?",
          "opciones": [
            "La unicidad",
            "La conformidad",
            "La actualidad",
            "La integridad referencial"
          ],
          "respuesta": 0,
          "explica": "Al identificar y fusionar registros que representan la misma entidad real, match & merge persigue que exista un único registro por entidad, es decir, la unicidad."
        },
        {
          "q": "¿Para qué sirven las jerarquías sobre los datos maestros?",
          "opciones": [
            "Para cifrar los atributos sensibles",
            "Para organizar las entidades en niveles y agregar el dato de forma coherente",
            "Para sustituir a los datos transaccionales",
            "Para definir la periodicidad de las reglas de calidad"
          ],
          "respuesta": 1,
          "explica": "Las jerarquías estructuran las entidades en niveles (grupo y filiales, familia y variantes) permitiendo agregaciones coherentes en toda la organización."
        }
      ]
    },
    {
      "id": "d10",
      "dia": 10,
      "bloque": "b2",
      "area": "Modelado & Arquitectura",
      "icono": "🏗️",
      "estado": "full",
      "titulo": "Modelado y arquitectura de datos",
      "tiempo": "50–60 min",
      "objetivos": [
        "Diferenciar los modelos conceptual, lógico y físico y el papel de cada uno en el gobierno.",
        "Contrastar la normalización con el modelado dimensional (estrella y copo de nieve) según el propósito.",
        "Mapear las capas de la arquitectura de datos y conectarlas con la verdad única del negocio."
      ],
      "secciones": [
        {
          "h": "1. Por qué el modelado es una palanca de gobierno",
          "html": "<p>El <strong>modelado de datos</strong> es el acto de representar, de forma estructurada, qué entidades existen en el negocio, qué atributos tienen y cómo se relacionan. Es la frontera donde el lenguaje del negocio se traduce en estructuras que un sistema puede almacenar y explotar.</p>\n        <p>Para un programa de gobierno, el modelado importa porque es donde se materializan (o se rompen) la consistencia semántica y la verdad única. Si cada sistema modela al cliente de forma distinta, ningún glosario ni política podrá reconciliar después esa divergencia. Modelar bien es gobernar por diseño.</p>"
        },
        {
          "h": "2. Conceptual, lógico y físico",
          "html": "<p>El modelado se aborda en tres niveles de abstracción decrecientes, del negocio puro a la implementación concreta:</p>\n        <table class=\"cmp\"><thead><tr><th>Nivel</th><th>Responde a</th><th>Independiente de</th></tr></thead>\n        <tbody>\n        <tr><td>Conceptual</td><td>Qué entidades y relaciones existen en el negocio.</td><td>Toda tecnología; es lenguaje de negocio.</td></tr>\n        <tr><td>Lógico</td><td>Qué atributos, claves y normalización tienen esas entidades.</td><td>El gestor de base de datos concreto.</td></tr>\n        <tr><td>Físico</td><td>Cómo se implementa en tablas, índices, tipos y particiones.</td><td>Nada; ya es específico del motor.</td></tr>\n        </tbody></table>\n        <p>El nivel conceptual conversa con el <strong>glosario de negocio</strong> (los conceptos), el lógico con el <strong>diccionario de datos</strong> y el físico con el <strong>catálogo técnico</strong> y el punto de almacenamiento. Mantener la trazabilidad entre los tres niveles es lo que permite que un cambio de negocio se propague de forma controlada hasta la tabla.</p>"
        },
        {
          "h": "3. Normalización frente a modelado dimensional",
          "html": "<p>Existen dos grandes filosofías de modelado, cada una óptima para un propósito distinto:</p>\n        <ul>\n        <li><strong>Normalización</strong>: descompone los datos para eliminar redundancia y anomalías de actualización. Es el patrón de los sistemas <em>operacionales</em> (OLTP), donde se escribe mucho y se busca integridad y consistencia.</li>\n        <li><strong>Modelado dimensional</strong>: organiza el dato en torno a hechos (métricas) y dimensiones (contextos de análisis). Es el patrón de los entornos <em>analíticos</em> (OLAP), donde se lee mucho y se busca rendimiento de consulta y facilidad de interpretación.</li>\n        </ul>\n        <p>Dentro del dimensional, el <strong>esquema en estrella</strong> coloca una tabla de hechos central rodeada de dimensiones desnormalizadas (consultas rápidas, algo de redundancia). El <strong>copo de nieve</strong> normaliza esas dimensiones en subtablas (menos redundancia, consultas con más joins). La elección es un trade-off clásico entre rendimiento y normalización.</p>"
        },
        {
          "h": "4. La arquitectura de datos por capas",
          "html": "<p>La arquitectura de datos organiza el flujo del dato desde su origen hasta su consumo en capas con responsabilidades claras. En su forma de referencia conviven la nomenclatura medallón y la nomenclatura por propósito:</p>\n        <table class=\"cmp\"><thead><tr><th>Capa</th><th>Equivalente medallón</th><th>Propósito</th></tr></thead>\n        <tbody>\n        <tr><td>Raw</td><td>Bronce</td><td>Dato crudo, tal cual llega del origen, sin transformar.</td></tr>\n        <tr><td>Common</td><td>Plata (Silver)</td><td>Dato limpio, integrado y homogeneizado entre fuentes.</td></tr>\n        <tr><td>Business</td><td>Oro (Gold)</td><td>Dato enriquecido y modelado para el consumo analítico.</td></tr>\n        <tr><td>MDM</td><td>Transversal</td><td>Datos maestros que sostienen la verdad única en todas las capas.</td></tr>\n        </tbody></table>\n        <p>De forma complementaria, la arquitectura se describe por funciones: una <strong>Data Layer</strong> (almacenamiento), una capa de <strong>Processing</strong> (transformación e ingesta) y una capa <strong>Analytical</strong> (explotación). El dato gana valor a medida que asciende: pasa de bronce crudo a oro confiable.</p>"
        },
        {
          "h": "5. La verdad única como objetivo de diseño",
          "html": "<p>El hilo que une modelado y arquitectura es la <strong>verdad única</strong>: un único lugar y una única definición autoritativa para cada concepto. No se consigue por decreto, sino por arquitectura: las capas common/silver y los datos maestros existen precisamente para reconciliar las versiones dispersas que generan los sistemas operacionales.</p>\n        <p>El criterio ejecutivo es escalonado: gobernar el modelo conceptual para fijar el significado, diseñar capas que conviertan el caos del origen en estructuras confiables, y aplicar modelado dimensional en la capa de negocio para que el consumo sea rápido y comprensible. Así, la arquitectura deja de ser un diagrama técnico y se vuelve el soporte físico del gobierno del dato.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Modelo conceptual",
          "d": "Representación de entidades y relaciones del negocio, independiente de toda tecnología."
        },
        {
          "t": "Modelo lógico",
          "d": "Atributos, claves y normalización de las entidades, independiente del gestor concreto."
        },
        {
          "t": "Modelo físico",
          "d": "Implementación en tablas, índices y tipos específica del motor de base de datos."
        },
        {
          "t": "Normalización",
          "d": "Técnica que elimina redundancia y anomalías, propia de sistemas operacionales (OLTP)."
        },
        {
          "t": "Esquema en estrella",
          "d": "Modelo dimensional con una tabla de hechos central y dimensiones desnormalizadas."
        },
        {
          "t": "Copo de nieve",
          "d": "Variante del estrella donde las dimensiones se normalizan en subtablas adicionales."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el modelado conecta con la cadena glosario de negocio → diccionario de datos → catálogo técnico y con los tipos de metadata (de negocio, técnica, de origen y destino). En la arquitectura de referencia, las capas Raw/Bronce, Common/Silver, Business/Gold y la capa MDM ordenan el ciclo de vida del dato, complementadas por las funciones Data Layer, Processing y Analytical. Todo ello persigue la verdad única declarada en el enfoque (calidad, estructura y verdad única), donde la estructuración, el modelado y la ordenación son etapas de la madurez en la gestión del dato.",
      "quiz": [
        {
          "q": "¿Qué nivel de modelado es independiente de toda tecnología y habla el lenguaje del negocio?",
          "opciones": [
            "El modelo físico",
            "El modelo lógico",
            "El modelo conceptual",
            "El esquema en copo de nieve"
          ],
          "respuesta": 2,
          "explica": "El modelo conceptual describe entidades y relaciones del negocio sin atarse a ninguna tecnología; el lógico ya define atributos y el físico la implementación."
        },
        {
          "q": "La normalización es la técnica de modelado característica de, ¿qué tipo de sistema?",
          "opciones": [
            "Repositorios de metadatos",
            "Sistemas analíticos (OLAP), donde importa la lectura",
            "Cuadros de mando de calidad",
            "Sistemas operacionales (OLTP), donde importa la integridad"
          ],
          "respuesta": 3,
          "explica": "La normalización elimina redundancia y anomalías de actualización, lo que la hace idónea para entornos transaccionales OLTP."
        },
        {
          "q": "¿Cuál es la diferencia entre un esquema en estrella y uno en copo de nieve?",
          "opciones": [
            "En el copo de nieve las dimensiones se normalizan en subtablas; en el estrella están desnormalizadas",
            "El estrella no tiene tabla de hechos",
            "El copo de nieve solo se usa en OLTP",
            "Son sinónimos exactos"
          ],
          "respuesta": 0,
          "explica": "Ambos son dimensionales; la diferencia es que el copo de nieve normaliza las dimensiones en subtablas, reduciendo redundancia a costa de más joins."
        },
        {
          "q": "En la arquitectura por capas, ¿a qué equivale la capa Common?",
          "opciones": [
            "Bronce (dato crudo)",
            "Plata o Silver (dato limpio e integrado)",
            "Oro (dato analítico enriquecido)",
            "La capa de ingesta"
          ],
          "respuesta": 1,
          "explica": "Common se corresponde con Silver: el dato ya limpio, integrado y homogeneizado entre fuentes, antes de enriquecerse en la capa de negocio (Gold)."
        },
        {
          "q": "¿Qué objetivo de diseño persiguen conjuntamente las capas common/silver y la capa MDM?",
          "opciones": [
            "Maximizar la redundancia del dato",
            "Eliminar la necesidad de modelado dimensional",
            "Sostener la verdad única reconciliando las versiones dispersas de los orígenes",
            "Sustituir al glosario de negocio"
          ],
          "respuesta": 2,
          "explica": "Estas capas existen para reconciliar las versiones dispersas que generan los sistemas operacionales y sostener una verdad única y confiable."
        }
      ]
    },
    {
      "id": "d11",
      "dia": 11,
      "bloque": "b2",
      "area": "Almacenamiento / DW & BI",
      "icono": "📦",
      "estado": "full",
      "titulo": "Almacenamiento, operaciones y Data Warehousing & BI",
      "tiempo": "50–60 min",
      "objetivos": [
        "Distinguir Data Warehouse, Data Lake y Lakehouse y cuándo conviene cada uno.",
        "Entender la arquitectura medallón (bronce/plata/oro) y la diferencia entre ETL y ELT.",
        "Conectar el Business Intelligence y los cuadros de mando con el stack tecnológico y la arquitectura DaaS."
      ],
      "secciones": [
        {
          "h": "1. Tres paradigmas de almacenamiento analítico",
          "html": "<p>Donde el dato analítico vive condiciona qué se puede hacer con él. Han convivido tres paradigmas, cada uno respuesta a las limitaciones del anterior:</p>\n        <table class=\"cmp\"><thead><tr><th>Paradigma</th><th>Qué almacena</th><th>Fortaleza</th></tr></thead>\n        <tbody>\n        <tr><td>Data Warehouse</td><td>Dato estructurado y modelado (schema-on-write).</td><td>Consultas gobernadas, rápidas y confiables para BI.</td></tr>\n        <tr><td>Data Lake</td><td>Dato crudo de cualquier tipo (schema-on-read).</td><td>Flexibilidad y bajo coste para grandes volúmenes y analítica avanzada.</td></tr>\n        <tr><td>Lakehouse</td><td>Dato crudo y estructurado sobre un mismo repositorio.</td><td>Combina la flexibilidad del lake con el gobierno del warehouse.</td></tr>\n        </tbody></table>\n        <p>El <strong>warehouse</strong> exige definir el esquema antes de cargar (disciplina, pero rigidez); el <strong>lake</strong> admite todo y define el esquema al leer (flexibilidad, pero riesgo de convertirse en un pantano de datos); el <strong>lakehouse</strong> es la síntesis moderna que busca lo mejor de ambos sobre tecnologías como Databricks.</p>"
        },
        {
          "h": "2. La arquitectura medallón",
          "html": "<p>El patrón dominante para organizar un lakehouse es la <strong>arquitectura medallón</strong>, que refina el dato progresivamente en tres zonas:</p>\n        <ul>\n        <li><strong>Bronce</strong>: dato crudo, ingerido tal cual desde el origen, sin transformar. Es la copia fiel y trazable de la fuente.</li>\n        <li><strong>Plata</strong>: dato limpio e integrado, con calidad aplicada y entidades reconciliadas entre fuentes.</li>\n        <li><strong>Oro</strong>: tablas analíticas listas para el consumo, modeladas por dominio para KPIs y reporting.</li>\n        </ul>\n        <p>El valor aumenta con cada salto: del bronce crudo, pasando por la limpieza en plata, hasta las tablas confiables de oro que alimentan los cuadros de mando. Es la misma lógica de capas Raw/Common/Business vista en arquitectura, aplicada al almacenamiento físico.</p>"
        },
        {
          "h": "3. ETL frente a ELT",
          "html": "<p>Para mover el dato del origen al repositorio existen dos órdenes de operación:</p>\n        <table class=\"cmp\"><thead><tr><th>Patrón</th><th>Orden</th><th>Idóneo cuando</th></tr></thead>\n        <tbody>\n        <tr><td>ETL</td><td>Extraer → Transformar → Cargar</td><td>El destino es un warehouse rígido y se transforma fuera, antes de cargar.</td></tr>\n        <tr><td>ELT</td><td>Extraer → Cargar → Transformar</td><td>El destino es un lake o lakehouse con potencia de cómputo elástica para transformar dentro.</td></tr>\n        </tbody></table>\n        <p>El <strong>ELT</strong> ha ganado terreno con la nube: cargar primero el dato crudo (capa bronce) y transformarlo después dentro del propio repositorio aprovecha el cómputo escalable y conserva el dato original para reprocesos. El <strong>ETL</strong> sigue vigente cuando hay que limpiar o cumplir antes de aterrizar el dato.</p>"
        },
        {
          "h": "4. BI y cuadros de mando",
          "html": "<p>El <strong>Business Intelligence (BI)</strong> es la capa de explotación que convierte el dato de oro en decisiones: reportes, indicadores y cuadros de mando. Su unidad emblemática es el <strong>dashboard</strong>, que sintetiza el estado y la evolución de los KPIs de forma visual e inmediata.</p>\n        <p>El BI tradicional (reportes a medida y soluciones departamentales) es el primer escalón de la madurez analítica; por encima se sitúan la analítica predictiva, prescriptiva y cognitiva. Un buen cuadro de mando no solo muestra: <strong>habilita acción</strong>, sirviendo de base para identificar incidentes y disparar la respuesta operativa, igual que el cuadro de mando de calidad.</p>"
        },
        {
          "h": "5. El stack tecnológico y el modelo DaaS",
          "html": "<p>Sobre estos conceptos se monta un <strong>stack</strong> de tecnologías concretas: plataformas de lakehouse y procesamiento como <strong>Databricks</strong>, almacenes en la nube como <strong>Snowflake</strong>, repositorios de <strong>Data Lake</strong> y herramientas de visualización como <strong>Power BI</strong>. La arquitectura de referencia se entrega cada vez más como <strong>DaaS (Data as a Service)</strong>: capacidades de datos consumibles bajo demanda, desacopladas de la infraestructura subyacente.</p>\n        <p>La lección de gobierno es que la tecnología es el habilitador, no el objetivo. Un lakehouse de última generación sin reglas de calidad, sin catálogo y sin roles definidos reproduce los mismos silos que pretendía resolver. El almacenamiento y el BI rinden su valor solo cuando se apoyan en las capas de gobierno y calidad estudiadas en el bloque.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Data Warehouse",
          "d": "Repositorio de dato estructurado y modelado (schema-on-write), óptimo para BI gobernado."
        },
        {
          "t": "Data Lake",
          "d": "Repositorio de dato crudo de cualquier tipo (schema-on-read), flexible y de bajo coste."
        },
        {
          "t": "Lakehouse",
          "d": "Arquitectura que combina la flexibilidad del lake con el gobierno del warehouse sobre un mismo repositorio."
        },
        {
          "t": "Arquitectura medallón",
          "d": "Refinamiento progresivo del dato en zonas bronce (crudo), plata (limpio) y oro (analítico)."
        },
        {
          "t": "ETL / ELT",
          "d": "Patrones de movimiento del dato: transformar antes de cargar (ETL) o cargar y transformar dentro (ELT)."
        },
        {
          "t": "DaaS (Data as a Service)",
          "d": "Entrega de capacidades de datos consumibles bajo demanda, desacopladas de la infraestructura."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> la arquitectura por capas describe explícitamente el modelo medallón (Bronze: dato crudo; Silver: dato limpio e integrado; Gold: tablas analíticas para KPIs) y un stack con Databricks, Snowflake, Power BI y Data Lake, además de servicios de ingesta y procesamiento y un repositorio analítico central. El enfoque distingue el modelo de BI tradicional (reportes a medida, cuadros de mando, soluciones departamentales) de la analítica predictiva, prescriptiva y cognitiva como escalones de madurez analítica, todo ello bajo una entrega orientada a DaaS donde la tecnología habilita, pero no sustituye, al gobierno y la calidad del dato.",
      "quiz": [
        {
          "q": "¿Qué caracteriza a un Data Lake frente a un Data Warehouse?",
          "opciones": [
            "Exige definir el esquema antes de cargar (schema-on-write)",
            "No puede usarse para analítica avanzada",
            "Solo admite dato estructurado y modelado",
            "Almacena dato crudo de cualquier tipo y define el esquema al leer (schema-on-read)"
          ],
          "respuesta": 3,
          "explica": "El lake admite cualquier dato crudo y aplica el esquema en lectura; el warehouse exige modelar antes de cargar (schema-on-write)."
        },
        {
          "q": "En la arquitectura medallón, ¿qué contiene la zona de oro?",
          "opciones": [
            "Las tablas analíticas listas para KPIs y reporting",
            "El dato limpio e integrado entre fuentes",
            "El dato crudo tal cual llega del origen",
            "Los logs de auditoría de acceso"
          ],
          "respuesta": 0,
          "explica": "El oro contiene las tablas analíticas modeladas para consumo; el bronce es el dato crudo y la plata el dato limpio e integrado."
        },
        {
          "q": "¿Cuál es la diferencia esencial entre ETL y ELT?",
          "opciones": [
            "ELT transforma el dato antes de cargarlo",
            "En ELT se carga el dato crudo y se transforma dentro del repositorio; en ETL se transforma antes de cargar",
            "ETL no extrae el dato del origen",
            "Son el mismo proceso con distinto nombre"
          ],
          "respuesta": 1,
          "explica": "ELT (Extraer-Cargar-Transformar) aprovecha el cómputo del destino para transformar dentro; ETL transforma fuera antes de cargar."
        },
        {
          "q": "Según el enfoque, el BI tradicional con reportes a medida y cuadros de mando es, ¿qué escalón de la madurez analítica?",
          "opciones": [
            "El escalón más avanzado, por encima de la IA",
            "Un sustituto del data lake",
            "El primer escalón, por debajo de la analítica predictiva, prescriptiva y cognitiva",
            "Una capa de la arquitectura medallón"
          ],
          "respuesta": 2,
          "explica": "El BI tradicional es el primer escalón de madurez analítica; por encima se sitúan la analítica predictiva, prescriptiva y cognitiva."
        },
        {
          "q": "¿Cuál es la principal lección de gobierno respecto al stack tecnológico (Databricks, Snowflake, Power BI)?",
          "opciones": [
            "La tecnología por sí sola resuelve los silos de datos",
            "Adoptar el stack más moderno hace innecesario el catálogo y las reglas de calidad",
            "El BI debe sustituir al gobierno del dato",
            "La tecnología es un habilitador; sin gobierno, catálogo y calidad reproduce los mismos silos"
          ],
          "respuesta": 3,
          "explica": "La tecnología habilita pero no sustituye al gobierno: un lakehouse sin reglas de calidad, catálogo ni roles reproduce los silos que pretendía resolver."
        }
      ]
    },
    {
      "id": "d12",
      "dia": 12,
      "bloque": "b2",
      "area": "Integración",
      "icono": "🔗",
      "estado": "full",
      "titulo": "Integración e interoperabilidad (ETL/ELT, APIs, streaming)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Distinguir los patrones de movimiento del dato: ETL, ELT, CDC, batch y streaming.",
        "Entender cómo APIs y virtualización integran sistemas sin replicar el dato.",
        "Conectar la integración con una arquitectura metadata-driven gobernada."
      ],
      "secciones": [
        {
          "h": "1. Por qué importa la integración",
          "html": "<p>El área DAMA de <strong>Integración e Interoperabilidad</strong> (<em>Data Integration &amp;\n        Interoperability</em>) cubre el movimiento y la consolidación del dato entre aplicaciones, almacenes y\n        organizaciones. Es la fontanería del ecosistema: sin ella, cada sistema vive en su silo y el negocio\n        recibe versiones contradictorias de la misma verdad.</p>\n        <p>El objetivo ejecutivo no es mover bytes, sino <strong>disponibilizar información confiable, oportuna y\n        escalable</strong>. La integración bien gobernada reduce la fricción operativa y habilita una única fuente\n        de verdad sobre la que decidir.</p>"
        },
        {
          "h": "2. ETL vs ELT: dónde se transforma el dato",
          "html": "<p>La diferencia está en el orden de la <strong>T</strong> (transformación):</p>\n        <table class=\"cmp\"><thead><tr><th>Patrón</th><th>Flujo</th><th>Cuándo conviene</th></tr></thead>\n        <tbody>\n        <tr><td><strong>ETL</strong></td><td>Extraer → Transformar → Cargar. El dato se limpia antes de aterrizar en el destino.</td><td>Almacenes tradicionales, reglas de calidad estrictas previas a la carga.</td></tr>\n        <tr><td><strong>ELT</strong></td><td>Extraer → Cargar → Transformar. El dato crudo aterriza primero y se transforma dentro del destino.</td><td>Lagos y plataformas cloud potentes (Databricks, Snowflake) que escalan el cómputo.</td></tr>\n        </tbody></table>\n        <p>El giro de ETL a ELT acompaña al modelo <strong>medallón</strong> (Bronce → Plata → Oro): el dato crudo\n        se persiste en una capa <em>raw</em> y se refina por etapas dentro de la plataforma.</p>"
        },
        {
          "h": "3. Batch, streaming y CDC",
          "html": "<p>El dato se mueve a dos ritmos. El <strong>procesamiento batch</strong> agrupa y procesa por lotes\n        en ventanas programadas; el <strong>streaming</strong> (tiempo real) procesa eventos a medida que ocurren,\n        habilitando alertas y decisiones inmediatas.</p>\n        <p>El <strong>CDC</strong> (<em>Change Data Capture</em>) es la pieza que hace eficiente la integración:\n        en lugar de recargar tablas completas, captura solo los cambios (altas, bajas, modificaciones) en origen.\n        Frente a la carga <em>full</em>, la <strong>ingesta incremental</strong> y el CDC reducen volumen, coste y\n        latencia.</p>"
        },
        {
          "h": "4. APIs, REST y virtualización",
          "html": "<p>No todo se replica. Las <strong>APIs REST</strong> exponen el dato como servicio para que los\n        consumidores lo soliciten bajo demanda, mientras que la <strong>virtualización de datos</strong> crea una\n        capa lógica que consulta los orígenes en su sitio, sin moverlos físicamente.</p>\n        <p>La interoperabilidad es justo eso: que sistemas heterogéneos se entiendan mediante interfaces y estándares\n        comunes. La virtualización reduce copias redundantes y acelera el acceso, a costa de depender del rendimiento\n        de los orígenes.</p>"
        },
        {
          "h": "5. Arquitectura metadata-driven",
          "html": "<p>El enfoque más maduro convierte la integración en un proceso <strong>dirigido por metadatos</strong>:\n        las rutas, reglas y transformaciones no se programan a mano caso por caso, sino que se declaran en un\n        <em>metamodelo</em> y unas funciones genéricas (ingesta, transformación, calidad) las ejecutan por\n        orquestación.</p>\n        <p>Ventaja ejecutiva: cada nuevo origen es <strong>configuración, no desarrollo</strong>. Eso acelera el\n        <em>time-to-market</em> de nuevos casos de uso y embebe la gobernanza (permisos, calidad, trazabilidad) en\n        el propio flujo, en lugar de añadirla después.</p>"
        }
      ],
      "terminos": [
        {
          "t": "ETL / ELT",
          "d": "Patrones de integración que se diferencian por si la transformación ocurre antes (ETL) o después (ELT) de cargar el dato en el destino."
        },
        {
          "t": "CDC (Change Data Capture)",
          "d": "Técnica que captura solo los cambios ocurridos en origen para evitar recargas completas."
        },
        {
          "t": "Ingesta incremental / full",
          "d": "Modos de carga: la incremental sube solo lo nuevo o modificado; la full recarga el conjunto completo."
        },
        {
          "t": "Streaming vs batch",
          "d": "Procesamiento en tiempo real evento a evento frente a procesamiento por lotes en ventanas programadas."
        },
        {
          "t": "Virtualización de datos",
          "d": "Capa lógica que consulta orígenes en su ubicación sin copiar físicamente el dato."
        },
        {
          "t": "Metadata-driven",
          "d": "Arquitectura en la que las rutas, reglas y transformaciones se declaran en un metamodelo y se ejecutan por orquestación."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> En el caso de la empresa de restauración global, Minsait desplegó una\n    arquitectura <em>metadata-driven</em> gobernada para todos los procesos ETL. Todo el ciclo del dato se rige por un\n    <strong>metamodelo</strong> bajo la premisa de que «si un objeto no está en el metamodelo, no existe». Funciones\n    básicas independientes —ingesta, transformación, calidad— se orquestan para ejecutar el flujo completo, tomando\n    del metamodelo las rutas anonimizadas de origen y destino, la forma de ingestar (incremental, full, CDC), el\n    tipado de columnas y los cálculos para obtener los KPIs corporativos. El flujo se orquesta con <strong>Control-M</strong>\n    en mallas de ejecución sobre Databricks, AWS y Snowflake. La arquitectura DaaS de referencia separa además el\n    procesamiento batch del streaming (Confluent) y expone el dato vía API Rest y virtualización.",
      "quiz": [
        {
          "q": "¿Cuál es la diferencia esencial entre ETL y ELT?",
          "opciones": [
            "El momento en que se transforma el dato: antes de cargar (ETL) o después de cargar en el destino (ELT).",
            "ETL solo funciona en la nube y ELT solo en sistemas locales.",
            "ELT no permite aplicar reglas de calidad en ningún momento.",
            "Son sinónimos; la única diferencia es el nombre comercial del proveedor."
          ],
          "respuesta": 0,
          "explica": "La T (transformación) cambia de posición: en ETL se transforma antes de cargar; en ELT se carga el dato crudo y se transforma dentro del destino, aprovechando plataformas cloud potentes."
        },
        {
          "q": "¿Qué ventaja aporta el CDC (Change Data Capture) frente a una carga full?",
          "opciones": [
            "Cifra automáticamente todos los datos sensibles del origen.",
            "Captura solo los cambios ocurridos en origen, reduciendo volumen, coste y latencia.",
            "Elimina la necesidad de cualquier herramienta de orquestación.",
            "Convierte el procesamiento batch en streaming sin cambiar nada más."
          ],
          "respuesta": 1,
          "explica": "El CDC detecta altas, bajas y modificaciones en origen y propaga solo esos cambios, evitando recargar tablas completas; es la base de la ingesta incremental eficiente."
        },
        {
          "q": "En una arquitectura metadata-driven, ¿qué significa incorporar un nuevo origen de datos?",
          "opciones": [
            "Reescribir desde cero todo el motor de integración.",
            "Migrar obligatoriamente a un nuevo proveedor cloud.",
            "Declararlo como configuración en el metamodelo, sin desarrollar un flujo a medida.",
            "Desactivar las reglas de calidad para no frenar la ingesta."
          ],
          "respuesta": 2,
          "explica": "El valor del enfoque metadata-driven es que las funciones genéricas ya existen; añadir un origen es configurar el metamodelo, no programar, lo que acelera el time-to-market y embebe la gobernanza."
        },
        {
          "q": "¿Qué describe mejor la virtualización de datos?",
          "opciones": [
            "Una copia física redundante del dato en cada sistema consumidor.",
            "Un formato de compresión para reducir el tamaño de los ficheros.",
            "Un proceso batch que se ejecuta una vez al año.",
            "Una capa lógica que consulta los orígenes en su sitio sin moverlos físicamente."
          ],
          "respuesta": 3,
          "explica": "La virtualización ofrece una vista integrada consultando los orígenes en su ubicación, reduciendo copias redundantes; su contrapartida es depender del rendimiento de esos orígenes."
        },
        {
          "q": "¿Con qué herramienta orquestó Minsait las mallas de ejecución del flujo ETL en el caso de restauración?",
          "opciones": [
            "Control-M, sobre tecnologías como Databricks, AWS y Snowflake.",
            "Una hoja de cálculo compartida actualizada a mano.",
            "Un único script monolítico sin orquestador.",
            "Exclusivamente procesamiento en streaming sin componente batch."
          ],
          "respuesta": 0,
          "explica": "El flujo metadata-driven se orquestó con Control-M en mallas de ejecución, apalancado en Databricks, AWS y Snowflake, según el caso de la empresa de restauración global."
        }
      ]
    },
    {
      "id": "d13",
      "dia": 13,
      "bloque": "b2",
      "area": "Seguridad & Privacidad",
      "icono": "🔐",
      "estado": "full",
      "titulo": "Seguridad del dato y privacidad (ISO 27001, anonimización)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Clasificar la información por sensibilidad y derivar controles de acceso proporcionados.",
        "Diferenciar cifrado, anonimización y enmascaramiento, y cuándo aplicar cada uno.",
        "Adoptar los principios de privacidad por diseño y seguridad por diseño."
      ],
      "secciones": [
        {
          "h": "1. Seguridad y privacidad: dos caras del mismo control",
          "html": "<p>El área DAMA de <strong>Seguridad del Dato</strong> (<em>Data Security</em>) protege el dato frente\n        a accesos no autorizados, mientras que la <strong>privacidad</strong> protege los derechos de las personas\n        sobre sus datos personales. Se solapan, pero no son lo mismo: puedes tener un dato muy seguro y, aun así,\n        tratarlo de forma que vulnere la privacidad.</p>\n        <p>El principio rector es la <strong>tríada CIA</strong>: confidencialidad, integridad y disponibilidad.\n        Todo control de seguridad sirve a uno de esos tres objetivos.</p>"
        },
        {
          "h": "2. Clasificación de la información",
          "html": "<p>No todo el dato merece la misma protección. La <strong>clasificación</strong> etiqueta cada activo\n        según su sensibilidad —por ejemplo público, interno, confidencial, restringido— y de esa etiqueta se derivan\n        los controles. Es el cimiento: <strong>sin clasificación no hay control proporcionado</strong>, porque no se\n        sabe qué proteger ni cuánto.</p>\n        <p>La clasificación es además una <em>metadata de seguridad</em>: vive junto al dato en el catálogo e informa\n        a los flujos de quién puede ver qué.</p>"
        },
        {
          "h": "3. Control de acceso y cifrado",
          "html": "<p>El <strong>control de acceso</strong> aplica el principio de <strong>mínimo privilegio</strong>:\n        cada rol accede solo a lo que necesita. El control <em>granular</em> llega a nivel de tabla, columna o incluso\n        fila según la clasificación del dato.</p>\n        <p>El <strong>cifrado</strong> protege la confidencialidad transformando el dato en ilegible sin la clave,\n        tanto <em>en reposo</em> (almacenado) como <em>en tránsito</em> (cuando viaja por la red). Es reversible para\n        quien tiene la clave: por eso protege, pero no anonimiza.</p>"
        },
        {
          "h": "4. Anonimización, enmascaramiento y derecho al olvido",
          "html": "<p>Cuando hay que usar dato sin exponer identidades, se aplican técnicas distintas:</p>\n        <ul>\n          <li><strong>Enmascaramiento</strong>: sustituye valores reales por ficticios pero realistas (útil en entornos de prueba y desarrollo).</li>\n          <li><strong>Anonimización</strong>: rompe de forma <em>irreversible</em> el vínculo con la persona; el dato deja de ser personal.</li>\n          <li><strong>Seudonimización</strong>: sustituye identificadores por seudónimos reversibles solo con información adicional protegida.</li>\n        </ul>\n        <p>El <strong>derecho al olvido</strong> obliga a poder eliminar los datos de una persona cuando lo solicita,\n        lo que conecta con las políticas de <strong>retención e historificación</strong>: cuánto se guarda, cuándo se\n        elimina y qué excepciones legales obligan a conservar.</p>"
        },
        {
          "h": "5. Privacidad y seguridad por diseño",
          "html": "<p>La buena práctica es <strong>por diseño</strong>: incorporar privacidad y seguridad desde la\n        arquitectura, no como un parche posterior. Significa minimizar el dato recogido, anonimizar desde el origen\n        y embeber el control de acceso en los pipelines.</p>\n        <p>El marco de referencia operativo es la norma <strong>ISO 27001</strong>, que define un sistema de gestión\n        de seguridad de la información (SGSI) con controles aplicables al ciclo de vida del dato.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Clasificación de la información",
          "d": "Etiquetado de cada activo por nivel de sensibilidad del que se derivan los controles aplicables."
        },
        {
          "t": "Mínimo privilegio",
          "d": "Principio por el que cada rol accede solo al dato estrictamente necesario para su función."
        },
        {
          "t": "Cifrado",
          "d": "Transformación reversible del dato en ilegible sin la clave, en reposo y en tránsito."
        },
        {
          "t": "Anonimización vs enmascaramiento",
          "d": "La anonimización rompe el vínculo con la persona de forma irreversible; el enmascaramiento sustituye valores por ficticios realistas."
        },
        {
          "t": "Derecho al olvido",
          "d": "Derecho de una persona a que se eliminen sus datos personales, sujeto a excepciones legales."
        },
        {
          "t": "ISO 27001",
          "d": "Norma del sistema de gestión de seguridad de la información que define controles sobre el ciclo de vida del dato."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> En su metodología, Minsait estructura el modelo de seguridad y privacidad\n    en tres niveles: la <strong>política de seguridad</strong>, la <strong>norma de clasificación</strong> de la\n    información y la aplicabilidad de los <strong>controles ISO 27001</strong>. Los procesos de seguridad cubren la\n    clasificación y tratamiento del dato, el <strong>acceso</strong> y la <strong>anonimización</strong>, y se\n    apoyan en automatismos de la herramienta de gobierno siempre que es posible. La exploración técnica define una\n    estrategia de identificación de data sensible, aproximaciones de enmascarado, procedimiento de eliminado,\n    obligación de historificación y política de retención. En el caso de la restauración global, esto se materializó\n    como <em>seguridad por diseño</em>: control de acceso granular y anonimización de los datos sensibles desde el\n    origen, con la metadata de seguridad y privacidad gobernada en el catálogo.",
      "quiz": [
        {
          "q": "¿Por qué la clasificación de la información es el cimiento de la seguridad del dato?",
          "opciones": [
            "Porque cifra automáticamente todos los datos sin intervención.",
            "Porque sin saber qué sensibilidad tiene cada activo no se puede aplicar un control proporcionado.",
            "Porque elimina la necesidad de controlar el acceso.",
            "Porque convierte cualquier dato en anónimo de forma automática."
          ],
          "respuesta": 1,
          "explica": "La clasificación etiqueta cada activo por sensibilidad; de esa etiqueta se derivan los controles. Sin clasificar, no se sabe qué proteger ni cuánto, así que el control no puede ser proporcionado."
        },
        {
          "q": "¿Cuál es la diferencia clave entre cifrado y anonimización?",
          "opciones": [
            "La anonimización solo se usa en tránsito y el cifrado solo en reposo.",
            "Son exactamente lo mismo aplicado a distintos sistemas.",
            "El cifrado es reversible con la clave; la anonimización rompe el vínculo con la persona de forma irreversible.",
            "El cifrado elimina el dato y la anonimización lo duplica."
          ],
          "respuesta": 2,
          "explica": "El cifrado protege la confidencialidad pero es reversible para quien tiene la clave, así que no anonimiza. La anonimización rompe irreversiblemente el vínculo con la persona, dejando de ser dato personal."
        },
        {
          "q": "¿Qué expresa el principio de mínimo privilegio en el control de acceso?",
          "opciones": [
            "Que todos los usuarios deben tener acceso total para agilizar el trabajo.",
            "Que el acceso se concede una vez al año en bloque.",
            "Que el acceso depende únicamente de la antigüedad del empleado.",
            "Que cada rol accede solo al dato estrictamente necesario para su función."
          ],
          "respuesta": 3,
          "explica": "El mínimo privilegio limita cada rol a lo imprescindible; combinado con control granular (tabla, columna o fila) reduce la superficie de exposición del dato."
        },
        {
          "q": "Según el modelo de seguridad de Minsait, ¿qué tres componentes estructuran la seguridad y privacidad?",
          "opciones": [
            "Política de seguridad, norma de clasificación y aplicabilidad de los controles ISO 27001.",
            "Solo el cifrado de las copias de seguridad.",
            "Únicamente el control de acceso por contraseña.",
            "Backup diario, antivirus y firewall perimetral."
          ],
          "respuesta": 0,
          "explica": "Minsait estructura el modelo en política de seguridad, norma de clasificación de la información y aplicabilidad de los controles ISO 27001, apoyándose en automatismos de la herramienta de gobierno."
        },
        {
          "q": "¿Qué implica aplicar privacidad y seguridad por diseño?",
          "opciones": [
            "Añadir las medidas solo cuando ocurre un incidente.",
            "Incorporar los controles desde la arquitectura (minimizar dato, anonimizar en origen, embeber el acceso), no como parche posterior.",
            "Delegar toda la protección en el usuario final.",
            "Recoger el máximo dato posible para tenerlo disponible por si acaso."
          ],
          "respuesta": 1,
          "explica": "Por diseño significa integrar privacidad y seguridad desde el inicio: minimizar el dato, anonimizar desde el origen y embeber el control de acceso en los pipelines, como hizo Minsait con el control granular en el caso de restauración."
        }
      ]
    },
    {
      "id": "d14",
      "dia": 14,
      "bloque": "b2",
      "area": "Gestión documental",
      "icono": "📄",
      "estado": "full",
      "titulo": "Gestión documental y de contenidos",
      "tiempo": "45–60 min",
      "objetivos": [
        "Entender qué cubre el área DAMA de Document & Content Management.",
        "Gestionar el dato no estructurado y su ciclo de vida documental.",
        "Aplicar políticas de retención y disposición a documentos y contenidos."
      ],
      "secciones": [
        {
          "h": "1. El dato que no cabe en una tabla",
          "html": "<p>La mayoría del dato de una organización <strong>no es estructurado</strong>: contratos, correos,\n        informes, planos, fotos, vídeos, actas. El área DAMA de <strong>Document &amp; Content Management</strong>\n        (Gestión de Documentos y Contenidos) se ocupa de gobernar precisamente ese universo, que escapa a las bases\n        de datos relacionales.</p>\n        <p>El reto ejecutivo: ese contenido contiene información valiosa y obligaciones legales, pero suele vivir\n        disperso, sin clasificar y sin control de versiones, generando riesgo y reproceso.</p>"
        },
        {
          "h": "2. ECM: gestión de contenidos empresariales",
          "html": "<p>Un <strong>ECM</strong> (<em>Enterprise Content Management</em>) o gestor documental centraliza la\n        captura, almacenamiento, indexación, búsqueda y control de los documentos. Sus capacidades típicas:</p>\n        <ul>\n          <li><strong>Versionado</strong>: una única versión vigente y trazabilidad de cambios.</li>\n          <li><strong>Metadatos</strong>: etiquetas que hacen el contenido encontrable y clasificable.</li>\n          <li><strong>Control de acceso</strong>: quién puede leer, editar o aprobar cada documento.</li>\n          <li><strong>Workflow</strong>: circuitos de revisión y aprobación.</li>\n        </ul>\n        <p>El ECM convierte un repositorio caótico en un activo gobernado y auditable.</p>"
        },
        {
          "h": "3. El ciclo de vida documental",
          "html": "<p>Todo documento recorre un ciclo: <strong>creación → captura → clasificación → uso y distribución →\n        archivo → disposición</strong> (conservación o destrucción). Gobernar ese ciclo significa decidir, para cada\n        tipo de documento, cuánto tiempo se conserva y qué se hace con él al final.</p>\n        <p>Las técnicas de <em>records management</em> (gestión de registros) distinguen entre documentos operativos\n        y <strong>registros</strong> con valor probatorio o legal, que exigen controles más estrictos de integridad\n        y conservación.</p>"
        },
        {
          "h": "4. Retención y disposición",
          "html": "<p>La <strong>política de retención</strong> define cuánto tiempo debe conservarse cada tipo de\n        contenido antes de archivarlo o eliminarlo. No es solo orden: es cumplimiento. Conservar de más eleva el\n        coste y el riesgo (más superficie expuesta, más obligaciones); conservar de menos puede incumplir la ley.</p>\n        <p>La retención del dato no estructurado se cruza con la privacidad: el <strong>derecho al olvido</strong>\n        también alcanza a documentos y correos, no solo a registros de base de datos.</p>"
        },
        {
          "h": "5. Conexión con el resto del gobierno",
          "html": "<p>La gestión documental no es una isla. Comparte con las demás áreas DAMA los mismos cimientos:\n        <strong>metadatos</strong> (para encontrar y clasificar), <strong>seguridad</strong> (clasificación y acceso)\n        y <strong>calidad</strong> (contenido fiable y actualizado).</p>\n        <p>En arquitecturas modernas, los documentos se ingieren como <strong>datos no estructurados</strong> en el\n        lago y se enriquecen con metadatos para hacerlos analizables —cada vez más, con IA generativa que extrae\n        información de su contenido.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Dato no estructurado",
          "d": "Información sin esquema fijo (documentos, correos, imágenes, vídeo) que no encaja en tablas relacionales."
        },
        {
          "t": "ECM (Enterprise Content Management)",
          "d": "Sistema que centraliza captura, almacenamiento, indexación, búsqueda y control de documentos y contenidos."
        },
        {
          "t": "Ciclo de vida documental",
          "d": "Recorrido de un documento desde su creación hasta su disposición final (archivo o destrucción)."
        },
        {
          "t": "Records management",
          "d": "Gestión de registros con valor probatorio o legal, sujetos a controles estrictos de integridad y conservación."
        },
        {
          "t": "Política de retención",
          "d": "Regla que define cuánto tiempo se conserva cada tipo de contenido antes de archivarlo o eliminarlo."
        },
        {
          "t": "Disposición",
          "d": "Decisión final sobre un documento al término de su retención: conservarlo permanentemente o destruirlo de forma controlada."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> Dentro de los componentes del modelo de gobierno, Minsait contempla el\n    análisis de la necesidad de un nuevo <strong>Gestor Documental</strong> como entregable, junto al sistema de\n    ticketing y las auditorías e informes. En su <strong>arquitectura DaaS</strong> de referencia, las fuentes de\n    datos incluyen explícitamente <strong>datos no estructurados</strong> además de los estructurados, que se ingestan\n    y enriquecen en las capas del lago. La gestión documental se apoya en los mismos cimientos transversales del\n    modelo —metadata de negocio, técnica y de seguridad— y se integra con la política de retención e historificación\n    definida en la exploración técnica del dato sensible.",
      "quiz": [
        {
          "q": "¿Qué tipo de información gobierna principalmente el área DAMA de Document & Content Management?",
          "opciones": [
            "Solo tablas relacionales con claves primarias.",
            "Únicamente métricas numéricas de cuadros de mando.",
            "El dato no estructurado: documentos, correos, imágenes, vídeo y contenidos sin esquema fijo.",
            "Exclusivamente los logs técnicos de los servidores."
          ],
          "respuesta": 2,
          "explica": "Esta área se ocupa del dato no estructurado, que constituye la mayor parte de la información organizacional y escapa a las bases de datos relacionales."
        },
        {
          "q": "¿Cuál NO es una capacidad típica de un ECM (gestor documental)?",
          "opciones": [
            "Versionado de documentos.",
            "Control de acceso por rol.",
            "Workflows de revisión y aprobación.",
            "Entrenar modelos de regresión sobre series temporales financieras."
          ],
          "respuesta": 3,
          "explica": "Un ECM centraliza captura, versionado, metadatos, control de acceso y workflows documentales; el entrenamiento de modelos predictivos pertenece al dominio de analítica/ML, no a la gestión de contenidos."
        },
        {
          "q": "¿Por qué importa una política de retención para los documentos?",
          "opciones": [
            "Porque conservar de más eleva coste y riesgo, y conservar de menos puede incumplir la ley.",
            "Porque obliga a borrar todos los documentos cada mes sin excepción.",
            "Porque sustituye por completo al control de acceso.",
            "Porque hace innecesarios los metadatos."
          ],
          "respuesta": 0,
          "explica": "La retención equilibra cumplimiento y riesgo: define cuánto conservar cada tipo de contenido; conservar de más aumenta coste y exposición, conservar de menos puede vulnerar obligaciones legales."
        },
        {
          "q": "¿Qué distingue a un registro (record) de un documento operativo cualquiera?",
          "opciones": [
            "Que el registro siempre ocupa menos espacio en disco.",
            "Que el registro tiene valor probatorio o legal y exige controles más estrictos de integridad y conservación.",
            "Que el documento operativo nunca puede archivarse.",
            "Que el registro no necesita metadatos."
          ],
          "respuesta": 1,
          "explica": "El records management trata los registros con valor probatorio o legal con controles reforzados de integridad y conservación, frente a los documentos meramente operativos."
        },
        {
          "q": "En la arquitectura DaaS de referencia de Minsait, ¿cómo se tratan los datos no estructurados?",
          "opciones": [
            "Se descartan por no encajar en tablas.",
            "Se almacenan solo en papel fuera del sistema.",
            "Se incluyen como fuentes de datos que se ingestan y enriquecen en las capas del lago.",
            "Se gestionan al margen, sin relación con el gobierno del dato."
          ],
          "respuesta": 2,
          "explica": "La arquitectura DaaS de Minsait contempla explícitamente datos no estructurados junto a los estructurados como fuentes que se ingestan y enriquecen, integrándolos en el gobierno del dato."
        }
      ]
    },
    {
      "id": "d15",
      "dia": 15,
      "bloque": "b2",
      "area": "Regulatorio",
      "icono": "⚖️",
      "estado": "full",
      "titulo": "Marco regulatorio y cumplimiento (GDPR, BCBS 239, Ley 29733)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Mapear las principales regulaciones del dato y a quién aplican.",
        "Situar el marco peruano: Ley N.º 29733, su reglamento y la ANPD.",
        "Diseñar cumplimiento por diseño con trazabilidad y auditorías automáticas."
      ],
      "secciones": [
        {
          "h": "1. Por qué el cumplimiento es parte del gobierno",
          "html": "<p>El gobierno del dato no solo busca calidad y valor: también <strong>protege a la organización del\n        riesgo regulatorio</strong>. Tratar mal el dato personal o financiero acarrea multas, sanciones y daño\n        reputacional. Por eso el <strong>cumplimiento normativo</strong> es un componente explícito del modelo de\n        gobierno, no un anexo legal aislado.</p>\n        <p>La idea ejecutiva: convertir la obligación en <strong>control embebido</strong>, de modo que cumplir sea\n        consecuencia natural de cómo se diseñó la plataforma.</p>"
        },
        {
          "h": "2. El mapa regulatorio global",
          "html": "<p>Las principales referencias internacionales:</p>\n        <table class=\"cmp\"><thead><tr><th>Norma</th><th>Ámbito</th><th>Foco</th></tr></thead>\n        <tbody>\n        <tr><td><strong>GDPR</strong></td><td>UE (datos personales)</td><td>Derechos del ciudadano: consentimiento, olvido, portabilidad; multas severas.</td></tr>\n        <tr><td><strong>CCPA</strong></td><td>California, EE. UU.</td><td>Privacidad del consumidor: transparencia y derecho de exclusión.</td></tr>\n        <tr><td><strong>BCBS 239</strong></td><td>Banca (Comité de Basilea)</td><td>Agregación de datos de riesgo y reporting: exactitud, integridad, trazabilidad.</td></tr>\n        <tr><td><strong>ISO (8000, 27001, 38505)</strong></td><td>Internacional</td><td>Calidad, seguridad y gobierno del dato como estándares de buenas prácticas.</td></tr>\n        </tbody></table>\n        <p>El GDPR marcó el estándar de facto mundial: muchas leyes posteriores, incluida la peruana, se inspiran\n        en él.</p>"
        },
        {
          "h": "3. Foco Perú: Ley N.º 29733",
          "html": "<p>En Perú, la <strong>Ley N.º 29733 de Protección de Datos Personales</strong> y su reglamento\n        regulan el tratamiento de datos personales. Sus pilares: <strong>consentimiento</strong> informado del\n        titular, principios de finalidad y proporcionalidad, derechos <em>ARCO</em> (acceso, rectificación,\n        cancelación y oposición) y obligaciones de seguridad sobre los bancos de datos.</p>\n        <p>La autoridad de control es la <strong>ANPD</strong> (Autoridad Nacional de Protección de Datos Personales),\n        que registra bancos de datos, fiscaliza y sanciona. Toda organización que trate datos de personas en Perú\n        está bajo su alcance.</p>"
        },
        {
          "h": "4. Cumplimiento por diseño",
          "html": "<p>El cumplimiento reactivo —demostrarlo solo cuando llega una auditoría— es caro y frágil. El enfoque\n        maduro es <strong>cumplimiento por diseño</strong>: las reglas regulatorias se codifican en la arquitectura\n        del dato, de forma que cada pipeline las aplica automáticamente.</p>\n        <p>Tres habilitadores son clave:</p>\n        <ul>\n          <li><strong>Trazabilidad / linaje</strong>: saber de dónde viene cada dato y por dónde ha pasado.</li>\n          <li><strong>Clasificación</strong>: identificar el dato sensible para aplicarle el tratamiento correcto.</li>\n          <li><strong>Auditorías automáticas</strong>: evidencia de cumplimiento generada por el propio sistema.</li>\n        </ul>"
        },
        {
          "h": "5. Del riesgo a la ventaja",
          "html": "<p>Bien hecho, el cumplimiento deja de ser un freno y se vuelve <strong>habilitador</strong>: una\n        plataforma con trazabilidad total y control de acceso granular puede abrir el dato a más usuarios y a la IA\n        <em>con confianza</em>, porque la gobernanza ya garantiza que el uso es legítimo.</p>\n        <p>El cumplimiento por diseño es, en el fondo, la misma idea que la privacidad por diseño del módulo anterior,\n        elevada a todo el marco regulatorio que aplica al negocio.</p>"
        }
      ],
      "terminos": [
        {
          "t": "GDPR",
          "d": "Reglamento europeo de protección de datos personales; estándar de facto mundial en derechos del ciudadano sobre sus datos."
        },
        {
          "t": "BCBS 239",
          "d": "Principios del Comité de Basilea para la agregación de datos de riesgo y el reporting en banca: exactitud, integridad y trazabilidad."
        },
        {
          "t": "Ley N.º 29733",
          "d": "Ley peruana de Protección de Datos Personales que regula consentimiento, derechos ARCO y seguridad de los bancos de datos."
        },
        {
          "t": "ANPD",
          "d": "Autoridad Nacional de Protección de Datos Personales del Perú; registra bancos de datos, fiscaliza y sanciona."
        },
        {
          "t": "Cumplimiento por diseño",
          "d": "Codificar las reglas regulatorias en la arquitectura para que cada pipeline las aplique automáticamente."
        },
        {
          "t": "Trazabilidad / linaje",
          "d": "Capacidad de reconstruir el origen y el recorrido de cada dato, base de la evidencia ante auditorías."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> El <strong>cumplimiento normativo</strong> figura como componente\n    explícito del modelo de gobierno de Minsait, junto al linaje del dato, las auditorías e informes y el análisis\n    forense. La metodología obliga a considerar las regulaciones aplicables al modelo de negocio y marcos como ISO\n    27001 al definir los procesos de seguridad. El caso de la empresa de restauración global lo ilustra: se logró\n    <strong>cumplimiento normativo por diseño</strong>, asegurando la trazabilidad y protección del 100% de los\n    datos sensibles y <strong>automatizando las auditorías de privacidad (GDPR)</strong>. La metadata de seguridad y\n    privacidad gobernada en el catálogo y el control de acceso granular son los habilitadores que hacen del\n    cumplimiento un resultado del diseño, no un esfuerzo posterior.",
      "quiz": [
        {
          "q": "¿Cuál es el foco principal de BCBS 239?",
          "opciones": [
            "La protección de datos personales del consumidor en California.",
            "El cifrado de las copias de seguridad en la nube.",
            "La gestión de contenidos no estructurados en un ECM.",
            "La agregación de datos de riesgo y el reporting en banca, con exactitud, integridad y trazabilidad."
          ],
          "respuesta": 3,
          "explica": "BCBS 239 son los principios del Comité de Basilea sobre agregación de datos de riesgo y capacidad de reporting en banca; exigen exactitud, integridad y trazabilidad del dato de riesgo."
        },
        {
          "q": "En Perú, ¿qué organismo es la autoridad de control en protección de datos personales?",
          "opciones": [
            "La ANPD (Autoridad Nacional de Protección de Datos Personales).",
            "La Comisión Europea.",
            "El Comité de Basilea.",
            "La autoridad de California (CCPA)."
          ],
          "respuesta": 0,
          "explica": "La ANPD es la Autoridad Nacional de Protección de Datos Personales del Perú; registra bancos de datos, fiscaliza el cumplimiento de la Ley N.º 29733 y aplica sanciones."
        },
        {
          "q": "¿Qué caracteriza al cumplimiento por diseño frente al cumplimiento reactivo?",
          "opciones": [
            "Que solo se demuestra cuando llega una auditoría externa.",
            "Que codifica las reglas regulatorias en la arquitectura para que cada pipeline las aplique automáticamente.",
            "Que recoge el máximo dato posible sin reglas.",
            "Que delega toda la responsabilidad en el área legal al final del proyecto."
          ],
          "respuesta": 1,
          "explica": "El cumplimiento por diseño embebe las reglas en la plataforma (trazabilidad, clasificación, auditorías automáticas), de modo que cumplir es consecuencia del diseño y no un esfuerzo posterior y frágil."
        },
        {
          "q": "¿Qué logró el caso de la empresa de restauración global de Minsait en materia regulatoria?",
          "opciones": [
            "Prescindir del control de acceso para acelerar la analítica.",
            "Eliminar toda la regulación aplicable al negocio.",
            "Cumplimiento por diseño con trazabilidad y protección del 100% de los datos sensibles y auditorías de privacidad GDPR automatizadas.",
            "Conservar indefinidamente todos los datos sin política de retención."
          ],
          "respuesta": 2,
          "explica": "El caso reporta cumplimiento normativo por diseño: trazabilidad y protección del 100% de los datos sensibles y automatización de las auditorías de privacidad (GDPR), apoyado en control de acceso granular."
        },
        {
          "q": "¿Por qué un buen cumplimiento puede convertirse en habilitador y no solo en freno?",
          "opciones": [
            "Porque permite ignorar a las autoridades de control.",
            "Porque sustituye la calidad del dato por documentación legal.",
            "Porque reduce a cero la necesidad de clasificar el dato.",
            "Porque una plataforma con trazabilidad y acceso granular puede abrir el dato a más usuarios y a la IA con confianza."
          ],
          "respuesta": 3,
          "explica": "Cuando la gobernanza garantiza que el uso es legítimo (trazabilidad total, control granular), el dato puede abrirse con confianza a más usuarios y a la IA; el cumplimiento pasa de freno a acelerador."
        }
      ]
    },
    {
      "id": "d16",
      "dia": 16,
      "bloque": "b3",
      "area": "Madurez del dato",
      "icono": "📈",
      "estado": "full",
      "titulo": "Modelo de madurez del dato y assessment (método Minsait · caso Alpayana)",
      "tiempo": "50–60 min",
      "objetivos": [
        "Entender por qué y cómo se mide la madurez del dato.",
        "Conocer la escala de 6 niveles y las áreas que evalúa Minsait.",
        "Aplicar la lectura al caso real de Alpayana (minería)."
      ],
      "secciones": [
        {
          "h": "1. Por qué medir madurez",
          "html": "<p>No se puede priorizar lo que no se mide. El <strong>assessment de madurez</strong> establece la\n          <strong>línea base</strong> (estado actual / AS IS), define el <strong>estado futuro deseado</strong> (TO-BE),\n          identifica <strong>brechas</strong> y permite construir un <strong>roadmap</strong> realista. Es la primera\n          fase de la metodología de Minsait y produce el caso de valor.</p>"
        },
        {
          "h": "2. La escala de 6 niveles y las áreas evaluadas",
          "html": "<p>La herramienta de diagnóstico de Minsait sitúa cada práctica en uno de <strong>6 niveles</strong>:</p>\n          <ol>\n            <li><strong>Inexistente</strong>: ningún signo de implementación.</li>\n            <li><strong>Inicial / ad-hoc</strong>: la práctica se aplica de forma inconsistente.</li>\n            <li><strong>Repetible</strong>: está definido cómo aplicarla y hay evidencia de su aplicación.</li>\n            <li><strong>Definido</strong>: la práctica está definida e implementada íntegramente.</li>\n            <li><strong>Gestionado</strong>: existen métricas y se revisa/audita su aplicación.</li>\n            <li><strong>Optimizado</strong>: mejora continua y alto nivel de automatización.</li>\n          </ol>\n          <p>El análisis se realiza por las <strong>áreas funcionales de DAMA</strong> (calidad, metadatos, seguridad,\n          arquitectura, etc.), <strong>comenzando por el gobierno del dato</strong> como área central. La herramienta\n          combina DAMA con modelos de referencia (Stanford, IBM, CMMI) y el estudio <em>Ascendant</em>.</p>"
        },
        {
          "h": "3. El caso Alpayana (minería · MBC, 2026)",
          "html": "<p>El <em>Assessment de Madurez del Dato</em> de <strong>Alpayana</strong> (Minsait Business Consulting)\n          ilustra el método en el sector minero. Hallazgos del entendimiento de la situación:</p>\n          <ul>\n            <li><strong>Desconexión IT–OT</strong> y <strong>silos</strong> entre Excel, SAP, LIMS, Canary, Fusion, Ventsim.</li>\n            <li><strong>Gobierno \"en papel\"</strong> sin adopción operativa y <strong>deuda técnica no cuantificada</strong>.</li>\n            <li><strong>Brecha de data literacy</strong>, KPIs sin definición única y resistencia al cambio.</li>\n          </ul>\n          <p>Objetivos planteados: un <strong>\"Gobierno Mínimo Viable\" operativo</strong> (roles, data owners y\n          estándares básicos), confirmar la <strong>viabilidad de los casos de uso</strong> antes de invertir, y un\n          <strong>roadmap técnico y financiero</strong> que escale del piloto al resto de operaciones. <em>(Nota: el\n          assessment estaba en curso; aquí estudiamos el método y el diagnóstico cualitativo, no puntajes finales.)</em></p>"
        }
      ],
      "terminos": [
        {
          "t": "Modelo de madurez",
          "d": "Escala que sitúa cada práctica en un nivel para definir su ruta de mejora."
        },
        {
          "t": "AS IS / TO-BE",
          "d": "Estado actual de madurez vs estado futuro deseado; su diferencia son las brechas."
        },
        {
          "t": "Niveles de madurez (Minsait)",
          "d": "Inexistente · Inicial/ad-hoc · Repetible · Definido · Gestionado · Optimizado."
        },
        {
          "t": "Estudio Ascendant",
          "d": "Estudio de madurez digital de Minsait usado como benchmark de buenas prácticas."
        },
        {
          "t": "Gobierno Mínimo Viable",
          "d": "Conjunto básico de roles, owners y estándares para empezar a gobernar (caso Alpayana)."
        },
        {
          "t": "Data literacy",
          "d": "Alfabetización en datos: capacidad de leer, interpretar y usar datos para decidir."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el assessment evalúa por <em>áreas funcionales DAMA</em> (con el gobierno\n      como eje central) en una escala de <strong>6 niveles</strong>, combinando DAMA + modelos de referencia\n      (Stanford, IBM, CMMI) + el estudio <em>Ascendant</em>. Entrega un <em>informe de madurez (AS IS)</em>, el\n      <em>modelo TO-BE</em> de alto nivel, las brechas y un <em>boceto de roadmap</em>, que alimentan la siguiente fase.",
      "quiz": [
        {
          "q": "¿Para qué sirve un assessment de madurez del dato?",
          "opciones": [
            "Para comprar herramientas",
            "Para fijar el AS IS, definir el TO-BE, identificar brechas y priorizar el roadmap",
            "Para despedir personal",
            "Para reemplazar la estrategia"
          ],
          "respuesta": 1,
          "explica": "Mide el estado actual, define el deseado, halla brechas y permite construir el roadmap."
        },
        {
          "q": "¿Cuántos niveles tiene la escala de madurez de Minsait?",
          "opciones": [
            "3",
            "5",
            "6",
            "10"
          ],
          "respuesta": 2,
          "explica": "Seis: Inexistente, Inicial/ad-hoc, Repetible, Definido, Gestionado y Optimizado."
        },
        {
          "q": "¿Por qué área comienza el análisis de madurez de Minsait?",
          "opciones": [
            "Por la calidad de datos",
            "Por la infraestructura de red",
            "Por la analítica avanzada",
            "Por el gobierno del dato, como área central de balance y sinergia"
          ],
          "respuesta": 3,
          "explica": "Se analiza por áreas funcionales DAMA, empezando por el gobierno como eje central."
        },
        {
          "q": "En Alpayana, 'gobierno en papel' y 'deuda técnica no cuantificada' son ejemplos de…",
          "opciones": [
            "Retos del diagnóstico de la situación",
            "Fortalezas del programa",
            "Herramientas tecnológicas",
            "Roles de gobierno"
          ],
          "respuesta": 0,
          "explica": "Son hallazgos/retos del entendimiento de la situación que el assessment busca abordar."
        },
        {
          "q": "El nivel 'Optimizado' de la escala se caracteriza por…",
          "opciones": [
            "Ningún signo de implementación",
            "Mejora continua y alto nivel de automatización",
            "Aplicación inconsistente",
            "Solo documentación"
          ],
          "respuesta": 1,
          "explica": "Optimizado = procesos de mejora continua y automatización; el nivel más alto."
        }
      ]
    },
    {
      "id": "d17",
      "dia": 17,
      "bloque": "b3",
      "area": "Assessment aplicado",
      "icono": "🔎",
      "estado": "full",
      "titulo": "Cómo conducir un assessment de principio a fin (entrevistas, workshops, evidencias)",
      "tiempo": "50–65 min",
      "objetivos": [
        "Planificar y ejecutar un assessment de madurez: entrevistas, workshops y recolección de evidencias.",
        "Combinar la exploración TOP-DOWN (encuestas/entrevistas) con la BOTTOM-UP (escaneo/perfilado).",
        "Construir un AS-IS riguroso, fijar el TO-BE y priorizar brechas por impacto vs esfuerzo."
      ],
      "secciones": [
        {
          "h": "1. Qué es un assessment y por qué se hace primero",
          "html": "<p>Un <strong>assessment de madurez del dato</strong> es la fotografía honesta del punto de partida:\n        cuán bien (o mal) gobierna y gestiona sus datos una organización <em>hoy</em>. Es la primera fase de cualquier\n        programa serio porque sin un diagnóstico no se puede priorizar ni justificar la inversión.</p>\n        <p>El error clásico del consultor junior es saltar directamente al diseño del modelo. El senior sabe que\n        un buen diagnóstico <strong>vende el proyecto solo</strong>: cuando el cliente ve sus propios puntos de dolor\n        ordenados y cuantificados, la conversación pasa de <em>si</em> hacer gobierno a <em>cómo</em> hacerlo.</p>"
        },
        {
          "h": "2. Las fuentes de evidencia: documentación, entrevistas y workshops",
          "html": "<p>La evidencia se triangula desde tres fuentes complementarias:</p>\n        <ul>\n          <li><strong>Revisión documental</strong>: políticas y procedimientos vigentes, organigrama, planificación\n          estratégica del dato, contexto regulatorio y mapa del entorno tecnológico. Es el entendimiento inicial\n          que se solicita al arrancar.</li>\n          <li><strong>Entrevistas a stakeholders</strong> a distintos niveles: <strong>estratégico</strong>\n          (CIO, CDO) para visión y esponsorización, y <strong>táctico</strong> (gerentes, subgerentes de producción)\n          para la operativa real.</li>\n          <li><strong>Workshops con áreas de negocio</strong> (comercial, finanzas, RR.HH., operaciones) con las\n          personas que consumen y explotan el dato, para identificar necesidades y orientación futura.</li>\n        </ul>\n        <p>Las entrevistas confirman y completan el entendimiento documental; los workshops añaden la voz del\n        consumidor del dato, que suele revelar los puntos de dolor más caros.</p>"
        },
        {
          "h": "3. Exploración tecnológica: TOP-DOWN y BOTTOM-UP",
          "html": "<p>Entender el dato no es solo preguntar; también hay que mirar los sistemas. Minsait usa un método\n        de recopilación combinado:</p>\n        <table class=\"cmp\"><thead><tr><th>Enfoque</th><th>Cómo</th><th>Qué revela</th></tr></thead>\n        <tbody>\n        <tr><td><strong>TOP-DOWN</strong></td><td>Encuestas y entrevistas ligeras</td><td>Sistemas y dependencias declaradas, prioridades de negocio, orientación futura</td></tr>\n        <tr><td><strong>BOTTOM-UP</strong></td><td>Herramientas de escaneo y perfilado del dato</td><td>Modelos de datos reales, dónde se registra la metadata, data sensible, ordenación efectiva</td></tr>\n        </tbody></table>\n        <p>El TOP-DOWN dice lo que la gente <em>cree</em> que tiene; el BOTTOM-UP revela lo que <em>realmente</em>\n        hay. La brecha entre ambos suele ser, por sí misma, un hallazgo valioso.</p>"
        },
        {
          "h": "4. De los hallazgos a la matriz de brechas (AS-IS vs TO-BE)",
          "html": "<p>El diagnóstico se materializa midiendo el <strong>nivel de madurez actual (AS-IS)</strong> y\n        consensuando con el cliente el <strong>nivel objetivo (TO-BE)</strong>. La diferencia entre ambos es la\n        <strong>brecha</strong>. No todas las brechas valen lo mismo: se priorizan en una matriz de\n        <strong>impacto en el negocio vs esfuerzo de implementación</strong>.</p>\n        <ul>\n          <li><strong>Quick wins</strong>: alto impacto, bajo esfuerzo. Se atacan primero para generar tracción.</li>\n          <li><strong>Iniciativas estratégicas</strong>: alto impacto, alto esfuerzo. Van al roadmap de medio plazo.</li>\n          <li>Lo de bajo impacto se difiere o se descarta.</li>\n        </ul>\n        <p>Un <strong>benchmark</strong> con organizaciones comparables aporta el contraste externo que convierte\n        un número de madurez en una historia accionable.</p>"
        },
        {
          "h": "5. Cómo lo ordena Minsait en Alpayana: 4 fases",
          "html": "<p>En el assessment de Alpayana el ejercicio se estructura en cuatro fases metodológicas\n        encadenadas, todas ancladas a DAMA-DMBOK:</p>\n        <ol>\n          <li><strong>Diagnóstico estratégico AS-IS</strong>: evaluación del modelo actual mediante entrevistas,\n          encuestas y revisión documental; alineamiento dato–negocio.</li>\n          <li><strong>Nivel de madurez objetivo (TO-BE)</strong>: definición del estado deseado y de las capacidades\n          organizacionales necesarias.</li>\n          <li><strong>Detección y evaluación de gaps</strong>: análisis AS-IS vs TO-BE con benchmark, evaluación de\n          impacto y criticidad, y priorización por impacto vs esfuerzo.</li>\n          <li><strong>Recomendaciones y plan de trabajo</strong>: roadmap con quick wins y líneas de acción de\n          corto, medio y largo plazo.</li>\n        </ol>"
        }
      ],
      "terminos": [
        {
          "t": "AS-IS",
          "d": "Fotografía del estado actual de madurez y prácticas de gestión del dato en la organización."
        },
        {
          "t": "TO-BE",
          "d": "Nivel de madurez objetivo, consensuado con el cliente y alineado a la estrategia del negocio."
        },
        {
          "t": "Exploración TOP-DOWN",
          "d": "Recopilación vía encuestas y entrevistas ligeras de sistemas, dependencias y prioridades declaradas."
        },
        {
          "t": "Exploración BOTTOM-UP",
          "d": "Escaneo y perfilado del dato con herramientas para descubrir los modelos y la metadata reales."
        },
        {
          "t": "Matriz de brechas",
          "d": "Priorización de gaps AS-IS vs TO-BE en función de impacto en negocio y esfuerzo."
        },
        {
          "t": "Quick win",
          "d": "Iniciativa de alto impacto y bajo esfuerzo que se ejecuta primero para generar tracción."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en la metodología de implantación, la fase <em>Evaluación inicial y\n    diagnóstico de madurez</em> combina entrevistas a stakeholders (CIO/CDO estratégico, gerentes táctico), workshops\n    con áreas de negocio y exploración tecnológica <em>TOP-DOWN</em> (encuestas/entrevistas) y <em>BOTTOM-UP</em>\n    (escaneo y perfilado del dato), para identificar puntos de dolor y construir el AS-IS frente al TO-BE. En el\n    assessment de Alpayana esto se ordena en cuatro fases: diagnóstico AS-IS, nivel de madurez objetivo, detección y\n    evaluación de gaps (con <em>benchmark</em>) y recomendaciones/plan de trabajo con <em>quick wins</em> priorizados\n    por impacto y esfuerzo.",
      "quiz": [
        {
          "q": "¿Cuál es la diferencia esencial entre la exploración TOP-DOWN y la BOTTOM-UP?",
          "opciones": [
            "TOP-DOWN recopila lo declarado vía encuestas/entrevistas; BOTTOM-UP descubre los modelos reales por escaneo y perfilado",
            "TOP-DOWN usa escaneo automático del dato y BOTTOM-UP usa entrevistas",
            "Son sinónimos; solo cambia el nombre según el cliente",
            "TOP-DOWN solo aplica a negocio y BOTTOM-UP solo a finanzas"
          ],
          "respuesta": 0,
          "explica": "El TOP-DOWN se apoya en encuestas y entrevistas ligeras (lo que la organización cree que tiene); el BOTTOM-UP usa herramientas de escaneo y perfilado para revelar los modelos de datos y la metadata reales."
        },
        {
          "q": "En la priorización de brechas, ¿qué caracteriza a un quick win?",
          "opciones": [
            "Bajo impacto pero obligatorio por regulación",
            "Alto impacto en negocio y bajo esfuerzo de implementación",
            "Alto esfuerzo y largo plazo",
            "Cualquier brecha técnica detectada en el escaneo"
          ],
          "respuesta": 1,
          "explica": "Los quick wins combinan alto impacto y bajo esfuerzo; se atacan primero para demostrar valor rápido y generar tracción en el programa."
        },
        {
          "q": "Según la metodología, ¿a qué niveles se entrevista a los stakeholders en el diagnóstico?",
          "opciones": [
            "Solo al equipo técnico de TI",
            "Solo a usuarios finales del reporting",
            "Estratégico (CIO, CDO) y táctico (gerentes, subgerentes de producción)",
            "Únicamente a proveedores externos de herramientas"
          ],
          "respuesta": 2,
          "explica": "Se entrevista a distintos niveles: estratégico (CIO, CDO) para visión y esponsorización, y táctico (gerentes/subgerentes) para la operativa real; además se hacen workshops con las áreas de negocio."
        },
        {
          "q": "¿Cuál es el orden correcto de las cuatro fases del assessment de Alpayana?",
          "opciones": [
            "Recomendaciones → diagnóstico AS-IS → gaps → nivel objetivo",
            "Gaps → AS-IS → plan de trabajo → nivel objetivo",
            "Nivel objetivo → recomendaciones → AS-IS → gaps",
            "Diagnóstico AS-IS → nivel de madurez objetivo → detección/evaluación de gaps → recomendaciones y plan de trabajo"
          ],
          "respuesta": 3,
          "explica": "La secuencia es: diagnóstico estratégico AS-IS, definición del nivel de madurez objetivo (TO-BE), detección y evaluación de gaps (con benchmark) y, por último, recomendaciones y plan de trabajo con quick wins."
        },
        {
          "q": "¿Por qué se realiza un benchmark dentro del assessment?",
          "opciones": [
            "Para aportar un contraste externo que convierte un número de madurez en una historia accionable",
            "Porque lo exige la norma ISO 27001",
            "Únicamente para fijar el presupuesto del proyecto",
            "Para sustituir el AS-IS por datos de otras empresas"
          ],
          "respuesta": 0,
          "explica": "El benchmark compara la madurez de la organización con organizaciones similares; ese contraste externo da contexto al puntaje y ayuda a justificar y priorizar las recomendaciones."
        }
      ]
    },
    {
      "id": "d18",
      "dia": 18,
      "bloque": "b3",
      "area": "Plataforma",
      "icono": "🏗️",
      "estado": "full",
      "titulo": "Plataforma de datos: gobierno y modelo de desarrollo (Fabric, Mesh, Lakehouse)",
      "tiempo": "50–65 min",
      "objetivos": [
        "Distinguir las dos grandes líneas de trabajo de una plataforma: su gobierno y su modelo de desarrollo.",
        "Entender los componentes del modelo de gobierno y del modelo de desarrollo según Minsait.",
        "Comparar Data Fabric, Data Mesh y Lakehouse, y reconocer los riesgos comunes a evitar."
      ],
      "secciones": [
        {
          "h": "1. La plataforma como activo (no como proyecto técnico)",
          "html": "<p>Una <strong>plataforma de datos</strong> transversal debe habilitar a toda la organización a\n        evolucionar el uso del dato: dar servicio a múltiples áreas, con casos de uso de distinta naturaleza\n        (reporting, descubrimiento, analítica avanzada, IA) y un número creciente de usuarios.</p>\n        <p>La clave del enfoque consultor es no tratarla como un despliegue tecnológico puntual, sino como un\n        <strong>activo que se gobierna</strong>. Para que la plataforma realmente aporte valor, Minsait establece\n        <strong>dos grandes líneas de trabajo</strong>: el <em>modelo de gobierno de la plataforma</em> y el\n        <em>modelo de desarrollo</em>.</p>"
        },
        {
          "h": "2. El modelo de gobierno de la plataforma",
          "html": "<p>Define la entidad o unidad que gestiona las peticiones, vela por el cumplimiento de las\n        directrices y crea el modelo de relación entre los interesados. Sus componentes:</p>\n        <ul>\n          <li><strong>Modelo de servicio</strong>: qué se ofrece desde la gestión de la plataforma (soporte,\n          centro de excelencia, capacidades expertas) y cómo se delimita la responsabilidad de cada implicado.</li>\n          <li><strong>Modelo de relación con terceros</strong>: cómo se relacionan las entidades y proveedores del\n          ecosistema; comités de aprobación y priorización.</li>\n          <li><strong>Gestión de la demanda</strong>: el circuito de petición, priorización, diseño, desarrollo,\n          puesta en producción y mantenimiento de casos de uso.</li>\n          <li><strong>Divulgación y cultura</strong>: acompañamiento a usuarios, divulgación de casos de éxito y\n          fomento de la cultura del dato.</li>\n        </ul>"
        },
        {
          "h": "3. El modelo de desarrollo (plataforma multiproveedor)",
          "html": "<p>Al ser una plataforma multipropósito y normalmente <strong>multiproveedor</strong>, hace falta un\n        marco de desarrollo claro que permita la concurrencia de equipos y usuarios sin caos. Sus aspectos clave:</p>\n        <ul>\n          <li><strong>Modelo de desarrollo</strong>: qué equipos pueden desarrollar, bajo qué directrices y con qué\n          nivel de supervisión o autonomía; manuales de operación auditables.</li>\n          <li><strong>Validación de los casos de uso</strong>: control previo a producción que asegura mínimos de\n          calidad y gobierno a lo largo de todo el ciclo de vida.</li>\n          <li><strong>Seguridad de los datos</strong>: gestión de permisos y aplicación de políticas para las\n          distintas formas de acceso (informes, directo, modelos, API) sin sobreesfuerzo.</li>\n          <li><strong>Gobierno del dato mínimo</strong>: ordenación y nomenclatura, tratamiento de datos de\n          referencia, glosario y calidad mínima exigibles.</li>\n        </ul>"
        },
        {
          "h": "4. Tres arquitecturas de referencia: Fabric, Mesh y Lakehouse",
          "html": "<p>El gobierno se apoya en una arquitectura. Conviene distinguir tres paradigmas que hoy conviven:</p>\n        <table class=\"cmp\"><thead><tr><th>Paradigma</th><th>Idea central</th><th>Gobierno</th></tr></thead>\n        <tbody>\n        <tr><td><strong>Data Fabric</strong></td><td>Capa de integración inteligente sobre fuentes dispersas, guiada por metadatos activos</td><td>Centralizado y automatizado vía metadatos</td></tr>\n        <tr><td><strong>Data Mesh</strong></td><td>El dato como producto, propiedad descentralizada por dominio de negocio</td><td>Federado: gobierno computacional + autonomía por dominio</td></tr>\n        <tr><td><strong>Lakehouse</strong></td><td>Un solo repositorio que une el lago (flexibilidad) y el warehouse (rigor), p. ej. capas bronce/silver/gold</td><td>Sobre el almacenamiento unificado y las capas curadas</td></tr>\n        </tbody></table>\n        <p>No son excluyentes: una organización puede tener un <em>Lakehouse</em> como base física, exponer\n        <em>productos de datos</em> al estilo <em>Mesh</em> por dominio y unificar el descubrimiento con un enfoque\n        <em>Fabric</em> de metadatos.</p>"
        },
        {
          "h": "5. Riesgos comunes a evitar",
          "html": "<p>Muchas plataformas analíticas fracasan no por la tecnología sino por la falta de gobierno. Los\n        riesgos recurrentes a anticipar:</p>\n        <ul>\n          <li><strong>Falta de roles y funciones</strong> bien definidas para gestionar la plataforma.</li>\n          <li><strong>Sin circuito claro de petición</strong> de nuevos casos de uso ni criterio de priorización.</li>\n          <li><strong>Sin directrices de desarrollo</strong> que faciliten incorporar distintos proveedores.</li>\n          <li><strong>Falta de modelo operativo</strong>, que genera <strong>cuellos de botella</strong>.</li>\n          <li><strong>Políticas de seguridad heterogéneas</strong> y poco conocimiento de lo ya existente, que provoca\n          reprocesos y sobrecostes.</li>\n        </ul>"
        }
      ],
      "terminos": [
        {
          "t": "Modelo de servicio",
          "d": "Definición de qué ofrece la gestión de la plataforma (soporte, CoE, capacidades) y la responsabilidad de cada implicado."
        },
        {
          "t": "Gestión de la demanda",
          "d": "Circuito de petición, priorización, diseño, desarrollo y mantenimiento de casos de uso de la plataforma."
        },
        {
          "t": "Modelo de desarrollo",
          "d": "Marco que regula qué equipos desarrollan, con qué directrices, supervisión y autonomía en una plataforma multiproveedor."
        },
        {
          "t": "Data Fabric",
          "d": "Capa de integración guiada por metadatos activos que conecta fuentes dispersas con gobierno centralizado y automatizado."
        },
        {
          "t": "Data Mesh",
          "d": "Paradigma del dato como producto con propiedad descentralizada por dominio y gobierno federado."
        },
        {
          "t": "Lakehouse",
          "d": "Arquitectura que une lago y warehouse en un repositorio con capas curadas (bronce/silver/gold)."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en el pilar <em>Plataforma</em>, Minsait define dos grandes líneas de\n    trabajo. El <em>modelo de gobierno de la plataforma</em> abarca el modelo de servicio, el modelo de relación con\n    terceros, la gestión de la demanda y la divulgación y cultura. El <em>modelo de desarrollo</em> (multiproveedor)\n    cubre las directrices de desarrollo, la validación de casos de uso, la seguridad de los datos y un gobierno del\n    dato mínimo. Sobre esas bases conviven arquitecturas como Data Fabric, Data Mesh y Lakehouse. Minsait advierte de\n    riesgos comunes a evitar: falta de roles, ausencia de circuito de petición, sin directrices para múltiples\n    proveedores y modelos operativos débiles que generan cuellos de botella y reprocesos.",
      "quiz": [
        {
          "q": "Según Minsait, ¿cuáles son las dos grandes líneas de trabajo para que la plataforma sea un activo?",
          "opciones": [
            "El presupuesto y la licitación de herramientas",
            "El modelo de gobierno de la plataforma y el modelo de desarrollo",
            "El data lake y el data warehouse",
            "La capa de seguridad y la capa de visualización"
          ],
          "respuesta": 1,
          "explica": "Minsait establece dos líneas: el modelo de gobierno de la plataforma (servicio, relación con terceros, demanda, cultura) y el modelo de desarrollo (multiproveedor, validación, seguridad, gobierno mínimo)."
        },
        {
          "q": "¿Qué componente del modelo de gobierno de la plataforma define el circuito de petición y priorización de casos de uso?",
          "opciones": [
            "El modelo de relación con terceros",
            "La divulgación y cultura",
            "La gestión de la demanda",
            "El modelo de servicio"
          ],
          "respuesta": 2,
          "explica": "La gestión de la demanda define el circuito que recorre todo el ciclo de vida de un caso de uso: petición, priorización, diseño, desarrollo, puesta en producción y mantenimiento."
        },
        {
          "q": "¿Qué describe mejor a Data Mesh frente a las otras arquitecturas?",
          "opciones": [
            "Una capa de integración centralizada guiada por metadatos",
            "Un único repositorio que une lago y warehouse",
            "Un sistema exclusivamente de visualización en tiempo real",
            "El dato como producto con propiedad descentralizada por dominio y gobierno federado"
          ],
          "respuesta": 3,
          "explica": "Data Mesh trata el dato como producto y descentraliza su propiedad por dominio de negocio, con un gobierno federado (estándares comunes + autonomía por dominio). El Fabric es la capa de integración por metadatos y el Lakehouse une lago y warehouse."
        },
        {
          "q": "¿Cuál de los siguientes es un riesgo común a evitar en la puesta en marcha de una plataforma?",
          "opciones": [
            "La falta de un modelo operativo que genera cuellos de botella",
            "Disponer de un circuito claro de priorización",
            "Aplicar políticas de seguridad homogéneas",
            "Tener un centro de excelencia bien definido"
          ],
          "respuesta": 0,
          "explica": "Entre los riesgos comunes a evitar está la falta de modelos operativos, que dificulta la puesta en marcha de iniciativas y genera cuellos de botella; también la falta de roles y de un circuito de petición claro."
        },
        {
          "q": "En una plataforma multiproveedor, ¿para qué sirve la validación de los casos de uso?",
          "opciones": [
            "Para elegir el proveedor cloud más barato",
            "Para garantizar, antes de producción, mínimos de calidad y gobierno auditables a lo largo del ciclo de vida",
            "Para sustituir al comité del dato",
            "Para anonimizar automáticamente todos los informes"
          ],
          "respuesta": 1,
          "explica": "La validación de casos de uso es un control previo a la puesta en producción que asegura el cumplimiento de mínimos de calidad, gobierno y otras directrices, y debe ser auditable durante todo el ciclo de vida del desarrollo."
        }
      ]
    },
    {
      "id": "d19",
      "dia": 19,
      "bloque": "b3",
      "area": "Catálogo & Linaje",
      "icono": "🗂️",
      "estado": "full",
      "titulo": "Catálogo de datos y linaje en profundidad (active metadata)",
      "tiempo": "50–65 min",
      "objetivos": [
        "Entender qué es el catálogo de datos y los cinco tipos de metadata según Minsait.",
        "Comprender el linaje del dato y el valor de los metadatos activos frente a los pasivos.",
        "Conocer los conectores tecnológicos y el principio del metamodelo como fuente de verdad."
      ],
      "secciones": [
        {
          "h": "1. Glosario, catálogo y diccionario: el corazón del gobierno",
          "html": "<p>El <strong>catálogo de datos</strong> es el inventario gobernado de los activos de información:\n        dónde está cada dato, qué significa, quién lo posee y cómo fluye. Trabaja junto al <strong>glosario de\n        negocio</strong> (los conceptos en lenguaje de negocio) y al <strong>diccionario/catálogo técnico</strong>\n        (las tablas y esquemas físicos).</p>\n        <p>Sin catálogo, cada área reinventa definiciones y nadie confía en los KPIs. Con él, la organización\n        comparte un único lenguaje y puede certificar qué dato es fiable.</p>"
        },
        {
          "h": "2. Los cinco tipos de metadata (Minsait)",
          "html": "<p>El catálogo se llena de <strong>metadata</strong>: datos sobre el dato. Minsait estructura el\n        diccionario en torno a cinco tipos, y los procesos de alta/actualización/baja deben mantenerlos:</p>\n        <table class=\"cmp\"><thead><tr><th>Tipo</th><th>Qué describe</th></tr></thead>\n        <tbody>\n        <tr><td><strong>Negocio</strong></td><td>Descripción funcional del dato y de los conceptos asociados</td></tr>\n        <tr><td><strong>Técnica</strong></td><td>Punto de almacenamiento y esquema (tablas, tipos, particiones)</td></tr>\n        <tr><td><strong>Seguridad y privacidad</strong></td><td>Clasificación de datos sensibles y su tratamiento</td></tr>\n        <tr><td><strong>Origen y destino</strong></td><td>Trazabilidad del dato y sus fuentes (la base del linaje)</td></tr>\n        <tr><td><strong>Otros</strong></td><td>Relaciones entre catálogos y con los roles organizativos</td></tr>\n        </tbody></table>"
        },
        {
          "h": "3. Linaje del dato: de dónde viene y a dónde va",
          "html": "<p>El <strong>linaje</strong> es la trazabilidad de extremo a extremo: muestra el viaje del dato desde\n        sus orígenes, pasando por cada transformación, hasta su consumo en un informe o modelo. Se apoya en la\n        metadata de <em>origen y destino</em>.</p>\n        <p>Su valor es triple: <strong>confianza</strong> (saber de dónde sale un número), <strong>análisis de\n        impacto</strong> (qué reportes se rompen si cambio una fuente) y <strong>cumplimiento</strong> (demostrar la\n        trazabilidad de datos sensibles). El linaje convierte el dato en algo auditable.</p>"
        },
        {
          "h": "4. Metadatos activos vs pasivos",
          "html": "<p>Un catálogo <em>pasivo</em> es un documento que alguien rellena a mano y que envejece. Los\n        <strong>metadatos activos</strong> (<em>active metadata</em>) son lo contrario: se capturan\n        automáticamente desde los sistemas, se mantienen vivos y, además, <strong>accionan</strong> procesos.</p>\n        <ul>\n          <li>El catálogo se nutre por <strong>escaneo y perfilado</strong> automático, no por carga manual.</li>\n          <li>La propia metadata dispara reglas de calidad, controles de seguridad y construcción del linaje.</li>\n          <li>Es la base de arquitecturas como Data Fabric, donde los metadatos guían la integración.</li>\n        </ul>\n        <p>El principio operativo es buscar aplicar las políticas de forma <strong>automatizada</strong> en lugar de\n        generar procedimientos manuales.</p>"
        },
        {
          "h": "5. Conectores y el metamodelo como fuente de verdad",
          "html": "<p>Para poblar el catálogo y reconstruir el linaje hacen falta <strong>conectores tecnológicos</strong>\n        a lo largo del ciclo del dato: herramientas <strong>ETL/ELT</strong> (PowerCenter, Data Factory, ODI),\n        lenguajes de desarrollo (Spark, Scala, PL/SQL), almacenamiento y herramientas de <strong>BI</strong>\n        (Power BI, Qlik). Cada conector aporta una pieza del linaje y de la metadata técnica.</p>\n        <p>El concepto que lo unifica todo es el <strong>metamodelo</strong>: la fuente de verdad que describe tablas,\n        propiedades, permisos, fuentes y reglas de calidad. Su premisa, vista en el caso de restauración global de\n        Minsait, es contundente: <strong>si un objeto o recurso no está en el metamodelo, no existe</strong>. Así, todo\n        el ciclo del dato queda gobernado por una única descripción central.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Catálogo de datos",
          "d": "Inventario gobernado de activos de información: dónde está el dato, qué significa, quién lo posee y cómo fluye."
        },
        {
          "t": "Glosario de negocio",
          "d": "Repositorio de conceptos en lenguaje de negocio que da significado común al dato."
        },
        {
          "t": "Metadata",
          "d": "Datos sobre el dato; Minsait distingue cinco tipos: negocio, técnica, seguridad/privacidad, origen-destino y otros."
        },
        {
          "t": "Linaje del dato",
          "d": "Trazabilidad de extremo a extremo del dato, desde sus orígenes y transformaciones hasta su consumo."
        },
        {
          "t": "Metadatos activos",
          "d": "Metadata capturada automáticamente y viva que acciona reglas de calidad, seguridad y linaje (active metadata)."
        },
        {
          "t": "Metamodelo",
          "d": "Descripción central y fuente de verdad del dato; si un objeto no está en él, no existe."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el diccionario se construye sobre el <em>glosario de negocio</em> y el\n    <em>catálogo técnico</em>, manteniendo los cinco tipos de metadata definidos por Minsait: <em>negocio</em>,\n    <em>técnica</em>, <em>seguridad y privacidad</em>, <em>origen y destino</em> y <em>otros</em>. El <em>linaje</em>\n    se apoya en la metadata de origen-destino y se reconstruye con conectores tecnológicos a lo largo del ciclo del\n    dato (ETL/ELT como PowerCenter o Data Factory, lenguajes como Spark o PL/SQL, y BI como Power BI o Qlik). El\n    enfoque privilegia los metadatos activos y la automatización de políticas frente a procedimientos manuales. Todo\n    converge en el <em>metamodelo</em> como fuente de verdad, bajo la premisa de Minsait de que <em>si un objeto no\n    está en el metamodelo, no existe</em>.",
      "quiz": [
        {
          "q": "¿Cuáles son los cinco tipos de metadata según Minsait?",
          "opciones": [
            "Estructurada, no estructurada, semiestructurada, externa e interna",
            "Bronce, silver, gold, raw y common",
            "Negocio, técnica, seguridad/privacidad, origen-destino y otros",
            "Operacional, analítica, maestra, de referencia y temporal"
          ],
          "respuesta": 2,
          "explica": "Minsait define cinco tipos: de negocio (descripción funcional), técnica (almacenamiento/esquema), de seguridad y privacidad (clasificación de sensibles), de origen-destino (trazabilidad) y otros (relaciones con catálogos y roles)."
        },
        {
          "q": "¿En qué tipo de metadata se apoya principalmente el linaje del dato?",
          "opciones": [
            "En ningún tipo: el linaje no usa metadata",
            "En la metadata de negocio",
            "En la metadata de seguridad y privacidad",
            "En la metadata de origen y destino"
          ],
          "respuesta": 3,
          "explica": "El linaje se apoya en la metadata de origen y destino, que captura la trazabilidad del dato y sus fuentes a lo largo de todas sus transformaciones."
        },
        {
          "q": "¿Qué premisa rige el metamodelo en el enfoque de gestión del dato de Minsait?",
          "opciones": [
            "Si un objeto o recurso no está en el metamodelo, no existe",
            "El metamodelo solo guarda métricas de negocio",
            "Todo objeto debe documentarse en papel antes de existir",
            "El metamodelo se sustituye por el glosario de negocio"
          ],
          "respuesta": 0,
          "explica": "El enfoque parte de la premisa de que cualquier objeto o recurso que no esté en el metamodelo no existe; así todo el ciclo del dato queda gobernado por esa fuente de verdad central."
        },
        {
          "q": "¿Qué distingue a los metadatos activos de un catálogo pasivo?",
          "opciones": [
            "Que se rellenan a mano y se revisan una vez al año",
            "Que se capturan automáticamente y accionan reglas de calidad, seguridad y linaje",
            "Que no se conectan a ningún sistema",
            "Que solo guardan definiciones de negocio"
          ],
          "respuesta": 1,
          "explica": "Los metadatos activos se capturan de forma automática (escaneo y perfilado), se mantienen vivos y disparan procesos como reglas de calidad, controles de seguridad y la construcción del linaje, a diferencia del catálogo pasivo cargado manualmente."
        },
        {
          "q": "¿Qué papel cumplen los conectores tecnológicos (ETL/ELT, lenguajes, BI) en el catálogo y el linaje?",
          "opciones": [
            "Reemplazan al glosario de negocio",
            "Solo sirven para visualizar dashboards",
            "Aportan piezas de metadata técnica y de trazabilidad a lo largo del ciclo del dato",
            "Eliminan la necesidad de roles de gobierno"
          ],
          "respuesta": 2,
          "explica": "Los conectores a herramientas ETL/ELT, lenguajes de desarrollo y BI permiten capturar metadata técnica y reconstruir el linaje en cada etapa del ciclo del dato (origen, persistencia, consumo)."
        }
      ]
    },
    {
      "id": "d20",
      "dia": 20,
      "bloque": "b3",
      "area": "DataOps",
      "icono": "⚙️",
      "estado": "full",
      "titulo": "DataOps y operativa del gobierno (ticketing, PDCA)",
      "tiempo": "50–65 min",
      "objetivos": [
        "Entender qué es DataOps y sus prácticas: orquestación, testing, versionado, CI/CD y observabilidad.",
        "Gestionar la demanda del gobierno con un sistema de ticketing y monitorizar con KPIs y cuadros de mando.",
        "Aplicar el ciclo PDCA de mejora continua y conectarlo con los pilares del assessment de Alpayana."
      ],
      "secciones": [
        {
          "h": "1. Qué es DataOps y por qué importa al gobierno",
          "html": "<p><strong>DataOps</strong> aplica al dato la disciplina que DevOps trajo al software: automatizar e\n        industrializar el ciclo del dato para entregar valor de forma rápida, repetible y fiable. Su lema en el\n        assessment es claro: <em>sin DataOps, los datos no escalan; solo se replican errores más rápido</em>.</p>\n        <p>Para el gobierno esto es central: las políticas de calidad y seguridad se aplican mejor\n        <strong>automatizadas dentro de los pipelines</strong> que como procedimientos manuales que nadie sigue.</p>"
        },
        {
          "h": "2. Las prácticas DataOps",
          "html": "<p>DataOps se compone de un conjunto de prácticas técnicas que conviven:</p>\n        <ul>\n          <li><strong>Orquestación</strong> de pipelines (p. ej. Airflow, Dagster): coordinar qué se ejecuta y cuándo.</li>\n          <li><strong>Testing automático</strong> de esquema y calidad (p. ej. dbt): validar el dato antes de publicarlo.</li>\n          <li><strong>Versionado</strong> con Git: control de cambios sobre código y transformaciones.</li>\n          <li><strong>CI/CD para el dato</strong>: integración y despliegue continuos de los pipelines.</li>\n          <li><strong>Observabilidad</strong>: monitorizar el comportamiento de los procesos para detectar incidencias.</li>\n        </ul>\n        <p>Juntas permiten escalar el ecosistema de datos sin aumentar la complejidad, asegurando calidad,\n        trazabilidad y velocidad.</p>"
        },
        {
          "h": "3. Gestión de la demanda: el ticketing",
          "html": "<p>La operativa del gobierno necesita un canal ordenado para las peticiones que llegan al área de\n        Gobierno del Dato. Ese canal es un <strong>sistema de ticketing</strong>, que cumple varias funciones:</p>\n        <ul>\n          <li><strong>Canalización</strong>: centraliza y deriva peticiones entre stakeholders.</li>\n          <li><strong>Seguimiento</strong>: guarda el tracking de cambios y el estado de cada petición.</li>\n          <li><strong>Priorización</strong>: homogeneiza criterios entre los equipos.</li>\n          <li><strong>Análisis y mejoras</strong>: permite identificar patrones por tipo de tarea, stakeholder o\n          herramienta impactada.</li>\n        </ul>\n        <p>El ticketing convierte el soporte reactivo en una demanda gestionada y medible.</p>"
        },
        {
          "h": "4. Monitorización: KPIs y cuadros de mando",
          "html": "<p>No se gobierna lo que no se mide. Se definen <strong>KPIs</strong> por nivel de aplicación y se\n        visualizan en <strong>cuadros de mando</strong>. Ejemplos de métricas del modelo:</p>\n        <ul>\n          <li>Número de casos de uso desplegados y volumen de peticiones del gobierno.</li>\n          <li>Nivel de cumplimiento normativo o de la política y procesos.</li>\n          <li><strong>Data Quality Indicator</strong> y métricas de ingestas y disponibilidad del dato.</li>\n          <li>Reducción de riesgo y de costes; efectividad de la comunicación.</li>\n        </ul>\n        <p>Un cuadro de mando de calidad sirve además como herramienta de identificación de incidentes y base para\n        el análisis de causa.</p>"
        },
        {
          "h": "5. Mejora continua: el ciclo PDCA",
          "html": "<p>La operativa se cierra con un bucle de <strong>mejora continua</strong> bajo el ciclo\n        <strong>PDCA</strong>:</p>\n        <ol>\n          <li><strong>Plan</strong> (planifica): definir métricas y objetivos del modelo.</li>\n          <li><strong>Do</strong> (haz): ejecutar los procesos del gobierno y capturar datos.</li>\n          <li><strong>Check</strong> (comprueba): revisar cuadros de mando, alertas y cumplimiento.</li>\n          <li><strong>Act</strong> (actúa): identificar mejoras, tratar recomendaciones y aplicar el plan de acción.</li>\n        </ol>\n        <p>A nivel de política se declara la necesidad de revisar y auditar el modelo periódicamente; a nivel de\n        procesos se definen procedimientos para detectar puntos de mejora. Esto conecta directamente con los pilares\n        de Minsait <strong>Modelo Operativo y Automatización</strong> y con el <strong>Nivel de Automatización del\n        Ciclo del Dato</strong> evaluados en el assessment de Alpayana.</p>"
        }
      ],
      "terminos": [
        {
          "t": "DataOps",
          "d": "Disciplina que industrializa y automatiza el ciclo del dato para entregar valor de forma rápida, repetible y fiable."
        },
        {
          "t": "Orquestación",
          "d": "Coordinación de la ejecución de pipelines de datos con herramientas como Airflow o Dagster."
        },
        {
          "t": "Observabilidad",
          "d": "Monitorización del comportamiento de los procesos del dato para detectar y diagnosticar incidencias."
        },
        {
          "t": "Ticketing",
          "d": "Sistema que canaliza, prioriza y da seguimiento a las peticiones que llegan al área de Gobierno del Dato."
        },
        {
          "t": "Data Quality Indicator",
          "d": "Métrica de calidad del dato que se monitoriza dentro de los cuadros de mando del modelo."
        },
        {
          "t": "PDCA",
          "d": "Ciclo de mejora continua: Plan (planifica), Do (haz), Check (comprueba) y Act (actúa)."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> la operativa del gobierno se apoya en prácticas <em>DataOps</em>\n    —orquestación con Airflow/Dagster, testeo y validaciones de calidad con dbt, versionado con Git, CI/CD y\n    observabilidad— que constituyen el pilar <em>Modelo Operativo y Automatización</em> del assessment de Alpayana,\n    junto al pilar <em>Nivel de Automatización del Ciclo del Dato</em>. La gestión de la demanda se canaliza con un\n    sistema de <em>ticketing</em> (canalización, seguimiento, priorización, análisis y mejoras), y la monitorización\n    se realiza con KPIs y cuadros de mando (incluido el <em>Data Quality Indicator</em>). El bucle de mejora continua\n    sigue el ciclo <em>PDCA</em>: planifica, haz, comprueba y actúa.",
      "quiz": [
        {
          "q": "¿Cuál de estas NO es una práctica típica de DataOps?",
          "opciones": [
            "Orquestación de pipelines con Airflow o Dagster",
            "Testing automático de calidad con dbt",
            "Versionado con Git e integración CI/CD",
            "Diseñar manualmente cada informe sin control de versiones"
          ],
          "respuesta": 3,
          "explica": "DataOps automatiza e industrializa el ciclo del dato (orquestación, testing, versionado, CI/CD, observabilidad). Diseñar informes a mano sin versionado es justo lo contrario a su filosofía."
        },
        {
          "q": "¿Qué orden tienen las fases del ciclo PDCA?",
          "opciones": [
            "Plan (planifica), Do (haz), Check (comprueba), Act (actúa)",
            "Do, Plan, Act, Check",
            "Check, Act, Plan, Do",
            "Act, Check, Do, Plan"
          ],
          "respuesta": 0,
          "explica": "PDCA es Plan (planifica), Do (haz), Check (comprueba) y Act (actúa); es el bucle estándar de mejora continua del modelo de gobierno."
        },
        {
          "q": "¿Para qué sirve el sistema de ticketing en la operativa del gobierno?",
          "opciones": [
            "Para sustituir los pipelines de datos",
            "Para canalizar, priorizar y dar seguimiento a las peticiones del Gobierno del Dato",
            "Para almacenar el data lake",
            "Para entrenar modelos de machine learning"
          ],
          "respuesta": 1,
          "explica": "El ticketing centraliza y deriva peticiones, guarda su tracking, homogeneiza criterios de priorización y permite analizar patrones para proponer mejoras: convierte el soporte reactivo en demanda gestionada."
        },
        {
          "q": "¿Con qué pilares del assessment de Alpayana conecta directamente DataOps?",
          "opciones": [
            "Cultura Data-Driven y Coste Total",
            "Capacidad de Adopción y Tecnología Habilitadora",
            "Modelo Operativo y Automatización, y Nivel de Automatización del Ciclo del Dato",
            "Escalabilidad y Modularidad únicamente"
          ],
          "respuesta": 2,
          "explica": "DataOps (orquestación, testing, versionado, CI/CD, observabilidad) es el contenido del pilar Modelo Operativo y Automatización y se mide en el pilar Nivel de Automatización del Ciclo del Dato."
        },
        {
          "q": "¿Qué métrica de calidad se monitoriza dentro de los cuadros de mando del modelo?",
          "opciones": [
            "La cotización del mineral en el mercado",
            "El precio de las licencias cloud",
            "El número de empleados del área de TI",
            "El Data Quality Indicator"
          ],
          "respuesta": 3,
          "explica": "Entre las métricas del modelo está el Data Quality Indicator, junto con el número de casos de uso desplegados, el cumplimiento normativo y las métricas de ingestas y disponibilidad del dato."
        }
      ]
    },
    {
      "id": "d21",
      "dia": 21,
      "bloque": "b4",
      "area": "Gobierno & IA",
      "icono": "🤖",
      "estado": "full",
      "titulo": "Gobierno del dato e IA / GenAI (caso ALPAYANA_IA)",
      "tiempo": "50–60 min",
      "objetivos": [
        "Entender por qué el gobierno del dato es la base de cualquier iniciativa de IA.",
        "Conocer el modelo Minsait de 'Gobierno de la inteligencia corporativa'.",
        "Servir de puente al Bloque 6 (Gobierno de la IA) con el caso ALPAYANA_IA."
      ],
      "secciones": [
        {
          "h": "1. Sin dato gobernado no hay IA confiable",
          "html": "<p>La IA es tan buena como los datos que la alimentan: <em>\"basura entra, basura sale\"</em>. Por eso el\n          gobierno del dato es <strong>prerequisito</strong> de la IA. Minsait lo ilustra con su escalera de madurez —\n          <strong>Datos → Información → Conocimiento → Inteligencia</strong>—: la analítica predictiva, prescriptiva y\n          cognitiva (IA) está en el peldaño más alto, y solo se sostiene si debajo hay calidad, metadatos, una \"verdad\n          única\" y trazabilidad. La IA <strong>hereda</strong> los problemas de datos no gobernados (sesgos, silos,\n          definiciones inconsistentes) y los <strong>amplifica</strong> a escala.</p>"
        },
        {
          "h": "2. Gobierno de la inteligencia corporativa (modelo Minsait)",
          "html": "<p>Minsait extiende el gobierno del dato hacia lo que llama <strong>\"Gobierno de la inteligencia\n          corporativa\"</strong>, que articula cuatro componentes:</p>\n          <ul>\n            <li><strong>AI Strategy</strong>: la IA como activo estratégico y de negocio (el QUÉ y el PORQUÉ).</li>\n            <li><strong>Gobierno del dato</strong>: la base técnica y operativa del dato (lo aprendido en los bloques\n            anteriores).</li>\n            <li><strong>Responsible AI (IA Responsable)</strong>: el impacto social y ambiental, la equidad y la\n            transparencia.</li>\n            <li><strong>Gobierno y migración de IA</strong>: MLOps, monitorización avanzada y operación del ciclo de\n            vida de los modelos.</li>\n          </ul>\n          <p>Sobre todo ello opera la <strong>Gestión del Cambio en Data e IA</strong>, que habilita la adopción.</p>"
        },
        {
          "h": "3. El principio clave: el gobierno de IA empieza antes del primer caso de uso",
          "html": "<p>Minsait insiste en que <strong>\"el gobierno de la IA y su estrategia de implantación deben comenzar\n          antes de que empiece el primer caso de uso\"</strong>. No se gobierna a posteriori. El ciclo de vida de una\n          iniciativa de IA —<strong>Creación → Crecimiento → Mantenimiento</strong>— se monitoriza desde el inicio, y\n          cada caso de uso se trata como un <strong>activo de inversión</strong> que se valora por su retorno (enfoque\n          <em>Return On Intelligence</em>), no como un experimento aislado.</p>"
        },
        {
          "h": "4. El caso ALPAYANA_IA (minería)",
          "html": "<p>El <em>Assessment Integral de Inteligencia Empresarial</em> de Minsait para Alpayana muestra cómo se\n          encadena todo:</p>\n          <ul>\n            <li>Parte de la <strong>Estrategia y Gobierno del dato</strong> (lo de este curso) como cimiento.</li>\n            <li>Construye un <strong>Business Data Hub</strong>: un equipo híbrido de negocio + IA, dirigido por\n            negocio, que descubre, diseña, implementa y escala casos de uso (predicción de demanda de mineral,\n            optimización de blending y recuperación, gemelos digitales de planta, pricing por calidad del mineral…).</li>\n            <li>Aplica una <strong>arquitectura medallón gobernada</strong> (bronce/plata/oro) y <strong>MLOps</strong>.</li>\n            <li>Explora <strong>GenAI y Virtual Labs</strong>: agentes de IA colaborativos (que verás en el Bloque 6).</li>\n          </ul>\n          <p>Este módulo es el <strong>puente</strong>: a partir de aquí, el Bloque 6 profundiza en el gobierno de la IA\n          propiamente dicho.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno de la inteligencia corporativa",
          "d": "Extensión Minsait del gobierno del dato: AI Strategy + Gobierno del dato + Responsible AI + Gobierno/migración de IA."
        },
        {
          "t": "Return On Intelligence",
          "d": "Enfoque de Minsait para valorar el impacto de cada caso de IA en la cuenta de resultados."
        },
        {
          "t": "Business Data Hub",
          "d": "Equipo híbrido de negocio e IA, dirigido por negocio, que descubre e industrializa casos de uso."
        },
        {
          "t": "Ciclo de vida de IA",
          "d": "Creación → Crecimiento → Mantenimiento; se monitoriza desde el inicio."
        },
        {
          "t": "Responsible AI",
          "d": "IA Responsable: equidad, transparencia, explicabilidad e impacto social/ambiental."
        },
        {
          "t": "MLOps",
          "d": "Prácticas para desplegar, monitorizar y reentrenar modelos de IA de forma fiable y escalable."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el assessment ALPAYANA_IA encadena <em>Estrategia y Gobierno del dato →\n      Data Engineering → Data Governance → Machine Learning → IA → GenAI & Virtual Labs</em>. La idea central es que el\n      gobierno del dato no termina en sí mismo: es el <em>cimiento</em> del \"Gobierno de la inteligencia corporativa\".\n      El Bloque 6 de este curso desarrolla ese gobierno de IA en profundidad.",
      "quiz": [
        {
          "q": "¿Por qué el gobierno del dato es prerequisito de la IA?",
          "opciones": [
            "Porque la IA no usa datos",
            "Porque la IA reemplaza al gobierno del dato",
            "Porque la IA hereda y amplifica los problemas de datos no gobernados ('basura entra, basura sale')",
            "Porque lo exige la ley"
          ],
          "respuesta": 2,
          "explica": "La IA es tan buena como sus datos; sin calidad, metadatos y trazabilidad, amplifica errores y sesgos."
        },
        {
          "q": "¿Cuál NO es uno de los cuatro componentes del 'Gobierno de la inteligencia corporativa' de Minsait?",
          "opciones": [
            "AI Strategy",
            "Gobierno del dato",
            "Responsible AI",
            "Gestión de nóminas"
          ],
          "respuesta": 3,
          "explica": "Los cuatro son AI Strategy, Gobierno del dato, Responsible AI y Gobierno/migración de IA."
        },
        {
          "q": "Según Minsait, ¿cuándo debe comenzar el gobierno de la IA?",
          "opciones": [
            "Antes de que empiece el primer caso de uso",
            "Después de poner el primer modelo en producción",
            "Solo cuando hay una auditoría",
            "Nunca, es opcional"
          ],
          "respuesta": 0,
          "explica": "El gobierno y la estrategia de IA deben comenzar antes del primer caso de uso, no a posteriori."
        },
        {
          "q": "¿Qué es un 'Business Data Hub' en el modelo Minsait?",
          "opciones": [
            "Un servidor de bases de datos",
            "Un equipo híbrido de negocio e IA, dirigido por negocio, que industrializa casos de uso",
            "Un tipo de data warehouse",
            "Una norma ISO"
          ],
          "respuesta": 1,
          "explica": "Es el equipo híbrido que descubre, diseña, implementa, valida y escala casos de uso junto al cliente."
        },
        {
          "q": "El enfoque 'Return On Intelligence' significa que…",
          "opciones": [
            "La IA no se mide",
            "Solo importa la precisión del modelo",
            "Cada caso de IA se valora como activo de inversión por su impacto en la cuenta de resultados",
            "La IA es gratis"
          ],
          "respuesta": 2,
          "explica": "Trata cada iniciativa de IA como activo de negocio, valorando su retorno, no como experimento aislado."
        }
      ]
    },
    {
      "id": "d22",
      "dia": 22,
      "bloque": "b4",
      "area": "Implantación Minsait",
      "icono": "🧱",
      "estado": "full",
      "titulo": "Metodología de implantación de Minsait: 5 fases y entregables",
      "tiempo": "50–60 min",
      "objetivos": [
        "Conocer las 5 fases de la metodología de implantación de Minsait.",
        "Identificar los entregables y actividades clave de cada fase.",
        "Entender los principios: ágil, incremental, por piloto y orientado al ciclo de vida."
      ],
      "secciones": [
        {
          "h": "1. Las cinco fases (AS IS → MEJORA)",
          "html": "<p>La metodología de Minsait es <strong>ágil e incremental</strong> (Sprint 0 + Sprints 1–N) y va del\n          diagnóstico a la operación sostenible en cinco fases:</p>\n          <ol>\n            <li><strong>AS IS · Evaluación y diagnóstico</strong>: entender la situación y el nivel de madurez,\n            esbozar el modelo TO-BE e identificar el caso de uso piloto.</li>\n            <li><strong>MODELO DG · Definición del modelo de gobierno</strong>: política, procesos y procedimientos;\n            modelo organizativo (roles + comités); modelo de calidad; modelo de seguridad y privacidad; monitorización.</li>\n            <li><strong>PILOTO · Prueba piloto</strong>: ejecutar un caso de uso <em>end-to-end</em> para validar y\n            refinar el modelo y la herramienta.</li>\n            <li><strong>DESPLIEGUE · Roll out global</strong>: extender progresivamente a las demás entidades/áreas\n            según un mapa de priorización; reforzar cumplimiento; planes de formación, cambio y comunicación.</li>\n            <li><strong>MEJORA · Supervisión continua y optimización</strong>: gestión de la demanda (ticketing),\n            soporte, monitorización (KPIs, cuadros de mando, riesgos) y mejora continua (PDCA).</li>\n          </ol>"
        },
        {
          "h": "2. Entregables por fase",
          "html": "<table class=\"cmp\">\n            <thead><tr><th>Fase</th><th>Entregables clave</th></tr></thead>\n            <tbody>\n              <tr><td>AS IS</td><td>Evaluación de madurez · Iniciativas para cubrir brechas · Modelo TO-BE de alto nivel · Boceto de roadmap · Propuesta de piloto</td></tr>\n              <tr><td>MODELO DG</td><td>Modelo de Gestión (organizativo + comités) · Modelo de Gobierno (políticas, procesos, procedimientos) · Modelo de Monitorización (KPIs, cuadros de mando)</td></tr>\n              <tr><td>PILOTO</td><td>Informe piloto · Modelo refinado · Roadmap actualizado</td></tr>\n              <tr><td>DESPLIEGUE</td><td>Despliegue por entidades · Informe de evolución · Planes de formación, cambio y cultura GD</td></tr>\n              <tr><td>MEJORA</td><td>Cuadro de mando de seguimiento · Propuestas de mejora · Informe de cumplimiento del roadmap · Gestión de riesgos</td></tr>\n            </tbody>\n          </table>"
        },
        {
          "h": "3. Principios de implantación",
          "html": "<ul>\n            <li><strong>Ágil e incremental</strong>: Sprint 0 + Sprints; no se gobierna todo de golpe.</li>\n            <li><strong>Por piloto</strong>: un caso de uso end-to-end valida el modelo antes del roll out (criterios:\n            poca resistencia al cambio, beneficio claro, replicabilidad).</li>\n            <li><strong>Orientado al ciclo de vida del dato</strong>: generación → captura → validación →\n            almacenamiento → enriquecimiento → explotación → retroalimentación.</li>\n            <li><strong>Coordinado con la herramienta</strong>: definir el modelo conociendo las capacidades de la\n            herramienta de gobierno (automatizar flujos, no procedimientos manuales).</li>\n          </ul>"
        }
      ],
      "terminos": [
        {
          "t": "AS IS / MODELO DG / PILOTO / DESPLIEGUE / MEJORA",
          "d": "Las 5 fases de la metodología de implantación de Minsait."
        },
        {
          "t": "Modelo TO-BE",
          "d": "Diseño objetivo del gobierno del dato, esbozado en el diagnóstico y detallado en MODELO DG."
        },
        {
          "t": "Piloto end-to-end",
          "d": "Caso de uso completo que valida y refina el modelo antes del despliegue general."
        },
        {
          "t": "Ciclo de vida del dato",
          "d": "Generación → captura → validación → almacenamiento → enriquecimiento → explotación → retroalimentación."
        },
        {
          "t": "PDCA",
          "d": "Plan-Do-Check-Act: ciclo de mejora continua usado en la fase de monitorización."
        },
        {
          "t": "Roll out",
          "d": "Despliegue progresivo del modelo al resto de entidades/áreas según un mapa de priorización."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> estas 5 fases son el corazón del enfoque de implantación. Conectan con el\n      assessment (AS IS → Día 16), el modelo operativo (MODELO DG → Día 5) y el roadmap (Día 23). Todo se gestiona con\n      <em>metodología ágil</em> (Sprint 0 + Sprints) y se apoya en una <em>herramienta de gobierno</em> para automatizar\n      glosario, catálogo, linaje, calidad y flujos de trabajo.",
      "quiz": [
        {
          "q": "¿Cuál es el orden correcto de las fases de la metodología de Minsait?",
          "opciones": [
            "MODELO DG → AS IS → MEJORA → PILOTO → DESPLIEGUE",
            "DESPLIEGUE → PILOTO → MODELO DG → AS IS → MEJORA",
            "PILOTO → AS IS → MODELO DG → DESPLIEGUE → MEJORA",
            "AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA"
          ],
          "respuesta": 3,
          "explica": "Diagnóstico (AS IS) → Definición del modelo (MODELO DG) → Piloto → Despliegue (roll out) → Mejora continua."
        },
        {
          "q": "El principal entregable de la fase MODELO DG incluye…",
          "opciones": [
            "El Modelo de Gestión (organizativo + comités), el Modelo de Gobierno (políticas/procesos) y el de Monitorización",
            "Solo el informe de madurez",
            "La compra de licencias",
            "El despliegue a todas las áreas"
          ],
          "respuesta": 0,
          "explica": "MODELO DG define organización, comités, políticas, procesos, calidad, seguridad y monitorización."
        },
        {
          "q": "¿Para qué sirve la fase PILOTO?",
          "opciones": [
            "Para gastar el presupuesto",
            "Para validar y refinar el modelo con un caso de uso end-to-end antes del roll out",
            "Para evitar el diagnóstico",
            "Para cerrar el proyecto"
          ],
          "respuesta": 1,
          "explica": "El piloto prueba todos los componentes en un caso real y deja un modelo refinado y escalable."
        },
        {
          "q": "Los procesos de gobierno se orientan a…",
          "opciones": [
            "El organigrama de RR.HH.",
            "El calendario fiscal",
            "El ciclo de vida del dato (generación → ... → explotación → retroalimentación)",
            "El plan de marketing"
          ],
          "respuesta": 2,
          "explica": "Minsait organiza los procesos según el ciclo de vida del dato."
        },
        {
          "q": "En la fase MEJORA, ¿qué herramienta usa Minsait para gestionar la demanda?",
          "opciones": [
            "Un ERP",
            "Un firewall",
            "Una hoja de cálculo manual",
            "Un sistema de ticketing"
          ],
          "respuesta": 3,
          "explica": "El ticketing canaliza, prioriza y da seguimiento a las peticiones del área de gobierno (con PDCA)."
        }
      ]
    },
    {
      "id": "d23",
      "dia": 23,
      "bloque": "b4",
      "area": "Roadmap & Cambio",
      "icono": "🗺️",
      "estado": "full",
      "titulo": "Roadmap, quick wins y gestión del cambio",
      "tiempo": "45–60 min",
      "objetivos": [
        "Construir un roadmap de gobierno por olas y horizontes, priorizando iniciativas por impacto vs. esfuerzo.",
        "Diferenciar y secuenciar quick wins frente a líneas de corto, medio y largo plazo.",
        "Diseñar la gestión del cambio del programa: formación, comunicación, traspaso de conocimiento y cultura del dato."
      ],
      "secciones": [
        {
          "h": "1. Por qué el roadmap decide el éxito del programa",
          "html": "<p>Un programa de gobierno del dato no se vende por su modelo teórico, sino por su <strong>capacidad de entregar valor de forma escalonada y demostrable</strong>. El roadmap es el artefacto que traduce el assessment de madurez (las brechas AS-IS frente al TO-BE) en una <em>secuencia ejecutable</em> de iniciativas. Sin él, el gobierno se percibe como burocracia; con él, como una inversión con retornos visibles.</p>\n        <p>La lógica troncal es <strong>cerrar brechas priorizadas</strong>: cada iniciativa del roadmap responde a un gap del diagnóstico, lleva asociado un impacto en negocio, una criticidad y un esfuerzo de implementación. El roadmap no es un cronograma rígido sino un documento <em>vivo</em> que se actualiza y refina tras cada implementación, incorporando lecciones aprendidas y sinergias detectadas.</p>"
        },
        {
          "h": "2. Olas, horizontes y priorización impacto vs. esfuerzo",
          "html": "<p>El despliegue se organiza por <strong>olas</strong> (incorporación paulatina de dominios o áreas según un mapa de priorización) y por <strong>horizontes temporales</strong>. La herramienta de priorización fundamental es la matriz <em>impacto vs. esfuerzo</em>, que clasifica cada iniciativa en cuatro cuadrantes:</p>\n        <table class=\"cmp\"><thead><tr><th>Cuadrante</th><th>Impacto / Esfuerzo</th><th>Decisión</th></tr></thead>\n        <tbody>\n        <tr><td>Quick win</td><td>Alto impacto · bajo esfuerzo</td><td>Ejecutar primero: genera tracción y credibilidad</td></tr>\n        <tr><td>Apuesta estratégica</td><td>Alto impacto · alto esfuerzo</td><td>Planificar a medio/largo plazo con sponsor</td></tr>\n        <tr><td>Relleno</td><td>Bajo impacto · bajo esfuerzo</td><td>Ejecutar de forma oportunista</td></tr>\n        <tr><td>Descartable</td><td>Bajo impacto · alto esfuerzo</td><td>Evitar o posponer</td></tr>\n        </tbody></table>\n        <p>Las <strong>líneas de corto, medio y largo plazo</strong> ordenan el roadmap: el corto plazo concentra los quick wins y la habilitación básica (glosario del piloto, primeras reglas de calidad); el medio plazo despliega el modelo a más dominios; el largo plazo consolida la automatización y la mejora continua.</p>"
        },
        {
          "h": "3. Quick wins: tracción temprana sin hipotecar el modelo",
          "html": "<p>Un buen <strong>quick win</strong> cumple tres condiciones: aporta beneficio tangible al negocio, encuentra poca resistencia al cambio en el área afectada e impacta positivamente la percepción de los empleados sobre el programa. Justo por eso el caso de uso piloto se selecciona con estos mismos criterios de idoneidad.</p>\n        <ul>\n        <li>Ejemplos típicos: certificar un KPI crítico con discrepancias entre áreas, publicar el glosario de un dominio de alto consumo, embeber una regla de calidad automática en un pipeline existente.</li>\n        <li>Riesgo a evitar: confundir quick win con <em>parche</em>. Cada victoria temprana debe construir procesos repetibles y escalables, no soluciones de usar y tirar que luego haya que rehacer.</li>\n        </ul>\n        <p>La regla MBB: <strong>el quick win compra el permiso político</strong> para las apuestas estratégicas. Sin victorias visibles en los primeros 90 días, el programa pierde el patrocinio ejecutivo antes de demostrar su tesis de valor.</p>"
        },
        {
          "h": "4. Gestión del cambio: los cuatro planes y la cultura del dato",
          "html": "<p>La tecnología y los procesos fracasan si las personas no adoptan el modelo. La gestión del cambio se articula en cuatro planes que avanzan en paralelo al despliegue:</p>\n        <ul>\n        <li><strong>Plan de formación:</strong> capacitación por rol (Owner, Steward, Custodian, consumidores) y alfabetización del dato; se planifica desde la fase inicial y se ejecuta progresivamente.</li>\n        <li><strong>Plan de comunicación:</strong> mensajes, canales y vías de consulta para cada audiencia; comunica funciones, repositorios y formas de dar retroalimentación a las áreas que se incorporan.</li>\n        <li><strong>Plan de traspaso de conocimiento:</strong> asegura que el cliente opere el modelo de forma autónoma cuando la consultora se retira.</li>\n        <li><strong>Cultura del dato:</strong> liderazgo visible desde dirección, comunidades de práctica y, sobre todo, <strong>divulgación de casos de éxito</strong> y lecciones aprendidas para reforzar la adopción ola tras ola.</li>\n        </ul>\n        <p>La cultura no se decreta: se cultiva mostrando resultados. Por eso la divulgación de lecciones aprendidas y puntos de éxito es una actividad explícita del despliegue, no un extra opcional.</p>"
        },
        {
          "h": "5. Benchmark de marcos: el cambio como disciplina formal",
          "html": "<p>Mientras <strong>DAMA-DMBOK2</strong> trata la gestión del cambio organizacional como una función transversal de soporte al gobierno, otros enfoques la sitúan en el centro. <em>Prosci/ADKAR</em> aporta un modelo de adopción individual (Awareness, Desire, Knowledge, Ability, Reinforcement) muy útil para diseñar el plan de comunicación y formación. <em>Kotter</em> aporta la urgencia y la coalición de liderazgo.</p>\n        <p>En minería e industria pesada (Alpayana, Pacasmayo, UNACEM) el reto añadido es el <strong>frente operativo</strong>: operarios de planta y mina con baja exposición digital. Aquí los quick wins deben ser hipertangibles (un reporte que antes tardaba días y ahora minutos) y la formación, presencial y por turnos. La adaptación al cambio en operaciones no se gana con un correo: se gana en el campo.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Roadmap por olas",
          "d": "Plan de despliegue que incorpora dominios o áreas de forma paulatina según un mapa de priorización."
        },
        {
          "t": "Quick win",
          "d": "Iniciativa de alto impacto y bajo esfuerzo que genera tracción y credibilidad tempranas."
        },
        {
          "t": "Matriz impacto-esfuerzo",
          "d": "Herramienta de priorización que clasifica iniciativas según su valor y su coste de implementación."
        },
        {
          "t": "Plan de gestión del cambio",
          "d": "Conjunto de planes de formación, comunicación y traspaso de conocimiento que habilitan la adopción."
        },
        {
          "t": "Cultura del dato",
          "d": "Uso sistemático del dato en la toma de decisiones a todos los niveles de la organización."
        },
        {
          "t": "Divulgación de casos de éxito",
          "d": "Comunicación de lecciones aprendidas y logros para reforzar la adopción en olas sucesivas."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> la metodología de implantación encadena un <em>boceto del primer roadmap a alto nivel</em> en el diagnóstico, su actualización tras el piloto (sinergias y lecciones aprendidas) y su refinamiento tras cada despliegue. La gestión del cambio se materializa en los entregables explícitos <em>Plan de Gestión del Cambio y Plan de Comunicación</em>, <em>Plan de Formación</em>, <em>Plan de Traspaso de Conocimientos</em> y <em>Cultura GD</em>. El despliegue global persigue la «Evolución de la Cultura del Dato», la «Incorporación paulatina de otras áreas» y la «Adaptación al cambio», generando contenido para la divulgación de lecciones aprendidas. En el assessment ALPAYANA_IA, Minsait sitúa la «Gestión del Cambio en Data e IA» como habilitación organizacional para la adopción, e identifica «quick wins y líneas de acción de corto, mediano y largo plazo» priorizadas por impacto-esfuerzo; en el frente operativo de Alpayana esto se traduce en adaptar el cambio a las áreas de mina y planta.",
      "quiz": [
        {
          "q": "Según el roadmap por olas y la matriz impacto-esfuerzo, ¿qué tipo de iniciativa debería ejecutarse primero?",
          "opciones": [
            "Un quick win de alto impacto y bajo esfuerzo",
            "Una apuesta estratégica de alto impacto y alto esfuerzo",
            "Una iniciativa de bajo impacto y alto esfuerzo",
            "Cualquier iniciativa, siguiendo el orden alfabético del backlog"
          ],
          "respuesta": 0,
          "explica": "Los quick wins (alto impacto, bajo esfuerzo) se ejecutan primero porque generan tracción y credibilidad, comprando el permiso político para las apuestas estratégicas posteriores."
        },
        {
          "q": "En la metodología Minsait, ¿cuál de estos NO es uno de los planes de la gestión del cambio del programa?",
          "opciones": [
            "Plan de formación",
            "Plan de retención fiscal del dato",
            "Plan de traspaso de conocimiento",
            "Plan de comunicación"
          ],
          "respuesta": 1,
          "explica": "Los tres planes reales de gestión del cambio son formación, comunicación y traspaso de conocimiento, complementados con la Cultura GD. El plan de retención fiscal no existe en la metodología."
        },
        {
          "q": "¿Qué condición hace idóneo a un caso de uso para ser quick win o piloto, según los criterios de Minsait?",
          "opciones": [
            "Que requiera el mayor esfuerzo técnico posible",
            "Que afecte a todas las áreas simultáneamente desde el día uno",
            "Que aporte beneficio, encuentre poca resistencia al cambio e impacte la percepción de los empleados",
            "Que no necesite ninguna comunicación a las áreas"
          ],
          "respuesta": 2,
          "explica": "Minsait valida la idoneidad del piloto por su beneficio, su baja resistencia al cambio y su impacto positivo en la opinión de los empleados, los mismos criterios que definen un buen quick win."
        },
        {
          "q": "¿Por qué la divulgación de casos de éxito es una actividad explícita del despliegue y no un extra opcional?",
          "opciones": [
            "Porque reduce el coste de las licencias de software",
            "Porque es un requisito legal del cumplimiento normativo",
            "Porque sustituye al plan de formación",
            "Porque refuerza la adopción y la cultura del dato ola tras ola"
          ],
          "respuesta": 3,
          "explica": "La cultura del dato no se decreta: se cultiva mostrando resultados. Divulgar lecciones aprendidas y logros refuerza la adopción a medida que se incorporan nuevas áreas en cada ola."
        },
        {
          "q": "En el frente operativo de minería (Alpayana, Pacasmayo, UNACEM), ¿qué enfoque de gestión del cambio resulta más eficaz?",
          "opciones": [
            "Quick wins hipertangibles y formación presencial por turnos",
            "Posponer la formación hasta el final del programa",
            "Enviar un único correo corporativo a toda la organización",
            "Desplegar todo el modelo de golpe sin piloto"
          ],
          "respuesta": 0,
          "explica": "En operaciones con baja exposición digital, la adopción se gana con quick wins muy tangibles y formación presencial adaptada a los turnos, no con comunicación genérica a distancia."
        }
      ]
    },
    {
      "id": "d24",
      "dia": 24,
      "bloque": "b4",
      "area": "Métricas & Valor",
      "icono": "📊",
      "estado": "full",
      "titulo": "Métricas, KPIs y medición de valor del gobierno",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer el cuadro de KPIs del modelo Minsait para gobierno y calidad, y a qué nivel aplica cada uno.",
        "Diseñar cuadros de mando de gobierno y de calidad orientados a la detección de incidentes y al análisis de causa.",
        "Construir el caso de valor del gobierno: del ROI clásico al enfoque Return On Intelligence y el impacto en la cuenta de resultados."
      ],
      "secciones": [
        {
          "h": "1. Por qué medir: lo que no se mide no se gobierna",
          "html": "<p>El gobierno del dato vive bajo sospecha permanente de ser <strong>coste sin retorno</strong>. La única defensa creíble ante un comité ejecutivo es un sistema de métricas que demuestre dos cosas: que el modelo <em>funciona</em> (cumplimiento, calidad, adopción) y que <em>genera valor</em> (ahorro, riesgo evitado, ingresos habilitados). La medición se diseña desde el inicio, no como un añadido al final.</p>\n        <p>Las métricas se definen <strong>según el nivel de aplicación</strong>: hay indicadores de gestión del modelo (estratégicos, para el comité) e indicadores de gestión operativa (tácticos, para los equipos que ejecutan los procesos). Confundir ambos niveles es un error clásico: al ejecutivo no le importa el detalle de una regla de calidad, le importa el riesgo regulatorio agregado.</p>"
        },
        {
          "h": "2. El cuadro de KPIs del modelo Minsait",
          "html": "<p>Minsait propone un conjunto de KPIs para monitorizar los componentes del modelo, diferenciando dos planos:</p>\n        <table class=\"cmp\"><thead><tr><th>Nivel</th><th>KPIs</th></tr></thead>\n        <tbody>\n        <tr><td>Gestión del modelo (estratégico)</td><td>Nº de casos de uso desplegados · reducción de costes · nivel de cumplimiento normativo o de la política y procesos · efectividad de la comunicación · reducción del riesgo</td></tr>\n        <tr><td>Gestión operativa (táctico)</td><td>Data Quality Indicator (DQI) · métricas asociadas a las ingestas y a la disponibilidad del dato</td></tr>\n        </tbody></table>\n        <p>El <strong>Data Quality Indicator</strong> agrega el resultado de las reglas de calidad ponderadas (por peso, dimensión y nivel de aceptación) en una cifra interpretable. Las métricas de ingesta y disponibilidad vigilan que el dato llegue a tiempo y esté accesible, el sustrato sobre el que todo lo demás se apoya.</p>"
        },
        {
          "h": "3. Cuadros de mando de gobierno y de calidad",
          "html": "<p>Los KPIs se materializan en <strong>cuadros de mando</strong>. Minsait subraya que un cuadro de mando de calidad no es decorativo: es una <em>herramienta de identificación de incidentes</em> y la base para el análisis de causa raíz. El seguimiento se apoya en el ciclo de mejora continua <strong>PDCA</strong> (Planificar, Hacer, Comprobar, Actuar).</p>\n        <ul>\n        <li>El cuadro de mando de gobierno integra: avance de implantaciones, alertas, problemas de seguridad, evolución del mapa de riesgos y volumen de peticiones del sistema de ticketing.</li>\n        <li>El cuadro de mando de calidad muestra la ejecución periódica de las reglas, su tendencia y los incidentes para priorizar la acción.</li>\n        </ul>\n        <p>A nivel de política se declara la obligación de <strong>revisar y auditar</strong> el modelo periódicamente; a nivel de proceso se definen los procedimientos para tratar recomendaciones y su plan de acción. La métrica sin gobernanza de la propia métrica es ruido.</p>"
        },
        {
          "h": "4. Del ROI al Return On Intelligence",
          "html": "<p>La medición de valor evoluciona desde el <strong>ROI clásico</strong> (retorno sobre la inversión de una iniciativa concreta) hacia una visión más amplia donde los casos de dato e IA se tratan como <strong>activos del negocio</strong> que deben valorarse antes de decidir la inversión. Cada iniciativa se ancla a su impacto estimado en la <em>cuenta de resultados</em>: ingresos, márgenes, costes, capital empleado.</p>\n        <p>Minsait introduce el enfoque <strong>Return On Intelligence</strong>: valorar el impacto en negocio de cada caso de uso de inteligencia, priorizarlo por esfuerzo-impacto y monitorizarlo a lo largo de todo su ciclo de vida. La lógica es que el gobierno del dato no se justifica por sí mismo, sino porque es la <em>condición habilitante</em> de una analítica e IA que sí mueven la cuenta de resultados.</p>"
        },
        {
          "h": "5. Benchmark: vincular madurez con valor",
          "html": "<p>Frente a marcos centrados en el <em>cómo</em> (DAMA-DMBOK2 describe funciones y entregables) y modelos de madurez como <strong>CMMI DMM</strong> o el de Stanford que miden el <em>nivel</em> de las prácticas, el reto MBB es <strong>conectar madurez con dinero</strong>. Subir un nivel de madurez no es un fin: solo importa si reduce un riesgo regulatorio, evita un retrabajo o desbloquea un caso de uso rentable.</p>\n        <p>En minería e industria (Alpayana, Pacasmayo, UNACEM), el valor se cuantifica sobre palancas concretas de la cuenta de resultados: optimización de la recuperación de mineral, reducción del consumo energético, optimización de pricing por calidad del mineral y mantenimiento predictivo de flota. El cuadro de mando ejecutivo debe hablar el idioma del CFO —EBITDA, márgenes, capital— no solo el del CDO.</p>"
        }
      ],
      "terminos": [
        {
          "t": "KPI de gestión del modelo",
          "d": "Indicador estratégico como casos de uso desplegados, reducción de costes o cumplimiento normativo."
        },
        {
          "t": "Data Quality Indicator (DQI)",
          "d": "Indicador operativo que agrega el resultado ponderado de las reglas de calidad del dato."
        },
        {
          "t": "Cuadro de mando de calidad",
          "d": "Herramienta de identificación de incidentes y base para el análisis de causa raíz."
        },
        {
          "t": "Ciclo PDCA",
          "d": "Modelo de mejora continua: Planificar, Hacer, Comprobar y Actuar sobre el modelo de gobierno."
        },
        {
          "t": "Return On Intelligence",
          "d": "Enfoque Minsait de valoración del impacto en negocio de cada caso de uso de inteligencia."
        },
        {
          "t": "Impacto en cuenta de resultados",
          "d": "Estimación del efecto de cada iniciativa sobre ingresos, márgenes, costes y capital empleado."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en la fase de monitorización y mejora continua, la metodología define KPIs de <em>gestión del modelo</em> (número de casos de uso desplegados, reducción de costes, nivel de cumplimiento normativo o de la política y procesos, efectividad de la comunicación, reducción del riesgo) y de <em>gestión operativa</em> (Data Quality Indicator y métricas asociadas a las ingestas y disponibilidad del dato). Propone cuadros de mando para monitorizar los componentes del modelo —el de calidad sirve como herramienta de identificación de incidentes y base del análisis de causa— y declara a nivel de política la necesidad de revisar y auditar el modelo siguiendo un ciclo PDCA. En el assessment ALPAYANA_IA, Minsait añade la visión de valor: los casos de IA son «activos del negocio» que deben valorarse, estimando el impacto de cada iniciativa en la cuenta de resultados de la compañía bajo el enfoque «Return On Intelligence», que se aplica tanto en la valoración inicial como en la monitorización integral avanzada.",
      "quiz": [
        {
          "q": "¿En qué nivel del cuadro de KPIs Minsait se ubica el Data Quality Indicator?",
          "opciones": [
            "En la gestión del modelo (estratégico)",
            "En la gestión operativa (táctico)",
            "En el plan de comunicación",
            "En la matriz de riesgos legales"
          ],
          "respuesta": 1,
          "explica": "El DQI es un KPI de gestión operativa, junto con las métricas de ingesta y disponibilidad; los KPIs de gestión del modelo son estratégicos (casos de uso, costes, cumplimiento, comunicación, riesgo)."
        },
        {
          "q": "Según Minsait, ¿cuál es la función principal de un cuadro de mando de calidad?",
          "opciones": [
            "Sustituir las reglas de calidad por dashboards visuales",
            "Calcular la nómina del equipo de gobierno",
            "Servir como herramienta de identificación de incidentes y base para el análisis de causa",
            "Reemplazar al comité del dato en la toma de decisiones"
          ],
          "respuesta": 2,
          "explica": "Minsait define el cuadro de mando de calidad como herramienta de identificación de incidentes y base para el análisis de causa raíz, dentro del ciclo de mejora continua PDCA."
        },
        {
          "q": "¿Qué propone el enfoque Return On Intelligence de Minsait?",
          "opciones": [
            "Eliminar todas las métricas de calidad del dato",
            "Medir solo el coste de las licencias de software",
            "Auditar únicamente el cumplimiento del RGPD",
            "Valorar el impacto en negocio de cada caso de inteligencia y monitorizarlo en su ciclo de vida"
          ],
          "respuesta": 3,
          "explica": "Return On Intelligence trata los casos de IA como activos del negocio, valorando su impacto en la cuenta de resultados y monitorizándolo a lo largo de todo su ciclo de vida."
        },
        {
          "q": "¿Cuál de los siguientes es un KPI de gestión del modelo (nivel estratégico) según Minsait?",
          "opciones": [
            "Nivel de cumplimiento normativo o de la política y procesos",
            "Latencia de la ingesta nocturna",
            "Número de columnas tipadas en el metamodelo",
            "Tiempo de respuesta de la API del catálogo"
          ],
          "respuesta": 0,
          "explica": "El nivel de cumplimiento normativo es un KPI de gestión del modelo, junto con casos de uso desplegados, reducción de costes, efectividad de la comunicación y reducción del riesgo."
        },
        {
          "q": "Para un comité ejecutivo de una minera, ¿cómo debe expresarse principalmente el valor del gobierno del dato?",
          "opciones": [
            "Como número de reglas de calidad escritas por el equipo técnico",
            "Vinculado a palancas de la cuenta de resultados: márgenes, costes y EBITDA",
            "Como cantidad de reuniones del comité del dato celebradas",
            "Como volumen de documentación generada en el repositorio"
          ],
          "respuesta": 1,
          "explica": "El cuadro de mando ejecutivo debe hablar el idioma del CFO: el valor se conecta con ingresos, márgenes, costes y EBITDA, no con métricas técnicas internas que no resuenan en la dirección."
        }
      ]
    },
    {
      "id": "d25",
      "dia": 25,
      "bloque": "b4",
      "area": "Tecnologías",
      "icono": "🛠️",
      "estado": "full",
      "titulo": "Tecnologías y proveedores (Collibra, Informatica, Purview…)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Mapear el ecosistema de herramientas: catálogos y gobierno, calidad del dato y plataformas de datos.",
        "Aplicar criterios de selección y redactar una licitación o RFP de herramienta de gobierno.",
        "Coordinar el modelo de gobierno con las capacidades de la herramienta y razonar el TCO y la tecnología habilitadora."
      ],
      "secciones": [
        {
          "h": "1. El mapa de herramientas: tres capas, no una",
          "html": "<p>El mercado de tecnología de datos confunde a menudo tres capas que cumplen funciones distintas. Separarlas es el primer paso para no comprar lo que no se necesita:</p>\n        <table class=\"cmp\"><thead><tr><th>Capa</th><th>Función</th><th>Ejemplos representativos</th></tr></thead>\n        <tbody>\n        <tr><td>Catálogo y gobierno</td><td>Glosario, catálogo, linaje, metadatos, flujos de gobierno</td><td>Collibra · Informatica · Microsoft Purview · Alation · Atlan</td></tr>\n        <tr><td>Calidad del dato</td><td>Definición y ejecución de reglas, perfilado, validaciones</td><td>Informatica DQ · Great Expectations</td></tr>\n        <tr><td>Plataforma de datos</td><td>Almacenamiento, procesamiento, analítica y explotación</td><td>Databricks · Snowflake · Azure · AWS · Microsoft Fabric · Palantir</td></tr>\n        </tbody></table>\n        <p>Una suite de gobierno como <strong>Collibra</strong> o <strong>Purview</strong> no hace por sí sola calidad industrial, ni una plataforma como <strong>Databricks</strong> sustituye un catálogo de negocio. El diseño correcto combina las tres capas de forma interoperable.</p>"
        },
        {
          "h": "2. Catálogos, calidad y plataformas en detalle",
          "html": "<p>En la <strong>capa de catálogo y gobierno</strong>, Collibra e Informatica son las apuestas «enterprise» consolidadas; Microsoft Purview es la opción natural en organizaciones Azure; Alation destaca en data discovery y Atlan en experiencia de usuario y enfoque cloud-native moderno.</p>\n        <p>En <strong>calidad</strong>, Informatica Data Quality ofrece capacidades robustas integradas en su suite, mientras que <em>Great Expectations</em> es la alternativa open-source para embeber validaciones (expectations) directamente en los pipelines, alineada con la práctica DataOps de testeo automático.</p>\n        <p>En <strong>plataformas</strong>, conviven el lakehouse (Databricks), el data warehouse cloud (Snowflake), las nubes (Azure, AWS), la plataforma unificada Microsoft Fabric y Palantir como capa analítica y operacional de alto nivel. La arquitectura medallón (bronze/silver/gold) es el patrón de organización transversal a varias de ellas.</p>"
        },
        {
          "h": "3. Criterios de selección y la licitación (RFP)",
          "html": "<p>La selección de herramienta no es una decisión técnica aislada: es un proceso de <strong>licitación</strong> que la consultora apoya redactando el documento de solicitud de requerimientos a proveedores (RFP). Criterios clave a ponderar:</p>\n        <ul>\n        <li><strong>Cobertura funcional:</strong> ¿soporta glosario, catálogo, linaje, calidad y los flujos de trabajo automatizados que exige el modelo?</li>\n        <li><strong>Encaje tecnológico:</strong> conectores con el stack existente (ETL, big data, BI) y con la nube de la organización.</li>\n        <li><strong>Capacidad de automatización:</strong> permitir aplicar políticas de forma automatizada en lugar de procedimientos manuales.</li>\n        <li><strong>Alineación con capacidades internas, escalabilidad e interoperabilidad</strong>, junto con el modelo de roles que la herramienta trae de serie.</li>\n        </ul>\n        <p>La pregunta MBB no es «¿cuál es la mejor herramienta?» sino «¿cuál es la mejor herramienta <em>para esta organización</em>, su madurez y su stack?».</p>"
        },
        {
          "h": "4. Coordinar el modelo con las capacidades de la herramienta",
          "html": "<p>Uno de los <strong>factores de éxito críticos</strong> del proyecto es coordinar la definición del modelo de gobierno con la herramienta seleccionada. El error frecuente es diseñar procesos en abstracto y descubrir después que la herramienta no los soporta.</p>\n        <p>La disciplina correcta: conocer las capacidades de la herramienta <em>antes</em> de empezar las definiciones (al menos roles existentes y capacidades de alto nivel) y verificar, al cierre de cada definición, que la herramienta permite los flujos de trabajo definidos, validándolo con el equipo de implementación. Los procesos del diccionario y de calidad se definen tomando en consideración las funcionalidades disponibles en la herramienta de gobierno.</p>"
        },
        {
          "h": "5. TCO y tecnología habilitadora",
          "html": "<p>La decisión final pondera el <strong>TCO (coste total de propiedad)</strong>: licencias, infraestructura, operación y mantenimiento a medio y largo plazo, no solo el precio de entrada. Una herramienta potente pero inasumible o que genera deuda técnica destruye valor.</p>\n        <p>El pilar de <strong>Tecnología Habilitadora</strong> resume el principio rector: la tecnología debe <em>habilitar</em> el modelo operativo deseado, no limitarlo ni condicionar su adopción. Se prioriza el stack cloud-native, abierto, escalable e interoperable, alineado con las capacidades del equipo actual. En contextos como Alpayana, Pacasmayo o UNACEM —con sistemas heredados y restricciones de conectividad en operaciones— el criterio de encaje real con la infraestructura existente pesa tanto como la sofisticación del producto.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Catálogo de gobierno",
          "d": "Herramienta que gestiona glosario, catálogo, linaje y metadatos (Collibra, Purview, Alation, Atlan)."
        },
        {
          "t": "Great Expectations",
          "d": "Librería open-source para embeber validaciones de calidad como expectations en los pipelines."
        },
        {
          "t": "Arquitectura medallón",
          "d": "Patrón de capas bronze, silver y gold para organizar el dato en plataformas como Databricks."
        },
        {
          "t": "RFP / licitación",
          "d": "Documento de solicitud de requerimientos a proveedores para seleccionar la herramienta de gobierno."
        },
        {
          "t": "TCO",
          "d": "Coste total de propiedad: licencias, infraestructura, operación y mantenimiento a largo plazo."
        },
        {
          "t": "Tecnología habilitadora",
          "d": "Stack que habilita el modelo operativo sin limitarlo ni condicionar su adopción."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> la metodología establece que uno de los factores de éxito es <em>coordinar la definición del modelo con la herramienta tecnológica seleccionada</em>: conocer sus capacidades y roles antes de definir, relacionar cada procedimiento con la herramienta y verificar al final que permite los flujos de trabajo definidos. Minsait apoya la <em>redacción de la licitación de la herramienta de Gobierno del Dato</em> (documento de solicitud de requerimientos a proveedores) y recomienda aplicar políticas de forma automatizada en vez de procedimientos manuales. El assessment ALPAYANA_IA muestra el stack real desplegado en sus casos —Databricks, Snowflake, AWS, Azure, Microsoft Fabric, Power BI, Palantir, DBT y orquestación Control-M— e incorpora los pilares de <em>Coste Total y Sostenibilidad (TCO)</em> y <em>Tecnología Habilitadora</em>, que evalúan que el stack sea abierto, escalable, interoperable y alineado con las capacidades internas sin generar deuda técnica.",
      "quiz": [
        {
          "q": "¿A qué capa del ecosistema pertenece principalmente Great Expectations?",
          "opciones": [
            "Catálogo y gobierno de metadatos",
            "Plataforma de almacenamiento masivo",
            "Calidad del dato",
            "Visualización ejecutiva"
          ],
          "respuesta": 2,
          "explica": "Great Expectations es una librería open-source de calidad del dato que embebe validaciones (expectations) en los pipelines; no es un catálogo de gobierno ni una plataforma de almacenamiento."
        },
        {
          "q": "Según Minsait, ¿cuál es uno de los factores de éxito críticos al seleccionar y usar la herramienta?",
          "opciones": [
            "Diseñar todos los procesos en abstracto y elegir la herramienta al final sin verificar nada",
            "Prohibir la automatización de políticas para mantener control manual",
            "Comprar siempre la herramienta más cara del mercado",
            "Coordinar la definición del modelo con las capacidades de la herramienta seleccionada"
          ],
          "respuesta": 3,
          "explica": "Minsait subraya que coordinar la definición del modelo con la herramienta —conociendo sus capacidades antes y verificando los flujos al final— es un factor de éxito del proyecto."
        },
        {
          "q": "¿Qué representa el concepto de TCO en la selección de una herramienta de gobierno?",
          "opciones": [
            "El coste total de propiedad: licencias, infraestructura, operación y mantenimiento a largo plazo",
            "Solo el precio de las licencias iniciales",
            "El número total de usuarios conectados",
            "El tiempo de carga del catálogo"
          ],
          "respuesta": 0,
          "explica": "El TCO contempla el coste total a medio y largo plazo —licencias, infraestructura, operación y mantenimiento— y no solo el precio de entrada, evitando soluciones que generen deuda técnica."
        },
        {
          "q": "Según el pilar de Tecnología Habilitadora del assessment Minsait, la tecnología debe…",
          "opciones": [
            "Limitar el modelo para forzar la disciplina del equipo",
            "Habilitar el modelo operativo deseado sin limitarlo ni condicionar su adopción",
            "Imponer un proveedor único y cerrado",
            "Reemplazar por completo el rol del comité del dato"
          ],
          "respuesta": 1,
          "explica": "El pilar de Tecnología Habilitadora establece que el stack debe habilitar el modelo —abierto, escalable, interoperable y alineado con las capacidades internas— y nunca limitarlo o condicionar su adopción."
        },
        {
          "q": "¿Cuál de estas herramientas es un catálogo de gobierno y metadatos, no una plataforma de procesamiento?",
          "opciones": [
            "Snowflake",
            "Databricks",
            "Collibra",
            "Microsoft Fabric"
          ],
          "respuesta": 2,
          "explica": "Collibra es una suite de catálogo y gobierno de metadatos; Databricks, Snowflake y Microsoft Fabric son plataformas de datos de almacenamiento y procesamiento."
        }
      ]
    },
    {
      "id": "d26",
      "dia": 26,
      "bloque": "b5",
      "area": "Caso práctico",
      "icono": "🏭",
      "estado": "full",
      "titulo": "Caso integrador I: diseñar un programa de gobierno (minería)",
      "tiempo": "60–75 min",
      "objetivos": [
        "Leer el contexto de una minera con silos y gobierno en papel, y traducirlo a decisiones de alcance.",
        "Priorizar dominios y un caso de uso piloto con criterios de impacto, esfuerzo y replicabilidad.",
        "Diseñar un Gobierno Mínimo Viable que permita arrancar sin esperar a tenerlo todo."
      ],
      "secciones": [
        {
          "h": "1. El contexto: una minera con el dato fragmentado",
          "html": "<p>Te incorporas como consultor a <strong>una compañía minera</strong> (perfil estilo Alpayana). El\n        entendimiento inicial de la situación arroja un cuadro muy reconocible en el sector:</p>\n        <ul>\n          <li><strong>Silos de información</strong>: el dato vive repartido entre <em>Excel, SAP, LIMS, Canary, Fusion y\n          Ventsim</em>, con baja integración transversal y alta dependencia de registros manuales.</li>\n          <li><strong>Desconexión IT–OT</strong>: los sistemas de gestión (IT) y los de operación (OT, planta y\n          mantenimiento) no conversan, lo que limita la trazabilidad y la visibilidad operativa.</li>\n          <li><strong>Gobierno en papel</strong>: existen normas y procedimientos en documentos técnicos que los equipos\n          operativos no usan en el día a día.</li>\n          <li><strong>KPIs sin definición única</strong> entre áreas y una <strong>brecha de data literacy</strong> con\n          resistencia al cambio en el frente operativo.</li>\n        </ul>\n        <p>El sponsor te pide algo muy concreto: un <em>arranque accionable</em>, no un marco teórico\n        sobredimensionado.</p>"
        },
        {
          "h": "2. Acotar el alcance (no boil the ocean)",
          "html": "<p>El primer error sería intentar gobernar toda la corporación a la vez. La práctica de Minsait es\n        <strong>arrancar acotado y replicable</strong>: se elige una <em>unidad piloto</em> (por ejemplo, Planta y\n        Mantenimiento) que sea representativa y donde el dato ya tenga cierta tracción. El alcance del programa se define\n        por dominios de datos, no por sistemas, y se ata al <strong>caso de valor</strong>: ¿qué decisión de negocio\n        mejora si gobernamos este dato? La regla es <em>maduración sobre capacidades existentes</em>: ordenar, priorizar\n        y escalar lo que ya hay, no partir de cero.</p>"
        },
        {
          "h": "3. Priorizar dominios y elegir el piloto",
          "html": "<p>Para priorizar dominios de datos conviene cruzar <strong>criticidad del dato</strong> (impacto en\n        decisiones, riesgo, dinero) con <strong>viabilidad</strong> (calidad y disponibilidad del dato hoy). El caso de\n        uso piloto se elige cuando coinciden tres condiciones que Minsait usa como criterios:</p>\n        <ul>\n          <li><strong>Beneficio claro</strong> y medible para el negocio (p. ej. mantenimiento predictivo que evita\n          paradas no planificadas).</li>\n          <li><strong>Poca resistencia al cambio</strong>: un área dispuesta a colaborar y a aportar evidencia temprana.</li>\n          <li><strong>Replicabilidad</strong>: que el modelo del piloto sirva de molde para escalar a otras unidades, no\n          una solución cerrada.</li>\n        </ul>\n        <p>Antes de invertir en desarrollo se confirma la <strong>viabilidad del caso de uso</strong>: ¿la data actual\n        soporta el análisis que queremos hacer? Ese es el filtro de realidad.</p>"
        },
        {
          "h": "4. El Gobierno Mínimo Viable (GMV)",
          "html": "<p>El objetivo del arranque no es un modelo perfecto, sino un <strong>Gobierno Mínimo Viable</strong>:\n        el conjunto básico de piezas que permite empezar a gobernar y demostrar valor. Como mínimo incluye:</p>\n        <ul>\n          <li><strong>Roles básicos</strong>: identificar <em>data owners</em> por dominio y al menos un\n          <em>data steward</em> operativo.</li>\n          <li><strong>Estándares mínimos</strong>: definiciones únicas de los KPIs críticos y reglas de calidad sobre las\n          variables más sensibles.</li>\n          <li><strong>Un proceso vivo</strong>: típicamente el <em>glosario de negocio</em> para fijar el mismo lenguaje\n          de datos entre operación y áreas funcionales.</li>\n        </ul>\n        <p>El GMV se prueba en el piloto <em>end-to-end</em> y, una vez validado, se refina y se convierte en el estándar\n        a desplegar. Es la lógica de las fases <strong>AS IS → MODELO DG → PILOTO</strong> aplicada en miniatura.</p>"
        },
        {
          "h": "5. El marco que ordena la decisión",
          "html": "<p>Todo lo anterior se ancla en la metodología: el <strong>assessment de madurez (AS IS)</strong> fija la\n        línea base y las brechas; la <strong>estrategia del dato</strong> conecta el programa con los objetivos\n        operativos (eficiencia, margen, reducción de costos); y el <strong>caso de valor</strong> asegura el patrocinio\n        ejecutivo. Sin diagnóstico no hay prioridades creíbles; sin caso de valor no hay sponsor; sin piloto no hay\n        evidencia para escalar. Esa es la cadena que un buen diseño de programa respeta.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno Mínimo Viable",
          "d": "Conjunto básico de roles, owners y estándares que permite empezar a gobernar y demostrar valor."
        },
        {
          "t": "Unidad piloto",
          "d": "Área representativa y replicable donde se prueba el modelo antes del despliegue corporativo."
        },
        {
          "t": "Criterios del piloto",
          "d": "Beneficio claro, poca resistencia al cambio y replicabilidad a otras unidades."
        },
        {
          "t": "Dominio de datos",
          "d": "Agrupación de datos por ámbito de negocio que se prioriza por criticidad y viabilidad."
        },
        {
          "t": "Viabilidad del caso de uso",
          "d": "Confirmar que la data actual soporta el análisis antes de invertir en desarrollo."
        },
        {
          "t": "Maduración sobre lo existente",
          "d": "Ordenar, priorizar y escalar las capacidades parciales que ya tiene la organización."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en el assessment de minería (estilo Alpayana), el entendimiento de la\n    situación detecta silos (Excel, SAP, LIMS, Canary, Fusion, Ventsim), desconexión IT–OT y gobierno en papel. La\n    respuesta no es comprar tecnología, sino diseñar un <em>modelo de gobierno ágil y replicable</em>: definir un\n    <em>Gobierno Mínimo Viable</em> (roles, data owners, estándares básicos), confirmar la viabilidad del caso de uso y\n    arrancar por una unidad piloto, siguiendo las fases AS IS → MODELO DG → PILOTO.",
      "quiz": [
        {
          "q": "El sponsor pide un arranque accionable. Ante silos en seis sistemas, ¿cuál es la mejor primera decisión?",
          "opciones": [
            "Integrar de golpe los seis sistemas en un único data lake corporativo",
            "Comprar primero la herramienta de gobierno más cara del mercado",
            "Redactar la política de gobierno completa para toda la corporación antes de tocar el dato",
            "Acotar el alcance a una unidad piloto representativa y replicable, atada a un caso de valor"
          ],
          "respuesta": 3,
          "explica": "Minsait arranca acotado y replicable: una unidad piloto atada al caso de valor evita boil the ocean y da evidencia temprana."
        },
        {
          "q": "Tienes tres dominios candidatos a piloto. ¿Qué combinación de criterios usarías para elegir?",
          "opciones": [
            "Beneficio claro, poca resistencia al cambio y replicabilidad del modelo",
            "El dominio del área con más antigüedad en la empresa",
            "El dominio con más tablas, sin importar su calidad",
            "El dominio que menos personas conocen, para no generar fricción"
          ],
          "respuesta": 0,
          "explica": "Son los tres criterios de selección de piloto de Minsait: beneficio, baja fricción y capacidad de escalar a otras unidades."
        },
        {
          "q": "El equipo quiere lanzar ya un modelo predictivo de fallas. ¿Qué deberías exigir antes de invertir?",
          "opciones": [
            "Contratar de inmediato a cinco data scientists",
            "Confirmar la viabilidad del caso de uso: que la data actual soporte el análisis",
            "Saltar el diagnóstico para ganar tiempo",
            "Definir el presupuesto del despliegue corporativo completo"
          ],
          "respuesta": 1,
          "explica": "Es el filtro de realidad: antes de desarrollar se confirma que la data existente sostiene el caso de uso."
        },
        {
          "q": "Para definir el Gobierno Mínimo Viable, ¿qué piezas son las indispensables para arrancar?",
          "opciones": [
            "Un organigrama completo con CDO, comités y RACI de toda la empresa",
            "Solo la compra de licencias de software de catálogo",
            "Roles básicos (data owners y un steward), estándares mínimos de KPIs y un proceso vivo como el glosario",
            "Un informe de auditoría externa de los seis sistemas"
          ],
          "respuesta": 2,
          "explica": "El GMV es lo mínimo para empezar a gobernar y demostrar valor: roles, estándares y un proceso operativo, no el modelo perfecto."
        },
        {
          "q": "La 'desconexión IT–OT' del caso significa que…",
          "opciones": [
            "El área de TI no tiene presupuesto",
            "No existe ningún sistema informático en planta",
            "Los datos están todos en la nube",
            "Los sistemas de gestión (IT) y los de operación (OT) no se integran, limitando trazabilidad y visibilidad"
          ],
          "respuesta": 3,
          "explica": "IT–OT es el pain point típico de industria/minería: gestión y operación funcionan como islas sin integración."
        }
      ]
    },
    {
      "id": "d27",
      "dia": 27,
      "bloque": "b5",
      "area": "Caso práctico",
      "icono": "🏭",
      "estado": "full",
      "titulo": "Caso integrador II: organización, políticas y roadmap",
      "tiempo": "60–75 min",
      "objetivos": [
        "Diseñar el modelo organizativo del programa (federado, comités, owners/stewards y RACI).",
        "Seleccionar las políticas clave que dan el primer marco normativo del dato.",
        "Construir un roadmap por horizontes con quick wins de los primeros 90 días."
      ],
      "secciones": [
        {
          "h": "1. El modelo organizativo: federado para una minera multiunidad",
          "html": "<p>Continuamos el caso. La minera tiene varias unidades y áreas que históricamente operan como islas. El\n        modelo recomendado por Minsait para grandes corporaciones es el <strong>federado</strong>: grupos de gestión del\n        dato en cada línea de negocio más una <em>unidad central de excelencia</em> que busca sinergia y coherencia.\n        Equilibra dos fuerzas: la <em>agilidad</em> de que cada dominio gestione lo suyo y la <em>consistencia</em> de un\n        estándar común. El centralizado puro sería cuello de botella; el descentralizado puro perpetuaría los silos.</p>"
        },
        {
          "h": "2. Órganos de gobierno y roles",
          "html": "<p>Sobre ese modelo se montan los <strong>órganos de gobierno</strong> con su periodicidad, integrantes y\n        agenda:</p>\n        <ul>\n          <li><strong>Sponsor / Comité Directivo</strong>: patrocinio ejecutivo; alinea el dato con la estrategia de\n          negocio y desbloquea recursos.</li>\n          <li><strong>Comité de Gobierno del Dato</strong> (y de <strong>Calidad</strong>): decide sobre ámbitos de\n          gobierno, calidad y seguridad.</li>\n          <li><strong>Comités operativos</strong>: visión operativa, seguimiento de impactos y mejora.</li>\n        </ul>\n        <p>Y los <strong>roles</strong>: <em>CDO</em> al frente; <em>Data Owners</em> de negocio (control y aprobación de\n        su ámbito); <em>Data Stewards</em> (definen y aplican calidad, glosario y metadatos); <em>Data Custodians</em>\n        (controles técnicos); con apoyo de <em>CISO</em> y <em>DPO</em>. Cada paso de cada procedimiento se clarifica con\n        una <strong>matriz RACI</strong> (Responsable, Aprobador, Consultado, Informado).</p>"
        },
        {
          "h": "3. Las políticas clave para arrancar",
          "html": "<p>No se redactan todas las políticas a la vez; se priorizan las que el caso necesita primero:</p>\n        <ul>\n          <li><strong>Política de gobierno</strong> (marco): directrices, alcance, órganos, roles y lista de\n          procesos/procedimientos.</li>\n          <li><strong>Calidad de datos</strong>: principios, responsabilidades y flujo de remediación sobre los KPIs y\n          variables críticas.</li>\n          <li><strong>Metadatos y glosario</strong>: definición y aprobación de los términos de negocio (la verdad\n          única).</li>\n          <li><strong>Seguridad y clasificación</strong> (alineada a ISO 27001) y <strong>privacidad</strong> (Ley 29733\n          en Perú).</li>\n        </ul>\n        <p>Cada proceso se documenta con descripción, <strong>flujograma BPMN</strong> y RACI, y cubre como mínimo el\n        ciclo de alta, actualización y baja.</p>"
        },
        {
          "h": "4. El roadmap por horizontes",
          "html": "<p>El roadmap se ordena por <strong>horizontes</strong>, priorizando por impacto y esfuerzo:</p>\n        <table class=\"cmp\">\n          <thead><tr><th>Horizonte</th><th>Foco</th></tr></thead>\n          <tbody>\n            <tr><td>Corto (0–3 meses)</td><td>Quick wins: glosario y KPIs únicos, data owners nombrados, reglas de calidad mínimas</td></tr>\n            <tr><td>Medio (3–12 meses)</td><td>Piloto end-to-end, catálogo y linaje básicos, comités en marcha, políticas clave aprobadas</td></tr>\n            <tr><td>Largo (12+ meses)</td><td>Roll out a otras unidades, automatización en herramienta, métricas de valor y cultura data-driven</td></tr>\n          </tbody>\n        </table>\n        <p>El roadmap debe ser <strong>replicable</strong> (no cerrado al piloto) y acompañarse de un plan de\n        <strong>gestión del cambio</strong>: comunicación ejecutiva, formación por rol (data literacy) y evidencia\n        temprana de resultados para vencer la resistencia.</p>"
        },
        {
          "h": "5. Quick wins: por qué importan",
          "html": "<p>Un <strong>quick win</strong> es una iniciativa de <strong>alto impacto y baja fricción</strong>\n        ejecutable en los primeros 90 días sin depender de cambios tecnológicos mayores. En el caso de minería, definir\n        de forma única los KPIs en disputa o nombrar a los data owners cuesta poco y genera confianza inmediata. Los\n        quick wins financian la credibilidad del programa: dan resultados visibles que sostienen el patrocinio mientras\n        maduran las piezas estructurales (catálogo, linaje, despliegue).</p>"
        }
      ],
      "terminos": [
        {
          "t": "Modelo federado",
          "d": "Grupos por línea de negocio más una unidad central de excelencia; equilibra agilidad y coherencia."
        },
        {
          "t": "Comités de gobierno",
          "d": "Sponsor/Directivo, Comité de Gobierno y Calidad, y comités operativos, con agenda y periodicidad."
        },
        {
          "t": "Matriz RACI",
          "d": "Responsable, Aprobador, Consultado, Informado: clarifica roles en cada paso de un procedimiento."
        },
        {
          "t": "Política de gobierno",
          "d": "Documento marco con directrices, alcance, órganos, roles y la lista de procesos y procedimientos."
        },
        {
          "t": "Roadmap por horizontes",
          "d": "Plan por corto, medio y largo plazo, priorizado por impacto y esfuerzo, y replicable."
        },
        {
          "t": "Quick win",
          "d": "Iniciativa de alto impacto y baja fricción ejecutable en los primeros 90 días."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el diseño de organización (modelo federado, comités, owners/stewards y RACI)\n    junto con las políticas y procesos en <em>BPMN</em> es el entregable central de la fase <em>MODELO DG</em>. El roadmap\n    priorizado de corto, medio y largo plazo con quick wins y estimación de impacto/esfuerzo es el cierre de la fase\n    AS IS y se actualiza tras el piloto, siempre acompañado de gestión del cambio y data literacy.",
      "quiz": [
        {
          "q": "La minera tiene varias unidades que operan como islas. ¿Qué modelo organizativo propondrías?",
          "opciones": [
            "Federado: grupos por línea más una unidad central de excelencia",
            "Descentralizado puro, para que cada área haga lo suyo sin coordinación",
            "Centralizado puro, para mandar todo desde una sola unidad",
            "Ningún modelo formal, para no añadir burocracia"
          ],
          "respuesta": 0,
          "explica": "El federado equilibra agilidad por dominio y coherencia central; es el recomendado para grandes corporaciones multiunidad."
        },
        {
          "q": "Hay que clarificar quién aprueba cada paso del procedimiento de alta de un término. ¿Qué herramienta usas?",
          "opciones": [
            "Un diagrama de Gantt",
            "Una matriz RACI",
            "Un balance contable",
            "Un mapa de calor de riesgos"
          ],
          "respuesta": 1,
          "explica": "RACI asigna Responsable, Aprobador, Consultado e Informado en cada paso, evitando vacíos y duplicidades."
        },
        {
          "q": "Con recursos limitados, ¿qué política conviene priorizar primero para el caso de minería?",
          "opciones": [
            "La política de teletrabajo de RR.HH.",
            "Una política de viajes corporativos",
            "Las políticas de calidad y de metadatos/glosario, para fijar KPIs únicos y la verdad única",
            "La política de marketing de marca"
          ],
          "respuesta": 2,
          "explica": "Calidad y glosario atacan directamente los KPIs sin definición única y los silos semánticos del caso."
        },
        {
          "q": "El directorio pide ver resultados en 90 días. ¿Qué tipo de iniciativa propones?",
          "opciones": [
            "Un roll out corporativo completo de inmediato",
            "Suspender el programa hasta el próximo año fiscal",
            "Esperar 12 meses a tener la herramienta perfecta",
            "Quick wins de alto impacto y baja fricción, como definir KPIs únicos y nombrar data owners"
          ],
          "respuesta": 3,
          "explica": "Los quick wins dan evidencia temprana y sostienen el patrocinio mientras maduran las piezas estructurales."
        },
        {
          "q": "¿Cómo se documentan los procesos de gobierno en la fase MODELO DG según Minsait?",
          "opciones": [
            "Con descripción, flujograma BPMN y matriz RACI, cubriendo alta, actualización y baja",
            "Solo con texto libre en un correo",
            "Únicamente con código SQL",
            "Con un video tutorial sin diagrama"
          ],
          "respuesta": 0,
          "explica": "Minsait documenta cada procedimiento en BPMN con RACI y cubre el ciclo completo del concepto/activo."
        }
      ]
    },
    {
      "id": "d28",
      "dia": 28,
      "bloque": "b5",
      "area": "Repaso",
      "icono": "🔁",
      "estado": "full",
      "titulo": "Repaso espaciado: Fundamentos + Áreas DAMA",
      "tiempo": "45–60 min",
      "objetivos": [
        "Consolidar los fundamentos del Bloque 1 (gobierno vs gestión, Rueda DAMA, benchmark, estrategia, roles).",
        "Repasar las áreas de conocimiento del Bloque 2 (políticas, metadatos, calidad, MDM, seguridad).",
        "Recuperar de memoria los conceptos clave con preguntas mezcladas."
      ],
      "secciones": [
        {
          "h": "1. Fundamentos: gobierno ≠ gestión y la Rueda DAMA",
          "html": "<p><strong>Gobierno del dato</strong> = autoridad y control: define <em>qué hacer y quién decide</em>\n        (estrategia, políticas, roles, métricas). <strong>Gestión de datos</strong> = <em>ejecuta</em> esas decisiones.\n        La <strong>Rueda DAMA</strong> ordena la disciplina en <strong>11 áreas</strong>: el gobierno en el centro como\n        eje de balance y sinergia, más 10 áreas de gestión alrededor. El principio de fondo es tratar el\n        <strong>dato como activo</strong>: confiable, de calidad, conocido y de uso universal.</p>"
        },
        {
          "h": "2. Benchmark de marcos y estrategia",
          "html": "<p>Los marcos se combinan según para qué sirve cada uno:</p>\n        <ul>\n          <li><strong>DAMA-DMBOK2</strong>: lenguaje común y cobertura integral (11 áreas).</li>\n          <li><strong>DCAM / CMMI DMM</strong>: medir capacidades y madurez (DCAM fuerte en finanzas).</li>\n          <li><strong>DGI Framework</strong>: diseñar la organización y los <em>derechos de decisión</em>.</li>\n          <li><strong>ISO</strong> (8000 calidad, 11179 metadatos, 38505 gobierno, 27001 seguridad): rigor normativo.</li>\n        </ul>\n        <p>La <strong>estrategia del dato</strong> (pilar Minsait) define el QUÉ y el PORQUÉ, balanceando enfoque\n        <em>defensivo</em> (control, cumplimiento) y <em>ofensivo</em> (crecer con analítica/IA), y se sostiene en un\n        <strong>caso de valor</strong> para conseguir patrocinio.</p>"
        },
        {
          "h": "3. Roles y políticas",
          "html": "<p><strong>Roles</strong>: el <em>CDO</em> dirige; el <em>Data Owner</em> es accountable por su ámbito; el\n        <em>Data Steward</em> es el rol operativo del día a día (calidad, glosario, metadatos); el <em>Data Custodian</em>\n        aplica los controles técnicos. El modelo organizativo recomendado para grandes corporaciones es el\n        <strong>federado</strong>.</p>\n        <p><strong>Jerarquía normativa</strong>: Principios → Política de gobierno → Estándares → Procedimientos. Los\n        procesos se documentan en <strong>BPMN con RACI</strong> y cubren alta, actualización y baja.</p>"
        },
        {
          "h": "4. Metadatos, calidad, MDM y seguridad",
          "html": "<ul>\n          <li><strong>Metadatos</strong> = datos sobre los datos. Tipos Minsait: negocio, técnica, seguridad/privacidad,\n          origen/destino y otros. El <em>glosario</em> da la verdad única; el <em>catálogo</em> une glosario + técnico +\n          <em>linaje</em>.</li>\n          <li><strong>Calidad</strong>: dimensiones, perfilado y ciclo de remediación sobre el dato crítico.</li>\n          <li><strong>MDM/RDM</strong>: gobierna los datos maestros y de referencia (una sola versión de la verdad).</li>\n          <li><strong>Seguridad y privacidad</strong>: clasificación de la información, controles (ISO 27001) y\n          protección de datos personales (Ley 29733 en Perú).</li>\n        </ul>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno vs gestión",
          "d": "Gobierno dirige (qué y quién decide); gestión ejecuta esas decisiones."
        },
        {
          "t": "Rueda DAMA (11 áreas)",
          "d": "Gobierno en el centro como eje de sinergia, más 10 áreas de gestión."
        },
        {
          "t": "Benchmark de marcos",
          "d": "DAMA (lenguaje), DCAM/CMMI (madurez), DGI (organización), ISO (rigor normativo)."
        },
        {
          "t": "Roles clave",
          "d": "CDO dirige; Owner es accountable; Steward opera; Custodian aplica controles técnicos."
        },
        {
          "t": "Jerarquía normativa",
          "d": "Principios → Política → Estándares → Procedimientos (en BPMN con RACI)."
        },
        {
          "t": "Metadatos y catálogo",
          "d": "Datos sobre los datos; el catálogo une glosario, técnico y linaje para descubrir activos."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> los Bloques 1 y 2 se sostienen en los tres pilares —Estrategia (QUÉ/PORQUÉ),\n    Gobierno (QUIÉN/CÓMO) y Plataforma (CON QUÉ)— con el gobierno del dato como área central de la Rueda DAMA. Recuerda la\n    meta de fondo: convertir a la organización en una <em>Data Driven Organization</em>, recorriendo Datos → Información →\n    Conocimiento → Inteligencia.",
      "quiz": [
        {
          "q": "Recordatorio rápido: la diferencia esencial entre gobierno y gestión de datos es que…",
          "opciones": [
            "El gobierno ejecuta y la gestión decide",
            "El gobierno define qué hacer y quién decide; la gestión ejecuta esas decisiones",
            "Son sinónimos intercambiables",
            "El gobierno es solo tecnología"
          ],
          "respuesta": 1,
          "explica": "Gobierno = dirección (políticas, roles, control); gestión = ejecución operativa."
        },
        {
          "q": "Para medir el nivel de madurez de capacidades de datos, el marco más apropiado es…",
          "opciones": [
            "GDPR",
            "Solo DAMA-DMBOK2",
            "DCAM o CMMI DMM",
            "BPMN"
          ],
          "respuesta": 2,
          "explica": "DCAM y CMMI DMM miden capacidades/madurez; DAMA da el lenguaje, DGI la organización e ISO el rigor."
        },
        {
          "q": "¿Qué rol es el operativo del día a día (calidad, glosario, metadatos)?",
          "opciones": [
            "CDO",
            "Data Owner",
            "Auditor externo",
            "Data Steward"
          ],
          "respuesta": 3,
          "explica": "El Data Steward define y aplica los controles y prácticas en el día a día."
        },
        {
          "q": "Ordena de lo general a lo concreto la jerarquía normativa del dato:",
          "opciones": [
            "Principios → Política → Estándares → Procedimientos",
            "Procedimientos → Estándares → Política → Principios",
            "Estándares → Procedimientos → Política → Principios",
            "Política → Procedimientos → Principios → Estándares"
          ],
          "respuesta": 0,
          "explica": "Principios (constitución) → Política (directrices) → Estándares (regla medible) → Procedimientos (cómo)."
        },
        {
          "q": "¿Qué une glosario de negocio, catálogo técnico y linaje en un inventario navegable?",
          "opciones": [
            "El firewall",
            "El catálogo de datos",
            "El ERP",
            "La hoja de cálculo"
          ],
          "respuesta": 1,
          "explica": "El catálogo de datos integra los metadatos para descubrir y entender los activos de datos."
        }
      ]
    },
    {
      "id": "d29",
      "dia": 29,
      "bloque": "b5",
      "area": "Repaso",
      "icono": "🔁",
      "estado": "full",
      "titulo": "Repaso espaciado: Madurez, Plataforma e Implantación",
      "tiempo": "45–60 min",
      "objetivos": [
        "Consolidar madurez y assessment del Bloque 3 (6 niveles, plataforma, catálogo/linaje, DataOps).",
        "Repasar la implantación del Bloque 4 (5 fases Minsait, roadmap, métricas, tecnologías).",
        "Recuperar de memoria el método de extremo a extremo con preguntas mezcladas."
      ],
      "secciones": [
        {
          "h": "1. Madurez y assessment",
          "html": "<p>No se prioriza lo que no se mide. El <strong>assessment</strong> fija el <strong>AS IS</strong>, define\n        el <strong>TO-BE</strong>, identifica brechas y alimenta el roadmap. La escala de Minsait tiene\n        <strong>6 niveles</strong>: <em>Inexistente · Inicial/ad-hoc · Repetible · Definido · Gestionado · Optimizado</em>.\n        Se evalúa por áreas funcionales DAMA <strong>empezando por el gobierno</strong> (eje central), combinando DAMA con\n        modelos de referencia (Stanford, IBM, CMMI) y el estudio <em>Ascendant</em>.</p>"
        },
        {
          "h": "2. Plataforma, catálogo y linaje",
          "html": "<p>La <strong>plataforma de datos</strong> (pilar Minsait, el CON QUÉ) tiene su propio modelo de gobierno y\n        de desarrollo, y gestiona la demanda y los casos de uso. El <strong>catálogo de datos</strong> y el\n        <strong>linaje</strong> (cada vez con <em>metadatos activos</em>) dan confianza, análisis de impacto y\n        trazabilidad. Patrones de referencia: <em>Data Warehouse, Data Lake, Lakehouse, Data Mesh y Data Fabric</em>.</p>"
        },
        {
          "h": "3. DataOps y operativa",
          "html": "<p><strong>DataOps</strong> lleva prácticas ágiles y de automatización al ciclo del dato. La operativa del\n        gobierno se sostiene con <strong>gestión de la demanda</strong> (ticketing) y <strong>mejora continua</strong>\n        (ciclo <em>PDCA</em>: Plan-Do-Check-Act). Es el motor de la fase MEJORA.</p>"
        },
        {
          "h": "4. Las 5 fases, roadmap, métricas y tecnologías",
          "html": "<p>La metodología de implantación de Minsait es <strong>ágil e incremental</strong> y recorre cinco fases:</p>\n        <ol>\n          <li><strong>AS IS</strong>: evaluación y diagnóstico; modelo TO-BE de alto nivel; propuesta de piloto.</li>\n          <li><strong>MODELO DG</strong>: organización + comités, políticas/procesos, calidad, seguridad y monitorización.</li>\n          <li><strong>PILOTO</strong>: caso de uso end-to-end que valida y refina el modelo.</li>\n          <li><strong>DESPLIEGUE</strong>: roll out progresivo por entidades; formación, cambio y comunicación.</li>\n          <li><strong>MEJORA</strong>: ticketing, monitorización (KPIs, cuadros de mando, riesgos) y PDCA.</li>\n        </ol>\n        <p>El <strong>roadmap</strong> se ordena por horizontes con quick wins; las <strong>métricas</strong> miden valor\n        (KPIs de gobierno, calidad y adopción, ROI); y las <strong>tecnologías</strong> (catálogos y herramientas tipo\n        Collibra, Informatica, Purview) automatizan glosario, catálogo, linaje y flujos. El modelo se define\n        <em>conociendo las capacidades de la herramienta</em>.</p>"
        }
      ],
      "terminos": [
        {
          "t": "6 niveles de madurez",
          "d": "Inexistente · Inicial/ad-hoc · Repetible · Definido · Gestionado · Optimizado."
        },
        {
          "t": "AS IS / TO-BE / brechas",
          "d": "Estado actual vs deseado; su diferencia son las brechas que alimentan el roadmap."
        },
        {
          "t": "5 fases Minsait",
          "d": "AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA, ágil e incremental."
        },
        {
          "t": "Catálogo y linaje",
          "d": "Inventario navegable y trazabilidad del dato; cada vez con metadatos activos."
        },
        {
          "t": "DataOps + PDCA",
          "d": "Automatización del ciclo del dato y mejora continua (Plan-Do-Check-Act) en la fase MEJORA."
        },
        {
          "t": "Tecnologías de gobierno",
          "d": "Herramientas tipo Collibra, Informatica o Purview que automatizan glosario, catálogo, linaje y flujos."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> los Bloques 3 y 4 conectan el assessment (AS IS, escala de 6 niveles y\n    estudio <em>Ascendant</em>) con la implantación en 5 fases y la plataforma. El gobierno se opera con metodología ágil\n    (Sprint 0 + Sprints), ticketing y PDCA, y se apoya en una herramienta de gobierno para automatizar glosario, catálogo,\n    linaje, calidad y flujos de trabajo, siempre orientado al ciclo de vida del dato.",
      "quiz": [
        {
          "q": "¿Cuántos niveles tiene la escala de madurez de Minsait y cuál es el más alto?",
          "opciones": [
            "5 niveles; el más alto es Definido",
            "4 niveles; el más alto es Gestionado",
            "6 niveles; el más alto es Optimizado",
            "3 niveles; el más alto es Repetible"
          ],
          "respuesta": 2,
          "explica": "Seis niveles: Inexistente, Inicial/ad-hoc, Repetible, Definido, Gestionado y Optimizado (mejora continua y automatización)."
        },
        {
          "q": "¿Cuál es el orden correcto de las 5 fases de la metodología de Minsait?",
          "opciones": [
            "DESPLIEGUE → MEJORA → PILOTO → MODELO DG → AS IS",
            "MODELO DG → AS IS → PILOTO → MEJORA → DESPLIEGUE",
            "PILOTO → AS IS → DESPLIEGUE → MODELO DG → MEJORA",
            "AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA"
          ],
          "respuesta": 3,
          "explica": "Diagnóstico (AS IS) → definición del modelo (MODELO DG) → piloto → despliegue → mejora continua."
        },
        {
          "q": "En la fase MEJORA, ¿qué ciclo se usa para la mejora continua?",
          "opciones": [
            "PDCA (Plan-Do-Check-Act)",
            "ETL",
            "SCRUM puro",
            "OKR"
          ],
          "respuesta": 0,
          "explica": "PDCA es el ciclo de mejora continua que, junto con el ticketing, sostiene la operativa del gobierno."
        },
        {
          "q": "El catálogo de datos y el linaje aportan sobre todo…",
          "opciones": [
            "Mayor velocidad de la red",
            "Confianza, análisis de impacto y trazabilidad para cumplimiento",
            "Reducción del precio de las licencias",
            "Un mejor diseño gráfico de los dashboards"
          ],
          "respuesta": 1,
          "explica": "Saber de dónde viene un dato y a dónde va permite confiar en él, evaluar impactos y cumplir auditorías."
        },
        {
          "q": "Según Minsait, el modelo de gobierno debe definirse…",
          "opciones": [
            "Ignorando la herramienta, para no condicionarse",
            "Solo después de comprar todas las licencias",
            "Conociendo las capacidades de la herramienta, para automatizar flujos y no procedimientos manuales",
            "Sin pensar en el ciclo de vida del dato"
          ],
          "respuesta": 2,
          "explica": "Minsait coordina el modelo con la herramienta para automatizar glosario, catálogo, linaje, calidad y flujos."
        }
      ]
    },
    {
      "id": "d30",
      "dia": 30,
      "bloque": "b5",
      "area": "Examen final",
      "icono": "🏆",
      "estado": "full",
      "titulo": "Examen final integral",
      "tiempo": "60–90 min",
      "objetivos": [
        "Demostrar dominio integral del programa: fundamentos, áreas DAMA, madurez, plataforma e implantación.",
        "Conectar la teoría DAMA-DMBOK con la metodología Minsait y el caso de minería.",
        "Cerrar el curso con una evaluación que cubre todo el temario."
      ],
      "secciones": [
        {
          "h": "1. Instrucciones",
          "html": "<p>Este es el <strong>examen final integral</strong> del curso. Son <strong>10 preguntas</strong> que\n        cubren todo el temario. Respóndelas <em>de memoria</em> primero y lee siempre la explicación, aciertes o no: la\n        recuperación activa y el feedback son lo que consolida el aprendizaje. Necesitas <strong>60%</strong> para\n        aprobar, igual que en cada módulo.</p>"
        },
        {
          "h": "2. Áreas que se evalúan",
          "html": "<ul>\n          <li><strong>Fundamentos</strong>: gobierno vs gestión, dato como activo, Rueda DAMA.</li>\n          <li><strong>Benchmark de marcos</strong>: DAMA, DCAM, DGI, CMMI DMM e ISO.</li>\n          <li><strong>Áreas DAMA</strong>: políticas, metadatos/glosario, calidad, MDM, seguridad.</li>\n          <li><strong>Madurez e implantación</strong>: 6 niveles, 5 fases Minsait, roles, plataforma.</li>\n        </ul>"
        },
        {
          "h": "3. Recordatorio de los tres pilares Minsait",
          "html": "<p><strong>Estrategia</strong> (el QUÉ y el PORQUÉ) + <strong>Gobierno</strong> (el QUIÉN y el CÓMO) +\n        <strong>Plataforma</strong> (el CON QUÉ). Meta de fondo: una <em>Data Driven Organization</em> que recorre\n        Datos → Información → Conocimiento → Inteligencia.</p>"
        },
        {
          "h": "4. Recordatorio de las 5 fases",
          "html": "<p><strong>AS IS</strong> (diagnóstico) → <strong>MODELO DG</strong> (modelo de gobierno) →\n        <strong>PILOTO</strong> (caso end-to-end) → <strong>DESPLIEGUE</strong> (roll out) → <strong>MEJORA</strong>\n        (PDCA y ticketing). Ágil e incremental, orientada al ciclo de vida del dato.</p>"
        },
        {
          "h": "5. Y al terminar…",
          "html": "<p>Si apruebas, has completado el programa de 30 días. Lo importante no es el puntaje: es haber construido\n        un <em>marco mental</em> sólido que conecta el estándar DAMA-DMBOK con la práctica de implantación y un caso real\n        de minería. A partir de aquí, el aprendizaje se sostiene con repetición espaciada y aplicación a casos reales.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno vs gestión",
          "d": "Resumen: el gobierno dirige y la gestión ejecuta; el gobierno es el centro de la Rueda DAMA."
        },
        {
          "t": "Benchmark de marcos",
          "d": "Resumen: DAMA (lenguaje), DCAM/CMMI (madurez), DGI (organización), ISO (rigor)."
        },
        {
          "t": "6 niveles de madurez",
          "d": "Resumen: Inexistente · Inicial · Repetible · Definido · Gestionado · Optimizado."
        },
        {
          "t": "5 fases Minsait",
          "d": "Resumen: AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA."
        },
        {
          "t": "Tres pilares",
          "d": "Resumen: Estrategia (QUÉ/PORQUÉ), Gobierno (QUIÉN/CÓMO), Plataforma (CON QUÉ)."
        },
        {
          "t": "Data Driven Organization",
          "d": "Resumen: meta de fondo; Datos → Información → Conocimiento → Inteligencia."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> el examen integra el estándar DAMA-DMBOK con la visión de Minsait (tres\n    pilares: Estrategia + Gobierno + Plataforma), la escala de madurez de 6 niveles y la metodología de implantación de\n    5 fases (AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA), todo aplicado al caso de minería estilo Alpayana.",
      "quiz": [
        {
          "q": "1) En la Rueda DAMA, ¿qué área ocupa el centro y por qué?",
          "opciones": [
            "Calidad de datos, porque es la más técnica",
            "Metadatos, porque describe todo lo demás",
            "Seguridad de datos, porque es la más urgente",
            "Gobierno del dato, porque es el eje de balance y sinergia de las demás áreas"
          ],
          "respuesta": 3,
          "explica": "El gobierno del dato está en el centro: coordina y da coherencia a las 10 áreas de gestión."
        },
        {
          "q": "2) Para usar un marco como 'lenguaje común' integral del dominio, eliges…",
          "opciones": [
            "DAMA-DMBOK2",
            "DCAM",
            "ISO 27001",
            "BCBS 239"
          ],
          "respuesta": 0,
          "explica": "DAMA-DMBOK2 cubre las 11 áreas y funciona como vocabulario estándar; los demás son complementos."
        },
        {
          "q": "3) El DGI Framework es especialmente útil para…",
          "opciones": [
            "Cifrar bases de datos",
            "Diseñar la organización y los derechos de decisión (personas y reglas)",
            "Medir el ROI del marketing",
            "Configurar la red corporativa"
          ],
          "respuesta": 1,
          "explica": "El DGI se centra en personas, reglas y derechos de decisión: ideal para el diseño organizativo."
        },
        {
          "q": "4) ¿Cuál es el orden correcto de las 5 fases de implantación de Minsait?",
          "opciones": [
            "MODELO DG → AS IS → PILOTO → MEJORA → DESPLIEGUE",
            "PILOTO → AS IS → MODELO DG → DESPLIEGUE → MEJORA",
            "AS IS → MODELO DG → PILOTO → DESPLIEGUE → MEJORA",
            "AS IS → PILOTO → MODELO DG → MEJORA → DESPLIEGUE"
          ],
          "respuesta": 2,
          "explica": "Diagnóstico (AS IS) → definición del modelo (MODELO DG) → piloto → despliegue → mejora continua."
        },
        {
          "q": "5) La escala de madurez de Minsait tiene 6 niveles. ¿Cuál es el más alto?",
          "opciones": [
            "Definido",
            "Gestionado",
            "Repetible",
            "Optimizado"
          ],
          "respuesta": 3,
          "explica": "Optimizado: mejora continua y alto nivel de automatización, el nivel más alto de los seis."
        },
        {
          "q": "6) ¿Quién es accountable (control y aprobación) por un ámbito funcional del dato?",
          "opciones": [
            "El Data Owner",
            "El Data Custodian",
            "El Help Desk",
            "El proveedor de nube"
          ],
          "respuesta": 0,
          "explica": "El Data Owner rinde cuentas por el valor y el riesgo de su ámbito; el Steward opera y el Custodian aplica controles técnicos."
        },
        {
          "q": "7) El glosario de negocio sirve sobre todo para…",
          "opciones": [
            "Guardar copias de seguridad",
            "Tener definiciones consensuadas de los términos (la verdad única)",
            "Reemplazar al data warehouse",
            "Almacenar los datos transaccionales"
          ],
          "respuesta": 1,
          "explica": "Evita que un mismo término signifique cosas distintas según el área; es base de la consistencia semántica."
        },
        {
          "q": "8) ¿Con qué notación documenta Minsait los flujos de los procesos de gobierno?",
          "opciones": [
            "SQL",
            "UML",
            "BPMN",
            "JSON"
          ],
          "respuesta": 2,
          "explica": "BPMN (Business Process Modelling Notation), con matriz RACI y priorizando su automatización en la herramienta."
        },
        {
          "q": "9) Una estrategia de datos 'defensiva' prioriza…",
          "opciones": [
            "Eliminar el área de gobierno",
            "Personalización y nuevos productos",
            "Reducir la calidad para ahorrar",
            "Control, cumplimiento, seguridad y una sola verdad"
          ],
          "respuesta": 3,
          "explica": "La defensa busca control y confianza; la ofensa busca explotar el dato para crecer. El gobierno sostiene ambas."
        },
        {
          "q": "10) La meta de fondo del modelo Minsait (DDO) describe la evolución…",
          "opciones": [
            "Datos → Información → Conocimiento → Inteligencia",
            "Inteligencia → Conocimiento → Información → Datos",
            "Datos → Conocimiento → Información → Inteligencia",
            "Información → Datos → Inteligencia → Conocimiento"
          ],
          "respuesta": 0,
          "explica": "La Data Driven Organization escala del dato a la inteligencia (analítica/IA), sostenida por el gobierno del dato."
        }
      ]
    },
    {
      "id": "ia1",
      "dia": 31,
      "bloque": "b6",
      "area": "Fundamentos de IA Gov",
      "icono": "🧠",
      "estado": "full",
      "titulo": "¿Qué es el Gobierno de la IA? Del gobierno del dato al gobierno de la inteligencia",
      "tiempo": "45–60 min",
      "objetivos": [
        "Definir el Gobierno de la IA (AI Governance) y diferenciarlo del gobierno del dato.",
        "Entender por qué el dato gobernado es prerequisito de una IA confiable.",
        "Conocer el modelo Minsait de Gobierno de la inteligencia corporativa y sus cuatro componentes."
      ],
      "secciones": [
        {
          "h": "1. Qué es el Gobierno de la IA",
          "html": "<p>El <strong>Gobierno de la IA</strong> (AI Governance) es el sistema de principios, políticas, roles,\n        procesos y controles que asegura que los sistemas de inteligencia artificial de una organización se diseñen,\n        desplieguen y operen de forma <strong>fiable, ética, segura, trazable y alineada con la estrategia y la\n        regulación</strong>. No es un freno a la innovación: es el marco que la hace escalable y defendible.</p>\n        <p>Si el gobierno del dato responde a «¿podemos confiar en el dato?», el gobierno de la IA responde a\n        «¿podemos confiar en las decisiones y predicciones que el sistema genera a partir de ese dato, y rendir cuentas\n        por ellas?». Amplía el alcance del dato hacia los <em>modelos</em>, sus <em>resultados</em> y su\n        <em>impacto</em> en personas y negocio.</p>"
        },
        {
          "h": "2. El dato gobernado como prerequisito",
          "html": "<p>No hay IA confiable sin datos gobernados. Un modelo hereda y amplifica los defectos de sus datos de\n        entrenamiento: si el dato está sesgado, incompleto, mal definido o sin linaje, el modelo producirá decisiones\n        sesgadas, frágiles e <strong>inauditables</strong> (el clásico <em>garbage in, garbage out</em>).</p>\n        <p>La cadena dato↔IA es directa: la <strong>calidad</strong> determina la fiabilidad del modelo; el\n        <strong>glosario y los metadatos</strong> dan significado a las variables (features); el <strong>linaje</strong>\n        permite explicar y reproducir un resultado; la <strong>seguridad y la privacidad</strong> limitan qué dato puede\n        alimentar qué caso de uso. Por eso el gobierno de la IA es la <em>continuación natural</em> del gobierno del\n        dato, no un programa paralelo.</p>"
        },
        {
          "h": "3. El modelo Minsait: Gobierno de la inteligencia corporativa",
          "html": "<p>Minsait integra ambos mundos bajo el concepto de <strong>Gobierno de la inteligencia corporativa</strong>,\n        sostenido sobre cuatro componentes complementarios:</p>\n        <table class=\"cmp\"><thead><tr><th>Componente</th><th>Qué cubre</th></tr></thead>\n        <tbody>\n          <tr><td><strong>AI Strategy</strong></td><td>La IA como activo estratégico y de negocio: visión, priorización y valor.</td></tr>\n          <tr><td><strong>Gobierno del dato</strong></td><td>Naturaleza técnica y operativa del dato: base sobre la que se construye la IA.</td></tr>\n          <tr><td><strong>Responsible AI</strong></td><td>IA Responsable: ética, equidad, transparencia e impacto social y ambiental.</td></tr>\n          <tr><td><strong>Gobierno y migración de IA</strong></td><td>Operativa del ciclo de vida: MLOps, monitorización avanzada y migración de modelos.</td></tr>\n        </tbody></table>\n        <p>El gobierno del dato es uno de los cuatro pilares; no desaparece, se convierte en el cimiento de los otros tres.</p>"
        },
        {
          "h": "4. El principio clave: empezar antes del primer caso de uso",
          "html": "<p>El principio rector de Minsait es contundente: <strong>el gobierno de la IA y su estrategia de\n        implantación deben comenzar antes de que empiece el primer caso de uso</strong>. Gobernar de forma reactiva\n        —cuando ya hay decenas de modelos sueltos en producción— obliga a remediar sesgos, deudas técnicas y riesgos\n        regulatorios uno a uno, a un coste muy superior.</p>\n        <p>Definir <em>antes</em> los principios de IA Responsable, los roles, el inventario de casos de uso y las reglas\n        de monitorización convierte el gobierno en un <strong>habilitador</strong> de escala y no en un obstáculo:\n        cada nuevo caso de uso nace ya gobernado.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Gobierno de la IA",
          "d": "Marco de principios, roles, procesos y controles para una IA fiable, ética, trazable y alineada al negocio."
        },
        {
          "t": "Gobierno de la inteligencia corporativa",
          "d": "Concepto Minsait que integra estrategia, dato, IA responsable y operación de IA en un único modelo."
        },
        {
          "t": "AI Strategy",
          "d": "Componente que trata la IA como activo estratégico: visión, priorización y captura de valor."
        },
        {
          "t": "Responsible AI",
          "d": "IA Responsable: dimensión ética, de equidad, transparencia e impacto social y ambiental de los sistemas de IA."
        },
        {
          "t": "Prerequisito del dato",
          "d": "Principio de que sin datos gobernados (calidad, metadatos, linaje) no existe IA confiable."
        },
        {
          "t": "Gobierno proactivo",
          "d": "Definir el gobierno de IA antes del primer caso de uso, en lugar de remediar a posteriori."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> Minsait articula la IA bajo el paraguas del <em>Gobierno de la\n    inteligencia corporativa</em>, con cuatro componentes —<em>AI Strategy</em>, <em>Gobierno del dato</em>,\n    <em>Responsible AI</em> y <em>Gobierno y migración de IA</em>— y un principio explícito en su propuesta: «el\n    gobierno de la IA y su estrategia de implantación debe comenzar antes de que empiece el primer caso de uso».\n    El gobierno del dato deja de ser un fin en sí mismo y pasa a ser el cimiento de la inteligencia corporativa.",
      "quiz": [
        {
          "q": "¿Cuál es la relación correcta entre gobierno del dato y gobierno de la IA?",
          "opciones": [
            "Son lo mismo con distinto nombre",
            "El gobierno del dato es prerequisito y cimiento del gobierno de la IA",
            "El gobierno de la IA reemplaza al gobierno del dato",
            "Son programas independientes sin relación"
          ],
          "respuesta": 1,
          "explica": "Sin datos gobernados (calidad, metadatos, linaje) no hay IA confiable; el dato es el cimiento."
        },
        {
          "q": "Según Minsait, ¿cuándo debe comenzar el gobierno de la IA?",
          "opciones": [
            "Cuando ya hay varios modelos en producción",
            "Solo si lo exige el regulador",
            "Antes de que empiece el primer caso de uso",
            "Al final del proyecto, en la fase de auditoría"
          ],
          "respuesta": 2,
          "explica": "El principio Minsait es explícito: el gobierno debe comenzar antes del primer caso de uso."
        },
        {
          "q": "¿Cuáles son los cuatro componentes del Gobierno de la inteligencia corporativa de Minsait?",
          "opciones": [
            "Nube, datos, redes y seguridad",
            "Hardware, software, datos y personas",
            "Ventas, marketing, finanzas y operaciones",
            "AI Strategy, Gobierno del dato, Responsible AI y Gobierno/migración de IA"
          ],
          "respuesta": 3,
          "explica": "Esos cuatro componentes integran estrategia, base de datos, ética y operación de la IA."
        },
        {
          "q": "El efecto «garbage in, garbage out» aplicado a la IA significa que…",
          "opciones": [
            "Un modelo con datos defectuosos producirá resultados defectuosos y sesgados",
            "Los modelos eliminan automáticamente los errores del dato",
            "La calidad del dato es irrelevante si el algoritmo es bueno",
            "El reciclaje de datos es obligatorio por ley"
          ],
          "respuesta": 0,
          "explica": "El modelo hereda y amplifica los defectos de sus datos de entrada; de ahí la prioridad del dato gobernado."
        }
      ]
    },
    {
      "id": "ia2",
      "dia": 32,
      "bloque": "b6",
      "area": "Marcos de IA",
      "icono": "📚",
      "estado": "full",
      "titulo": "Marcos y regulación de IA: NIST AI RMF, ISO/IEC 42001, EU AI Act, OECD",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer los marcos internacionales de gobierno de IA y para qué sirve cada uno.",
        "Entender el enfoque basado en riesgo del EU AI Act y sus cuatro niveles.",
        "Saber combinar marcos voluntarios, certificables y regulatorios de forma coherente."
      ],
      "secciones": [
        {
          "h": "1. NIST AI RMF: el marco de gestión de riesgo",
          "html": "<p>El <strong>NIST AI Risk Management Framework</strong> (EE. UU., voluntario) organiza la gestión del\n        riesgo de IA en cuatro funciones que se ejecutan de forma continua:</p>\n        <ul>\n          <li><strong>Govern</strong>: cultura, políticas, roles y responsabilidades; es transversal a las demás.</li>\n          <li><strong>Map</strong>: contextualizar el sistema, su propósito, partes interesadas y riesgos potenciales.</li>\n          <li><strong>Measure</strong>: medir y analizar los riesgos con métricas (equidad, robustez, explicabilidad).</li>\n          <li><strong>Manage</strong>: priorizar, tratar y monitorizar los riesgos a lo largo del tiempo.</li>\n        </ul>\n        <p>Es el equivalente, para IA, de un sistema de gestión de riesgos: pragmático y centrado en la\n        <em>confiabilidad</em> (trustworthiness).</p>"
        },
        {
          "h": "2. ISO/IEC 42001: el sistema de gestión de IA certificable",
          "html": "<p><strong>ISO/IEC 42001:2023</strong> es la primera norma internacional de <strong>Sistema de Gestión de\n        IA (AIMS)</strong>. Sigue la estructura de alto nivel de ISO (como ISO 27001 para seguridad o ISO 9001 para\n        calidad) y es <strong>certificable</strong>: ciclo PDCA, política de IA, gestión de riesgos e impactos, controles\n        y mejora continua. Mientras NIST orienta el <em>cómo</em> gestionar el riesgo, ISO 42001 da la\n        <em>estructura organizativa auditable y certificable</em> para sostenerlo en el tiempo.</p>"
        },
        {
          "h": "3. EU AI Act: regulación basada en riesgo",
          "html": "<p>El <strong>Reglamento de IA de la UE</strong> es la primera regulación horizontal y vinculante de IA.\n        Su lógica es un <strong>enfoque basado en riesgo</strong> con cuatro niveles:</p>\n        <table class=\"cmp\"><thead><tr><th>Nivel de riesgo</th><th>Tratamiento</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Inaceptable</strong></td><td>Prohibido (p. ej. puntuación social, manipulación dañina).</td></tr>\n          <tr><td><strong>Alto</strong></td><td>Permitido con obligaciones estrictas (gestión de riesgo, datos, documentación, supervisión humana).</td></tr>\n          <tr><td><strong>Limitado</strong></td><td>Obligaciones de transparencia (avisar de que se interactúa con IA).</td></tr>\n          <tr><td><strong>Mínimo</strong></td><td>Sin obligaciones específicas (la gran mayoría de sistemas).</td></tr>\n        </tbody></table>\n        <p>A diferencia de NIST e ISO, su incumplimiento conlleva <strong>sanciones</strong>; tiene alcance\n        extraterritorial para quien opere en el mercado europeo.</p>"
        },
        {
          "h": "4. OECD, UNESCO y cómo se combinan los marcos",
          "html": "<p>Los <strong>Principios de IA de la OCDE</strong> (adoptados también por el G20) y la\n        <strong>Recomendación de UNESCO sobre la Ética de la IA</strong> aportan la capa de <em>principios</em>\n        internacionales: IA centrada en el ser humano, transparente, robusta, segura y con rendición de cuentas. No son\n        certificables ni sancionadores, pero inspiran a los demás marcos.</p>\n        <p>El <em>challenge</em> es entender que no compiten, se complementan por capas: los <strong>principios</strong>\n        (OCDE, UNESCO) fijan el norte ético; el <strong>marco de gestión de riesgo</strong> (NIST) dice cómo\n        operarlo; el <strong>sistema de gestión certificable</strong> (ISO 42001) lo institucionaliza y audita; y la\n        <strong>regulación</strong> (EU AI Act) lo hace obligatorio y sancionable. Un programa maduro los usa juntos.</p>"
        }
      ],
      "terminos": [
        {
          "t": "NIST AI RMF",
          "d": "Marco voluntario de gestión de riesgo de IA con cuatro funciones: Govern, Map, Measure y Manage."
        },
        {
          "t": "ISO/IEC 42001",
          "d": "Norma certificable de Sistema de Gestión de IA (AIMS) basada en el ciclo PDCA."
        },
        {
          "t": "EU AI Act",
          "d": "Reglamento europeo de IA con enfoque basado en riesgo y sanciones por incumplimiento."
        },
        {
          "t": "Riesgo inaceptable",
          "d": "Categoría del EU AI Act para sistemas prohibidos, como la puntuación social."
        },
        {
          "t": "Principios OCDE",
          "d": "Principios internacionales de IA centrada en el humano, transparente, robusta y responsable."
        },
        {
          "t": "Sistema de alto riesgo",
          "d": "Sistema de IA del EU AI Act sujeto a obligaciones estrictas de control y supervisión humana."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> aunque la propuesta de Minsait no detalla un marco normativo de IA\n    concreto, su componente de <em>Responsible AI</em> y el principio de gobernar antes del primer caso de uso son\n    plenamente compatibles con NIST AI RMF (gestión de riesgo) e ISO/IEC 42001 (sistema de gestión certificable).\n    En el caso Virtual Labs aparecen ya prácticas que estos marcos exigen: <em>auditoría completa</em>,\n    <em>detección de sesgos</em>, <em>explicabilidad</em> y <em>human-in-the-loop</em> como supervisión humana.",
      "quiz": [
        {
          "q": "¿Cuáles son las cuatro funciones del NIST AI RMF?",
          "opciones": [
            "Plan, Do, Check, Act",
            "Govern, Map, Measure, Manage",
            "Inaceptable, Alto, Limitado, Mínimo",
            "Crear, Crecer, Mantener, Retirar"
          ],
          "respuesta": 1,
          "explica": "Govern (transversal), Map, Measure y Manage estructuran la gestión continua del riesgo de IA."
        },
        {
          "q": "¿Qué distingue a ISO/IEC 42001 de NIST AI RMF?",
          "opciones": [
            "NIST es obligatorio por ley en Europa",
            "Son idénticos",
            "ISO 42001 es un sistema de gestión certificable; NIST es un marco voluntario de gestión de riesgo",
            "ISO 42001 solo aplica a hardware"
          ],
          "respuesta": 2,
          "explica": "ISO 42001 institucionaliza y audita el sistema (AIMS, PDCA); NIST orienta el cómo gestionar el riesgo."
        },
        {
          "q": "En el EU AI Act, un sistema de puntuación social estaría clasificado como riesgo…",
          "opciones": [
            "Mínimo",
            "Limitado",
            "Alto",
            "Inaceptable"
          ],
          "respuesta": 3,
          "explica": "La puntuación social es una práctica prohibida, es decir, de riesgo inaceptable."
        },
        {
          "q": "¿Cómo conviene combinar los marcos de IA?",
          "opciones": [
            "Por capas complementarias: principios (OCDE/UNESCO), gestión (NIST), certificación (ISO 42001) y regulación (EU AI Act)",
            "Elegir solo uno y descartar los demás",
            "Aplicar únicamente el que tenga sanciones",
            "Usarlos de forma aleatoria según el proyecto"
          ],
          "respuesta": 0,
          "explica": "No compiten: los principios fijan el norte, NIST operativiza, ISO certifica y el EU AI Act obliga."
        },
        {
          "q": "¿Qué aportan los Principios de la OCDE y la Recomendación de UNESCO?",
          "opciones": [
            "Sanciones económicas directas",
            "La capa de principios éticos internacionales que inspira a los demás marcos",
            "Una certificación obligatoria",
            "Requisitos técnicos de hardware"
          ],
          "respuesta": 1,
          "explica": "Son principios (IA centrada en el humano, transparente y responsable), no normas sancionadoras."
        }
      ]
    },
    {
      "id": "ia3",
      "dia": 33,
      "bloque": "b6",
      "area": "IA Responsable",
      "icono": "⚖️",
      "estado": "full",
      "titulo": "IA Responsable: equidad, transparencia, explicabilidad y sesgos",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer las dimensiones de la IA Responsable (Responsible AI).",
        "Distinguir transparencia de explicabilidad (XAI) y por qué importan.",
        "Entender el origen de los sesgos y cómo se detectan y mitigan."
      ],
      "secciones": [
        {
          "h": "1. Las dimensiones de la IA Responsable",
          "html": "<p>La <strong>IA Responsable</strong> (Responsible AI) es el conjunto de principios que aseguran que un\n        sistema de IA sea digno de confianza. Sus dimensiones habituales:</p>\n        <ul>\n          <li><strong>Equidad (fairness)</strong>: no discriminar a grupos por género, edad, origen u otros atributos sensibles.</li>\n          <li><strong>Transparencia</strong>: saber cuándo y cómo se usa la IA y con qué datos.</li>\n          <li><strong>Explicabilidad</strong>: poder justificar por qué el modelo dio un resultado concreto.</li>\n          <li><strong>Robustez y seguridad</strong>: comportamiento estable ante datos ruidosos, ataques o casos límite.</li>\n          <li><strong>Privacidad</strong>: proteger los datos personales usados por el modelo.</li>\n          <li><strong>Rendición de cuentas (accountability)</strong>: que siempre haya un responsable humano identificable.</li>\n          <li><strong>Impacto social y ambiental</strong>: considerar el efecto del sistema en personas y entorno.</li>\n        </ul>"
        },
        {
          "h": "2. Transparencia vs. explicabilidad (XAI)",
          "html": "<p>Son conceptos relacionados pero distintos. La <strong>transparencia</strong> es saber <em>que</em>\n        existe un sistema de IA, qué datos usa y con qué fin. La <strong>explicabilidad</strong> (XAI, Explainable AI)\n        es poder responder <em>por qué</em> el modelo produjo una salida concreta —qué variables pesaron y cuánto.</p>\n        <p>El antipatrón a evitar es la <strong>«caja negra»</strong>: un modelo cuyas decisiones nadie puede justificar.\n        En dominios sensibles (crédito, salud, RR.HH.) la explicabilidad no es opcional: es condición de confianza,\n        de cumplimiento y, a menudo, legal. Técnicas como importancia de variables, SHAP o LIME ayudan a abrir esa caja.</p>"
        },
        {
          "h": "3. Origen, detección y mitigación de sesgos",
          "html": "<p>El <strong>sesgo</strong> es una distorsión sistemática que lleva al modelo a tratar de forma\n        injusta a ciertos grupos. Suele originarse en los <em>datos</em> (históricos sesgados, grupos\n        infrarrepresentados), en el <em>diseño</em> (variables proxy de atributos sensibles) o en el <em>uso</em>.</p>\n        <ul>\n          <li><strong>Detección</strong>: métricas de equidad por grupo (paridad demográfica, igualdad de oportunidades), auditorías y pruebas adversariales.</li>\n          <li><strong>Mitigación</strong>: corregir el dato (pre-procesado), restringir el entrenamiento (in-procesado) o ajustar las salidas (post-procesado).</li>\n          <li><strong>Gobierno</strong>: revisión humana, documentación del riesgo y monitorización continua, porque el sesgo puede reaparecer con datos nuevos.</li>\n        </ul>"
        },
        {
          "h": "4. IA Responsable como práctica viva",
          "html": "<p>La IA Responsable no es un documento que se firma una vez: es una práctica que atraviesa todo el ciclo\n        de vida. Exige <strong>responsables claros</strong>, <strong>evaluaciones de impacto</strong> antes del\n        despliegue y <strong>monitorización</strong> después, además de incorporar el <strong>impacto social y\n        ambiental</strong> (consumo energético de los modelos, efectos en el empleo o en colectivos vulnerables) como\n        criterio de decisión y no como mero apéndice de comunicación.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Responsible AI",
          "d": "IA Responsable: conjunto de principios para que un sistema de IA sea digno de confianza."
        },
        {
          "t": "Equidad (fairness)",
          "d": "Ausencia de discriminación sistemática hacia grupos por atributos sensibles."
        },
        {
          "t": "Explicabilidad (XAI)",
          "d": "Capacidad de justificar por qué un modelo produjo un resultado concreto."
        },
        {
          "t": "Caja negra",
          "d": "Modelo cuyas decisiones no pueden explicarse; antipatrón a evitar en IA Responsable."
        },
        {
          "t": "Sesgo (bias)",
          "d": "Distorsión sistemática que lleva al modelo a tratar injustamente a ciertos grupos."
        },
        {
          "t": "Accountability",
          "d": "Rendición de cuentas: que siempre exista un responsable humano identificable del sistema."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> en el modelo Minsait, <em>Responsible AI / IA Responsable</em> es uno\n    de los cuatro componentes del gobierno de la inteligencia y se asocia explícitamente al <em>impacto social y\n    ambiental de la IA</em>. Estos principios se materializan en los Virtual Labs, que presumen de\n    <em>explicabilidad real</em> («no es una caja negra, siempre se puede entender por qué ha dado una respuesta»),\n    <em>detección de sesgos</em> automática y validación humana integrada por el usuario experto.",
      "quiz": [
        {
          "q": "¿Cuál es la diferencia entre transparencia y explicabilidad?",
          "opciones": [
            "La transparencia solo aplica a hardware",
            "Son sinónimos exactos",
            "Transparencia es saber que se usa IA y con qué datos; explicabilidad es saber por qué dio un resultado concreto",
            "La explicabilidad es saber el precio del modelo"
          ],
          "respuesta": 2,
          "explica": "Transparencia = qué/con qué datos; explicabilidad (XAI) = por qué esa salida concreta."
        },
        {
          "q": "El antipatrón de la «caja negra» se refiere a…",
          "opciones": [
            "Un servidor sin ventanas",
            "Un dashboard de color oscuro",
            "Una base de datos cifrada",
            "Un modelo cuyas decisiones no pueden justificarse"
          ],
          "respuesta": 3,
          "explica": "Es un modelo no explicable; en dominios sensibles la explicabilidad es condición de confianza."
        },
        {
          "q": "¿Dónde se origina con más frecuencia el sesgo de un modelo?",
          "opciones": [
            "En los datos (históricos sesgados, grupos infrarrepresentados), el diseño y el uso",
            "En el color de la interfaz",
            "Únicamente en el hardware",
            "Solo en la nube"
          ],
          "respuesta": 0,
          "explica": "El sesgo suele venir del dato, del diseño (variables proxy) y del uso del sistema."
        },
        {
          "q": "¿Cuál NO es una dimensión típica de la IA Responsable?",
          "opciones": [
            "Equidad",
            "Maximización del precio de las acciones a corto plazo",
            "Explicabilidad",
            "Rendición de cuentas"
          ],
          "respuesta": 1,
          "explica": "Las dimensiones son equidad, transparencia, explicabilidad, robustez, privacidad, accountability e impacto social/ambiental."
        },
        {
          "q": "¿En qué momentos del ciclo se gobierna el sesgo?",
          "opciones": [
            "Solo una vez, al inicio",
            "Nunca, el modelo lo corrige solo",
            "En todo el ciclo: pre-procesado del dato, in-procesado del entrenamiento y post-procesado de las salidas, con monitorización continua",
            "Solo en el despliegue final"
          ],
          "respuesta": 2,
          "explica": "El sesgo puede reaparecer con datos nuevos, por eso se mitiga en varias fases y se monitoriza de forma continua."
        }
      ]
    },
    {
      "id": "ia4",
      "dia": 34,
      "bloque": "b6",
      "area": "Ciclo de vida & MLOps",
      "icono": "🔄",
      "estado": "full",
      "titulo": "Ciclo de vida de la IA y MLOps: gobierno técnico y monitorización",
      "tiempo": "45–60 min",
      "objetivos": [
        "Entender el ciclo de vida de la IA según Minsait (Creación, Crecimiento, Mantenimiento).",
        "Conocer las prácticas MLOps que gobiernan técnicamente los modelos.",
        "Diferenciar la monitorización técnica de la monitorización de negocio."
      ],
      "secciones": [
        {
          "h": "1. El ciclo de vida de la IA",
          "html": "<p>Un modelo no es un proyecto que termina: es un activo vivo que evoluciona. Minsait describe su ciclo de\n        vida en tres etapas:</p>\n        <ul>\n          <li><strong>Creación</strong>: ideación, preparación de datos, entrenamiento, validación y primer despliegue del modelo.</li>\n          <li><strong>Crecimiento</strong>: escalado a más usuarios y casos, integración en procesos de negocio, mejora del rendimiento.</li>\n          <li><strong>Mantenimiento</strong>: monitorización, reentrenamiento ante degradación, y retirada del modelo cuando deja de aportar valor.</li>\n        </ul>\n        <p>Cada etapa tiene riesgos y controles propios; el gobierno técnico los acompaña de principio a fin.</p>"
        },
        {
          "h": "2. Qué es MLOps",
          "html": "<p><strong>MLOps</strong> (Machine Learning Operations) lleva las prácticas de DevOps y DataOps al mundo de\n        los modelos. Su objetivo es que un modelo pase de la libreta del data scientist a producción de forma\n        <strong>reproducible, automatizada y gobernada</strong>. Pilares clave:</p>\n        <ul>\n          <li><strong>Versionado de modelos y datos</strong>: saber exactamente con qué datos y código se entrenó cada versión.</li>\n          <li><strong>CI/CD para modelos</strong>: integración y despliegue continuos con pruebas automáticas.</li>\n          <li><strong>Registro de modelos (model registry)</strong>: catálogo central de modelos, versiones y estados (staging, producción, retirado).</li>\n          <li><strong>Despliegue y reentrenamiento</strong>: pipelines que reentrenan y reemplazan modelos de forma controlada.</li>\n        </ul>"
        },
        {
          "h": "3. Inventario, model cards y trazabilidad",
          "html": "<p>El gobierno técnico exige saber <em>qué modelos existen</em>. El <strong>inventario o registro de\n        modelos</strong> es el equivalente al catálogo de datos: lista cada modelo con su propósito, datos de\n        entrenamiento, métricas, riesgos y responsable.</p>\n        <p>Las <strong>model cards</strong> son fichas estandarizadas que documentan un modelo: para qué sirve, en qué\n        condiciones funciona bien, sus limitaciones y sus métricas de equidad. Junto con el linaje de datos, hacen el\n        modelo <strong>auditable y reproducible</strong>: requisito tanto de MLOps maduro como de los marcos regulatorios.</p>"
        },
        {
          "h": "4. Monitorización avanzada: técnica y de negocio",
          "html": "<p>Una vez en producción, el modelo debe vigilarse en dos planos complementarios:</p>\n        <table class=\"cmp\"><thead><tr><th>Monitorización técnica</th><th>Monitorización de negocio</th></tr></thead>\n        <tbody>\n          <tr><td>Deriva de datos (data drift) y de concepto (concept drift).</td><td>Impacto real en KPIs (margen, ingresos, eficiencia).</td></tr>\n          <tr><td>Degradación de métricas (precisión, error).</td><td>Retorno de la inversión y valor capturado.</td></tr>\n          <tr><td>Latencia, disponibilidad y consumo del servicio.</td><td>Adopción por el negocio y satisfacción.</td></tr>\n        </tbody></table>\n        <p>El <strong>drift</strong> es el gran enemigo silencioso: el mundo cambia, los datos de entrada se alejan de los\n        de entrenamiento y el modelo se degrada sin avisar. Por eso la monitorización dispara el\n        <strong>reentrenamiento</strong> y cierra el ciclo de vida.</p>"
        }
      ],
      "terminos": [
        {
          "t": "MLOps",
          "d": "Conjunto de prácticas que llevan los modelos a producción de forma reproducible, automatizada y gobernada."
        },
        {
          "t": "Ciclo de vida de la IA",
          "d": "Etapas de un modelo; en Minsait: Creación, Crecimiento y Mantenimiento."
        },
        {
          "t": "Model registry",
          "d": "Registro o catálogo central de modelos, sus versiones y estados (staging, producción, retirado)."
        },
        {
          "t": "Model card",
          "d": "Ficha estandarizada que documenta propósito, condiciones, limitaciones y métricas de un modelo."
        },
        {
          "t": "Drift",
          "d": "Degradación del modelo cuando los datos de entrada se alejan de los de entrenamiento (data o concept drift)."
        },
        {
          "t": "Reentrenamiento",
          "d": "Actualización del modelo con datos nuevos para recuperar rendimiento ante el drift."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> Minsait sitúa el <em>ciclo de vida</em> de la IA en tres etapas\n    —<em>Creación → Crecimiento → Mantenimiento</em>— y lo gobierna con <em>MLOps</em> y <em>monitorización avanzada\n    técnica y de negocio</em>, incluyendo su métrica de <em>Return On Intelligence</em>. Su práctica de Machine\n    Learning aplica MLOps de extremo a extremo con despliegue, monitorización, reentrenamiento y escalado continuo,\n    bajo un modelo de partenariado que evita la «caja negra» y transfiere la capacidad al cliente.",
      "quiz": [
        {
          "q": "¿Cuáles son las tres etapas del ciclo de vida de la IA según Minsait?",
          "opciones": [
            "Diseño, Build, Run",
            "Bronce, Plata, Oro",
            "Govern, Map, Measure",
            "Creación, Crecimiento, Mantenimiento"
          ],
          "respuesta": 3,
          "explica": "Minsait describe el ciclo de vida como Creación → Crecimiento → Mantenimiento."
        },
        {
          "q": "¿Para qué sirve un model registry?",
          "opciones": [
            "Para catalogar de forma central los modelos, sus versiones y estados",
            "Para almacenar contraseñas",
            "Para diseñar dashboards",
            "Para gestionar nóminas"
          ],
          "respuesta": 0,
          "explica": "Es el catálogo central de modelos: versiones, estados (staging, producción, retirado) y trazabilidad."
        },
        {
          "q": "El «drift» de un modelo en producción consiste en…",
          "opciones": [
            "Un fallo de hardware",
            "La degradación cuando los datos de entrada se alejan de los de entrenamiento",
            "Un cambio de color en la interfaz",
            "Una mejora automática del modelo"
          ],
          "respuesta": 1,
          "explica": "El data/concept drift degrada el modelo sin avisar y dispara el reentrenamiento."
        },
        {
          "q": "¿Qué diferencia la monitorización técnica de la de negocio?",
          "opciones": [
            "La de negocio solo mide la latencia",
            "Son lo mismo",
            "La técnica vigila drift y métricas del modelo; la de negocio vigila KPIs, ROI y adopción",
            "La técnica mide el margen y los ingresos"
          ],
          "respuesta": 2,
          "explica": "Minsait habla de monitorización avanzada técnica (drift, métricas) y de negocio (KPIs, valor capturado)."
        },
        {
          "q": "Una model card documenta principalmente…",
          "opciones": [
            "El precio de las licencias cloud",
            "El calendario de vacaciones del equipo",
            "El organigrama de la empresa",
            "El propósito, condiciones de uso, limitaciones y métricas del modelo"
          ],
          "respuesta": 3,
          "explica": "Es una ficha estandarizada que hace el modelo auditable y reproducible."
        }
      ]
    },
    {
      "id": "ia5",
      "dia": 35,
      "bloque": "b6",
      "area": "Organización & Roadmap IA",
      "icono": "🗺️",
      "estado": "full",
      "titulo": "Organización del gobierno de IA, roles y roadmap (método Minsait)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer los roles y órganos de un modelo de gobierno de IA.",
        "Saber inventariar y priorizar casos de uso de IA por impacto y esfuerzo.",
        "Entender las fases de iniciación de Minsait y el rol del Business Data Hub."
      ],
      "secciones": [
        {
          "h": "1. Roles y órganos del gobierno de IA",
          "html": "<p>Gobernar la IA exige una estructura clara de responsabilidades:</p>\n        <ul>\n          <li><strong>Comité de IA / Ética</strong>: órgano transversal que aprueba políticas, prioriza casos y resuelve dilemas éticos.</li>\n          <li><strong>Responsible AI Officer</strong>: vela por que la IA Responsable se aplique en todo el ciclo.</li>\n          <li><strong>Model owner</strong>: responsable de negocio de un modelo concreto y de su valor.</li>\n          <li><strong>Data scientists</strong>: diseñan, entrenan y validan los modelos.</li>\n          <li><strong>MLOps engineers</strong>: industrializan, despliegan y monitorizan los modelos en producción.</li>\n        </ul>\n        <p>Estos roles extienden los del gobierno del dato (Owner, Steward) hacia el mundo de los modelos.</p>"
        },
        {
          "h": "2. Inventario y priorización de casos de uso",
          "html": "<p>La IA no se gobierna modelo a modelo en abstracto, sino a través de un <strong>inventario de casos de\n        uso</strong> con su propósito, datos, riesgo y valor esperado. Sobre ese inventario se prioriza con una\n        <strong>matriz impacto–esfuerzo</strong>: arriba a la izquierda (alto impacto, bajo esfuerzo) están los\n        <em>quick wins</em>; el alto impacto y alto esfuerzo son apuestas estratégicas; el bajo impacto se descarta.</p>\n        <p>Como los casos de IA son <strong>activos de inversión del negocio</strong>, deben valorarse con criterios de\n        negocio (no solo técnicos) a la hora de decidir en qué se invierte.</p>"
        },
        {
          "h": "3. Business Data Hub: equipos híbridos",
          "html": "<p>Minsait propone los <strong>Business Data Hub</strong>: equipos <strong>híbridos de negocio e IA</strong>\n        (Retail Data Hub, Energy Data Hub, Medical Data Hub…) que descubren, diseñan, implementan, validan y escalan\n        casos de uso junto al cliente. Su rasgo clave: <strong>se recomienda que estén dirigidos por las áreas de\n        negocio</strong>, no por IT, para que el dato y la IA se traduzcan en valor real y no en proyectos técnicos\n        aislados. Actúan como nexo permanente entre negocio y tecnología.</p>"
        },
        {
          "h": "4. Las fases de iniciación de Minsait",
          "html": "<p>Como los casos de IA son activos del negocio, su iniciación sigue tres fases con una «clave» Minsait en\n        cada una:</p>\n        <table class=\"cmp\"><thead><tr><th>Fase</th><th>Clave Minsait</th></tr></thead>\n        <tbody>\n          <tr><td><strong>Diagnóstico</strong></td><td>Diagnóstico de madurez con la metodología propia <em>Ascendant®</em>.</td></tr>\n          <tr><td><strong>Selección de casos de uso</strong></td><td>Valoración del impacto en negocio bajo el enfoque <em>Return On Intelligence</em>.</td></tr>\n          <tr><td><strong>Hoja de ruta</strong></td><td>Roadmap priorizado y célula hiperespecializada de IA (Ecosistema Abierto).</td></tr>\n        </tbody></table>\n        <p>El hilo conductor es tratar el gobierno y la IA como <strong>inversión</strong> que se monitoriza de forma\n        avanzada (técnica y de negocio) a lo largo de todo el ciclo de vida.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Comité de IA / Ética",
          "d": "Órgano transversal que aprueba políticas de IA, prioriza casos y resuelve dilemas éticos."
        },
        {
          "t": "Model owner",
          "d": "Responsable de negocio de un modelo concreto y del valor que aporta."
        },
        {
          "t": "Business Data Hub",
          "d": "Equipo híbrido de negocio e IA, dirigido por negocio, que descubre y escala casos de uso."
        },
        {
          "t": "Matriz impacto–esfuerzo",
          "d": "Herramienta para priorizar casos de uso según el valor que aportan y el coste de implementarlos."
        },
        {
          "t": "Ascendant®",
          "d": "Metodología propia de Minsait para diagnosticar el nivel de madurez en IA."
        },
        {
          "t": "Return On Intelligence",
          "d": "Enfoque Minsait para valorar el impacto de negocio de un caso de uso de IA."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> Minsait organiza la iniciación de casos de uso en tres fases\n    —<em>Diagnóstico</em> (con la metodología propia <em>Ascendant®</em>) → <em>Selección de casos de uso</em>\n    (bajo el enfoque <em>Return On Intelligence</em>) → <em>Hoja de ruta</em>— y los ejecuta mediante\n    <em>Business Data Hub</em>, equipos híbridos de negocio e IA que se recomienda estén dirigidos por las áreas de\n    negocio. Su premisa: «dado que los casos de IA son activos del negocio, deben valorarse como tal a la hora de\n    tomar decisiones de inversión».",
      "quiz": [
        {
          "q": "¿Qué caracteriza a un Business Data Hub de Minsait?",
          "opciones": [
            "Es un equipo híbrido de negocio e IA, idealmente dirigido por las áreas de negocio",
            "Es un servidor de almacenamiento",
            "Es una herramienta de visualización",
            "Es un comité solo de auditores externos"
          ],
          "respuesta": 0,
          "explica": "Son equipos híbridos negocio+IA que descubren y escalan casos de uso, dirigidos preferentemente por negocio."
        },
        {
          "q": "¿En qué orden van las fases de iniciación de casos de uso de Minsait?",
          "opciones": [
            "Hoja de ruta → Diagnóstico → Selección",
            "Diagnóstico → Selección de casos de uso → Hoja de ruta",
            "Selección → Hoja de ruta → Diagnóstico",
            "Diagnóstico → Hoja de ruta → Selección"
          ],
          "respuesta": 1,
          "explica": "Primero se diagnostica la madurez, luego se seleccionan casos y por último se traza la hoja de ruta."
        },
        {
          "q": "¿Qué metodología propia usa Minsait para el diagnóstico de madurez en IA?",
          "opciones": [
            "Six Sigma",
            "Scrum",
            "Ascendant®",
            "PRINCE2"
          ],
          "respuesta": 2,
          "explica": "Ascendant® es la metodología propia de Minsait para el diagnóstico de madurez."
        },
        {
          "q": "Tratar los casos de IA como «activos de inversión» implica…",
          "opciones": [
            "Decidir solo por criterios técnicos",
            "Externalizarlos siempre",
            "Implementarlos todos sin priorizar",
            "Valorarlos con criterios de negocio (impacto, ROI) al decidir en qué se invierte"
          ],
          "respuesta": 3,
          "explica": "Minsait valora el impacto de negocio (Return On Intelligence) para priorizar la inversión."
        },
        {
          "q": "¿Qué rol vela por que la IA Responsable se aplique en todo el ciclo?",
          "opciones": [
            "El Responsible AI Officer",
            "El MLOps engineer",
            "El data scientist",
            "El administrador de la red"
          ],
          "respuesta": 0,
          "explica": "El Responsible AI Officer es el rol que garantiza la aplicación de la IA Responsable de extremo a extremo."
        }
      ]
    },
    {
      "id": "ia6",
      "dia": 36,
      "bloque": "b6",
      "area": "GenAI & Agentes",
      "icono": "🤖",
      "estado": "full",
      "titulo": "Gobierno de GenAI y sistemas agénticos (caso Virtual Labs)",
      "tiempo": "45–60 min",
      "objetivos": [
        "Conocer los riesgos específicos de la IA Generativa y cómo mitigarlos.",
        "Entender RAG, grounding y guardrails como controles de GenAI.",
        "Analizar el gobierno de agentes autónomos en el caso Virtual Labs de Minsait."
      ],
      "secciones": [
        {
          "h": "1. Riesgos específicos de la IA Generativa",
          "html": "<p>La GenAI (LLMs y modelos generativos) añade riesgos que no existían en la IA predictiva clásica:</p>\n        <ul>\n          <li><strong>Alucinaciones</strong>: el modelo genera información plausible pero falsa.</li>\n          <li><strong>Prompt injection</strong>: instrucciones maliciosas ocultas en el input que secuestran el comportamiento del modelo.</li>\n          <li><strong>Fuga de datos</strong>: exposición de información sensible en prompts, contextos o respuestas.</li>\n          <li><strong>Propiedad intelectual y derechos de autor</strong>: generación de contenido que infringe derechos o filtra material protegido.</li>\n        </ul>\n        <p>Gobernar GenAI implica controles nuevos sobre prompts, contextos y salidas, no solo sobre datos de entrenamiento.</p>"
        },
        {
          "h": "2. RAG, grounding y guardrails",
          "html": "<p>Los controles más eficaces para contener estos riesgos:</p>\n        <ul>\n          <li><strong>RAG (Retrieval-Augmented Generation)</strong>: el modelo responde apoyándose en una base documental controlada en lugar de solo en su memoria.</li>\n          <li><strong>Grounding</strong>: anclar la respuesta a fuentes verificables y citables, reduciendo las alucinaciones.</li>\n          <li><strong>Guardrails</strong>: barreras que filtran entradas y salidas (datos sensibles, contenido prohibido, prompt injection).</li>\n        </ul>\n        <p>La combinación RAG + grounding + guardrails convierte un LLM genérico en un sistema <strong>trazable y\n        controlable</strong>, donde se puede saber de dónde salió cada respuesta.</p>"
        },
        {
          "h": "3. Gobierno de agentes autónomos y human-in-the-loop",
          "html": "<p>Los <strong>sistemas agénticos</strong> dan un paso más: agentes que planifican, usan herramientas y\n        ejecutan acciones de forma autónoma. Esto multiplica el valor, pero también el riesgo: un agente puede encadenar\n        decisiones erróneas a gran velocidad.</p>\n        <p>El control fundamental es el <strong>human-in-the-loop</strong>: el humano valida, guía y certifica las\n        decisiones de mayor impacto. A ello se suman límites de actuación (permisos granulares), trazabilidad de cada\n        acción del agente y un agente <em>crítico</em> que evalúe el rigor y los sesgos del resto.</p>"
        },
        {
          "h": "4. Caso real Minsait: Virtual Labs for Business",
          "html": "<p>Los <strong>Virtual Labs for Business</strong> de Minsait (inspirados en el modelo de Stanford de James\n        Zou) son un ecosistema de agentes colaborativos que simulan equipos humanos. Su arquitectura es un ejemplo\n        práctico de gobierno agéntico:</p>\n        <ul>\n          <li><strong>PI Agent</strong>: dirige el proyecto, define objetivos y coordina los equipos virtuales.</li>\n          <li><strong>Domain Agents</strong>: expertos virtuales por vertical (Energía, Salud, Retail, Banca…).</li>\n          <li><strong>Analyst Agents</strong>: ejecutan los análisis técnicos, económicos o regulatorios.</li>\n          <li><strong>Critic Agent</strong>: evalúa rigor y coherencia y evita sesgos.</li>\n          <li><strong>Human-in-the-loop</strong>: el usuario experto recibe, guía, supervisa, valida y certifica los resultados.</li>\n        </ul>\n        <p>El sistema presume de <strong>auditoría completa</strong> (registro de todas las decisiones),\n        <strong>control granular</strong> de permisos, <strong>detección de sesgos</strong>, <strong>explicabilidad\n        real</strong> («no es una caja negra») y <strong>modularidad por DataMart</strong>, donde cada unidad de\n        conocimiento se mantiene y repara por separado.</p>"
        }
      ],
      "terminos": [
        {
          "t": "Alucinación",
          "d": "Información plausible pero falsa generada por un modelo de IA generativa."
        },
        {
          "t": "Prompt injection",
          "d": "Ataque que oculta instrucciones maliciosas en el input para secuestrar el comportamiento del modelo."
        },
        {
          "t": "RAG",
          "d": "Retrieval-Augmented Generation: el modelo responde apoyándose en una base documental controlada."
        },
        {
          "t": "Guardrails",
          "d": "Barreras que filtran entradas y salidas del modelo para contener riesgos."
        },
        {
          "t": "Human-in-the-loop",
          "d": "Control en el que un humano valida, guía y certifica las decisiones del sistema de IA."
        },
        {
          "t": "Critic Agent",
          "d": "Agente de los Virtual Labs que evalúa rigor, coherencia y sesgos del resto de agentes."
        }
      ],
      "minsait": "<strong>Capa Minsait:</strong> los <em>Virtual Labs for Business</em> son el caso insignia de gobierno\n    agéntico de Minsait: <em>PI Agent</em> dirige, <em>Domain Agents</em> aportan experiencia sectorial,\n    <em>Analyst Agents</em> ejecutan, <em>Critic Agent</em> evalúa rigor y sesgos, y el <em>human-in-the-loop</em>\n    valida y certifica. El ecosistema garantiza <em>auditoría completa</em>, <em>control granular</em>,\n    <em>detección de sesgos</em>, <em>explicabilidad real</em> («no es una caja negra») y <em>modularidad por\n    DataMart</em>, llevando a la práctica los principios de IA Responsable en sistemas autónomos.",
      "quiz": [
        {
          "q": "¿Qué es una «alucinación» en IA Generativa?",
          "opciones": [
            "Un fallo de la pantalla",
            "Información plausible pero falsa que el modelo genera",
            "Un tipo de cifrado",
            "Una mejora del rendimiento"
          ],
          "respuesta": 1,
          "explica": "El modelo produce contenido convincente pero incorrecto; es uno de los riesgos clave de GenAI."
        },
        {
          "q": "¿Para qué sirve RAG combinado con grounding?",
          "opciones": [
            "Para cifrar la base de datos",
            "Para acelerar el hardware",
            "Para anclar las respuestas a una base documental y fuentes verificables, reduciendo alucinaciones",
            "Para diseñar la interfaz"
          ],
          "respuesta": 2,
          "explica": "RAG apoya la respuesta en documentación controlada y el grounding la ancla a fuentes citables."
        },
        {
          "q": "En el caso Virtual Labs, ¿qué agente evalúa rigor, coherencia y sesgos?",
          "opciones": [
            "PI Agent",
            "Domain Agent",
            "Analyst Agent",
            "Critic Agent"
          ],
          "respuesta": 3,
          "explica": "El Critic Agent es el encargado de evaluar el rigor y evitar los sesgos del resto del ecosistema."
        },
        {
          "q": "¿Cuál es el control fundamental para gobernar agentes autónomos de alto impacto?",
          "opciones": [
            "Human-in-the-loop: validación y certificación humana de las decisiones",
            "Aumentar la velocidad del agente",
            "Eliminar toda supervisión",
            "Desactivar la trazabilidad"
          ],
          "respuesta": 0,
          "explica": "El human-in-the-loop mantiene a un humano que valida, guía y certifica las decisiones críticas."
        },
        {
          "q": "¿Qué garantiza la «modularidad por DataMart» en los Virtual Labs?",
          "opciones": [
            "Que el modelo nunca necesita mantenimiento",
            "Que si hay un problema se repara una pieza y no todo el sistema",
            "Que se elimina la necesidad de auditoría",
            "Que no se pueden añadir nuevos conocimientos"
          ],
          "respuesta": 1,
          "explica": "Cada DataMart es una unidad independiente; el mantenimiento y la reparación son localizados, no globales."
        }
      ]
    }
  ]
};

export default DATA_GOVERNANCE_CURRICULUM;
