// GCR Asesoría Inmobiliaria — interacciones de la página de venta
(function () {
  'use strict';

  // ===== Configuración =====
  var WHATSAPP = '59164250318';
  var MENSAJE = 'Hola, me interesa la casa en venta en Calle Beni, Vinto. ¿Podemos coordinar una visita?';

  // Enlaces de WhatsApp con mensaje ya escrito
  var waUrl = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(MENSAJE);
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== Contador de los datos clave =====
  var counters = document.querySelectorAll('.count');
  if (!reduceMotion && counters.length) {
    var start = null;
    var dur = 1400;
    counters.forEach(function (el) { el.textContent = '0'; });
    var tick = function (now) {
      if (start === null) { start = now; }
      var t = Math.min(1, (now - start) / dur);
      var p = 1 - Math.pow(1 - t, 3);
      counters.forEach(function (el) {
        el.textContent = String(Math.round(Number(el.dataset.to) * p));
      });
      if (t < 1) { requestAnimationFrame(tick); }
    };
    requestAnimationFrame(tick);
  }

  // ===== Galería =====
  var gal = document.getElementById('gal');
  var tiles = Array.prototype.slice.call(gal.querySelectorAll('.tile'));
  var photos = tiles.map(function (b) {
    var img = b.querySelector('img');
    return { src: img.getAttribute('src'), cap: b.querySelector('.cap').textContent };
  });
  var n = photos.length;

  // Puntos y contador (celular)
  var dotsBox = document.getElementById('dots');
  var galCount = document.getElementById('galcount');
  var dots = photos.map(function () {
    var d = document.createElement('span');
    d.className = 'dot';
    dotsBox.appendChild(d);
    return d;
  });
  var current = -1;
  var setDot = function (i) {
    if (i === current) { return; }
    current = i;
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    galCount.textContent = (i + 1) + ' de ' + n + ' · toca para ampliar';
  };
  setDot(0);
  gal.addEventListener('scroll', function () {
    var first = gal.firstElementChild;
    var w = first ? first.getBoundingClientRect().width + 12 : gal.clientWidth;
    setDot(Math.max(0, Math.min(n - 1, Math.round(gal.scrollLeft / w))));
  }, { passive: true });

  // ===== Visor de fotos =====
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbCount = document.getElementById('lbCount');
  var idx = 0;
  var lastFocus = null;

  var show = function (i) {
    idx = (i + n) % n;
    lbImg.src = photos[idx].src;
    lbImg.alt = photos[idx].cap;
    lbCap.textContent = photos[idx].cap;
    lbCount.textContent = (idx + 1) + ' de ' + n + ' · desliza para cambiar';
    lbImg.style.animation = 'none';
    void lbImg.offsetWidth;
    lbImg.style.animation = '';
  };
  var open = function (i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  };
  var close = function () {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) { lastFocus.focus(); }
  };

  tiles.forEach(function (b) {
    b.setAttribute('aria-label', 'Ampliar foto: ' + b.querySelector('.cap').textContent);
    b.addEventListener('click', function () { open(Number(b.dataset.i)); });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) { return; }
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowLeft') { show(idx - 1); }
    else if (e.key === 'ArrowRight') { show(idx + 1); }
  });

  // Deslizar con el dedo: izquierda/derecha cambia, hacia abajo cierra
  var tx = null, ty = null;
  lb.addEventListener('touchstart', function (e) {
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) { return; }
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    tx = ty = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { show(idx + (dx < 0 ? 1 : -1)); }
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) { close(); }
  }, { passive: true });
})();
