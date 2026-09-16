/* ==========================================================================
   VishOmics  |  background particle network
   Lightweight canvas field. No dependencies. Pauses when the tab is hidden
   and switches itself off entirely under prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { canvas.style.display = 'none'; return; }

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var nodes = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var raf = null;
  var running = true;

  var LINK = 132;          // px at which two nodes link
  var MOUSE_R = 170;       // cursor influence radius
  var PALETTE = ['34,211,238', '139,92,246', '52,211,153'];

  function density() {
    var area = window.innerWidth * window.innerHeight;
    var n = Math.round(area / 15000);
    return Math.max(28, Math.min(n, 86));
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    var count = density();
    nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.7 + 0.9,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        p: Math.random() * Math.PI * 2
      });
    }
  }

  function step(t) {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);

    var i, j, a, b, dx, dy, d2, d, alpha;

    // links first so nodes sit on top
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x;
        dy = a.y - b.y;
        d2 = dx * dx + dy * dy;
        if (d2 > LINK * LINK) continue;
        d = Math.sqrt(d2);
        alpha = (1 - d / LINK) * 0.34;
        ctx.strokeStyle = 'rgba(' + a.c + ',' + alpha.toFixed(3) + ')';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // nodes
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];

      a.x += a.vx;
      a.y += a.vy;
      a.p += 0.014;

      if (a.x < -20) a.x = W + 20;
      if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20;
      if (a.y > H + 20) a.y = -20;

      // soft push away from the cursor
      if (mouse.active) {
        dx = a.x - mouse.x;
        dy = a.y - mouse.y;
        d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 0.5) {
          d = Math.sqrt(d2);
          var push = (1 - d / MOUSE_R) * 0.75;
          a.x += (dx / d) * push;
          a.y += (dy / d) * push;
        }
      }

      var pulse = 0.55 + Math.sin(a.p) * 0.28;
      ctx.fillStyle = 'rgba(' + a.c + ',' + pulse.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // cursor halo
    if (mouse.active) {
      var g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_R * 0.7);
      g.addColorStop(0, 'rgba(34,211,238,0.055)');
      g.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, MOUSE_R * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(step);
  }

  function start() {
    if (raf) cancelAnimationFrame(raf);
    running = true;
    raf = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  // ---- wiring -------------------------------------------------------------
  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { resize(); seed(); }, 180);
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseout', function () { mouse.active = false; }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  resize();
  seed();
  start();
})();
