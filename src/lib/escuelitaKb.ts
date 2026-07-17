/* ══════════════════════════════════════════════════════════════════════════
   ESCUELITA · MEDIOS DE PAGO — Base de conocimiento
   Fuente: "Agente escuelita.xlsx" (Matriz de conocimiento – Agente de IA)
   Estructura de chunks segun el criterio de la propia matriz:
   1 chunk por fila / por concepto, con metadata (dominio, tipo, prioridad, fuente).
   ══════════════════════════════════════════════════════════════════════════ */

export type Chunk = {
  id: string;
  dominio: string;
  tema: string;
  tipo: string;
  prioridad: "Alta" | "Media" | "Baja";
  registros?: number;
  fuente: string;
  tags: string[];
  titulo: string;
  respuesta: string;
};
export type Grupo = { grupo: string; items: string[] };
export type QuizItem = { p: string; o: string[]; c: number; e: string; ref: string };

export const KB: Chunk[] = [

  /* ─────────────── RECURSO 1 · DICCIONARIO VISA (ground truth) ─────────────── */
  {
    id: "r1",
    dominio: "Base de conocimiento",
    tema: "Diccionario de Autorizaciones Visa",
    tipo: "Recurso",
    prioridad: "Alta",
    fuente: "Inventario BC · Recurso ID 1",
    tags: ["diccionario", "visa", "ground truth", "recurso 1", "tablas de referencia", "codigos", "lookup", "verdad literal"],
    titulo: "Diccionario de Autorizaciones Visa (Recurso 1)",
    respuesta:
      "Es el **ground truth** del agente: un diccionario estructurado en **9 tablas de referencia Visa** (Excel).\n\n" +
      "**Qué contiene:** códigos de respuesta ISO y su categoría, códigos STIP, Account Funding Source, Processing Codes, ECI/MOTO, CVV2 Data Presence, Response Source, POS Condition Codes y MCC.\n\n" +
      "**Qué aporta:** definiciones oficiales Visa y equivalencias código–descripción–categoría: qué significa cada código de respuesta, por qué respondió STIP en lugar del emisor, qué canal o condición originó la transacción y qué rubro representa un MCC.\n\n" +
      "**Cómo lo usa el agente:** es la capa de verdad literal. Se consulta por *lookup exacto código→descripción* antes de redactar cualquier respuesta, para traducir códigos técnicos a lenguaje de negocio, desambiguar siglas (STIP, ECI, AVS, CVV2) y **evitar alucinación de códigos**. También normaliza la terminología con la que el agente etiqueta y responde el resto de consultas.\n\n" +
      "**Casos de uso:** definición de términos y siglas Visa · significado y categoría de un código de respuesta · interpretación de rechazos y de respuestas Stand-In (STIP) · identificación del rubro del comercio por MCC · lectura de trazas (POS Condition, ECI, Processing Code) · soporte operativo de primera línea."
  },

  /* ─────────────── RECURSO 2 · CAPACITACIÓN AUTORIZACIONES ─────────────── */
  {
    id: "r2",
    dominio: "Base de conocimiento",
    tema: "Capacitación Autorizaciones",
    tipo: "Recurso",
    prioridad: "Alta",
    fuente: "Inventario BC · Recurso ID 2",
    tags: ["capacitacion autorizaciones", "recurso 2", "deck", "pptx", "18 slides", "fundamentos"],
    titulo: "Capacitación Autorizaciones (Recurso 2)",
    respuesta:
      "Deck de **18 slides** con 5 bloques: fundamentos de autorización, tipos de transacción (Card Present / Card Not Present), retos del emisor, códigos de respuesta ISO y herramientas de gestión de autorizaciones.\n\n" +
      "**Qué aporta:** el flujo E2E de la autorización y el rol de cada actor; las validaciones que ejecuta el emisor; los nuevos tipos de emisor (fintech, neobanco, caja, billetera) y el **Approval Rate** como KPI.\n\n" +
      "**Cómo lo usa el agente:** aporta el modelo mental y la narrativa del proceso — explica el *por qué* y el *cómo* que el diccionario no contiene. Es la fuente preferente para respuestas conceptuales y de onboarding.\n\n" +
      "**Casos de uso:** preguntas conceptuales sobre autorizaciones · flujo E2E y actores · Card Present vs Card Not Present · diagnóstico funcional de caídas de Approval Rate · capacitación de nuevos analistas · proyectos de optimización de aprobación."
  },

  /* ─────────────── RECURSO 3 · CAPACITACIÓN AUTENTICACIÓN ─────────────── */
  {
    id: "r3",
    dominio: "Base de conocimiento",
    tema: "Capacitación Autenticación",
    tipo: "Recurso",
    prioridad: "Alta",
    fuente: "Inventario BC · Recurso ID 3",
    tags: ["capacitacion autenticacion", "recurso 3", "deck", "pptx", "18 slides"],
    titulo: "Capacitación Autenticación (Recurso 3)",
    respuesta:
      "Deck de **18 slides** sobre autenticación de medios de pago: qué es, cómo se articula con la autorización, validación de posesión de tarjeta vs. identidad del titular, motor de riesgo y métodos de autenticación.\n\n" +
      "**Qué aporta:** flujo de autenticación y su secuencia respecto a la autorización; 3-D Secure / EMV 3DS; datos de verificación (PAN, vencimiento, CVV2, CVV dinámico); rol del motor de riesgo (**VCAS** en Visa) y la decisión *frictionless* vs. *challenge* (OTP, biometría, app).\n\n" +
      "**Cómo lo usa el agente:** permite separar dos procesos que el negocio suele confundir. Responde \"esto se rechazó en autenticación, no en autorización\", explica cuándo se exige fricción y por qué, y sustenta análisis de fraude vs. experiencia de compra.\n\n" +
      "**Casos de uso:** EMV 3DS y challenge/frictionless · \"¿por qué se pidió OTP en esta compra?\" · diferencias autenticación vs. autorización · fricción vs. fraude en canales CNP · CVV2 / CVV dinámico · proyectos de e-commerce."
  },

  /* ─────────────── RECURSO 4 · CAPACITACIÓN TOKENIZACIÓN ─────────────── */
  {
    id: "r4",
    dominio: "Base de conocimiento",
    tema: "Capacitación Tokenización",
    tipo: "Recurso",
    prioridad: "Alta",
    fuente: "Inventario BC · Recurso ID 4",
    tags: ["capacitacion tokenizacion", "recurso 4", "deck", "pptx", "13 slides"],
    titulo: "Capacitación Tokenización (Recurso 4)",
    respuesta:
      "Deck de **13 slides** en 3 macroprocesos: alcance y relevancia, aprovisionamiento (enrolamiento), y autorización de transacciones tokenizadas junto al *lifecycle management* del token.\n\n" +
      "**Qué aporta:** ciclo de vida del token E2E; flujo de aprovisionamiento orquestado por la marca (check eligibility → digitalización → autenticación → activación); decisión **Green/Yellow/Red** y métodos de validación (OTP, app, biometría, risk-based); rol de Token Vault, procesador y banco; umbral de aprobación exigido por la marca y sus penalidades.\n\n" +
      "**Cómo lo usa el agente:** aporta conocimiento de proceso y de control — identifica en qué etapa del aprovisionamiento se cae un caso y relaciona el desempeño de tokenización con el umbral de la marca y el Approval Rate del portafolio.\n\n" +
      "**Casos de uso:** Visa Token Service y Token Requestor · \"¿por qué falló el aprovisionamiento de esta tarjeta?\" · ciclo de vida del token y sus estados · resultado de elegibilidad (Green/Yellow/Red) · mejora de tasa de aprovisionamiento · proyectos de billeteras digitales."
  },

  /* ─────────────── RECURSO 5 · HISTORIAL DE INICIATIVAS ─────────────── */
  {
    id: "r5",
    dominio: "Base de conocimiento",
    tema: "Historial de Iniciativas",
    tipo: "Recurso",
    prioridad: "Alta",
    fuente: "Inventario BC · Recurso ID 5",
    tags: ["historial", "iniciativas", "recurso 5", "manual de iniciativas", "memoria organizacional", "116", "30 conceptos", "mar", "reintentos", "vsps", "bloqueos", "listas negras", "campañas"],
    titulo: "Historial de Iniciativas / Manual de iniciativas macro (Recurso 5)",
    respuesta:
      "Repositorio de **116 iniciativas** del área clasificadas en **30 conceptos** (Autorización y reglas, MAR y Reintentos, VSPS, Bloqueos, Fraude, Límites, Listas Negras, Tokenización, Stand-In / Continuidad, entre otros), cada una con su descripción de alcance y pasos ejecutados. Está **cargado y consultable**: pregúntame *\"¿qué hicimos en MAR y Reintentos?\"*.\n\n" +
      "**Qué aporta:** la **memoria organizacional** — qué se hizo antes sobre cada tema, con qué alcance, qué se analizó y qué se implementó. Es el único recurso que aporta el *\"cómo se resuelve aquí\"* en lugar del *\"qué dice la marca\"*.\n\n" +
      "**Cómo lo usa el agente:** habilita la reutilización de conocimiento. Ante una necesidad de negocio busca iniciativas análogas por concepto, resume el precedente, recomienda el enfoque ya probado y **advierte si el tema ya fue abordado** (evita retrabajo).\n\n" +
      "**Casos de uso:** \"¿qué hicimos en MAR?\" · recomendación de iniciativas similares · contexto histórico en respuestas técnicas · insumo para nuevas iniciativas y roadmap · asistencia en proyectos y comités · onboarding al portafolio del área."
  },

  /* ─────────────── CONCEPTOS · AUTORIZACIÓN ─────────────── */
  {
    id: "c-auth-flujo",
    dominio: "Autorizaciones",
    tema: "Flujo E2E y actores",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autorizaciones (Recurso 2)",
    tags: ["flujo", "e2e", "actores", "cadena", "cliente", "comercio", "adquirente", "red de pagos", "procesador", "emisor", "como funciona una autorizacion", "proceso"],
    titulo: "Flujo E2E de la autorización y sus actores",
    respuesta:
      "La autorización es el proceso por el que se aprueba o rechaza una transacción, y recorre una cadena de actores:\n\n" +
      "**Cliente → Comercio → Adquirente → Red de pagos → Procesador → Emisor**\n\n" +
      "Cada actor cumple un rol en la cadena, y el **emisor** es quien toma la decisión final (salvo cuando responde Stand-In / STIP en su lugar).\n\n" +
      "Entender el flujo permite **ubicar dónde ocurre un problema**: no es lo mismo una caída en el comercio, en el adquirente, en la red o en el emisor. Este modelo mental es la base para encadenar *contexto → código*: explicar el rechazo y además dónde se originó."
  },
  {
    id: "c-auth-validaciones",
    dominio: "Autorizaciones",
    tema: "Validaciones del emisor",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autorizaciones (Recurso 2)",
    tags: ["validaciones", "emisor", "que valida", "linea", "riesgo", "reglas internas", "seguridad", "datos de compra"],
    titulo: "¿Qué valida el emisor en una autorización?",
    respuesta:
      "Cuando llega la transacción, el emisor ejecuta un conjunto de validaciones:\n\n" +
      "1. **Tarjeta** — estado y vigencia del plástico/cuenta.\n" +
      "2. **Línea** — disponibilidad de línea o saldo.\n" +
      "3. **Datos de compra** — consistencia de la información de la transacción.\n" +
      "4. **Seguridad** — validaciones como CVV2, autenticación, etc.\n" +
      "5. **Reglas internas** — políticas propias del emisor.\n" +
      "6. **Riesgo** — evaluación de fraude.\n\n" +
      "El resultado de estas validaciones es lo que se traduce en un **código de respuesta** (aprobado o alguna de las categorías de rechazo). Por eso, para diagnosticar un rechazo, primero se identifica **cuál de estas validaciones falló**."
  },
  {
    id: "c-cp-cnp",
    dominio: "Autorizaciones",
    tema: "Card Present vs Card Not Present",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autorizaciones (Recurso 2)",
    tags: ["card present", "card not present", "cp", "cnp", "presencial", "no presencial", "diferencia", "tipos de transaccion", "ecommerce"],
    titulo: "Card Present (CP) vs Card Not Present (CNP)",
    respuesta:
      "Son los **dos tipos de transacción** según si la tarjeta está físicamente presente en el punto de venta:\n\n" +
      "• **Card Present (CP)** — la tarjeta está presente (POS físico, chip, contactless, ATM).\n" +
      "• **Card Not Present (CNP)** — la tarjeta no está presente: e-commerce, MOTO (mail/telephone order), recurrentes, cuotas.\n\n" +
      "La distinción es clave porque cambia:\n" +
      "– el **escenario de captura** (se lee en el *POS Condition Code*),\n" +
      "– los **datos de seguridad** disponibles (en CNP cobran protagonismo CVV2 y la autenticación 3DS),\n" +
      "– el **canal e iniciación** (se lee en los indicadores *ECI/MOTO*),\n" +
      "– y el **perfil de riesgo/fraude**, y por tanto la fricción que se exige."
  },
  {
    id: "c-approval-rate",
    dominio: "Autorizaciones",
    tema: "Approval Rate",
    tipo: "KPI",
    prioridad: "Alta",
    fuente: "Capacitación Autorizaciones (Recurso 2) · Capacitación Tokenización (Recurso 4)",
    tags: ["approval rate", "kpi", "tasa de aprobacion", "aprobacion", "caida", "diagnostico", "optimizacion"],
    titulo: "Approval Rate (tasa de aprobación)",
    respuesta:
      "Es el **KPI central** del área de autorizaciones: la proporción de transacciones aprobadas sobre el total.\n\n" +
      "**Por qué importa:** mide directamente la salud del portafolio. Una caída de Approval Rate es el disparador típico de un diagnóstico funcional.\n\n" +
      "**Cómo se diagnostica una caída:** se combinan los recursos —\n" +
      "– el **diccionario** traduce los códigos de respuesta y su categoría (qué está rechazando),\n" +
      "– el **flujo E2E** ubica dónde en la cadena se origina (dónde falla),\n" +
      "– **Response Source** indica si decidió el emisor o la red en Stand-In (quién decidió),\n" +
      "– el **historial de iniciativas** aporta qué se intentó antes en ese frente.\n\n" +
      "Además, el desempeño de **tokenización** se relaciona con el Approval Rate del portafolio, y la marca exige un **umbral de aprobación** con penalidades si no se cumple."
  },
  {
    id: "c-tipos-emisor",
    dominio: "Autorizaciones",
    tema: "Nuevos tipos de emisor",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Capacitación Autorizaciones (Recurso 2)",
    tags: ["tipos de emisor", "fintech", "neobanco", "caja", "billetera", "emisores", "retos del emisor"],
    titulo: "Nuevos tipos de emisor",
    respuesta:
      "El deck de Autorizaciones cubre, dentro de los **retos del emisor**, la aparición de nuevos tipos de emisor más allá de la banca tradicional:\n\n" +
      "• **Fintech**\n• **Neobanco**\n• **Caja**\n• **Billetera**\n\n" +
      "Esto importa porque cada tipo de emisor tiene capacidades, infraestructura y madurez distintas — lo que impacta sus validaciones, su disponibilidad (y por tanto el uso de **STIP**) y su Approval Rate."
  },

  /* ─────────────── CONCEPTOS · AUTENTICACIÓN ─────────────── */
  {
    id: "c-autenticacion",
    dominio: "Autenticación",
    tema: "Autenticación vs Autorización",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autenticación (Recurso 3)",
    tags: ["autenticacion", "autorizacion", "diferencia", "vs", "confusion", "dos procesos", "posesion", "identidad", "titular"],
    titulo: "Autenticación vs. Autorización (la confusión más común)",
    respuesta:
      "Son **dos procesos distintos y secuenciales** que el negocio suele confundir:\n\n" +
      "**Autenticación** — responde *\"¿eres quien dices ser?\"*. Valida la **posesión de la tarjeta** y la **identidad del titular**. Ocurre **antes** de la autorización.\n\n" +
      "**Autorización** — responde *\"¿tienes cómo pagar y te lo apruebo?\"*. La ejecuta el emisor validando tarjeta, línea, datos, seguridad, reglas y riesgo.\n\n" +
      "**Por qué importa la distinción:** permite decir con precisión *\"esto se rechazó en **autenticación**, no en autorización\"*. Si se cae en autenticación, la transacción ni siquiera llega a evaluarse como autorización — y el diagnóstico (y el equipo que debe actuar) es completamente distinto.\n\n" +
      "Juntos, los decks de Autorizaciones y Autenticación dan la **respuesta E2E completa** de una compra digital."
  },
  {
    id: "c-3ds",
    dominio: "Autenticación",
    tema: "3-D Secure / EMV 3DS",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autenticación (Recurso 3)",
    tags: ["3ds", "3-d secure", "emv 3ds", "3d secure", "autenticacion", "cnp", "ecommerce"],
    titulo: "3-D Secure / EMV 3DS",
    respuesta:
      "Es el **protocolo de autenticación** para transacciones no presenciales (CNP), cubierto en el deck de Autenticación.\n\n" +
      "Se articula con la autorización: **primero** se autentica la compra (3DS) y **luego** se envía a autorizar. En el flujo 3DS interviene el **motor de riesgo** (**VCAS** en Visa), que decide entre:\n\n" +
      "• **Frictionless** — se autentica sin pedir nada al usuario.\n" +
      "• **Challenge** — se exige fricción: OTP, biometría o validación por app.\n\n" +
      "Es la base para responder consultas del tipo *\"¿por qué se pidió OTP en esta compra?\"* y para los análisis de **fricción vs. fraude** en canales CNP."
  },
  {
    id: "c-frictionless-challenge",
    dominio: "Autenticación",
    tema: "Frictionless vs Challenge",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autenticación (Recurso 3)",
    tags: ["frictionless", "challenge", "otp", "biometria", "app", "friccion", "por que se pidio otp", "motor de riesgo", "vcas"],
    titulo: "Frictionless vs. Challenge (¿por qué se pidió OTP?)",
    respuesta:
      "La decisión la toma el **motor de riesgo** (**VCAS** en Visa) durante la autenticación:\n\n" +
      "• **Frictionless** — el motor considera la transacción de bajo riesgo y la autentica **sin pedir nada** al tarjetahabiente. Mejor experiencia de compra.\n" +
      "• **Challenge** — el motor exige **fricción** para confirmar la identidad. Métodos: **OTP**, **biometría** o validación por **app**.\n\n" +
      "Así que la respuesta a *\"¿por qué se pidió OTP?\"* es: porque el motor de riesgo evaluó la transacción y decidió challenge en lugar de frictionless.\n\n" +
      "**El trade-off:** más fricción reduce fraude pero castiga la experiencia (y puede costar ventas). Menos fricción mejora conversión pero eleva el riesgo. Ese balance **fricción vs. fraude** es el análisis central en canales CNP."
  },
  {
    id: "c-cvv2",
    dominio: "Autenticación",
    tema: "CVV2 / CVV dinámico",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Autenticación (Recurso 3) · Diccionario Visa · hoja CVV2 (28 registros)",
    tags: ["cvv2", "cvv dinamico", "dcvv2", "dcvv", "verificacion", "datos de verificacion", "pan", "vencimiento", "match", "no match"],
    titulo: "CVV2 y CVV dinámico",
    respuesta:
      "Son parte de los **datos de verificación** que sustentan la autenticación, junto con el **PAN** y el **vencimiento**.\n\n" +
      "• **CVV2** — código de verificación estático impreso en la tarjeta.\n" +
      "• **CVV dinámico (dCVV2)** — código que cambia periódicamente, más seguro que el estático.\n\n" +
      "**En el diccionario:** la tabla **CVV2** (42 registros, prioridad **Alta**) contiene el *CVV2 Data Presence Code* y los **resultados de verificación**:\n" +
      "– **Match** — coincide.\n" +
      "– **No Match** — no coincide.\n" +
      "– **Not Performed** — no se ejecutó la validación.\n" +
      "– **System Error** — error de sistema.\n\n" +
      "Se usa para explicar el resultado de la validación de CVV2/dCVV2 en **compras CNP**."
  },

  /* ─────────────── CONCEPTOS · TOKENIZACIÓN ─────────────── */
  {
    id: "c-tokenizacion",
    dominio: "Tokenización",
    tema: "Ciclo de vida del token",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Tokenización (Recurso 4)",
    tags: ["tokenizacion", "token", "ciclo de vida", "lifecycle", "estados", "vts", "visa token service", "token vault", "token requestor", "billetera"],
    titulo: "Tokenización: ciclo de vida del token (E2E)",
    respuesta:
      "La tokenización se estructura en **3 macroprocesos**:\n\n" +
      "**1. Alcance y relevancia** — por qué importa la tokenización.\n" +
      "**2. Aprovisionamiento (enrolamiento)** — cómo entra la tarjeta a la billetera.\n" +
      "**3. Autorización de transacciones tokenizadas + lifecycle management** — cómo opera y cómo se gestiona el token en el tiempo.\n\n" +
      "**Actores clave:** la **marca** (orquesta el aprovisionamiento), el **Token Vault**, el **procesador** y el **banco**. También aparecen **Visa Token Service (VTS)** y el **Token Requestor**.\n\n" +
      "**Control:** la marca exige un **umbral de aprobación** de tokenización, con **penalidades** si no se cumple, y el desempeño de tokenización se relaciona con el **Approval Rate** del portafolio."
  },
  {
    id: "c-aprovisionamiento",
    dominio: "Tokenización",
    tema: "Aprovisionamiento",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Tokenización (Recurso 4)",
    tags: ["aprovisionamiento", "enrolamiento", "check eligibility", "digitalizacion", "activacion", "por que fallo", "etapas", "flujo de aprovisionamiento"],
    titulo: "Flujo de aprovisionamiento (enrolamiento) del token",
    respuesta:
      "El aprovisionamiento lo **orquesta la marca** y sigue 4 etapas:\n\n" +
      "**check eligibility → digitalización → autenticación → activación**\n\n" +
      "En la etapa de elegibilidad se produce la decisión **Green / Yellow / Red**, y según el caso se aplican **métodos de validación**: OTP, app, biometría o *risk-based*.\n\n" +
      "**Para qué sirve conocer las etapas:** ante un caso fallido, permite **identificar en qué etapa exacta se cayó** el aprovisionamiento — que es justamente la pregunta *\"¿por qué falló el aprovisionamiento de esta tarjeta?\"*. La respuesta cambia por completo si se cayó en elegibilidad, en digitalización, en autenticación o en activación."
  },
  {
    id: "c-gyr",
    dominio: "Tokenización",
    tema: "Green / Yellow / Red",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Capacitación Tokenización (Recurso 4)",
    tags: ["green", "yellow", "red", "verde", "amarillo", "rojo", "elegibilidad", "check eligibility", "decision", "semaforo"],
    titulo: "Decisión Green / Yellow / Red (elegibilidad)",
    respuesta:
      "Es el **resultado de la evaluación de elegibilidad** (*check eligibility*) en el aprovisionamiento de un token — el semáforo que define cómo continúa el enrolamiento:\n\n" +
      "• **Green** — aprovisionamiento aprobado directamente.\n" +
      "• **Yellow** — requiere validación adicional (se aplica un método: OTP, app, biometría o risk-based).\n" +
      "• **Red** — no procede el aprovisionamiento.\n\n" +
      "Interpretar correctamente Green/Yellow/Red es uno de los casos de uso explícitos del agente, y es la base para **iniciativas de mejora de la tasa de aprovisionamiento** en emisores."
  },

  /* ═══════════ CONTENIDO REAL DE LOS DECKS DE CAPACITACIÓN ═══════════ */

  /* ── AUTORIZACIONES ── */
  {
    id: "d-cadena-actores",
    dominio: "Autorizaciones",
    tema: "Cadena de actores paso a paso",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Autorizaciones · slide 6 (flujo E2E)",
    tags: ["cadena", "actores", "flujo", "paso a paso", "adquirente", "payment facilitator", "red de pagos", "como funciona un pago", "e2e", "quien interviene"],
    titulo: "El flujo de una compra, paso a paso",
    respuesta:
      "El flujo comienza cuando el cliente hace la solicitud de compra desde un comercio:\n\n" +
      "1. **Cliente** — inicia la compra (e-commerce o físico) con tarjeta, billetera o móvil.\n" +
      "2. **Comercio** — captura la operación y envía la solicitud al adquirente (monto, moneda, canal, tarjeta o token). Si no hay adquirente local, puede intermediar un **Payment Facilitator**.\n" +
      "3. **Adquirente** — recibe la solicitud, valida la información y la envía a la red de pagos.\n" +
      "4. **Red de pagos** — identifica al emisor y enruta la transacción hacia el banco del cliente.\n" +
      "5. **Emisor** — evalúa la compra: tarjeta, saldo/línea, reglas internas, seguridad y riesgo de fraude.\n" +
      "6. **Emisor decide** — aprueba o rechaza según sus validaciones.\n" +
      "7. **Respuesta** — vuelve al comercio por la red y el adquirente, y se muestra el resultado al cliente.\n\n" +
      "Toda compra tiene dos momentos: primero **autenticación** (¿eres el titular?), luego **autorización** (¿te apruebo el pago?)."
  },
  {
    id: "d-card-present",
    dominio: "Autorizaciones",
    tema: "Modalidades Card Present",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Autorizaciones · slide 8",
    tags: ["card present", "cp", "presencial", "modalidades", "chip", "contactless", "banda magnetica", "billetera en pos", "quasi-cash", "nfc", "pos", "niubiz", "izipay", "culqi"],
    titulo: "Las 5 modalidades Card Present (tarjeta presente)",
    respuesta:
      "Ocurren cuando la tarjeta o el dispositivo está **físicamente presente**. Comparten la presencia física pero difieren en tecnología, seguridad y riesgo:\n\n" +
      "1. **Contactless** — se aproxima la tarjeta al POS sin insertarla, vía NFC (POS de Niubiz, Izipay, Culqi).\n" +
      "2. **Chip** — se inserta la tarjeta; el terminal lee el chip y puede pedir PIN (según tarjeta, monto, país, comercio o config. del emisor).\n" +
      "3. **Billetera digital en POS** — usa tokenización (el PAN se reemplaza por un token); autenticación por huella/rostro/clave en el dispositivo. Ej.: Apple Pay, Google Pay, Samsung Pay, Garmin Pay.\n" +
      "4. **Banda magnética** — se desliza la tarjeta; el terminal lee la banda. Tecnología más antigua y de menor seguridad.\n" +
      "5. **Quasi-Cash** — operaciones que se procesan como compra pero equivalen a disposición de efectivo (apuestas, servicios similares al efectivo). Alta sensibilidad para el emisor por riesgo, fraude y uso intensivo de línea."
  },
  {
    id: "d-card-not-present",
    dominio: "Autorizaciones",
    tema: "Modalidades Card Not Present",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Autorizaciones · slide 9",
    tags: ["card not present", "cnp", "no presencial", "ecommerce", "cof", "card on file", "recurrentes", "moto", "qr", "suscripciones", "streaming", "delivery"],
    titulo: "Las 5 modalidades Card Not Present (tarjeta no presente)",
    respuesta:
      "Se realizan por canales digitales, sin validación física de la tarjeta — por eso concentran la **mayor exposición al fraude** y exigen tokenización, 3-D Secure y reglas de autorización diferenciadas:\n\n" +
      "1. **E-commerce** — compras en web, tiendas online o apps; el cliente ingresa la tarjeta, usa una guardada o paga con billetera. Marketplaces, apps de delivery, tiendas online.\n" +
      "2. **COF (Card On File)** — los datos de la tarjeta quedan almacenados (tokenizados) en el comercio para futuras compras. Ej.: streaming, delivery, supermercados online.\n" +
      "3. **Recurrentes** — pagos automáticos periódicos tras la autorización inicial. Ej.: Netflix, Spotify, gimnasios, iCloud, telefonía.\n" +
      "4. **MOTO (Mail Order / Telephone Order)** — el cliente da los datos por teléfono o correo y el comercio procesa sin la tarjeta. Ej.: reservas de hotel por teléfono, agencias de viaje.\n" +
      "5. **QR** — el cliente escanea un código con su celular. Según el modelo, se comporta como operación digital o presencial."
  },
  {
    id: "d-categorias-iso",
    dominio: "Autorizaciones",
    tema: "Categorías de códigos ISO y reintentos",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Autorizaciones · slides 13-14",
    tags: ["categorias", "iso", "category 1", "category 2", "category 3", "category 4", "reintentos", "reintento", "reintentar", "puedo reintentar", "transaccion rechazada", "criticidad", "declinaciones", "principales rechazos", "n7", "do not honor", "pick up card"],
    titulo: "Categorías de códigos ISO y reglas de reintento",
    respuesta:
      "Los códigos se agrupan por criticidad de rechazo y **posibilidad de reintento** — esto define qué puede hacer el comercio tras un rechazo:\n\n" +
      "**Approval** — aprobadas total o parcialmente. `00` Approved (total), `10` Partial approval.\n\n" +
      "**Accepted** — validaciones de cuenta (ej. registrar tarjeta en COF). `85` Account verification successful.\n\n" +
      "**Category 1 — NO reintentar.** El emisor no aprobará y el comercio no puede generar reintentos: `04`/`07` Pick up card, `14` Invalid account, `41` Lost card, `43` Stolen card, `46` Closed account.\n\n" +
      "**Category 2 — hasta 15 reintentos en 30 días.** El emisor no puede aprobar en ese momento: `51` Not sufficient funds, `59` Suspect fraud, `61`/`65` límites excedidos, `62` Restricted card.\n\n" +
      "**Category 3 — calidad de datos.** Revalidar la información de pago: `54` Expired card, `55` PIN incorrect/missing, `82` Negative CAM/dCVV/CVV/CAVV, `N7` Decline for CVV2 failure.\n\n" +
      "**Category 4 — genéricos.** No deben superar el 5% de las declinaciones: `05` Do not honor, `06` Error, `81` errores criptográficos.\n\n" +
      "**Principales declinaciones que verás:** `N7` (CVV inválido), `51` (fondos insuficientes), `93` (transacción no permitida), `65` (límite de actividad excedido), `41` (tarjeta extraviada), `14` (tarjeta inválida), `59` (sospecha de fraude)."
  },
  {
    id: "d-herramientas-visa",
    dominio: "Autorizaciones",
    tema: "Herramientas Visa del emisor",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Autorizaciones · slides 16-17",
    tags: ["herramientas", "visa", "vap", "vau", "vrol", "vts", "vsps", "vrm", "vaa", "vsm", "vcas", "token life-cycle", "que herramientas", "ecosistema", "gestion de autorizaciones"],
    titulo: "Ecosistema de herramientas Visa para el emisor",
    respuesta:
      "Las marcas ofrecen al emisor herramientas para optimizar autorizaciones, riesgo y seguridad. Las de Visa:\n\n" +
      "**Autorización y desempeño**\n" +
      "• **VAP** (Visa Analytics Platform) — analiza autorizaciones, declinaciones, fraude y desempeño del portafolio; identifica mejoras del Approval Rate.\n" +
      "• **VAU** (Visa Account Updater) — actualiza credenciales (número, vencimiento, estado) para mantener vivos los pagos recurrentes y las tarjetas guardadas.\n" +
      "• **VROL** (Visa Resolve Online) — gestiona disputas y contracargos.\n\n" +
      "**Tokenización**\n" +
      "• **VTS** (Visa Token Service) — reemplaza el PAN por un token para compras digitales, billeteras y COF.\n" +
      "• **Token Life-cycle Management** — gestiona el ciclo de vida del token (creación, activación, suspensión, actualización, eliminación).\n" +
      "• **VSPS** — detiene pagos card-on-file y bloquea cargos recurrentes no deseados o transacciones ya identificadas.\n\n" +
      "**Riesgo y estrategia**\n" +
      "• **VRM** (Visa Risk Manager) — configura reglas de riesgo por monto, país, comercio, canal, tipo de tarjeta o comportamiento.\n" +
      "• **VAA** (Visa Advanced Authorization) — scoring de riesgo en tiempo real.\n" +
      "• **VSM** (Visa Strategy Manager) — gestiona estrategias de autorización y fraude.\n" +
      "• **VCAS** (Visa Consumer Authentication Service) — autentica operaciones no presenciales y decide si la compra requiere fricción adicional (+ su **VCAS Dashboard**)."
  },

  /* ── TOKENIZACIÓN ── */
  {
    id: "d-token-actores",
    dominio: "Tokenización",
    tema: "Actores de la tokenización",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Tokenización · slide 6",
    tags: ["actores", "tokenizacion", "token requestor", "tsp", "token service provider", "marca", "boveda", "token vault", "procesador", "quien interviene tokenizacion"],
    titulo: "Los 6 actores de la tokenización",
    respuesta:
      "El proceso requiere la interacción de múltiples actores con responsabilidades definidas:\n\n" +
      "1. **Tarjetahabiente** — registra su tarjeta en una wallet o comercio, se autentica cuando es requerido y usa el token para pagar.\n" +
      "2. **Token Requestor** — solicita la generación del token a nombre del cliente, captura las credenciales y envía la solicitud a la marca.\n" +
      "3. **Marca** — administra la **bóveda de tokens** (Token Vault), genera los tokens, ejecuta la destokenización durante las transacciones y coordina los mensajes con procesador y emisor.\n" +
      "4. **Token Service Provider (TSP)** — recibe las solicitudes de la marca, ejecuta o enruta las validaciones, gestiona las APIs de aprovisionamiento y lifecycle.\n" +
      "5. **Procesador** — mantiene la información de cuentas y tarjetas; valida estado, vigencia, CVV y reglas de negocio.\n" +
      "6. **Banco Emisor** — dueño de la decisión final sobre elegibilidad y autorización."
  },
  {
    id: "d-gyr-criterios",
    dominio: "Tokenización",
    tema: "Criterios Green/Yellow/Red",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Tokenización · slide 11",
    tags: ["green", "yellow", "red", "criterios", "elegibilidad", "device score", "risk information", "step-up", "cuenta elegible", "credenciales", "por que green", "por que red"],
    titulo: "Qué determina un Green, Yellow o Red",
    respuesta:
      "El resultado de la evaluación de elegibilidad depende de condiciones concretas:\n\n" +
      "**🟢 GREEN — elegible, token se activa sin fricción.** Requiere TODO esto:\n" +
      "• Cuenta elegible (estado permitido: Activa, Sobregiro o Mora para crédito).\n" +
      "• Tarjeta elegible (activa, entregada, habilitada, vigente).\n" +
      "• Credenciales válidas (vencimiento y CVV correctos cuando se requieren).\n" +
      "• Evaluación de riesgo favorable (Risk Information no exige validación extra y el Device Score es aceptable).\n" +
      "• Ninguna regla del motor del emisor impide el aprovisionamiento.\n\n" +
      "**🟡 YELLOW — elegible, pero requiere validación adicional (Step-Up).** Cumple lo básico, pero la política del emisor exige autenticación extra: el Risk Information pide verificar identidad, o el origen/tipo de wallet exige Step-Up. Se solicita **OTP** (u otro método) y el token queda **inactivo** hasta completarla.\n\n" +
      "**🔴 RED — no cumple las condiciones mínimas, se rechaza.** Cuenta o tarjeta no elegible (bloqueada, cancelada, vencida), credenciales inválidas, Risk Information = RED o Device Score = 1 (dispositivo de alto riesgo), o incumple una regla del motor del emisor."
  },
  {
    id: "d-estados-token",
    dominio: "Tokenización",
    tema: "Estados del token",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Tokenización · slide 15",
    tags: ["estados", "token", "activo", "inactivo", "suspendido", "eliminado", "ciclo de vida", "lifecycle", "se puede usar", "destokenizacion"],
    titulo: "Los 4 estados del token (y si sirve para pagar)",
    respuesta:
      "El estado del token determina si una transacción puede continuar hacia la autorización. **Solo un token Activo** llega al emisor:\n\n" +
      "| Estado | Qué significa | Cómo llega ahí | ¿Sirve? |\n|---|---|---|---|\n" +
      "| **Activo** | Habilitado para transaccionar | Aprovisionamiento Green, o Yellow con autenticación exitosa, o reactivación | **Sí** |\n" +
      "| **Inactivo** | Existe pero no habilitado | Aprovisionamiento pendiente de autenticación; el emisor aún no aprueba | No |\n" +
      "| **Suspendido** | Deshabilitado temporalmente | Evento de riesgo (fraude), tarjeta bloqueada por pérdida/robo, o solicitud del cliente | No (temporal) |\n" +
      "| **Eliminado** | Invalidado permanentemente | Cuenta/tarjeta cancelada, cliente elimina la tarjeta del wallet, o fraude confirmado | No (definitivo) |\n\n" +
      "En la autorización, la marca valida el estado: si está Activo, hace la **destokenización** en el Token Vault y envía la solicitud al emisor; si no, la transacción se rechaza."
  },

  /* ── AUTENTICACIÓN ── */
  {
    id: "d-modelos-auth",
    dominio: "Autenticación",
    tema: "Modelos RBA / OTP / Bypass",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Autenticación · slides 10-14",
    tags: ["modelos", "rba", "risk based", "risk-based authentication", "otp challenged", "bypass", "exencion", "friccion", "conversion", "frictionless", "que modelo", "comparacion"],
    titulo: "Los 3 modelos de autenticación (RBA, OTP, Bypass)",
    respuesta:
      "No todas las transacciones requieren el mismo nivel de validación. Según el riesgo y las reglas, el emisor elige uno de tres modelos, equilibrando **seguridad ↔ experiencia**:\n\n" +
      "**Risk-Based (RBA / frictionless)** — cuando el riesgo es bajo, autentica **sin pedir nada** al cliente analizando dispositivo, transacción e historial. Maximiza conversión y reduce abandonos.\n" +
      "→ Seguridad: Alta · Experiencia: Alta · Fricción: Baja · Conversión: Alta.\n\n" +
      "**OTP Challenged** — cuando el riesgo sube, pide una **clave de un solo uso** (SMS, email, app/token) para confirmar identidad. Añade una capa de seguridad a costa de fricción.\n" +
      "→ Seguridad: Alta · Experiencia: Media · Fricción: Alta · Conversión: Media.\n\n" +
      "**Bypass (exención)** — omite la autenticación en escenarios de bajo riesgo controlado: montos bajos, recurrentes/MIT, beneficiarios de confianza (whitelist), exenciones regulatorias. Requiere monitoreo continuo porque un bypass indebido eleva el fraude.\n" +
      "→ Seguridad: Media · Experiencia: Alta · Fricción: Nula · Conversión: Muy alta.\n\n" +
      "No hay un modelo óptimo único: depende del balance entre seguridad, conversión y experiencia."
  },
  {
    id: "d-motor-riesgo",
    dominio: "Autenticación",
    tema: "Motor de riesgo",
    tipo: "Concepto",
    prioridad: "Alta",
    fuente: "Deck Autenticación · slides 6, 8",
    tags: ["motor de riesgo", "vcas", "señales", "device score", "que analiza", "factores", "riesgo bajo", "riesgo alto", "por que pidio otp", "frictionless o challenge"],
    titulo: "Qué analiza el motor de riesgo (VCAS)",
    respuesta:
      "El motor de riesgo del emisor evalúa la transacción **en tiempo real** y decide el nivel de autenticación. En Visa es **VCAS**; en Mastercard, TBD.\n\n" +
      "**Factores que analiza:**\n" +
      "• **Indicadores de riesgo** — señales de fraude, intentos fallidos previos, alertas o reglas de seguridad.\n" +
      "• **Comportamiento del cliente** — historial de compras, frecuencia de uso, patrones habituales.\n" +
      "• **Información del dispositivo** — dispositivo conocido o nuevo, navegador, sistema operativo, consistencia técnica.\n" +
      "• **Características de la compra** — monto, tipo de comercio, canal, país o región.\n\n" +
      "**La decisión:**\n" +
      "• **Riesgo bajo** → autenticación transparente (**frictionless**), sin interacción del cliente.\n" +
      "• **Riesgo medio/alto** → autenticación adicional (**challenged**): OTP, app bancaria, biometría.\n\n" +
      "Por eso, cuando preguntan *\"¿por qué se pidió OTP?\"*: el motor evaluó la transacción como de riesgo medio/alto y activó un challenge en vez de frictionless."
  },
  {
    id: "d-verificacion-basica",
    dominio: "Autenticación",
    tema: "Verificación básica de la tarjeta",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Autenticación · slide 5",
    tags: ["verificacion basica", "pan", "vencimiento", "cvv", "cvv2", "cvv dinamico", "posesion de tarjeta", "datos de la tarjeta"],
    titulo: "Verificación básica: PAN, vencimiento y CVV",
    respuesta:
      "Para validar la **posesión** de la tarjeta (que existe y quien paga la tiene) se usan los datos de la tarjeta:\n\n" +
      "• **PAN** — número de la tarjeta.\n" +
      "• **Fecha de vencimiento**.\n" +
      "• **CVV2 / CVV estático** — código impreso en la tarjeta.\n" +
      "• **CVV dinámico** — código que cambia periódicamente, más seguro.\n\n" +
      "Estos datos confirman que la tarjeta existe y que se posee, **pero no bastan para autenticar plenamente la identidad** del titular — para eso interviene el motor de riesgo y, si hace falta, el challenge (OTP, biometría). Distingue dos cosas: *posesión de la tarjeta* (datos) vs. *identidad del titular* (motor de riesgo + autenticación)."
  },
  {
    id: "d-ecosistema-auth",
    dominio: "Autenticación",
    tema: "Ecosistema de autenticación",
    tipo: "Concepto",
    prioridad: "Media",
    fuente: "Deck Autenticación · slide 15",
    tags: ["ecosistema", "componentes", "plataforma 3ds", "motor de scoring", "motor de decision", "soluciones de autenticacion", "emv 3ds", "arquitectura"],
    titulo: "Componentes del ecosistema de autenticación",
    respuesta:
      "La autenticación es el resultado de cuatro componentes coordinados:\n\n" +
      "1. **Plataformas 3DS** — gestionan el protocolo entre comercio, red de pagos y emisor. Orquestan EMV 3DS, el intercambio de mensajes, los challenges y la integración con emisores.\n" +
      "2. **Motor de scoring** — calcula el riesgo de cada transacción con modelos analíticos: evaluación en tiempo real, detección de anomalías, machine learning, asignación de score.\n" +
      "3. **Motor de decisión** — define la acción según el score y las reglas de negocio: frictionless, OTP challenge, bypass o rechazo.\n" +
      "4. **Soluciones de autenticación** — validan la identidad cuando se requiere verificación: OTP SMS, OTP email, app bancaria, biometría, notificación push."
  },

  /* ─────────────── TABLAS DEL DICCIONARIO ─────────────── */
  {
    id: "t-codresvisa",
    dominio: "Diccionario Visa",
    tema: "CodResVisa",
    tipo: "Tabla",
    prioridad: "Alta",
    registros: 75,
    fuente: "Diccionario Visa · hoja CodResVisa (75 registros)",
    tags: ["codresvisa", "codigos de respuesta", "codigo de respuesta", "iso", "categoria", "rechazo", "aprobado", "05", "51", "59", "categorias 1 a 4"],
    titulo: "CodResVisa — Códigos de respuesta (prioridad Alta)",
    respuesta:
      "Es la tabla más importante del diccionario. Está **cargada y consultable**: pregúntame por un código concreto (*\"¿qué significa el código 51?\"*) y te doy la ficha literal.\n\n" +
      "Contiene 3 sub-tablas:\n" +
      "• **Authorization Response Category** — 67 códigos de respuesta con descripción, detalle y categoría.\n" +
      "• **Category** — las 6 categorías de resultado y su significado.\n" +
      "• **CYBS** — 2 valores del Decision Manager de CyberSource.\n\n" +
      "**Las categorías de resultado:**\n" +
      "| Cat | Significado |\n|---|---|\n" +
      "| Aprobado | Transacción aprobada total o parcialmente |\n" +
      "| 1 | Crítico / Retención / Fraude |\n" +
      "| 2 | Decline (condiciones del cliente o cuenta) |\n" +
      "| 3 | Seguridad / Verificación |\n" +
      "| 4 | Error / Procesamiento |\n\n" +
      "**Uso en el agente:** traducir el resultado de una transacción y su categoría; es la base para el **diagnóstico de rechazos** y del **Approval Rate**."
  },
  {
    id: "t-stip",
    dominio: "Diccionario Visa",
    tema: "STIP",
    tipo: "Tabla",
    prioridad: "Alta",
    registros: 73,
    fuente: "Diccionario Visa · tabla STIP (73 registros)",
    tags: ["stip", "stand-in", "standin", "stand in", "visa respondio", "timeout", "disponibilidad", "emisor no responde"],
    titulo: "STIP / Stand-In (73 registros · prioridad Alta)",
    respuesta:
      "**STIP (Stand-In Processing)** es cuando **Visa responde la autorización en lugar del emisor**.\n\n" +
      "La tabla **STIP** tiene **73 códigos** con la **razón por la cual Visa respondió en Stand-In** en vez del emisor.\n\n" +
      "**Uso en el agente:** explicar por qué respondió Stand-In y **detectar problemas de disponibilidad o timeout del emisor** — si STIP sube, normalmente es señal de que el emisor no está respondiendo bien.\n\n" +
      "**Relacionado:** la tabla **Response Source** indica *quién* tomó la decisión (emisor vs. red en Stand-In). STIP también figura como uno de los 30 conceptos del **historial de iniciativas**."
  },
  {
    id: "t-mcc",
    dominio: "Diccionario Visa",
    tema: "MCC",
    tipo: "Tabla",
    prioridad: "Media",
    registros: 265,
    fuente: "Diccionario Visa · tabla MCC (265 registros)",
    tags: ["mcc", "merchant category code", "rubro", "giro", "comercio", "categoria de comercio"],
    titulo: "MCC — Merchant Category Codes (265 registros · prioridad Media)",
    respuesta:
      "**MCC (Merchant Category Code)** identifica el **rubro o giro del comercio**.\n\n" +
      "La tabla tiene **265 registros** con el **nombre y la descripción del rubro** de cada código — es la tabla con más registros del diccionario. Está **cargada**: pregúntame por un MCC concreto (*\"MCC 5411\"*).\n\n" +
      "**Uso en el agente:** identificar el giro del comercio en **análisis de transacciones, reglas y campañas**. Prioridad **Media**: enriquece la respuesta pero no la habilita."
  },
  {
    id: "t-processing",
    dominio: "Diccionario Visa",
    tema: "Processing Code",
    tipo: "Tabla",
    prioridad: "Media",
    registros: 40,
    fuente: "Diccionario Visa · hoja Procesing Code (40 registros)",
    tags: ["processing code", "procesing code", "tipo de operacion", "compra", "disposicion de efectivo", "account funding", "quasi-cash", "traza"],
    titulo: "Hoja Processing Code — 4 sub-tablas (40 registros · prioridad Media)",
    respuesta:
      "Los **Processing Codes** indican el **tipo de operación** que se está realizando: compra, disposición de efectivo, account funding, quasi-cash, entre otros.\n\n" +
      "La hoja tiene **4 sub-tablas** (40 registros): **Processing Transaction** (16), **Account Type From** (9), **Account Type To** (5) y **Transaction Usage Rules** (10).\n\n" +
      "**Uso en el agente:** al **leer una traza** de transacción, determinar qué tipo de operación se ejecutó. Junto con *POS Condition Code* y *ECI/MOTO*, forma el trío que permite reconstruir el escenario completo de una transacción."
  },
  {
    id: "t-cvv2-tabla",
    dominio: "Diccionario Visa",
    tema: "CVV2 (tabla)",
    tipo: "Tabla",
    prioridad: "Alta",
    registros: 28,
    fuente: "Diccionario Visa · hoja CVV2 (28 registros)",
    tags: ["cvv2 tabla", "data presence", "match", "no match", "not performed", "system error", "verificacion cvv2"],
    titulo: "Hoja CVV2 — 4 sub-tablas (28 registros · prioridad Alta)",
    respuesta:
      "La hoja CVV2 contiene **4 sub-tablas** (28 registros), no una sola:\n\n" +
      "• **CVV2 Data Presence Code** (5) — Match, No Match, Not Performed, System Error, Unable to Verify.\n" +
      "• **CVV2 Authorization Request Data** (4) — Field 126.10: CVV2 estático, dCVV2 dinámico, Fallback, No validación.\n" +
      "• **CAVV** (15) — resultado de la validación de autenticación 3DS: passed, failed, attempt, liability shift…\n" +
      "• **ECI/CAVV** (4) — interpretación del riesgo según ECI y validez del CAVV.\n\n" +
      "**Uso en el agente:** explicar el resultado de la validación de **CVV2/dCVV2 en compras CNP** y el resultado de autenticación. Prioridad **Alta** — fase 1.\n\n" +
      "*La sub-tabla CAVV no estaba descrita en la matriz de conocimiento; apareció al cargar el archivo.*"
  },
  {
    id: "t-pos",
    dominio: "Diccionario Visa",
    tema: "POS Condition Code",
    tipo: "Tabla",
    prioridad: "Media",
    registros: 25,
    fuente: "Diccionario Visa · hoja POS (25 registros)",
    tags: ["pos", "pos condition code", "condicion", "punto de venta", "atm", "desatendido", "captura", "escenario"],
    titulo: "Hoja POS — 3 sub-tablas (25 registros · prioridad Media)",
    respuesta:
      "La hoja POS tiene **3 sub-tablas** (25 registros):\n\n" +
      "• **POS Condition** (12) — condición en la que ocurre la transacción en el punto de venta.\n" +
      "• **POS Entry Mode** (10) — método técnico de captura de los datos de la tarjeta.\n" +
      "• **POS Environment** (3) — tipo de relación entre cliente y comercio.\n\n" +
      "**Uso en el agente:** identificar el **escenario de captura** del caso consultado — CP/CNP, ATM, desatendido, etc.\n\n" +
      "Es una de las tres tablas que se usan para **leer trazas de transacción**, junto con *Processing Code* y *ECI/MOTO*."
  },
  {
    id: "t-moto",
    dominio: "Diccionario Visa",
    tema: "ECI / MOTO",
    tipo: "Tabla",
    prioridad: "Media",
    registros: 13,
    fuente: "Diccionario Visa · hoja MOTO (14 registros)",
    tags: ["eci", "moto", "mail order", "telephone order", "recurrente", "cuotas", "unica", "ecommerce", "canal", "iniciacion"],
    titulo: "Hoja MOTO — ECI/MOTO y ECI/CAVV (14 registros · prioridad Media)",
    respuesta:
      "La hoja tiene **2 sub-tablas** (14 registros): **ECI/MOTO** (10) con los indicadores para **canales no presenciales** (única, recurrente, cuotas, e-commerce) y **ECI/CAVV** (4) con la interpretación de riesgo según ECI y validez del CAVV.\n\n" +
      "**Uso en el agente:** distinguir el **canal** y el **tipo de iniciación** de la transacción digital — no es lo mismo una compra única de e-commerce que una recurrente o una en cuotas.\n\n" +
      "**MOTO** = Mail Order / Telephone Order. **ECI** = Electronic Commerce Indicator. Ambas son siglas que el diccionario permite **desambiguar** (uno de los casos de uso explícitos del agente)."
  },
  {
    id: "t-response-source",
    dominio: "Diccionario Visa",
    tema: "Response Source",
    tipo: "Tabla",
    prioridad: "Alta",
    registros: 13,
    fuente: "Diccionario Visa · tabla Response source (13 registros)",
    tags: ["response source", "origen", "quien decidio", "emisor", "stip", "asaf", "decision"],
    titulo: "Response Source (13 registros · prioridad Alta)",
    respuesta:
      "**13 registros** que indican el **origen de la decisión de la autorización**: emisor, STIP, ASAF, etc.\n\n" +
      "**Uso en el agente:** determinar **quién tomó la decisión** — el emisor o la red en Stand-In.\n\n" +
      "Es una tabla pequeña pero de prioridad **Alta**, porque responde una de las preguntas de diagnóstico más importantes: cuando algo se rechaza, saber si lo rechazó el emisor o lo hizo la red en su nombre cambia por completo la acción a tomar."
  },
  {
    id: "t-account-funding",
    dominio: "Diccionario Visa",
    tema: "Account Funding Source",
    tipo: "Tabla",
    prioridad: "Baja",
    registros: 11,
    fuente: "Diccionario Visa · tabla Account Fonding (11 registros)",
    tags: ["account funding", "account fonding", "fuente de fondeo", "debito", "credito", "prepago", "producto", "domestico", "internacional"],
    titulo: "Account Funding Source (11 registros · prioridad Baja)",
    respuesta:
      "**11 registros** con el **Account Funding Source por producto** (débito, crédito, prepago) y su **alcance doméstico/internacional**.\n\n" +
      "**Uso en el agente:** identificar el **producto** y la **fuente de fondeo** de la cuenta asociada.\n\n" +
      "Prioridad **Baja** — es conocimiento de baja frecuencia de consulta, se carga al final o bajo demanda."
  },
  {
    id: "t-resumen",
    dominio: "Diccionario Visa",
    tema: "Resumen de tablas del diccionario Visa",
    tipo: "Tabla",
    prioridad: "Alta",
    fuente: "Detalle Diccionario Visa",
    tags: ["cuantas tablas", "9 tablas", "659", "total", "registros indexables", "resumen", "todas las tablas", "que tablas hay", "tablas del diccionario", "diccionario", "visa", "listado de tablas"],
    titulo: "Las tablas del diccionario Visa (544 registros cargados)",
    respuesta:
      "El diccionario está **cargado y consultable**. Son 9 hojas, pero contienen **20 sub-tablas** y **544 registros** reales:\n\n" +
      "| Hoja | Sub-tablas | Registros | Prioridad |\n|---|---|---|---|\n" +
      "| CodResVisa | Authorization Response Category · Category · CYBS | 75 | **Alta** |\n" +
      "| STIP | STIP code | 73 | **Alta** |\n" +
      "| CVV2 | CVV2 Data Presence · Auth Request Data · CAVV · ECI/CAVV | 28 | **Alta** |\n" +
      "| Response source | Response Source | 13 | **Alta** |\n" +
      "| MCC | MCC | 265 | Media |\n" +
      "| Procesing Code | Processing Transaction · Account Type From · Account Type To · Usage Rules | 40 | Media |\n" +
      "| POS | POS Condition · POS Entry Mode · POS Environment | 25 | Media |\n" +
      "| MOTO | ECI/MOTO · ECI/CAVV | 14 | Media |\n" +
      "| Account Fonding | Account Funding Source | 11 | Baja |\n\n" +
      "**Prioridad Alta (fase 1):** CodResVisa, STIP, CVV2 y Response source — las que habilitan el diagnóstico.\n\n" +
      "*Nota: la matriz de conocimiento estimaba 659 registros contando filas de título y sub-encabezado. El conteo real de registros indexables es 544. A cambio, aparecen sub-tablas que la matriz no describía: CAVV, POS Entry Mode, POS Environment, Account Type From/To y Transaction Usage Rules.*"
  },

  /* ─────────────── LEYENDA Y CRITERIOS ─────────────── */
  {
    id: "l-prioridades",
    dominio: "Criterios",
    tema: "Prioridades de carga",
    tipo: "Criterio",
    prioridad: "Alta",
    fuente: "Leyenda y Criterios",
    tags: ["prioridad", "alta", "media", "baja", "fase 1", "fase 2", "piloto", "carga", "criterios"],
    titulo: "Prioridad Alta / Media / Baja y fases de carga",
    respuesta:
      "La matriz define tres niveles de prioridad que gobiernan **en qué fase se carga** cada conocimiento:\n\n" +
      "• **Alta** — conocimiento **indispensable** para que el agente responda con precisión **desde el día 1**. → Cargar en la **fase 1 del piloto**.\n\n" +
      "• **Media** — conocimiento de **soporte o detalle**; enriquece la respuesta pero **no la habilita**. → Cargar en **fase 2**, tras validar el piloto.\n\n" +
      "• **Baja** — conocimiento de **baja frecuencia** de consulta. → Cargar **al final o bajo demanda**."
  },
  {
    id: "l-ground-truth",
    dominio: "Criterios",
    tema: "Ground truth",
    tipo: "Criterio",
    prioridad: "Alta",
    fuente: "Leyenda y Criterios",
    tags: ["ground truth", "verdad", "fuente autoritativa", "citar", "literal", "precedencia", "conflicto", "alucinacion"],
    titulo: "Ground truth",
    respuesta:
      "**Definición:** fuente autoritativa que el agente debe **citar literalmente sin parafrasear** (códigos y definiciones Visa).\n\n" +
      "**Cómo usarlo:** configurar como **fuente de mayor precedencia ante conflicto** entre documentos.\n\n" +
      "En la práctica, el **Diccionario de Autorizaciones Visa** es el ground truth: si un deck y el diccionario dicen cosas distintas sobre un código, **manda el diccionario**. Este criterio es lo que protege al agente de **alucinar códigos**."
  },
  {
    id: "l-chunk",
    dominio: "Criterios",
    tema: "Chunk",
    tipo: "Criterio",
    prioridad: "Alta",
    fuente: "Leyenda y Criterios",
    tags: ["chunk", "rag", "indexar", "recuperar", "unidad", "1 chunk por fila", "por slide"],
    titulo: "Chunk",
    respuesta:
      "**Definición:** unidad mínima de texto que se **indexa y se recupera** en el RAG del agente.\n\n" +
      "**Cómo usarlo:** definir **1 chunk por fila** (en las tablas) o **por slide** (en los decks).\n\n" +
      "Es decir: cada fila del diccionario Visa es un chunk recuperable, y cada slide de los decks de capacitación es un chunk. Por eso los conteos de registros (659) y de slides (18+18+13) importan: son la medida real del índice."
  },
  {
    id: "l-metadata",
    dominio: "Criterios",
    tema: "Metadata",
    tipo: "Criterio",
    prioridad: "Alta",
    fuente: "Leyenda y Criterios",
    tags: ["metadata", "etiquetas", "dominio", "tema", "tipo", "version", "fecha", "filtrar", "vigencia"],
    titulo: "Metadata",
    respuesta:
      "**Definición:** etiquetas asociadas a cada chunk — **dominio, tema, tipo, versión, fecha**.\n\n" +
      "**Cómo usarlo:** permite **filtrar la búsqueda por dominio** y **advertir vigencia** (si un contenido está desactualizado).\n\n" +
      "Esta misma escuelita aplica el criterio: cada respuesta que te doy lleva su metadata de dominio, tipo, prioridad y fuente."
  },
  {
    id: "l-gaps",
    dominio: "Criterios",
    tema: "Gaps identificados",
    tipo: "Criterio",
    prioridad: "Alta",
    fuente: "Leyenda y Criterios",
    tags: ["gap", "gaps", "pendiente", "tbd", "faltante", "que falta", "brechas", "antes de cargar"],
    titulo: "Gaps identificados (estado actual)",
    respuesta:
      "La matriz identificó **3 gaps**. Este es su estado tras cargar el diccionario y el manual:\n\n" +
      "**1. Deck de Tokenización — sección '04 Principales iniciativas' marcada como TBD.**\n" +
      "→ 🔴 **Abierto.** Sigue pendiente en el documento origen.\n\n" +
      "**2. Manual de iniciativas — campo 'Concepto' con celdas heredadas y duplicados.**\n" +
      "→ 🟢 **Resuelto.** Se normalizó rellenando hacia abajo el concepto heredado: 116 iniciativas quedaron clasificadas en 30 conceptos, todas con concepto asignado.\n\n" +
      "**3. Sin reglas/manuales del procesador ni data transaccional.**\n" +
      "→ 🔴 **Abierto.** Es el gap que más limita: **el agente no puede diagnosticar con datos transaccionales reales**, solo con conocimiento documental. Previsto para fase 2.\n\n" +
      "**Hallazgo adicional al cargar el diccionario:** la matriz estimaba 659 registros en 9 tablas. El conteo real es de **544 registros en 20 sub-tablas** — la estimación contaba filas de título y sub-encabezado, pero a cambio no describía sub-tablas que sí existen (CAVV, POS Entry Mode, POS Environment, Account Type From/To, Transaction Usage Rules)."
  },

  /* ─────────────── META ─────────────── */
  {
    id: "m-overview",
    dominio: "Base de conocimiento",
    tema: "Overview",
    tipo: "Meta",
    prioridad: "Alta",
    fuente: "Inventario Base Conocimiento IA",
    tags: ["que recursos", "cuantos recursos", "overview", "resumen", "matriz", "base de conocimiento", "que sabes", "que hay", "5 recursos", "inventario"],
    titulo: "Los 5 recursos de la base de conocimiento",
    respuesta:
      "La matriz de conocimiento del agente de Medios de Pago tiene **5 recursos**:\n\n" +
      "| ID | Recurso | Tipo | Aporta |\n|---|---|---|---|\n" +
      "| 1 | **Diccionario de Autorizaciones Visa** | Excel · 9 tablas | El *qué dice la marca* — ground truth |\n" +
      "| 2 | **Capacitación Autorizaciones** | PPTX · 18 slides | El *por qué y cómo* del flujo |\n" +
      "| 3 | **Capacitación Autenticación** | PPTX · 18 slides | El proceso previo a la autorización |\n" +
      "| 4 | **Capacitación Tokenización** | PPTX · 13 slides | Proceso y control del token |\n" +
      "| 5 | **Historial de Iniciativas** | Excel · 116 iniciativas | El *cómo se resuelve aquí* |\n\n" +
      "**La lógica del conjunto:** el **diccionario** da la verdad literal, los **decks** dan el modelo mental y la narrativa, y el **historial** da la memoria organizacional. Juntos permiten responder *contexto → código → precedente*."
  },
  {
    id: "m-alcance",
    dominio: "Base de conocimiento",
    tema: "Alcance de esta escuelita",
    tipo: "Meta",
    prioridad: "Alta",
    fuente: "Agente escuelita.xlsx",
    tags: ["alcance", "que puedes responder", "limitaciones", "que no sabes", "ayuda", "como funciona esto"],
    titulo: "Qué puede y qué no puede responder esta escuelita",
    respuesta:
      "**Sí puedo responder:**\n" +
      "• **Lookup exacto de códigos** — 544 registros del diccionario Visa en 20 tablas. Pregunta *\"¿qué significa el código 51?\"*, *\"MCC 5411\"*, *\"STIP 9001\"*, *\"CAVV 2\"*. Te doy la ficha literal (ground truth, sin parafrasear).\n" +
      "• **Precedentes del área** — 116 iniciativas en 30 conceptos. Pregunta *\"¿qué hicimos en MAR y Reintentos?\"* o *\"¿qué iniciativas hay de VSPS?\"*.\n" +
      "• Conceptos de **autorización** (flujo E2E, actores, validaciones del emisor, CP vs CNP, Approval Rate).\n" +
      "• Conceptos de **autenticación** (3DS, VCAS, frictionless vs challenge, OTP, CVV2/dCVV).\n" +
      "• Conceptos de **tokenización** (ciclo de vida, aprovisionamiento, Green/Yellow/Red, Token Vault, VTS).\n" +
      "• Los **criterios** de la matriz (prioridades, ground truth, chunk, metadata, gaps).\n\n" +
      "**Todavía no puedo:**\n" +
      "• **Diagnosticar con data transaccional** — no tengo reglas/manuales del procesador ni transacciones reales. Es el gap que la matriz dejó para fase 2.\n" +
      "• Responder sobre la sección **'04 Principales iniciativas'** del deck de Tokenización: está marcada como TBD en el origen.\n\n" +
      "Es decir: sé *qué dice la marca* y *qué se hizo aquí*, pero no puedo analizar tus transacciones."
  }
];

