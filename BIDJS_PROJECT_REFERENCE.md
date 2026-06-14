# Carchic — Referencia del Proyecto BidJS
 
Documento de contexto para el desarrollo de la web de subastas de vehículos de Carchic.
Generado a partir de la documentación oficial de BidJS y del onboarding del cliente.
 
---
 
## 1. Credenciales de instancia
 
```js
window.bidjs = {
  config: {
    clientId: 'carchic',
    region: 'eu-central-1',
    server: 'brighton'
  }
}
```
 
- **Admin URL:** https://brighton.eu-central-1.bidjs.com/auction-mgt/home.htm
- **Admin user:** `carchic_admin` / `F.carrion@carchic.es`
- **Vendor ID:** `1181` (Carchic)
- **Categoría inicial:** `8733`
- **Soporte BidJS:** support@bidlogix.com
---
 
## 2. Stack tecnológico
 
- **HTML/CSS Vanilla** — sin frameworks ni build tools.
- **Bootstrap 3** — ya incluido en el CSS de BidJS (`bidjs--full.min.css`). No hace falta incluirlo por separado. Los estilos propios se escriben encima de Bootstrap usando selectores específicos para evitar conflictos.
- **Sin Next.js, Nuxt ni SSR** — el enrutamiento hashbang de BidJS es incompatible con routers de frameworks.
### Estilos propios
 
Escribir los estilos propios en `css/styles.css` siendo siempre específicos en los selectores para no sobreescribir accidentalmente clases de Bootstrap/BidJS (especialmente `.container`, `.row`, `.btn`, etc.).
 
### Estructura de archivos
 
```
/
├── index.html          ← Página principal con BidJS
├── about.html          ← Quiénes somos
├── contact.html        ← Contacto
├── css/
│   └── styles.css      ← Estilos propios
└── js/
    └── main.js         ← JS propio si se necesita
```
 
---
 
## 3. Instalación de BidJS
 
BidJS se basa en **Bootstrap 3**. La config debe ir en el `<head>` **antes** del CSS/JS. El CSS se carga con preload para no bloquear el render; el JS con `defer`:
 
```html
<!-- BidJS Config (debe ir ANTES del CSS/JS) -->
<script>
  window.bidjs = { config: { ... } }
</script>

<!-- BidJS CSS (carga no bloqueante + fallback noscript) -->
<noscript><link href="https://static.bidjs.com/5/bootstrap3/css/bidjs--full.min.css" rel="stylesheet" type="text/css"></noscript>
<link rel="preload" href="https://static.bidjs.com/5/bootstrap3/css/bidjs--full.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- BidJS JS -->
<script defer src="https://static.bidjs.com/5/bootstrap3/js/bidjs.min.js"></script>
```
 
Contenedores obligatorios en el `<body>`:
 
```html
<!-- Modal de BidJS -->
<div class="bidlogix-app bidjs-app">
  <div id="bidlogix-modal"></div>
</div>
 
<!-- Contenedor principal de BidJS -->
<div class="container bidlogix-app">
  <div id="bidjs" class="bidjs-app"></div>
</div>
```
 
---
 
## 4. Configuración completa recomendada
 
```js
window.bidjs = {
  config: {
    clientId: 'carchic',
    region: 'eu-central-1',
    server: 'brighton',
    googleMapsApiKey: '' // Añadir si se usan mapas de ubicación
  },
  modules: {
    auctionDetails: '#!/auctions/%AUCTION_ID%',
    auctionsArchived: true,
    invoices: true,
    lotDetails: '#!/auctions/%AUCTION_ID%/listings/%ITEM_ID%',
    mySales: true,
    login: true,
    register: true,
    webcast: false  // No se usa webcast (subastas timed, sin vídeo en directo)
  },
  options: {
    allowTitleChange: true,            // Importante para SEO
    allowMetaDescriptionChange: true,  // Importante para SEO
    syncHostLocale: true               // BidJS sigue el lang del HTML para idiomas
  }
}
```
 
---
 
## 5. Navegación y hooks de clase
 
BidJS no incluye navegación propia. Se controla mediante clases CSS especiales en el HTML:
 
| Clase | Comportamiento |
|---|---|
| `x-bidlogix--authenticated-show` | Visible solo si el usuario está logueado |
| `x-bidlogix--authenticated-hide` | Oculto si el usuario está logueado |
| `x-bidlogix--administrator-show` | Visible solo para admins (enlace al panel) |
| `x-bidlogix--templated-user` | Muestra el nombre del usuario logueado |
 
Ejemplo de menú de navegación:
 
```html
<nav>
  <!-- Visible siempre -->
  <a href="index.html">Subastas</a>
  <a href="about.html">Quiénes somos</a>
 
  <!-- Solo visible si NO está logueado (sin hidden: visible por defecto) -->
  <a href="index.html#!/login" class="x-bidlogix--authenticated-hide">Iniciar sesión</a>
 
  <!-- Solo visible si está logueado (hidden por defecto para evitar flash) -->
  <a href="index.html#!/account" class="x-bidlogix--authenticated-show hidden">Mi cuenta</a>
  <a href="index.html#!/highBids" class="x-bidlogix--authenticated-show hidden">Mis pujas</a>
  <a href="index.html#!/logout" class="x-bidlogix--authenticated-show hidden">Cerrar sesión</a>
 
  <!-- Solo visible para administradores -->
  <a class="x-bidlogix--administrator-show hidden">Panel Admin</a>
</nav>
```
 
