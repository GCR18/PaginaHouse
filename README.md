# Casa en venta — Calle Beni, Vinto

Página de venta de **GCR Asesoría Inmobiliaria** para una casa de 300 m² en Calle Beni, Vinto (Cochabamba, Bolivia).

Es un sitio estático: solo HTML, CSS y JavaScript, sin dependencias ni proceso de compilación.

## Estructura

```
gcr-casa-vinto/
├── index.html      → la página
├── css/styles.css  → estilos, animaciones y diseño para celular
├── js/main.js      → contador, galería deslizable, visor de fotos y enlaces de WhatsApp
└── img/            → fotos de la casa y favicon
```

## Verla en tu computadora

Abre `index.html` con doble clic en el navegador.

## Publicar con GitHub Pages

1. Sube el contenido de esta carpeta a la raíz de tu repositorio (o a una carpeta `docs/`).
2. En GitHub ve a **Settings → Pages**.
3. En **Source** elige **Deploy from a branch**, la rama `main` y la carpeta `/ (root)` (o `/docs`).
4. Guarda. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Cambios rápidos

- **Número de WhatsApp y mensaje:** al inicio de `js/main.js` (`WHATSAPP` y `MENSAJE`).
- **Precio:** busca `$us 190.000` en `index.html`.
- **Fotos:** reemplaza los archivos en `img/` usando el mismo nombre, o agrega uno nuevo copiando un bloque `<div><button class="tile" ...>` en la galería de `index.html` (actualiza el número de `data-i`).
- **Vista previa en Facebook/WhatsApp:** cuando tengas la URL final, cambia en `index.html` la etiqueta `og:image` por la dirección completa, por ejemplo `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/img/patio-principal.jpg`.
