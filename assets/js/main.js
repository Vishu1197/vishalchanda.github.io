/* ==========================================================================
   VishOmics  |  site behaviour
   Vanilla JS, no framework, no build step. Every block guards its own
   elements so the same file can be loaded on every page.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- nav + scroll */
  var nav = $('.nav');
  var bar = $('#progress');

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle('scrolled', y > 12);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = $('.burger');
  var links  = $('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', links).forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // mark the current page in the nav
  var here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === here || (here === 'index.html' && href === './')) a.classList.add('active');
  });

  /* ------------------------------------------------------------- reveal fx */
  var rv = $$('.rv');
  if (rv.length) {
    if (!('IntersectionObserver' in window) || reduce) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      rv.forEach(function (el) { io.observe(el); });
    }
  }

  /* -------------------------------------------------------- stat counters */
  var stats = $$('[data-count]');
  if (stats.length) {
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1250;
      if (reduce) { el.textContent = target + suffix; return; }
      var t0 = null;
      var tick = function (t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) {
      stats.forEach(run);
    } else {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { run(e.target); sio.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      stats.forEach(function (el) { sio.observe(el); });
    }
  }

  /* ------------------------------------------------------------ typed role */
  var roleEl = $('#role');
  if (roleEl) {
    var ROLES = [
      'Computational Biologist',
      'Dengue Virology  ·  Antiviral Discovery',
      'Molecular Dynamics  ·  GROMACS',
      'Machine Learning for Drug Discovery',
      'Nanobiotechnology  ·  Targeted Delivery'
    ];
    if (reduce) {
      roleEl.textContent = ROLES[0];
    } else {
      var ri = 0, ci = 0, del = false;
      var caret = document.createElement('span');
      caret.className = 'caret';
      caret.textContent = ' ';
      var txt = document.createElement('span');
      roleEl.textContent = '';
      roleEl.appendChild(txt);
      roleEl.appendChild(caret);

      (function type() {
        var word = ROLES[ri];
        ci += del ? -1 : 1;
        txt.textContent = word.slice(0, ci);
        var wait = del ? 38 : 62;
        if (!del && ci === word.length) { wait = 2100; del = true; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % ROLES.length; wait = 380; }
        setTimeout(type, wait);
      })();
    }
  }

  /* --------------------------------------------------------- card cursor fx */
  $$('.card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  });

  /* ------------------------------------------------------------- accordions */
  function wireCollapse(rootSel, headSel, bodySel, openClass) {
    $$(rootSel).forEach(function (root) {
      var head = $(headSel, root);
      var body = $(bodySel, root);
      if (!head || !body) return;

      var sync = function () {
        if (root.classList.contains(openClass)) body.style.maxHeight = body.scrollHeight + 'px';
      };

      head.setAttribute('aria-expanded', root.classList.contains(openClass) ? 'true' : 'false');
      if (root.classList.contains(openClass)) body.style.maxHeight = body.scrollHeight + 'px';

      head.addEventListener('click', function () {
        var open = root.classList.toggle(openClass);
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
      });

      window.addEventListener('resize', function () {
        clearTimeout(root._rt);
        root._rt = setTimeout(sync, 160);
      }, { passive: true });
    });
  }
  wireCollapse('.acc', '.acc-head', '.acc-body', 'open');
  wireCollapse('.skill-panel', '.skill-head', '.skill-body', 'open');

  /* ----------------------------------------------------------- publications */
  var pubList = $('#pub-list');
  if (pubList && window.PUBLICATIONS) {
    var DATA = window.PUBLICATIONS.slice();
    var LABEL = { article: 'Journal Article', chapter: 'Book Chapter', patent: 'Patent', conference: 'Conference' };
    var state = { kind: 'all', q: '' };

    var esc = function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
      });
    };

    var authorLine = function (list) {
      return list.map(function (a) {
        return /^Chanda, V\.?$/.test(a) ? '<em>' + esc(a) + '</em>' : esc(a);
      }).join(', ');
    };

    var render = function () {
      var q = state.q.toLowerCase();
      var rows = DATA.filter(function (p) {
        if (state.kind !== 'all' && p.kind !== state.kind) return false;
        if (!q) return true;
        var hay = (p.title + ' ' + p.venue + ' ' + p.authors.join(' ') + ' ' + (p.tags || []).join(' ')).toLowerCase();
        return hay.indexOf(q) !== -1;
      }).sort(function (a, b) { return b.year - a.year; });

      if (!rows.length) {
        pubList.innerHTML = '<div class="empty">No entries match that filter.</div>';
        countEl && (countEl.textContent = '0 of ' + DATA.length);
        return;
      }

      pubList.innerHTML = rows.map(function (p) {
        var link = p.url
          ? '<a class="lnk" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
            (p.doi ? 'DOI ' + esc(p.doi) : 'View publication') + '</a>'
          : '';
        var award = p.award
          ? '<span class="pub-award">★ ' + esc(p.award) + '</span>'
          : '';
        return '<article class="pub">' +
            '<div class="pub-top">' +
              '<span class="pub-kind k-' + p.kind + '">' + esc(LABEL[p.kind]) + '</span>' +
              '<span class="pub-year">' + p.year + '</span>' + award +
            '</div>' +
            '<h3>' + esc(p.title) + '</h3>' +
            '<div class="authors">' + authorLine(p.authors) + '</div>' +
            '<div class="venue">' + esc(p.venue) + '</div>' +
            link +
          '</article>';
      }).join('');

      countEl && (countEl.textContent = rows.length + ' of ' + DATA.length);
    };

    var countEl = $('#pub-count');

    $$('.chip[data-kind]').forEach(function (chip) {
      var kind = chip.getAttribute('data-kind');
      var n = kind === 'all' ? DATA.length : DATA.filter(function (p) { return p.kind === kind; }).length;
      var ct = $('.ct', chip);
      if (ct) ct.textContent = n;
      chip.addEventListener('click', function () {
        $$('.chip[data-kind]').forEach(function (c) { c.classList.remove('on'); });
        chip.classList.add('on');
        state.kind = kind;
        render();
      });
    });

    var box = $('#pub-search');
    if (box) {
      var dt = null;
      box.addEventListener('input', function () {
        clearTimeout(dt);
        dt = setTimeout(function () { state.q = box.value.trim(); render(); }, 130);
      });
    }

    render();
  }

  /* -------------------------------------------------------- copy to clipboard */
  var toast = null;
  function flash(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(function () { toast.classList.add('show'); });
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toast.classList.remove('show'); }, 2100);
  }

  $$('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var val = el.getAttribute('data-copy');
      var done = function () { flash('Copied  ' + val); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, function () { flash(val); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = val;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) { flash(val); }
        document.body.removeChild(ta);
      }
    });
  });

  /* --------------------------------------------------------------- 3D viewer */
  var vbox = $('#viewer');
  if (vbox) {
    var STRUCTURES = {
      '2FOM': { label: 'NS2B / NS3 protease', note: 'Dengue virus 2  ·  1.50 Å  ·  Erbel et al.' },
      '5K5M': { label: 'NS5 RdRp',            note: 'Dengue virus 2  ·  RNA dependent RNA polymerase' },
      '1OAN': { label: 'Envelope protein E',  note: 'Dengue virus 2  ·  host cell entry machinery' },
      '5CCV': { label: 'NS5 full length',     note: 'Dengue virus 3  ·  methyltransferase plus polymerase' }
    };

    var viewer = null;
    var current = { pdb: '2FOM', style: 'cartoon' };
    var loading = $('.viewer-load');

    function say(html) {
      if (loading) { loading.innerHTML = html; loading.style.display = 'grid'; }
    }
    function hideLoader() { if (loading) loading.style.display = 'none'; }

    function applyStyle() {
      if (!viewer) return;
      viewer.setStyle({}, {});
      if (current.style === 'cartoon') {
        viewer.setStyle({}, { cartoon: { colorscheme: 'spectrum', thickness: 0.35 } });
      } else if (current.style === 'surface') {
        viewer.setStyle({}, { cartoon: { color: '#0e7490', opacity: 0.85 } });
        viewer.addSurface('VDW', { opacity: 0.72, colorscheme: 'whiteCarbon' });
      } else if (current.style === 'stick') {
        viewer.setStyle({}, { stick: { radius: 0.16, colorscheme: 'cyanCarbon' } });
      } else if (current.style === 'sphere') {
        viewer.setStyle({}, { sphere: { scale: 0.32, colorscheme: 'spectrum' } });
      }
      viewer.addStyle({ hetflag: true }, { stick: { radius: 0.22, colorscheme: 'yellowCarbon' } });
      viewer.render();
    }

    function load(pdb) {
      if (typeof window.$3Dmol === 'undefined') {
        say('<div>3Dmol.js could not be reached.<br>The viewer needs an internet connection.</div>');
        return;
      }
      current.pdb = pdb;
      say('<div class="spinner"></div><div>Fetching ' + pdb + ' from the RCSB PDB</div>');

      if (!viewer) {
        viewer = window.$3Dmol.createViewer(vbox, { backgroundColor: 'rgb(5,7,13)', antialias: true });
      }
      viewer.clear();

      window.$3Dmol.download('pdb:' + pdb, viewer, { multimodel: false }, function () {
        applyStyle();
        viewer.zoomTo();
        viewer.zoom(1.15, 600);
        viewer.render();
        if (!reduce) viewer.spin('y', 0.35);
        hideLoader();

        var meta = $('#viewer-meta');
        if (meta && STRUCTURES[pdb]) {
          meta.innerHTML = '<span>PDB ' + pdb + '  ·  ' + STRUCTURES[pdb].label + '</span><span>' + STRUCTURES[pdb].note + '</span>';
        }
      });

      setTimeout(function () {
        if (loading && loading.style.display !== 'none') {
          say('<div>Structure is taking a while to arrive.<br>Check the connection, or pick another entry above.</div>');
        }
      }, 14000);
    }

    $$('.vbtn[data-pdb]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.vbtn[data-pdb]').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        load(b.getAttribute('data-pdb'));
      });
    });

    $$('.vbtn[data-style]').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.vbtn[data-style]').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        current.style = b.getAttribute('data-style');
        applyStyle();
      });
    });

    var spinBtn = $('#spin-toggle');
    if (spinBtn) {
      var spinning = !reduce;
      spinBtn.classList.toggle('on', spinning);
      spinBtn.addEventListener('click', function () {
        if (!viewer) return;
        spinning = !spinning;
        viewer.spin(spinning ? 'y' : false, 0.35);
        spinBtn.classList.toggle('on', spinning);
        spinBtn.textContent = spinning ? 'spin: on' : 'spin: off';
      });
    }

    // only pull the structure once the viewer is actually on screen
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { load(current.pdb); vio.disconnect(); }
        });
      }, { threshold: 0.15 });
      vio.observe(vbox);
    } else {
      load(current.pdb);
    }
  }

  /* ------------------------------------------------------------------ misc */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