> ⚠️ Los elementos `x-bidlogix--authenticated-show` deben llevar siempre `hidden` por defecto. Sin eso, aparecen visibles durante el instante que tarda BidJS en inicializarse (flash de contenido).
>
> ⚠️ Para que los hooks funcionen en páginas secundarias (about, contact…), `#bidjs` y `#bidlogix-modal` son **ambos** obligatorios, aunque la página use `defaultModule: 'empty'`.
 
---
 
## 6. Rutas hashbang (enrutamiento interno)
 
Todo el enrutamiento es del lado del cliente. No requiere configuración en el servidor.
 
| Ruta | Página |
|---|---|
| `#!/` | Inicio / listado de subastas |
| `#!/auctions/:id` | Detalle de subasta |
| `#!/auctions/:id/listings/:itemId` | Detalle de lote/vehículo |
| `#!/login` | Login |
| `#!/register` | Registro |
| `#!/account` | Cuenta del usuario |
| `#!/highBids` | Pujas activas del usuario |
| `#!/invoices` | Facturas del usuario |
 
---
 
## 7. Idiomas
 
BidJS incluye soporte multiidioma de forma nativa, sin librerías externas.
 
- Por defecto usa el idioma del navegador del usuario.
- Para sincronizar con un selector de idioma propio, activar `syncHostLocale: true` y cambiar el atributo `lang` del `<html>`:
```js
// Ejemplo: selector de idioma manual
document.documentElement.setAttribute('lang', 'es') // BidJS lo detecta automáticamente
```
 
- Usar tags BCP 47: `es`, `en`, `fr`, `de`, `en-GB`, `es-MX`, etc.
---
 
## 8. Módulo "Empty" para páginas secundarias
 
Para que los hooks de navegación (mostrar/ocultar según login) funcionen en páginas como `about.html` o `contact.html`, incluir BidJS en modo invisible:
 
```js
// En about.html, contact.html, etc.
window.bidjs = {
  config: {
    clientId: 'carchic',
    region: 'eu-central-1',
    server: 'brighton'
  },
  modules: {
    auctionDetails: false,
    auctionsArchived: false,
    invoices: false,
    lotDetails: false,
    mySales: false,
    webcast: false,
    login: false,
    register: false
  },
  options: {
    defaultModule: 'empty' // Invisible pero activa los hooks del menú
  }
}
```
 
---
 
## 9. Eventos de BidJS (para funcionalidad extra)
 
BidJS expone eventos que se pueden escuchar para añadir lógica propia:
 
```js
// Escuchar un evento específico
window.bidjs.events.addEventListener('BID_PLACED', function(event) {
  var data = event.detail.data
  // lógica propia aquí
})
 
// Escuchar todos los eventos
window.bidjs.events.addEventListener('message', function(event) {
  console.log(event.detail.action, event.detail.data)
})
```
 
### Eventos disponibles
 
**Generales:**
- `BIDJS_INITIALISED` / `BIDJS_LOADED` — ciclo de carga
- `BIDJS_NAVIGATED` — el usuario cambia de página
- `BIDJS_AUTHENTICATED` / `BIDJS_UNAUTHENTICATED` — cambio de estado de login
**Subasta:**
- `BID_PLACED` / `BID_CANCELLED` / `BID_REINSTATED`
- `SALE_COMPLETED` / `SALE_STARTED`
- `REGISTRANT_UPDATED`
- `SALE_ADDED` / `SALE_WITHDRAWN`
---
 
## 10. Modelo de subasta
 
- Tipo: **Timed auction** (subasta por tiempo, sin vídeo en directo).
- **Sin Webcast** — no se necesita cuenta Vonage.
- Los usuarios pujan online durante el período activo de la subasta.
- Al cerrar el tiempo, gana el mejor postor.
- Carchic Admin gestiona vehículos, subastas y usuarios desde el panel de administración.
---
 
## 11. Gestión de contenido (responsabilidad del cliente)
 
Carchic Admin gestiona todo desde el panel admin de BidJS. No requiere desarrollo:
 
- Crear/editar subastas
- Añadir vehículos (lotes) con fotos, precio de salida, reserva
- Gestión de usuarios y registros
- Facturas e invoicing
---
 
## 12. Pendientes antes de ir a producción
 
| Tarea | Responsable |
|---|---|
| Actualizar contraseña admin | Carchic Admin (urgente) |
| Configurar DKIM y DMARC en DNS del dominio | Dev / hosting |
| Rellenar T&Cs y Política de Privacidad | Carchic Admin |
| Configurar datos por defecto de subasta | Carchic Admin |
| Definir árbol de categorías definitivo | Carchic Admin + soporte BidJS |
| Configurar datos bancarios para facturas | Carchic Admin |
| HTTPS obligatorio en producción | Dev / hosting |
 
---
 
## 13. Advertencias y errores comunes
 
- **Conflictos CSS:** La clase `.container` y otras clases de Bootstrap 3 son usadas internamente por BidJS. No sobreescribir con estilos propios genéricos. Usar siempre selectores específicos en `styles.css`.
- **Sin iframes:** BidJS no tiene soporte oficial dentro de iframes.
- **HTTPS obligatorio:** BidJS no funciona en HTTP.
- **Sin SSR:** No usar frameworks con routing propio (Next.js, Nuxt). El hashbang de BidJS es incompatible.
- **SEO:** Activar siempre `allowTitleChange` y `allowMetaDescriptionChange`.
- **Emails en spam:** Sin DKIM/DMARC configurados, los emails de BidJS a usuarios pueden acabar en spam.
---
 
*Documento generado el 08/06/2026. Basado en docs.bidjs.com y email de onboarding de Bianca (Bidlogix).*