import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, Timer, CheckCircle2, Keyboard, Flag } from "lucide-react";

const PRESENTATION_SPLITS = [
  {
    id: "p1",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Portada",
    duration: 20,
    base: 20,
    chips: ["Saludar", "Pablo + Alejandro", "Proyecto Agile Intermodular", "Demo después"],
    script:
      "Buenos días. Somos Pablo Sevillano y Alejandro Pacheco, del IES Infanta Elena, de segundo de DAW. Hoy presentamos PacePal, nuestro Proyecto Agile Intermodular del curso 2025-2026. En esta primera parte vamos a explicar el proyecto mediante las diapositivas: qué se nos pedía, cómo lo organizamos y cómo lo resolvimos. Después haremos la demo práctica con la aplicación, el código y la base de datos."
  },
  {
    id: "p2",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Quiénes somos",
    duration: 50,
    base: 70,
    chips: ["Treecore = marco", "PacePal: Pablo + Alejandro", "Ouiam no intervino", "Roles flexibles"],
    script:
      "Esta diapositiva muestra Treecore Studio, que es el marco profesional con el que damos coherencia al proyecto. Treecore como estudio tiene tres perfiles, pero PacePal, como proyecto académico concreto, lo hemos desarrollado Alejandro y yo. Ouiam forma parte de Treecore Studio, pero no ha intervenido en este proyecto. Lo aclaramos porque la diapositiva representa el marco profesional, no el reparto real de trabajo de PacePal. Al ser dos personas, no hemos trabajado con roles totalmente cerrados. Hemos ido alternando responsabilidades según cada fase: análisis, documentación, diseño, desarrollo, pruebas y preparación de defensa."
  },
  {
    id: "p3",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Qué es PacePal",
    duration: 45,
    base: 115,
    chips: ["Plataforma deportiva", "Rutas reales", "Comunidad", "Tienda integrada"],
    script:
      "PacePal es una plataforma web que conecta a personas a través del deporte y las rutas reales. Tiene tres pilares principales. El primero son las rutas reales: recorridos con información útil como distancia, dificultad y tipo de ruta. El segundo es la comunidad: usuarios que pueden crear actividades deportivas sobre esas rutas y unirse a actividades de otros. Y el tercero es la tienda: productos deportivos relacionados, con una lógica de catálogo, carrito y pedidos."
  },
  {
    id: "p4",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Problema que resuelve",
    duration: 50,
    base: 165,
    chips: ["Deporte acompañado", "Rutas seguras", "Motivación", "Hueco entre tracking y grupos"],
    script:
      "PacePal nace para hacer más fácil, seguro y social salir a correr o caminar. Detectamos varios problemas habituales: falta de rutas adecuadas o seguras, poca motivación para mantener la constancia, preocupación por entrenar solo, dificultad para encontrar compañeros o actividades, y falta de seguimiento u objetivos claros. Hay aplicaciones muy buenas para medir rendimiento o consultar mapas, pero muchas no están pensadas para crear actividades deportivas sencillas sobre rutas concretas."
  },
  {
    id: "p5",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Cómo funciona PacePal",
    duration: 45,
    base: 210,
    chips: ["Explorar ruta", "Crear actividad", "Compartir experiencia", "Demo después"],
    script:
      "El funcionamiento se resume en tres pasos. Primero, el usuario explora una ruta. Puede consultar recorridos según distancia, dificultad y tipo de ruta, filtrar, comparar y elegir una opción adecuada. Segundo, crea una actividad. Define fecha, hora, nivel del grupo y ritmo aproximado. Y tercero, comparte la experiencia: otros usuarios pueden descubrir esa actividad, unirse y participar en una experiencia común."
  },
  {
    id: "p6",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Ruta vs Actividad",
    duration: 45,
    base: 255,
    chips: ["Ruta = recorrido base", "Actividad = plan social", "Reutilización", "Modelo más claro"],
    script:
      "Esta fue una de las decisiones funcionales más importantes del proyecto. La ruta es el recorrido base que ya existe en la plataforma. Tiene distancia, dificultad, desnivel y tipo de ruta. Se puede consultar y reutilizar muchas veces. La actividad, en cambio, es el plan social que ocurre sobre una ruta concreta. Añade los datos variables: fecha, hora, nivel del grupo y ritmo aproximado."
  },
  {
    id: "p7",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Organización por sprints",
    duration: 50,
    base: 305,
    chips: ["Scrum educativo", "Sprint 0 planificación", "Sprint 2 API/BD", "Sprint 3 React"],
    script:
      "Organizamos el proyecto en cuatro sprints, adaptando Scrum al contexto educativo. No fue un Scrum empresarial rígido, sino una forma de ordenar el trabajo por fases, revisar avances y corregir decisiones cuando el producto evolucionaba. Sprint 0: planificación, roles y backlog. Sprint 1: landing, diseño y formularios. Sprint 2: API, base de datos, carrito, buscador y roles. Sprint 3: migración a React e integración final."
  },
  {
    id: "p8",
    phase: "Presentación",
    speaker: "Pablo",
    title: "Stack tecnológico",
    duration: 45,
    base: 350,
    chips: ["React + Vite", "SPA responsive", "PHP API REST", "MySQL/MariaDB"],
    script:
      "El stack se organiza en cuatro bloques. En frontend usamos React 18 con Vite y Bootstrap para construir una interfaz responsive organizada como SPA. React no fue una elección libre empresarial, sino parte del objetivo técnico del Sprint 3: separación clara entre cliente y servidor, componentes y consumo de API. En backend usamos PHP, API REST y PDO. La base de datos es MySQL/MariaDB."
  },
  {
    id: "p9",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Diseño y accesibilidad",
    duration: 50,
    base: 400,
    chips: ["Responsive", "Guía de estilos", "Foco visible", "Lighthouse/WAVE"],
    script:
      "En diseño y accesibilidad trabajamos cuatro bloques: responsive real, guía de estilos, accesibilidad y auditoría técnica. La interfaz se adapta a escritorio, tablet y móvil. La guía mantiene paleta PacePal, tipografía Inter y componentes coherentes. En accesibilidad trabajamos foco visible, contraste suficiente, jerarquía clara y navegación comprensible."
  },
  {
    id: "p10",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Frontend: React y experiencia de usuario",
    duration: 45,
    base: 445,
    chips: ["Componentes", "Vistas", "Sin recarga completa", "JS modular previo"],
    script:
      "El frontend es la capa visual e interactiva de PacePal. Con React organizamos la interfaz en componentes y vistas, separando actividades, rutas, tienda, usuario y administración. La navegación es fluida porque la SPA permite moverse entre vistas sin recargas completas. Veníamos de una base previa con JavaScript modular y la migración a React permitió ordenar esa lógica."
  },
  {
    id: "p11",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Backend: API REST en PHP",
    duration: 50,
    base: 495,
    chips: ["PHP API", "JSON", "PDO", "Sesiones y roles"],
    script:
      "El backend es la lógica de servidor que conecta datos, sesiones y permisos. React realiza solicitudes al servidor y la API REST en PHP responde con JSON. PHP gestiona endpoints, valida datos, comprueba sesión, controla roles y consulta la base de datos mediante PDO. El uso de PDO permite trabajar con consultas preparadas."
  },
  {
    id: "p12",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Base de datos: modelo relacional",
    duration: 45,
    base: 540,
    chips: ["Usuarios", "Rutas/actividades", "Productos/artículos", "Pedidos/detalle"],
    script:
      "La base de datos guarda usuarios, rutas, actividades, productos y pedidos. El modelo resume las entidades principales y conecta personas, rutas, actividades y compras de forma coherente. La parte de tienda se resuelve con productos, pedidos y detalle de pedido, conservando cantidad y precio unitario en el momento de la compra."
  },
  {
    id: "p13",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Arquitectura y API REST",
    duration: 50,
    base: 590,
    chips: ["React", "Fetch/JSON", "PHP", "PDO/MySQL"],
    script:
      "Esta diapositiva resume la arquitectura completa. React se encarga de componentes, vistas y eventos. Cuando necesita datos, hace peticiones mediante Fetch. La comunicación viaja en JSON. PHP recibe esas peticiones, aplica validación y lógica de servidor, y accede a MySQL mediante PDO. La clave es la separación de responsabilidades."
  },
  {
    id: "p14",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Herramientas, despliegue y evidencias",
    duration: 45,
    base: 635,
    chips: ["XAMPP completo", "GitHub Pages estático", "Postman", "Evidencias"],
    script:
      "Para desarrollar, documentar y probar el proyecto usamos varias herramientas. XAMPP nos da el entorno local para Apache, PHP y MySQL. GitHub permite control de versiones. GitHub Pages se usa como publicación del frontend y apoyo visual, pero no ejecuta PHP ni MySQL. Postman valida endpoints y la documentación recoge memoria, backlog, guías y evidencias."
  },
  {
    id: "p15",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Código, conclusiones y futuro",
    duration: 50,
    base: 685,
    chips: ["Fetch + JSON", "Objetivos alcanzados", "Despliegue real", "Mejoras futuras"],
    script:
      "Esta diapositiva resume código clave, objetivos alcanzados y futuro. La diapositiva muestra fragmentos del código de integración: React solicita datos con Fetch, PHP responde en JSON y la base de datos mantiene la persistencia. Como objetivos alcanzados, tenemos una aplicación funcional e integrada, con rutas, actividades, tienda y administración."
  },
  {
    id: "p16",
    phase: "Presentación",
    speaker: "Alejandro",
    title: "Gracias / paso a demo",
    duration: 20,
    base: 705,
    chips: ["Cerrar presentación", "Paso a demo", "App + código + BD"],
    script:
      "Muchas gracias. Con esto termina la parte de presentación. A continuación pasamos a la demo práctica, donde enseñaremos la aplicación funcionando, la conexión con la API, la base de datos, algunas partes concretas del código y las pruebas que justifican lo que acabamos de explicar."
  },
  {
    id: "d1",
    phase: "Demo",
    speaker: "Pablo",
    title: "Contexto local XAMPP vs GitHub Pages",
    duration: 25,
    base: 730,
    chips: ["Versión completa local", "XAMPP", "PHP + MySQL", "GitHub Pages estático"],
    script:
      "Ahora vamos a enseñar la versión completa funcionando en local con XAMPP, PHP y MySQL. GitHub Pages nos sirve como escaparate estático del frontend, pero la integración completa necesita la API PHP y la base de datos activa."
  },
  {
    id: "d2",
    phase: "Demo",
    speaker: "Alejandro",
    title: "Recorrido visual rápido",
    duration: 45,
    base: 775,
    chips: ["Home", "Rutas", "Actividades", "Tienda"],
    script:
      "Hago un recorrido rápido por home, rutas, actividades y tienda para situar el producto antes de entrar en un caso concreto. Aquí se ve que PacePal no es solo una pantalla, sino una aplicación con secciones funcionales conectadas."
  },
  {
    id: "d3",
    phase: "Demo",
    speaker: "Pablo",
    title: "Actividad existente + ruta vs actividad",
    duration: 50,
    base: 825,
    chips: ["Actividad verificada", "Ruta base", "Plan social", "No depender de ID fijo"],
    script:
      "Ahora abro una actividad existente verificada antes de empezar. Aquí se ve la diferencia entre una ruta base y una actividad concreta creada sobre esa ruta. La ruta es el recorrido estable; la actividad es el plan social que ocurre sobre ella."
  },
  {
    id: "d4",
    phase: "Demo",
    speaker: "Pablo",
    title: "Login y sesión PHP",
    duration: 50,
    base: 875,
    chips: ["Usuario verificado", "Sesión PHP", "Cookie navegador", "React consulta estado"],
    script:
      "Ahora entro con un usuario verificado solo para esta defensa. La sesión real la gestiona PHP en servidor; el navegador conserva la cookie de sesión y React consulta el estado con el endpoint de sesión."
  },
  {
    id: "d5",
    phase: "Demo",
    speaker: "Alejandro",
    title: "Tienda y carrito",
    duration: 50,
    base: 925,
    chips: ["Producto con stock", "Añadir al carrito", "Contador", "Total"],
    script:
      "Paso por tienda, añado un producto con stock verificado y enseño contador y total. Con esto cubrimos el requisito de carrito o selección temporal sin convertir la demo en una compra completa."
  },
  {
    id: "d6",
    phase: "Demo",
    speaker: "Pablo",
    title: "Panel admin / rol / gestión",
    duration: 50,
    base: 975,
    chips: ["Admin", "Rol", "Zona de gestión", "No CRUD largo"],
    script:
      "Ahora entro en el panel de administración. Aquí se ve que el rol no solo cambia el menú, sino que permite acceder a datos y acciones de gestión. No vamos a hacer un CRUD largo en directo porque no aporta tiempo, pero sí enseñar que existe la zona de gestión separada del usuario normal."
  },
  {
    id: "d7",
    phase: "Demo",
    speaker: "Alejandro",
    title: "Endpoint /api/session",
    duration: 50,
    base: 1025,
    chips: ["GET /api/session", "logged true", "rol admin", "No es solo visual"],
    script:
      "Ahora enseño una comprobación técnica rápida: el endpoint de sesión. Si devuelve logged true y rol admin, se ve que no es solo un cambio visual en React, sino que PHP reconoce la sesión del usuario."
  },
  {
    id: "d8",
    phase: "Demo",
    speaker: "Alejandro",
    title: "Código clave",
    duration: 80,
    base: 1105,
    chips: ["App.jsx SPA", "api.js fetch", "useSession", "index.php", "AuthController"],
    script:
      "Ahora enseño los cinco archivos clave. App.jsx para SPA y navegación por hash; api.js para fetch, JSON y credentials include; useSession.js para consulta de sesión; src/api/index.php como entrada de API; y AuthController.php para login, sesión y logout."
  },
  {
    id: "d9",
    phase: "Demo",
    speaker: "Pablo",
    title: "Base de datos",
    duration: 45,
    base: 1150,
    chips: ["Usuarios", "Actividades", "Participaciones", "Artículos"],
    script:
      "Cierro la parte técnica enseñando que los datos existen en MySQL. No voy a hacer una explicación larga de SQL: solo tres consultas para ver usuarios, actividad y participaciones, y artículos."
  },
  {
    id: "d10",
    phase: "Demo",
    speaker: "Pablo",
    title: "Cierre final",
    duration: 25,
    base: 1175,
    chips: ["Camino completo", "React", "API PHP", "MySQL"],
    script:
      "En la demo se ha visto el camino completo: interfaz React, API PHP, sesión y rol, y persistencia en MySQL. Con esto cerramos la parte práctica y quedamos a disposición de las preguntas."
  }
];

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getDeltaStatus(actual, target) {
  if (actual === null || actual === undefined) return "pending";
  const delta = actual - target;
  if (delta < -5) return "early";
  if (delta <= 5) return "on";
  return "late";
}

