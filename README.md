# pacepal-defense-timer

Herramienta auxiliar local para ensayar y controlar la defensa oral de PacePal.

Este proyecto no es la aplicacion principal de PacePal. Sirve como temporizador visual de apoyo para la presentacion y la demo, con seguimiento por splits, responsables y delta frente al tiempo base acumulado.

## Stack

- React
- Vite
- CSS puro
- lucide-react

## Uso local

Requisitos:

- Node.js 20 o superior
- npm

Instalacion:

```bash
npm install
```

Desarrollo:

```bash
npm run dev
```

Build de produccion:

```bash
npm run build
```

## Controles

- `Espacio`: sellar etapa actual
- `P`: pausar o reanudar
- `Shift + R`: reiniciar temporizador

## Comportamiento

- La interfaz usa layout 70/30.
- El panel izquierdo muestra la etapa activa, cronometro global, ideas rapidas y texto exacto.
- El panel derecho muestra la tabla de splits con estados visuales y scroll interno.
- Los estados de color distinguen etapa pendiente, activa, clavada, dentro de margen y fuera de margen.

## Publicacion

Este repositorio no debe incluir:

- `node_modules`
- `dist`
- `.env`
- `.env.local`
- credenciales reales

## Notas

- Los tiempos, textos y logica de la defensa pertenecen a esta herramienta auxiliar.
- Cualquier integracion con la aplicacion principal PacePal debe mantenerse separada de este repositorio.
