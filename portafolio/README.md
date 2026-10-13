# Portafolio de Daniel Ospina Losada

Portafolio personal construido con HTML, CSS y JavaScript, sin frameworks ni servicios de pago. Puede editarse en Visual Studio Code y publicarse gratis con GitHub Pages.

## Secciones
- Inicio con identidad visual y animación 3D.
- Diseño web con carrusel en perspectiva, flechas, puntos y soporte táctil.
- Diseño gráfico con galería editorial en mosaico, visualmente distinta al carrusel web.
- Proyectos publicados en una lista de enlaces.
- Multimedia para GIF y videos MP4.
- Sobre mí y contacto.
- Partículas sutiles de fondo hechas con Canvas, sin dependencias externas y con respeto a la opción de movimiento reducido del sistema.

## Abrir en Visual Studio Code
1. Descarga y descomprime el ZIP.
2. Abre Visual Studio Code.
3. Ve a **Archivo → Abrir carpeta…** y selecciona la carpeta `portafolio_daniel_ospina` (la que contiene `index.html`).
4. Edita `index.html`, `styles.css` y `script.js` según necesites.
5. Para ver los cambios, abre `index.html` en el navegador. Opcionalmente instala la extensión gratuita **Live Server** desde el panel de Extensiones y pulsa **Go Live**.

## Añadir capturas de páginas web
Guarda tus imágenes en `assets/web` como `web-01.jpg` hasta `web-10.jpg`. Si usas PNG o WebP, cambia la extensión correspondiente en `script.js`.

## Añadir pósteres, banners e ilustraciones
Guarda las imágenes en `assets/grafico` como `grafico-01.jpg` hasta `grafico-10.jpg`. En `script.js`, modifica el array `graphicProjects` para cambiar los títulos, tipos y descripciones.

## Añadir enlaces a proyectos
En `script.js`, edita el array `projectLinks`: cambia `title`, `type`, `description` y `url`. Sustituye cada `https://ejemplo.com` por el enlace real. Borra los objetos que no necesites.

## Añadir GIF o videos
En `script.js`, edita `mediaProjects`.
- GIF: `kind: 'image'`, con una ruta como `assets/gif/animacion-01.gif`.
- Video: `kind: 'video'`, con una ruta como `assets/video/video-01.mp4`.
Los videos grandes pueden hacer que la página cargue lento; conviene comprimirlos.

## Contacto preconfigurado
- WhatsApp: `321 307 6112`. El botón abre una conversación con un mensaje inicial ya escrito.
- Correo: `noaseo01@gmail.com`. El botón abre el programa de correo con asunto y mensaje preparados.
- Puedes cambiar el texto del mensaje, el asunto o el correo en `script.js`, en las constantes `contactMessage`, `contactSubject` y `contactEmail`.
- Reemplaza `workanaUrl` por el enlace exacto de tu perfil cuando esté aprobado.

Nota: por seguridad del navegador, el enlace de correo abre la aplicación o web de correo configurada en el dispositivo; el usuario todavía debe pulsar **Enviar**. WhatsApp también requiere que la persona pulse **Enviar**.

## Subirlo a GitHub y publicarlo gratis
1. Crea una cuenta o inicia sesión en GitHub.
2. Pulsa **New repository** y crea un repositorio público, por ejemplo `portafolio-daniel`.
3. Sube el contenido de esta carpeta al repositorio. Importante: `index.html` debe quedar en la raíz del repositorio, no dentro de otra carpeta.
4. En GitHub abre **Settings → Pages**.
5. En **Build and deployment**, elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/(root)`, y guarda.
6. Espera a que GitHub Pages publique la web; la URL aparecerá en esa misma sección.

## Consejos
- Antes de publicar, cambia los títulos de ejemplo y enlaces `https://ejemplo.com` por trabajos reales.
- No subas archivos confidenciales ni datos de clientes sin autorización.
- Usa imágenes optimizadas y conserva las carpetas `assets` para que las rutas funcionen.


## Contacto por correo y movimiento del carrusel

La sección de contacto ofrece enlaces que preparan el mismo asunto y mensaje en Gmail, Outlook/Hotmail o en la aplicación de correo predeterminada del dispositivo. El usuario revisa el mensaje y pulsa Enviar; la web no envía correos automáticamente. El carrusel permite arrastrar con el mouse o el dedo y muestra un desplazamiento animado al cambiar de proyecto.