function statusLabel(status, delta) {
  if (status === "pending") return "Pendiente";
  if (status === "early") return `Verde · ${delta}s`;
  if (status === "on") return `Perfecto · ${delta >= 0 ? "+" : ""}${delta}s`;
  return `Rojo · +${delta}s`;
}

function buildSplits() {
  let running = 0;
  return PRESENTATION_SPLITS.map((split, index) => {
    running += split.duration;
    return {
      ...split,
      splitNumber: index + 1,
      targetAccumulated: running
    };
  });
}

export default function PacePalDefenseSpeedrunTimer() {
  const splits = useMemo(buildSplits, []);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sealedTimes, setSealedTimes] = useState({});

  const activeSplit = splits[activeIndex] ?? splits[splits.length - 1];
  const totalTarget = splits[splits.length - 1].targetAccumulated;
  const presentationTarget = 705;
  const demoStart = 705;

  useEffect(() => {
    if (!isRunning) return undefined;
    const intervalId = window.setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        sealCurrentSplit();
      }
      if (event.key && event.key.toLowerCase() === "p") {
        setIsRunning((value) => !value);
      }
      if (event.key && event.key.toLowerCase() === "r" && event.shiftKey) {
        resetTimer();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function resetTimer() {
    setIsRunning(false);
    setElapsed(0);
    setActiveIndex(0);
    setSealedTimes({});
  }

  function sealCurrentSplit() {
    if (activeIndex >= splits.length) return;
    setSealedTimes((current) => ({
      ...current,
      [activeIndex]: elapsed
    }));
    setActiveIndex((index) => Math.min(index + 1, splits.length));
  }

  function jumpToSplit(index) {
    setActiveIndex(index);
  }

  const activeStartTarget = activeIndex === 0 ? 0 : splits[activeIndex - 1]?.targetAccumulated ?? totalTarget;
  const activeTargetEnd = activeSplit?.targetAccumulated ?? totalTarget;
  const activeTargetDuration = activeSplit?.duration ?? 0;
  const activeElapsed = Math.max(0, elapsed - (sealedTimes[activeIndex - 1] ?? activeStartTarget));
  const currentDelta = elapsed - activeTargetEnd;
  const phaseName = activeSplit?.phase ?? "Finalizado";

  const pabloElapsed = splits.reduce((sum, split, index) => {
    if (split.speaker !== "Pablo") return sum;
    const sealed = sealedTimes[index];
    if (sealed === undefined) return sum;
    const previous = index === 0 ? 0 : (sealedTimes[index - 1] ?? splits[index - 1].targetAccumulated);
    return sum + Math.max(0, sealed - previous);
  }, 0);

  const alejandroElapsed = splits.reduce((sum, split, index) => {
    if (split.speaker !== "Alejandro") return sum;
    const sealed = sealedTimes[index];
    if (sealed === undefined) return sum;
    const previous = index === 0 ? 0 : (sealedTimes[index - 1] ?? splits[index - 1].targetAccumulated);
    return sum + Math.max(0, sealed - previous);
  }, 0);

  return (
    <div className="min-h-screen bg-[#0f1608] text-[#1E1E1E] p-4">
      <div className="grid grid-cols-[70fr_30fr] gap-4 h-[calc(100vh-2rem)]">
        <main className="min-w-0 h-full">
          <div className="h-full rounded-3xl shadow-2xl border border-[#A1F227]/20 bg-[#F6F8F3] overflow-hidden">
            <div className="h-full p-6 flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#2A400A] text-white text-xs font-bold uppercase tracking-wide">{phaseName}</span>
                    <span className="px-3 py-1 rounded-full bg-[#A1F227] text-[#2A400A] text-xs font-black uppercase tracking-wide">{activeSplit?.speaker ?? "Fin"}</span>
                    <span className="px-3 py-1 rounded-full bg-white border text-xs font-bold">Split {activeIndex + 1}/{splits.length}</span>
                  </div>
                  <h1 className="text-5xl font-black leading-tight text-[#1E1E1E]">
                    {activeSplit?.title ?? "Defensa completada"}
                  </h1>
                  <p className="text-lg text-[#5C6A52] mt-2">
                    Objetivo etapa: {formatTime(activeTargetDuration)} · Acumulado base: {formatTime(activeTargetEnd)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-6xl font-black tabular-nums text-[#2A400A]">{formatTime(elapsed)}</div>
                  <div className={`mt-2 text-sm font-bold ${currentDelta <= 5 ? "text-[#5D8C16]" : "text-[#B91C1C]"}`}>
                    Delta split actual: {currentDelta >= 0 ? "+" : ""}{currentDelta}s
                  </div>
                </div>
              </div>

              <section className="grid grid-cols-1 gap-4">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#5D8C16] mb-3">Ideas rápidas</h2>
                  <div className="flex flex-wrap gap-3">
                    {(activeSplit?.chips ?? ["Respirar", "Cerrar", "Preguntas"]).map((chip) => (
                      <motion.span
                        key={chip}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 rounded-2xl bg-white border border-[#D9DFD2] shadow-sm text-lg font-extrabold text-[#2A400A]"
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-3xl bg-white border border-[#D9DFD2] p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wide font-black text-[#5C6A52]">Etapa actual</div>
                    <div className="text-4xl font-black tabular-nums text-[#2A400A] mt-2">{formatTime(activeElapsed)}</div>
                  </div>
                  <div className="rounded-3xl bg-white border border-[#D9DFD2] p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wide font-black text-[#5C6A52]">Presentación base</div>
                    <div className="text-4xl font-black tabular-nums text-[#2A400A] mt-2">{formatTime(presentationTarget)}</div>
                  </div>
                  <div className="rounded-3xl bg-white border border-[#D9DFD2] p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wide font-black text-[#5C6A52]">Defensa base</div>
                    <div className="text-4xl font-black tabular-nums text-[#2A400A] mt-2">{formatTime(totalTarget)}</div>
                  </div>
                </div>
              </section>

              <section className="flex-1 min-h-0 rounded-3xl bg-white border border-[#D9DFD2] p-6 shadow-inner overflow-auto">
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[#5D8C16] mb-4">Texto exacto / chuleta larga</h2>
                <p className="text-2xl leading-relaxed font-semibold text-[#1E1E1E] whitespace-pre-line">
                  {activeSplit?.script ?? "Defensa completada. Respira, deja que el tribunal pregunte y responde corto."}
                </p>
              </section>

              <section className="flex gap-3 items-center">
                {!isRunning ? (
                  <button onClick={startTimer} className="rounded-2xl bg-[#A1F227] text-[#2A400A] hover:bg-[#A1F227]/90 font-black px-5 py-6">
                    <Play className="w-5 h-5 mr-2" /> Iniciar / Reanudar
                  </button>
                ) : (
                  <button onClick={pauseTimer} className="rounded-2xl bg-[#2A400A] text-white hover:bg-[#2A400A]/90 font-black px-5 py-6">
                    <Pause className="w-5 h-5 mr-2" /> Pausar
                  </button>
                )}
                <button onClick={sealCurrentSplit} className="rounded-2xl bg-[#2563EB] text-white hover:bg-[#2563EB]/90 font-black px-5 py-6">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Sellar etapa · Espacio
                </button>
                <button onClick={() => jumpToSplit(Math.min(activeIndex + 1, splits.length - 1))} className="rounded-2xl font-bold px-5 py-6">
                  <SkipForward className="w-5 h-5 mr-2" /> Saltar
                </button>
                <button onClick={resetTimer} className="rounded-2xl font-bold px-5 py-6 border-red-200 text-red-700">
                  <RotateCcw className="w-5 h-5 mr-2" /> Reset Shift+R
                </button>
                <div className="ml-auto text-sm text-[#5C6A52] flex items-center gap-2 font-bold">
                  <Keyboard className="w-4 h-4" /> Espacio sella · P pausa · Shift+R reinicia
                </div>
              </section>
            </div>
          </div>
        </main>

        <aside className="min-w-0 h-full">
          <div className="h-full rounded-3xl shadow-2xl border border-[#A1F227]/20 bg-[#F6F8F3] overflow-hidden">
            <div className="h-full p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#2A400A] flex items-center gap-2"><Timer className="w-5 h-5" /> Splits defensa</h2>
                  <p className="text-xs text-[#5C6A52] font-semibold">Actual se rellena al sellar cada etapa</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tabular-nums text-[#2A400A]">{formatTime(totalTarget)}</div>
                  <div className="text-[10px] uppercase tracking-wide font-black text-[#5C6A52]">Base total</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-white p-3 border border-[#D9DFD2]">
                  <div className="text-[10px] uppercase tracking-wide font-black text-[#5C6A52]">Pablo sellado</div>
                  <div className="text-2xl font-black tabular-nums text-[#2A400A]">{formatTime(pabloElapsed)}</div>
                </div>
                <div className="rounded-2xl bg-white p-3 border border-[#D9DFD2]">
                  <div className="text-[10px] uppercase tracking-wide font-black text-[#5C6A52]">Alejandro sellado</div>
                  <div className="text-2xl font-black tabular-nums text-[#173D7A]">{formatTime(alejandroElapsed)}</div>
                </div>
              </div>

              <div className="overflow-auto rounded-2xl border border-[#D9DFD2] bg-white flex-1">
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-[#2A400A] text-white z-10">
                    <tr>
                      <th className="p-2 text-left">#</th>
                      <th className="p-2 text-left">Etapa</th>
                      <th className="p-2 text-right">Actual</th>
                      <th className="p-2 text-right">Base</th>
                    </tr>
                  </thead>
                  <tbody>
                    {splits.map((split, index) => {
                      const actual = sealedTimes[index];
                      const delta = actual === undefined ? null : actual - split.targetAccumulated;
                      const status = getDeltaStatus(actual, split.targetAccumulated);
                      const isActive = index === activeIndex;
                      return (
                        <tr
                          key={split.id}
                          onClick={() => jumpToSplit(index)}
                          className={`cursor-pointer border-b border-[#D9DFD2]/70 ${isActive ? "bg-[#A1F227]/25" : ""}`}
                        >
                          <td className="p-2 font-black text-[#5C6A52]">{index + 1}</td>
                          <td className="p-2">
                            <div className="font-black text-[#1E1E1E] leading-tight">{split.title}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${split.speaker === "Pablo" ? "bg-[#2A400A] text-white" : "bg-[#173D7A] text-white"}`}>{split.speaker}</span>
                              <span className="text-[10px] text-[#5C6A52] font-bold">{split.phase}</span>
                            </div>
                          </td>
                          <td className="p-2 text-right">
                            <div className={`font-black tabular-nums ${status === "early" ? "text-[#5D8C16]" : status === "on" ? "text-[#B45309]" : status === "late" ? "text-[#B91C1C]" : "text-[#94A389]"}`}>
                              {actual === undefined ? "—" : formatTime(actual)}
                            </div>
                            <div className="text-[10px] font-bold">
                              {statusLabel(status, delta ?? 0)}
                            </div>
                          </td>
                          <td className="p-2 text-right font-black tabular-nums text-[#2A400A]">{formatTime(split.targetAccumulated)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="rounded-2xl bg-white border border-[#D9DFD2] p-3">
                <div className="flex items-center gap-2 text-sm font-black text-[#2A400A]"><Flag className="w-4 h-4" /> Leyenda</div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-[11px] font-bold">
                  <span className="rounded-xl bg-[#5D8C16]/15 text-[#5D8C16] px-2 py-1">Antes de -5s</span>
                  <span className="rounded-xl bg-[#B45309]/15 text-[#B45309] px-2 py-1">±5s OK</span>
                  <span className="rounded-xl bg-[#B91C1C]/15 text-[#B91C1C] px-2 py-1">Tarde +5s</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
