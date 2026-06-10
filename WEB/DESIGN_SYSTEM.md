# Carchic — Design System

Referencia visual para Claude Code. Leer este documento antes de crear o modificar cualquier elemento de interfaz.

---

## 1. Colores

### Paleta principal

| Token | Variable CSS | Hex | Uso |
|---|---|---|---|
| Dark Azure | `--color-dark-azure` | `#003D7F` | CTA, botones primarios, enlaces activos |
| American Navy | `--color-american-navy` | `#002E5F` | Hover de botones, fondos oscuros, hero |
| Arabian Sea | `--color-arabian-sea` | `#2864A4` | Focus de inputs, badges "upcoming", acentos secundarios |
| Light Blue | `--color-light-blue` | `#608CBB` | Texto sobre fondos oscuros, detalles sutiles |

### Grises azulados

| Token | Variable CSS | Hex | Uso |
|---|---|---|---|
| Ink | `--color-ink` | `#051629` | Texto principal, títulos |
| Uniform Blue | `--color-uniform-blue` | `#11263D` | Párrafos, texto de cuerpo |
| Vintage Navy | `--color-vintage-navy` | `#26394D` | Texto secundario, nav links |
| Cadet | `--color-cadet` | `#546475` | Placeholders, metadatos, labels en caps |

### Fondos y superficies

| Token | Variable CSS | Hex | Uso |
|---|---|---|---|
| Background | `--color-bg` | `#F0F3F6` | Fondo general de la web |
| Surface | `--color-surface` | `#FFFFFF` | Cards, modales, navbar |
| Surface Subtle | `--color-surface-subtle` | `#E4E9EF` | Fondos alternativos, bordes, separadores |

### Acento

| Token | Variable CSS | Hex | Uso |
|---|---|---|---|
| Racing Red | `--color-racing-red` | `#B01212` | Solo para énfasis puntual: badge "live", alertas críticas, precio final |

> ⚠️ El rojo es para énfasis puntual. No usarlo en botones generales ni decoración.

---

## 2. Tipografía

### Familias

| Familia | Variable CSS | Uso |
|---|---|---|
| Inter | `--font-primary` | Todo el texto: cuerpo, botones, labels, navegación, precios |
| EB Garamond | `--font-display` | Solo títulos especiales o hero destacado. Clase `.display-title` |

Ambas se importan desde Google Fonts. Ya están en el `styles.css`.

### Escala de tamaños

| Token | Variable CSS | px | Uso típico |
|---|---|---|---|
| xs | `--text-xs` | 12px | Labels en caps, badges, metadatos |
| sm | `--text-sm` | 14px | Texto secundario, botones, tablas |
| base | `--text-base` | 16px | Cuerpo de texto por defecto |
| md | `--text-md` | 18px | Subtítulos, precio destacado |
| lg | `--text-lg` | 20px | Precio principal en card |
| xl | `--text-xl` | 24px | h3, títulos de sección |
| 2xl | `--text-2xl` | 32px | h2, títulos de página |
| 3xl | `--text-3xl` | 40px | h1, hero title en Inter |
| 4xl | `--text-4xl` | 48px | Display title en EB Garamond |

### Pesos

| Token | Variable CSS | Uso |
|---|---|---|
| Light | `--font-light` (300) | Subtítulos en hero, texto decorativo |
| Regular | `--font-regular` (400) | Cuerpo de texto, EB Garamond |
| Medium | `--font-medium` (500) | Botones, nav links |
| Semibold | `--font-semibold` (600) | Títulos de card, headings de tabla |
| Bold | `--font-bold` (700) | h1-h4, precios principales |

### Kerning / Letter-spacing

| Token | Variable CSS | Valor | Uso |
|---|---|---|---|
| Tight | `--tracking-tight` | -0.02em | Títulos grandes en Inter (h1, h2) |
| Normal | `--tracking-normal` | 0em | Cuerpo de texto |
| Wide | `--tracking-wide` | 0.06em | Botones, texto de navegación |
| Wider | `--tracking-wider` | 0.12em | Labels en caps, badges de estado |

### Interlineado

| Token | Variable CSS | Valor | Uso |
|---|---|---|---|
| Tight | `--leading-tight` | 1.2 | Títulos |
| Normal | `--leading-normal` | 1.5 | UI general |
| Relaxed | `--leading-relaxed` | 1.7 | Párrafos de texto largo |

---

## 3. Border Radius

| Token | Variable CSS | Valor | Uso |
|---|---|---|---|
| sm | `--radius-sm` | 2px | Botones pequeños (`.btn-sm`), badges |
| md | `--radius-md` | 4px | Botones estándar, inputs |
| lg | `--radius-lg` | 6px | Cards, panels, alerts |
| xl | `--radius-xl` | 8px | Cards grandes, modales |

