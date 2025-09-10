// instituciones.js
(() => {
  // --- 1) Fuente de datos (demo; luego reemplaza por fetch al backend) ---
  const DATA = [
    { id: 'aiep',       nombre: 'AIEP',       tipo: 'Instituto Profesional',              rating: 4.2, ciudad: 'Santiago, Chile',
      desc: 'Instituto de educación superior con enfoque en formación técnica y profesional. Ofrece programas innovadores y prácticos para el desarrollo profesional.' },
    { id: 'generation', nombre: 'Generation', tipo: 'Organización sin fines de lucro',    rating: 4.8, ciudad: 'Santiago, Chile',
      desc: 'Programa de formación intensiva en tecnología y habilidades digitales. Enfocado en la inserción laboral de jóvenes en el sector TI.' },
    { id: 'duoc',       nombre: 'Duoc UC',    tipo: 'Instituto Profesional',              rating: 4.0, ciudad: 'Santiago, Chile',
      desc: 'Instituto profesional de la Pontificia Universidad Católica de Chile. Líder en educación técnica y profesional con sedes a nivel país.' }
  ];

  // Si hay datos inyectados en window.INSTITUCIONES, se combinan
  const RAW = [
    ...(Array.isArray(window.INSTITUCIONES) ? window.INSTITUCIONES : []),
    ...DATA
  ];

  // --- 2) Utilidades -----------------------------------------------------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Deduplicar por id y por nombre (case/trim insensitive)
  function dedupe(items){
    const seenId   = new Set();
    const seenName = new Set();
    const out = [];
    for (const it of items){
      const id   = String(it?.id ?? '').toLowerCase().trim();
      const name = String(it?.nombre ?? '').toLowerCase().trim();
      const keyId   = id && `id:${id}`;
      const keyName = name && `nm:${name}`;
      // si ya vimos el id o el nombre, saltamos
      if ((keyId && seenId.has(keyId)) || (keyName && seenName.has(keyName))) continue;
      if (keyId)   seenId.add(keyId);
      if (keyName) seenName.add(keyName);
      out.push(it);
    }
    return out;
  }

  // Sanitiza string y escapa HTML
  function s(v){ return (v ?? '').toString().trim(); }
  function escapeHTML(str=''){
    return String(str)
      .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
      .replaceAll('"','&quot;').replaceAll("'",'&#39;');
  }

  // Estrellas con media
  function stars(n=0){
    const full = Math.floor(n);
    const half = (n - full) >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return `
      <span class="rating" aria-label="${n.toFixed(1)} de 5">
        ${'<i class="fa-solid fa-star"></i>'.repeat(full)}
        ${half ? '<i class="fa-solid fa-star-half-stroke"></i>' : ''}
        ${'<i class="fa-regular fa-star"></i>'.repeat(Math.max(0, empty))}
        <span class="rating-num">${n.toFixed(1)}</span>
      </span>
    `;
  }

  function debounce(fn, ms=150){
    let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), ms); };
  }

  // --- 3) Estado derivado de URL ----------------------------------------
  const params     = new URLSearchParams(location.search);
  const qParam     = s(params.get('q'));
  const instParam  = s(params.get('inst')).toLowerCase();

  // Fuente final deduplicada
  const SOURCE = dedupe(RAW);

  // --- 4) Render ---------------------------------------------------------
  const ul    = $('#listado');
  const input = $('#q');

  function render(list){
    if (!ul) return;

    if (!list.length){
      ul.innerHTML = `<li class="text-center text-muted py-3">Sin resultados para “${escapeHTML(input?.value || '')}”.</li>`;
      return;
    }

    ul.innerHTML = list.map(it=>{
      const id     = s(it.id);
      const nombre = escapeHTML(s(it.nombre));
      const tipo   = escapeHTML(s(it.tipo));
      const ciudad = escapeHTML(s(it.ciudad));
      const desc   = escapeHTML(s(it.desc));
      const rate   = Number(it.rating) || 0;

      return `
        <li class="inst-card" data-id="${escapeHTML(id)}" tabindex="0">
          <div class="inst-header">
            <h3 class="inst-name">${nombre}</h3>
          </div>
          <div class="inst-meta">
            <span class="inst-type">${tipo}</span>
            <span class="dot">•</span>
            ${stars(rate)}
            <span class="dot">•</span>
            <span class="location"><i class="fa-solid fa-location-dot"></i> ${ciudad}</span>
          </div>
          <p class="inst-desc">${desc}</p>
        </li>
      `;
    }).join('');

    // Navegación al detalle
    $$('.inst-card', ul).forEach(li=>{
      li.addEventListener('click', ()=>{
        const id = li.getAttribute('data-id');
        window.location.href = `detalle.html?id=${encodeURIComponent(id)}`;
      });
      li.addEventListener('keydown', e=>{ if(e.key==='Enter') li.click(); });
    });
  }

  // --- 5) Filtro ---------------------------------------------------------
  function filtrar(){
    const q = s(input?.value).toLowerCase();

    // base deduplicada
    let base = SOURCE.slice();

    // si viene ?inst=, filtramos por id exacto (normalizado)
    if (instParam){
      base = base.filter(d => s(d.id).toLowerCase() === instParam);
    }

    // texto libre (nombre, tipo, ciudad, desc)
    const out = q
      ? base.filter(d => (
          `${s(d.nombre)} ${s(d.tipo)} ${s(d.ciudad)} ${s(d.desc)}`
            .toLowerCase()
            .includes(q)
        ))
      : base;

    render(out);
  }

  // --- 6) Init -----------------------------------------------------------
  if (input){
    if (qParam) input.value = qParam;
    input.addEventListener('input', debounce(filtrar, 160));
  }

  // Primer render
  filtrar();

  // Botón cancelar
  const btnCancel = $('#btnCancelar');
  if (btnCancel){
    btnCancel.addEventListener('click', ()=>{ window.location.href = '../home/home.html'; });
  }
})();