/* ─────────────── PREGUNTAS SUGERIDAS ─────────────── */
export const SUGERENCIAS: Grupo[] = [
  { grupo: "Buscar un código", items: [
    "¿Qué significa el código 51?",
    "¿Qué significa el código 05?",
    "STIP 9001",
    "MCC 5411",
  ]},
  { grupo: "Precedentes", items: [
    "¿Qué hicimos en MAR y Reintentos?",
    "¿Qué iniciativas hay de VSPS?",
    "¿Qué iniciativas hay de Tokenización?",
  ]},
  { grupo: "Autorizaciones", items: [
    "¿Cómo funciona el flujo de una compra, paso a paso?",
    "¿Cuáles son las 5 modalidades Card Present?",
    "¿Qué categorías de códigos ISO hay y cuándo puedo reintentar?",
    "¿Qué herramientas ofrece Visa al emisor?",
    "¿Qué es el Approval Rate y cómo diagnostico una caída?"
  ]},
  { grupo: "Autenticación", items: [
    "¿Cuál es la diferencia entre autenticación y autorización?",
    "¿Qué es EMV 3DS?",
    "¿Por qué se pidió OTP en una compra?",
    "¿Qué es el CVV2 y el CVV dinámico?"
  ]},
  { grupo: "Tokenización", items: [
    "¿Cómo es el flujo de aprovisionamiento de un token?",
    "¿Qué determina un Green, Yellow o Red?",
    "¿Cuáles son los estados del token?",
    "¿Quiénes intervienen en la tokenización?"
  ]},
  { grupo: "Autenticación", items: [
    "¿Cuál es la diferencia entre RBA, OTP y Bypass?",
    "¿Qué analiza el motor de riesgo?",
    "¿Por qué se pidió OTP en una compra?"
  ]},
  { grupo: "Diccionario Visa", items: [
    "¿Qué tablas tiene el diccionario Visa?",
    "¿Qué es STIP y por qué responde Visa?",
    "¿Qué es un MCC?",
    "¿Qué es Response Source?"
  ]},
  { grupo: "Criterios y base", items: [
    "¿Qué recursos tiene la base de conocimiento?",
    "¿Qué significa prioridad Alta, Media y Baja?",
    "¿Qué es ground truth?",
    "¿Qué gaps hay identificados?"
  ]}
];

