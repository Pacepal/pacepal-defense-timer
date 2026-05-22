import { useEffect, useState } from 'react'
import { CheckCircle2, Keyboard, Pause, Play, RotateCcw, Timer } from 'lucide-react'
import './App.css'

const SPLITS = [
  {
    id: 'p1',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Portada',
    duration: 20,
    chips: ['Saludar', 'Pablo + Alejandro', 'Proyecto Agile Intermodular', 'Demo despues'],
    script:
      'Buenos dias. Somos Pablo Sevillano y Alejandro Pacheco, del IES Infanta Elena, de segundo de DAW. Hoy presentamos PacePal, nuestro Proyecto Agile Intermodular del curso 2025-2026. En esta primera parte vamos a explicar el proyecto mediante las diapositivas: que se nos pedia, como lo organizamos y como lo resolvimos. Despues haremos la demo practica con la aplicacion, el codigo y la base de datos.',
  },
  {
    id: 'p2',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Quienes somos',
    duration: 50,
    chips: ['Treecore = marco', 'PacePal: Pablo + Alejandro', 'Ouiam no intervino', 'Roles flexibles'],
    script:
      'Esta diapositiva muestra Treecore Studio, que es el marco profesional con el que damos coherencia al proyecto. Treecore como estudio tiene tres perfiles, pero PacePal, como proyecto academico concreto, lo hemos desarrollado Alejandro y yo. Ouiam forma parte de Treecore Studio, pero no ha intervenido en este proyecto. Lo aclaramos porque la diapositiva representa el marco profesional, no el reparto real de trabajo de PacePal. Al ser dos personas, no hemos trabajado con roles totalmente cerrados. Hemos ido alternando responsabilidades segun cada fase: analisis, documentacion, diseno, desarrollo, pruebas y preparacion de defensa.',
  },
  {
    id: 'p3',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Que es PacePal',
    duration: 45,
    chips: ['Plataforma deportiva', 'Rutas reales', 'Comunidad', 'Tienda integrada'],
    script:
      'PacePal es una plataforma web que conecta a personas a traves del deporte y las rutas reales. Tiene tres pilares principales. El primero son las rutas reales: recorridos con informacion util como distancia, dificultad y tipo de ruta. El segundo es la comunidad: usuarios que pueden crear actividades deportivas sobre esas rutas y unirse a actividades de otros. Y el tercero es la tienda: productos deportivos relacionados, con una logica de catalogo, carrito y pedidos.',
  },
  {
    id: 'p4',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Problema que resuelve',
    duration: 50,
    chips: ['Deporte acompanado', 'Rutas seguras', 'Motivacion', 'Hueco entre tracking y grupos'],
    script:
      'PacePal nace para hacer mas facil, seguro y social salir a correr o caminar. Detectamos varios problemas habituales: falta de rutas adecuadas o seguras, poca motivacion para mantener la constancia, preocupacion por entrenar solo, dificultad para encontrar companeros o actividades, y falta de seguimiento u objetivos claros. Hay aplicaciones muy buenas para medir rendimiento o consultar mapas, pero muchas no estan pensadas para crear actividades deportivas sencillas sobre rutas concretas.',
  },
  {
    id: 'p5',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Como funciona PacePal',
    duration: 45,
    chips: ['Explorar ruta', 'Crear actividad', 'Compartir experiencia', 'Demo despues'],
    script:
      'El funcionamiento se resume en tres pasos. Primero, el usuario explora una ruta. Puede consultar recorridos segun distancia, dificultad y tipo de ruta, filtrar, comparar y elegir una opcion adecuada. Segundo, crea una actividad. Define fecha, hora, nivel del grupo y ritmo aproximado. Y tercero, comparte la experiencia: otros usuarios pueden descubrir esa actividad, unirse y participar en una experiencia comun.',
  },
  {
    id: 'p6',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Ruta vs Actividad',
    duration: 45,
    chips: ['Ruta = recorrido base', 'Actividad = plan social', 'Reutilizacion', 'Modelo mas claro'],
    script:
      'Esta fue una de las decisiones funcionales mas importantes del proyecto. La ruta es el recorrido base que ya existe en la plataforma. Tiene distancia, dificultad, desnivel y tipo de ruta. Se puede consultar y reutilizar muchas veces. La actividad, en cambio, es el plan social que ocurre sobre una ruta concreta. Anade los datos variables: fecha, hora, nivel del grupo y ritmo aproximado.',
  },
  {
    id: 'p7',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Organizacion por sprints',
    duration: 50,
    chips: ['Scrum educativo', 'Sprint 0 planificacion', 'Sprint 2 API/BD', 'Sprint 3 React'],
    script:
      'Organizamos el proyecto en cuatro sprints, adaptando Scrum al contexto educativo. No fue un Scrum empresarial rigido, sino una forma de ordenar el trabajo por fases, revisar avances y corregir decisiones cuando el producto evolucionaba. Sprint 0: planificacion, roles y backlog. Sprint 1: landing, diseno y formularios. Sprint 2: API, base de datos, carrito, buscador y roles. Sprint 3: migracion a React e integracion final.',
  },
  {
    id: 'p8',
    phase: 'Presentacion',
    speaker: 'Pablo',
    title: 'Stack tecnologico',
    duration: 45,
    chips: ['React + Vite', 'SPA responsive', 'PHP API REST', 'MySQL/MariaDB'],
    script:
      'El stack se organiza en cuatro bloques. En frontend usamos React 18 con Vite y Bootstrap para construir una interfaz responsive organizada como SPA. React no fue una eleccion libre empresarial, sino parte del objetivo tecnico del Sprint 3: separacion clara entre cliente y servidor, componentes y consumo de API. En backend usamos PHP, API REST y PDO. La base de datos es MySQL/MariaDB.',
  },
  {
    id: 'p9',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Diseno y accesibilidad',
    duration: 50,
    chips: ['Responsive', 'Guia de estilos', 'Foco visible', 'Lighthouse/WAVE'],
    script:
      'En diseno y accesibilidad trabajamos cuatro bloques: responsive real, guia de estilos, accesibilidad y auditoria tecnica. La interfaz se adapta a escritorio, tablet y movil. La guia mantiene paleta PacePal, tipografia Inter y componentes coherentes. En accesibilidad trabajamos foco visible, contraste suficiente, jerarquia clara y navegacion comprensible.',
  },
  {
    id: 'p10',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Frontend: React y experiencia de usuario',
    duration: 45,
    chips: ['Componentes', 'Vistas', 'Sin recarga completa', 'JS modular previo'],
    script:
      'El frontend es la capa visual e interactiva de PacePal. Con React organizamos la interfaz en componentes y vistas, separando actividades, rutas, tienda, usuario y administracion. La navegacion es fluida porque la SPA permite moverse entre vistas sin recargas completas. Veniamos de una base previa con JavaScript modular y la migracion a React permitio ordenar esa logica.',
  },
  {
    id: 'p11',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Backend: API REST en PHP',
    duration: 50,
    chips: ['PHP API', 'JSON', 'PDO', 'Sesiones y roles'],
    script:
      'El backend es la logica de servidor que conecta datos, sesiones y permisos. React realiza solicitudes al servidor y la API REST en PHP responde con JSON. PHP gestiona endpoints, valida datos, comprueba sesion, controla roles y consulta la base de datos mediante PDO. El uso de PDO permite trabajar con consultas preparadas.',
  },
  {
    id: 'p12',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Base de datos: modelo relacional',
    duration: 45,
    chips: ['Usuarios', 'Rutas/actividades', 'Productos/articulos', 'Pedidos/detalle'],
    script:
      'La base de datos guarda usuarios, rutas, actividades, productos y pedidos. El modelo resume las entidades principales y conecta personas, rutas, actividades y compras de forma coherente. La parte de tienda se resuelve con productos, pedidos y detalle de pedido, conservando cantidad y precio unitario en el momento de la compra.',
  },
  {
    id: 'p13',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Arquitectura y API REST',
    duration: 50,
    chips: ['React', 'Fetch/JSON', 'PHP', 'PDO/MySQL'],
    script:
      'Esta diapositiva resume la arquitectura completa. React se encarga de componentes, vistas y eventos. Cuando necesita datos, hace peticiones mediante Fetch. La comunicacion viaja en JSON. PHP recibe esas peticiones, aplica validacion y logica de servidor, y accede a MySQL mediante PDO. La clave es la separacion de responsabilidades.',
  },
  {
    id: 'p14',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Herramientas, despliegue y evidencias',
    duration: 45,
    chips: ['XAMPP completo', 'GitHub Pages estatico', 'Postman', 'Evidencias'],
    script:
      'Para desarrollar, documentar y probar el proyecto usamos varias herramientas. XAMPP nos da el entorno local para Apache, PHP y MySQL. GitHub permite control de versiones. GitHub Pages se usa como publicacion del frontend y apoyo visual, pero no ejecuta PHP ni MySQL. Postman valida endpoints y la documentacion recoge memoria, backlog, guias y evidencias.',
  },
  {
    id: 'p15',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Codigo, conclusiones y futuro',
    duration: 50,
    chips: ['Fetch + JSON', 'Objetivos alcanzados', 'Despliegue real', 'Mejoras futuras'],
    script:
      'Esta diapositiva resume codigo clave, objetivos alcanzados y futuro. La diapositiva muestra fragmentos del codigo de integracion: React solicita datos con Fetch, PHP responde en JSON y la base de datos mantiene la persistencia. Como objetivos alcanzados, tenemos una aplicacion funcional e integrada, con rutas, actividades, tienda y administracion.',
  },
  {
    id: 'p16',
    phase: 'Presentacion',
    speaker: 'Alejandro',
    title: 'Gracias / paso a demo',
    duration: 20,
    chips: ['Cerrar presentacion', 'Paso a demo', 'App + codigo + BD'],
    script:
      'Muchas gracias. Con esto termina la parte de presentacion. A continuacion pasamos a la demo practica, donde ensenaremos la aplicacion funcionando, la conexion con la API, la base de datos, algunas partes concretas del codigo y las pruebas que justifican lo que acabamos de explicar.',
  },
  {
    id: 'd1',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Contexto local XAMPP vs GitHub Pages',
    duration: 25,
    chips: ['Version completa local', 'XAMPP', 'PHP + MySQL', 'GitHub Pages estatico'],
    script:
      'Ahora vamos a ensenar la version completa funcionando en local con XAMPP, PHP y MySQL. GitHub Pages nos sirve como escaparate estatico del frontend, pero la integracion completa necesita la API PHP y la base de datos activa.',
  },
  {
    id: 'd2',
    phase: 'Demo',
    speaker: 'Alejandro',
    title: 'Recorrido visual rapido',
    duration: 45,
    chips: ['Home', 'Rutas', 'Actividades', 'Tienda'],
    script:
      'Hago un recorrido rapido por home, rutas, actividades y tienda para situar el producto antes de entrar en un caso concreto. Aqui se ve que PacePal no es solo una pantalla, sino una aplicacion con secciones funcionales conectadas.',
  },
  {
    id: 'd3',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Actividad existente + ruta vs actividad',
    duration: 50,
    chips: ['Actividad verificada', 'Ruta base', 'Plan social', 'No depender de ID fijo'],
    script:
      'Ahora abro una actividad existente verificada antes de empezar. Aqui se ve la diferencia entre una ruta base y una actividad concreta creada sobre esa ruta. La ruta es el recorrido estable; la actividad es el plan social que ocurre sobre ella.',
  },
  {
    id: 'd4',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Login y sesion PHP',
    duration: 50,
    chips: ['Usuario verificado', 'Sesion PHP', 'Cookie navegador', 'React consulta estado'],
    script:
      'Ahora entro con un usuario verificado solo para esta defensa. La sesion real la gestiona PHP en servidor; el navegador conserva la cookie de sesion y React consulta el estado con el endpoint de sesion.',
  },
  {
    id: 'd5',
    phase: 'Demo',
    speaker: 'Alejandro',
    title: 'Tienda y carrito',
    duration: 50,
    chips: ['Producto con stock', 'Anadir al carrito', 'Contador', 'Total'],
    script:
      'Paso por tienda, anado un producto con stock verificado y enseno contador y total. Con esto cubrimos el requisito de carrito o seleccion temporal sin convertir la demo en una compra completa.',
  },
  {
    id: 'd6',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Panel admin / rol / gestion',
    duration: 50,
    chips: ['Admin', 'Rol', 'Zona de gestion', 'No CRUD largo'],
    script:
      'Ahora entro en el panel de administracion. Aqui se ve que el rol no solo cambia el menu, sino que permite acceder a datos y acciones de gestion. No vamos a hacer un CRUD largo en directo porque no aporta tiempo, pero si ensenar que existe la zona de gestion separada del usuario normal.',
  },
  {
    id: 'd7',
    phase: 'Demo',
    speaker: 'Alejandro',
    title: 'Endpoint /api/session',
    duration: 50,
    chips: ['GET /api/session', 'logged true', 'rol admin', 'No es solo visual'],
    script:
      'Ahora enseno una comprobacion tecnica rapida: el endpoint de sesion. Si devuelve logged true y rol admin, se ve que no es solo un cambio visual en React, sino que PHP reconoce la sesion del usuario.',
  },
  {
    id: 'd8',
    phase: 'Demo',
    speaker: 'Alejandro',
    title: 'Codigo clave',
    duration: 80,
    chips: ['App.jsx SPA', 'api.js fetch', 'useSession', 'index.php', 'AuthController'],
    script:
      'Ahora enseno los cinco archivos clave. App.jsx para SPA y navegacion por hash; api.js para fetch, JSON y credentials include; useSession.js para consulta de sesion; src/api/index.php como entrada de API; y AuthController.php para login, sesion y logout.',
  },
  {
    id: 'd9',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Base de datos',
    duration: 45,
    chips: ['Usuarios', 'Actividades', 'Participaciones', 'Articulos'],
    script:
      'Cierro la parte tecnica ensenando que los datos existen en MySQL. No voy a hacer una explicacion larga de SQL: solo tres consultas para ver usuarios, actividad y participaciones, y articulos.',
  },
  {
    id: 'd10',
    phase: 'Demo',
    speaker: 'Pablo',
    title: 'Cierre final',
    duration: 25,
    chips: ['Camino completo', 'React', 'API PHP', 'MySQL'],
    script:
      'En la demo se ha visto el camino completo: interfaz React, API PHP, sesion y rol, y persistencia en MySQL. Con esto cerramos la parte practica y quedamos a disposicion de las preguntas.',
  },
]

