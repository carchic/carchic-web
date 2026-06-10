# Carchic — Contexto del Proyecto

## Qué es este proyecto

Web de subastas de vehículos de ocasión para **Carchic**. La web integra **BidJS**, un plugin SaaS externo que gestiona toda la lógica de subastas (pujas, usuarios, facturas). El rol de este frontend es presentar ese plugin con la identidad visual de Carchic.

El modelo de subasta es **timed auction**: los vehículos se publican con un plazo, los usuarios pujan online, y al cerrar el tiempo gana el mejor postor. Sin vídeo en directo (no hay webcast).

El contenido (vehículos, subastas, usuarios) lo gestiona **Carchic Admin** desde el panel de administración de BidJS. No requiere desarrollo.

---

## Documentos de referencia

Leer siempre el documento relevante antes de actuar:

| Documento                    | Cuándo leerlo                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `BIDJS_PROJECT_REFERENCE.md` | Antes de tocar cualquier integración con BidJS, configuración, módulos o navegación |
| `DESIGN_SYSTEM.md`           | Antes de crear o modificar cualquier elemento visual o de interfaz                  |

---

## Stack

- **HTML/CSS Vanilla** — sin frameworks, sin build tools, sin npm.
- **Bootstrap 3** — ya incluido en el CSS de BidJS. No importar por separado.
- **CSS propio** en `css/styles.css` — overrides de Bootstrap y componentes `.carchic-*`.
- **JS propio** en `js/main.js` — solo si es estrictamente necesario.

---

## Estructura de archivos

```
/
├── CLAUDE.md
├── BIDJS_PROJECT_REFERENCE.md
├── DESIGN_SYSTEM.md
├── index.html           ← Página principal (BidJS cargado completo)
├── about.html           ← Quiénes somos (BidJS en modo empty)
├── contact.html         ← Contacto (BidJS en modo empty)
├── css/
│   └── styles.css       ← Variables, overrides Bootstrap, componentes
└── js/
    └── main.js          ← JS propio (mínimo)
```

---

## Reglas que no se negocian

**BidJS**

- El enrutamiento es hashbang (`#!/login`, `#!/auctions/...`). No usar ningún router externo.
- Los contenedores `#bidjs` y `#bidlogix-modal` son obligatorios en el HTML y no se tocan.
- No cargar Bootstrap por separado: viene incluido en el CSS de BidJS.
- La web debe estar en HTTPS. BidJS no funciona en HTTP.
- No usar iframes para embeber BidJS.
  **CSS**
- Nunca sobreescribir clases de Bootstrap de forma genérica fuera de `styles.css`.
- Todo componente nuevo lleva prefijo `.carchic-` para evitar colisiones.
- No usar border-radius superior a 8px (salvo avatares circulares).
- El fondo general es `#F0F3F6`, no blanco puro.
  **Tipografía**
- Inter para todo el texto de interfaz.
- EB Garamond solo para 1-2 títulos hero o destacados por página. Nunca en botones, labels ni body text.
  **Color**
- El rojo `#B01212` es solo para énfasis crítico (badge "live", alertas). Nunca decorativo.
- El CTA principal es Dark Azure `#003D7F`.
  **JS**
- Mantener el JS propio al mínimo. BidJS gestiona toda la lógica de subasta.
- No manipular el DOM dentro de `#bidjs` ni `#bidlogix-modal`.
  **Rendimiento**
- No añadir librerías JS externas sin justificación clara.
- Las imágenes propias de la web (no las de los vehículos, que gestiona BidJS) deben estar optimizadas.

---

## SEO

Activar siempre en la config de BidJS:

```js
allowTitleChange: true,
allowMetaDescriptionChange: true
```

Cada página debe tener su propio `<title>` y `<meta name="description">` base.

---

## Antes de ir a producción

- [ ] HTTPS configurado en el servidor.
- [ ] DKIM y DMARC configurados en el DNS del dominio (emails de BidJS no acaben en spam).
- [ ] T&Cs y Política de Privacidad completados por Carchic Admin.
- [ ] Datos bancarios para facturas configurados en el panel BidJS.
- [ ] Árbol de categorías definitivo definido con soporte BidJS.