/* ─────────────── QUIZ · MODO ENTRENAMIENTO ─────────────── */
export const QUIZ: QuizItem[] = [
  {
    p: "¿Cuál es el orden correcto de la cadena de actores en una autorización?",
    o: [
      "Cliente → Comercio → Adquirente → Red de pagos → Procesador → Emisor",
      "Cliente → Emisor → Red de pagos → Adquirente → Comercio",
      "Comercio → Cliente → Emisor → Adquirente → Red de pagos"
    ],
    c: 0,
    e: "El flujo E2E va del cliente al emisor pasando por comercio, adquirente, red de pagos y procesador. El emisor es quien decide (salvo cuando responde STIP en su lugar).",
    ref: "Capacitación Autorizaciones (Recurso 2)"
  },
  {
    p: "Una compra se rechazó y te preguntan si fue por autenticación o por autorización. ¿Cuál es la diferencia?",
    o: [
      "Son lo mismo, solo cambia el nombre según la marca",
      "Autenticación valida quién eres (posesión e identidad) y ocurre antes; autorización valida si te aprueban el pago",
      "Autorización ocurre primero y autenticación después, al confirmar la compra"
    ],
    c: 1,
    e: "Son dos procesos distintos y secuenciales: primero se autentica (¿eres quien dices ser?) y luego se autoriza (¿te apruebo el pago?). Si se cae en autenticación, ni siquiera llega a evaluarse la autorización.",
    ref: "Capacitación Autenticación (Recurso 3)"
  },
  {
    p: "¿Qué significa que Visa haya respondido en STIP?",
    o: [
      "Que el comercio canceló la transacción",
      "Que Visa (Stand-In) respondió la autorización en lugar del emisor",
      "Que la tarjeta está bloqueada por fraude"
    ],
    c: 1,
    e: "STIP (Stand-In Processing) es cuando Visa responde en lugar del emisor. Suele indicar problemas de disponibilidad o timeout del emisor. La tabla STIP tiene 73 códigos con la razón.",
    ref: "Diccionario Visa · tabla STIP (73 registros)"
  },
  {
    p: "El motor de riesgo decidió 'challenge' en lugar de 'frictionless'. ¿Qué implica?",
    o: [
      "Que la transacción fue rechazada automáticamente",
      "Que se exige fricción al usuario: OTP, biometría o validación por app",
      "Que la transacción se envía a Stand-In"
    ],
    c: 1,
    e: "El motor de riesgo (VCAS en Visa) decide entre frictionless (sin pedir nada) y challenge (exige OTP, biometría o app). Challenge no es rechazo: es una validación adicional.",
    ref: "Capacitación Autenticación (Recurso 3)"
  },
  {
    p: "¿Cuál es el orden de las etapas del aprovisionamiento de un token?",
    o: [
      "digitalización → check eligibility → activación → autenticación",
      "check eligibility → digitalización → autenticación → activación",
      "autenticación → check eligibility → digitalización → activación"
    ],
    c: 1,
    e: "El aprovisionamiento lo orquesta la marca: check eligibility → digitalización → autenticación → activación. Saber las etapas permite identificar en cuál se cayó un caso fallido.",
    ref: "Capacitación Tokenización (Recurso 4)"
  },
  {
    p: "En el check eligibility de un token, el resultado fue 'Yellow'. ¿Qué significa?",
    o: [
      "No procede el aprovisionamiento",
      "Aprovisionamiento aprobado directamente",
      "Requiere validación adicional (OTP, app, biometría o risk-based)"
    ],
    c: 2,
    e: "Green = aprobado directo, Yellow = requiere validación adicional, Red = no procede. Yellow no es rechazo, es un paso extra de validación.",
    ref: "Capacitación Tokenización (Recurso 4)"
  },
  {
    p: "¿Cuál de estas tablas del diccionario Visa tiene MÁS registros?",
    o: ["CodResVisa (códigos de respuesta)", "MCC (Merchant Category Codes)", "STIP"],
    c: 1,
    e: "MCC tiene 265 registros, más que CodResVisa (75) y STIP (73). Aun así, MCC es prioridad Media y CodResVisa/STIP son prioridad Alta: el volumen no define la prioridad, la utilidad para diagnosticar sí.",
    ref: "Detalle Diccionario Visa"
  },
  {
    p: "¿Qué tabla usarías para saber si una decisión la tomó el emisor o la red en Stand-In?",
    o: ["POS Condition Code", "Response Source", "Processing Code"],
    c: 1,
    e: "Response Source (13 registros, prioridad Alta) indica el origen de la decisión: emisor, STIP, ASAF, etc. Es pequeña pero crítica para el diagnóstico.",
    ref: "Diccionario Visa · tabla Response source"
  },
  {
    p: "¿Qué significa que el diccionario Visa sea el 'ground truth' del agente?",
    o: [
      "Que es el documento más largo de la base",
      "Que es la fuente autoritativa que se cita literalmente y tiene mayor precedencia ante conflicto",
      "Que se carga en la última fase del proyecto"
    ],
    c: 1,
    e: "Ground truth = fuente autoritativa que el agente cita literalmente sin parafrasear, y que manda ante conflicto entre documentos. Es lo que evita la alucinación de códigos.",
    ref: "Leyenda y Criterios"
  },
  {
    p: "Según los criterios de la matriz, ¿qué se carga en la fase 1 del piloto?",
    o: [
      "Todo el conocimiento disponible, para maximizar cobertura",
      "Solo el conocimiento de prioridad Alta (indispensable para responder desde el día 1)",
      "Solo los decks de capacitación"
    ],
    c: 1,
    e: "Prioridad Alta = indispensable desde el día 1 → fase 1. Media = enriquece pero no habilita → fase 2, tras validar el piloto. Baja = al final o bajo demanda.",
    ref: "Leyenda y Criterios"
  },
  {
    p: "¿Cuál es el único recurso que aporta el 'cómo se resuelve aquí' en lugar del 'qué dice la marca'?",
    o: [
      "El Diccionario de Autorizaciones Visa",
      "El deck de Capacitación Autorizaciones",
      "El Historial de Iniciativas (116 iniciativas en 30 conceptos)"
    ],
    c: 2,
    e: "El Historial de Iniciativas es la memoria organizacional: qué se hizo antes, con qué alcance y qué se implementó. Evita retrabajo al advertir si un tema ya fue abordado.",
    ref: "Inventario BC · Recurso ID 5"
  },
  {
    p: "¿Qué gap identifica la matriz respecto al diagnóstico con datos?",
    o: [
      "Que falta normalizar el campo 'Concepto' del Manual de iniciativas",
      "Que no se cuenta aún con reglas/manuales del procesador ni con data transaccional",
      "Que la sección '04 Principales iniciativas' del deck de Tokenización está TBD"
    ],
    c: 1,
    e: "Los tres son gaps reales, pero el que bloquea el diagnóstico con datos es la ausencia de reglas del procesador y de data transaccional. Está previsto evaluarlo en fase 2.",
    ref: "Leyenda y Criterios"
  }
];