const SPLITS_WITH_TARGETS = SPLITS.map((split, index) => {
  const targetAccumulated =
    split.duration + SPLITS.slice(0, index).reduce((sum, item) => sum + item.duration, 0)

  return {
    ...split,
    splitNumber: index + 1,
    targetAccumulated,
  }
})

const PRESENTATION_TARGET = 705

function formatTime(totalSeconds) {
  const safeValue = Math.max(0, totalSeconds)
  const minutes = Math.floor(safeValue / 60)
  const seconds = safeValue % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function getDeltaStatus(actual, target, isActive = false) {
  if (actual === null || actual === undefined) {
    return isActive ? 'active' : 'pending'
  }

  const delta = actual - target
  const absDelta = Math.abs(delta)

  if (absDelta <= 1) return 'perfect'
  if (absDelta <= 5) return 'good'
  return 'bad'
}

function formatDelta(delta) {
  if (delta === null || delta === undefined) return 'Pendiente'
  return `${delta > 0 ? '+' : ''}${delta}s`
}

function statusLabel(status, delta) {
  if (status === 'pending') return 'Pendiente'
  if (status === 'active') return 'Etapa actual'
  if (status === 'perfect') return `Clavado ${formatDelta(delta)}`
  if (status === 'good') return `Bien ${formatDelta(delta)}`
  return `Fuera ${formatDelta(delta)}`
}

export default function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sealedTimes, setSealedTimes] = useState({})

  const totalTarget = SPLITS_WITH_TARGETS[SPLITS_WITH_TARGETS.length - 1].targetAccumulated
  const isFinished = activeIndex >= SPLITS_WITH_TARGETS.length
  const activeSplit = isFinished ? null : SPLITS_WITH_TARGETS[activeIndex]
  const activeStartTarget =
    activeIndex === 0
      ? 0
      : activeIndex > SPLITS_WITH_TARGETS.length - 1
        ? totalTarget
        : SPLITS_WITH_TARGETS[activeIndex - 1].targetAccumulated
  const activeTargetEnd = activeSplit?.targetAccumulated ?? totalTarget
  const activeTargetDuration = activeSplit?.duration ?? 0
  const previousSealedTime =
    activeIndex === 0 ? 0 : sealedTimes[activeIndex - 1] ?? activeStartTarget
  const activeElapsed = Math.max(0, elapsed - previousSealedTime)
  const currentDelta = elapsed - activeTargetEnd
  const currentSplitNumber = Math.min(activeIndex + 1, SPLITS_WITH_TARGETS.length)

  useEffect(() => {
    if (!isRunning) return undefined

    const intervalId = window.setInterval(() => {
      setElapsed((value) => value + 1)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isRunning])

  useEffect(() => {
    function handleKeyDown(event) {
      const targetTag = event.target instanceof HTMLElement ? event.target.tagName : ''
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return

      if (event.code === 'Space') {
        event.preventDefault()
        sealCurrentSplit()
      } else if (event.key.toLowerCase() === 'p') {
        event.preventDefault()
        setIsRunning((value) => !value)
      } else if (event.key.toLowerCase() === 'r' && event.shiftKey) {
        event.preventDefault()
        resetTimer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  function resetTimer() {
    setIsRunning(false)
    setElapsed(0)
    setActiveIndex(0)
    setSealedTimes({})
  }

  function sealCurrentSplit() {
    if (isFinished) return

    setSealedTimes((current) => ({
      ...current,
      [activeIndex]: elapsed,
    }))
    setActiveIndex((index) => Math.min(index + 1, SPLITS_WITH_TARGETS.length))
  }

  function jumpToSplit(index) {
    setActiveIndex(index)
  }

  const pabloElapsed = SPLITS_WITH_TARGETS.reduce((sum, split, index) => {
    if (split.speaker !== 'Pablo') return sum
    const sealed = sealedTimes[index]
    if (sealed === undefined) return sum
    const previous = index === 0 ? 0 : sealedTimes[index - 1] ?? SPLITS_WITH_TARGETS[index - 1].targetAccumulated
    return sum + Math.max(0, sealed - previous)
  }, 0)

  const alejandroElapsed = SPLITS_WITH_TARGETS.reduce((sum, split, index) => {
    if (split.speaker !== 'Alejandro') return sum
    const sealed = sealedTimes[index]
    if (sealed === undefined) return sum
    const previous = index === 0 ? 0 : sealedTimes[index - 1] ?? SPLITS_WITH_TARGETS[index - 1].targetAccumulated
    return sum + Math.max(0, sealed - previous)
  }, 0)

  return (
    <div className="app-shell">
      <main className="panel panel-left">
        <header className="hero-header">
          <div className="hero-copy">
            <div className="badge-row">
              <span className="badge badge-phase">{activeSplit?.phase ?? 'Finalizado'}</span>
              <span className={`badge ${activeSplit?.speaker === 'Alejandro' ? 'badge-alejandro' : 'badge-pablo'}`}>
                {activeSplit?.speaker ?? 'Fin'}
              </span>
              <span className="badge badge-neutral">Split {currentSplitNumber}/{SPLITS_WITH_TARGETS.length}</span>
            </div>
            <p className="eyebrow">Temporizador de defensa PacePal</p>
            <h1 className="stage-title">{activeSplit?.title ?? 'Defensa completada'}</h1>
            <p className="stage-meta">
              Objetivo etapa: {formatTime(activeTargetDuration)} · Acumulado base: {formatTime(activeTargetEnd)}
            </p>
          </div>

          <div className="hero-timer">
            <span className="timer-label">Tiempo global</span>
            <strong className="timer-value">{formatTime(elapsed)}</strong>
            <span className={`delta-pill ${getDeltaStatus(elapsed, activeTargetEnd)}`}>
              Delta actual {formatDelta(currentDelta)}
            </span>
          </div>
        </header>

        <section className="summary-grid">
          <article className="summary-card">
            <span className="summary-label">Etapa actual</span>
            <strong className="summary-value">{formatTime(activeElapsed)}</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">Presentacion base</span>
            <strong className="summary-value">{formatTime(PRESENTATION_TARGET)}</strong>
          </article>
          <article className="summary-card">
            <span className="summary-label">Defensa base</span>
            <strong className="summary-value">{formatTime(totalTarget)}</strong>
          </article>
        </section>

        <section className="chips-panel">
          <h2 className="section-title">Ideas rapidas</h2>
          <div className="chip-list">
            {(activeSplit?.chips ?? ['Respirar', 'Cerrar', 'Preguntas']).map((chip) => (
              <span className="chip" key={chip}>
                {chip}
              </span>
            ))}
          </div>
        </section>

        <section className="script-panel">
          <h2 className="section-title">Texto exacto / chuleta larga</h2>
          <div className="script-box">
            {activeSplit?.script ?? 'Defensa completada. Respira, deja que el tribunal pregunte y responde corto.'}
          </div>
        </section>

        <footer className="controls-row">
          <button
            type="button"
            className={`control-button ${isRunning ? 'control-dark' : 'control-accent'}`}
            onClick={() => setIsRunning((value) => !value)}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pausar' : 'Iniciar / Reanudar'}
          </button>

          <button type="button" className="control-button control-primary" onClick={sealCurrentSplit}>
            <CheckCircle2 size={18} />
            Sellar etapa
          </button>

          <button type="button" className="control-button control-muted" onClick={resetTimer}>
            <RotateCcw size={18} />
            Reset
          </button>

          <div className="shortcut-hint">
            <Keyboard size={16} />
            Espacio sella · P pausa · Shift+R reinicia
          </div>
        </footer>
      </main>

      <aside className="panel panel-right">
        <header className="sidebar-header">
          <div>
            <h2 className="sidebar-title">
              <Timer size={18} />
              Splits defensa
            </h2>
            <p className="sidebar-subtitle">Actual se rellena al sellar cada etapa</p>
          </div>
          <div className="sidebar-total">
            <strong>{formatTime(totalTarget)}</strong>
            <span>Base total</span>
          </div>
        </header>

        <section className="totals-grid">
          <article className="total-card">
            <span className="total-label">Pablo sellado</span>
            <strong className="total-value total-value-pablo">{formatTime(pabloElapsed)}</strong>
          </article>
          <article className="total-card">
            <span className="total-label">Alejandro sellado</span>
            <strong className="total-value total-value-alejandro">{formatTime(alejandroElapsed)}</strong>
          </article>
        </section>

        <section className="table-card">
          <table className="splits-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Etapa</th>
                <th>Responsable</th>
                <th>Actual</th>
                <th>Base</th>
              </tr>
            </thead>
            <tbody>
              {SPLITS_WITH_TARGETS.map((split, index) => {
                const actual = sealedTimes[index]
                const delta = actual === undefined ? null : actual - split.targetAccumulated
                const isActiveRow = !isFinished && index === activeIndex
                const status = getDeltaStatus(actual, split.targetAccumulated, isActiveRow)
                const rowClass = [
                  'split-row',
                  `status-${status}`,
                  ]
                  .filter(Boolean)
                  .join(' ')

                return (
                  <tr className={rowClass} key={split.id} onClick={() => jumpToSplit(index)}>
                    <td>{split.splitNumber}</td>
                    <td>
                      <div className="table-stage">{split.title}</div>
                      <div className="table-phase">{split.phase}</div>
                    </td>
                    <td>
                      <span className={`speaker-tag ${split.speaker === 'Alejandro' ? 'speaker-alejandro' : 'speaker-pablo'}`}>
                        {split.speaker}
                      </span>
                    </td>
                    <td>
                      <div className="table-time">{actual === undefined ? '—' : formatTime(actual)}</div>
                      <div className={`table-status-pill status-${status}`}>
                        {statusLabel(status, delta)}
                      </div>
                    </td>
                    <td className="table-time">{formatTime(split.targetAccumulated)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>

        <section className="legend-card">
          <span className="section-title">Leyenda</span>
          <div className="legend-row">
            <span className="legend-chip legend-pending">Pendiente</span>
            <span className="legend-chip legend-active">Actual</span>
            <span className="legend-chip legend-on-time">Clavado ±1s</span>
            <span className="legend-chip legend-early">Bien ±5s</span>
            <span className="legend-chip legend-late">Fuera ±5s</span>
          </div>
        </section>
      </aside>
    </div>
  )
}