> La estética es deliberadamente cuadrada y contenida. No usar valores superiores a 8px salvo para elementos circulares (avatares).

---

## 4. Sombras

| Token | Variable CSS | Uso |
|---|---|---|
| sm | `--shadow-sm` | Estado por defecto de cards y navbar |
| md | `--shadow-md` | Hover de cards, dropdowns |
| lg | `--shadow-lg` | Modales, popovers |

---

## 5. Espaciado

Escala basada en múltiplos de 4px:

| Token | Variable CSS | px |
|---|---|---|
| 1 | `--space-1` | 4px |
| 2 | `--space-2` | 8px |
| 3 | `--space-3` | 12px |
| 4 | `--space-4` | 16px |
| 5 | `--space-5` | 20px |
| 6 | `--space-6` | 24px |
| 8 | `--space-8` | 32px |
| 10 | `--space-10` | 40px |
| 12 | `--space-12` | 48px |
| 16 | `--space-16` | 64px |

---

## 6. Componentes

### Botones

```html
<!-- Primario (CTA principal) -->
<button class="btn btn-primary">Pujar ahora</button>

<!-- Secundario (outline) -->
<button class="btn btn-default">Ver detalles</button>

<!-- Pequeño -->
<button class="btn btn-primary btn-sm">Registrarse</button>

<!-- Énfasis / peligro (usar con moderación) -->
<button class="btn btn-danger">Cancelar puja</button>
```

### Card de vehículo

```html
<div class="carchic-vehicle-card">
  <img class="carchic-vehicle-card__image" src="..." alt="...">
  <div class="carchic-vehicle-card__body">
    <span class="carchic-badge carchic-badge--live">En directo</span>
    <h3 class="carchic-vehicle-card__title">BMW Serie 3 2021</h3>
    <p class="carchic-vehicle-card__meta">120.000 km · Diésel · Automático</p>
    <p class="carchic-vehicle-card__price">18.500 €</p>
    <button class="btn btn-primary btn-block">Ver subasta</button>
  </div>
</div>
```

### Badges de estado

```html
<span class="carchic-badge carchic-badge--live">En vivo</span>
<span class="carchic-badge carchic-badge--upcoming">Próximamente</span>
<span class="carchic-badge carchic-badge--closed">Cerrada</span>
```

### Labels en mayúsculas

```html
<span class="label-caps">Precio de salida</span>
```

### Título display (EB Garamond)

```html
<!-- Solo para héroe u ocasiones especiales -->
<h1 class="display-title display-title--lg">Subastas exclusivas de vehículos</h1>
<h2 class="display-title display-title--md">Próximas subastas</h2>
```

### Hero section

```html
<section class="carchic-hero">
  <div class="container">
    <h1 class="display-title display-title--lg">Titulo del hero</h1>
    <p>Subtítulo descriptivo en azul claro.</p>
    <button class="btn btn-primary">Ver subastas</button>
  </div>
</section>
```

---

## 7. Reglas de uso

- **Fondo de página:** siempre `--color-bg` (`#F0F3F6`). No usar blanco puro como fondo general.
- **Cards y paneles:** fondo `--color-surface` (`#FFFFFF`) para que contrasten sobre el fondo.
- **Texto principal:** `--color-ink` para títulos, `--color-uniform-blue` para párrafos.
- **EB Garamond:** solo para un máximo de 1-2 títulos destacados por página. No usarlo en botones, labels ni texto de interfaz.
- **Rojo:** reservado exclusivamente para badges "live", precios finales o alertas críticas. Nunca en botones de acción general.
- **Bootstrap 3:** ya incluido en el CSS de BidJS. No importar Bootstrap por separado. Los overrides están en `styles.css`.
- **Selectores CSS:** siempre usar prefijo `.carchic-` para componentes propios. No sobreescribir clases de Bootstrap de forma genérica (`.container`, `.row`, `.btn` se sobreescriben solo en `styles.css`, no en otros archivos).

---

## 8. Lo que NO hacer

- ❌ Border radius superior a 8px (salvo avatares circulares).
- ❌ Usar EB Garamond para texto de interfaz, botones o body text.
- ❌ Usar el rojo como color decorativo o de marca general.
- ❌ Fondos blancos puros (`#FFFFFF`) para el fondo general de la página.
- ❌ Importar Bootstrap por separado (ya viene con BidJS).
- ❌ Crear clases CSS sin prefijo `.carchic-` para componentes nuevos.

---

*Documento generado el 08/06/2026. Ver también: `BIDJS_PROJECT_REFERENCE.md` para contexto técnico del proyecto.*
