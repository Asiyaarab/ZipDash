// zipdash-map.js - live map shared by the customer tracking page and the rider page (keep next to index.html)
// Default: free OpenStreetMap map of Ahmedabad with a live moving rider marker and a road route.
// Optional: paste a Google Maps JavaScript API key below to use real Google Maps (the key needs billing enabled in Google Cloud).
const GOOGLE_MAPS_KEY = '';
(function () {
  const AHD = [23.0225, 72.5714], ICON = { rider: '🛵', dest: '🏠', store: '🏪' };
  const load = (src, css) => new Promise((ok, no) => { if (css) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = css; document.head.appendChild(l); } const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  const hav = (a, b, c, d) => { const r = x => x * Math.PI / 180, h = Math.sin(r(c - a) / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(r(d - b) / 2) ** 2; return 12742 * Math.asin(Math.sqrt(h)); };
  async function osrm(r, d) {
    try {
      const j = await fetch(`https://router.project-osrm.org/route/v1/driving/${r.lng},${r.lat};${d.lng},${d.lat}?overview=full&geometries=geojson`).then(x => x.json());
      const rt = j.routes && j.routes[0];
      if (rt) return { pts: rt.geometry.coordinates.map(c => [c[1], c[0]]), km: rt.distance / 1000, min: Math.max(1, Math.round(rt.duration / 60)) };
    } catch (e) {}
    return null;
  }
  async function leaflet(el) {
    if (!window.L) await load('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css');
    const map = L.map(el).setView(AHD, 12), mk = {}; let line = null, userCb = () => {};
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
    map.on('dragstart zoomstart', e => { if (!map._zdAuto) userCb(); });
    const icon = k => L.divIcon({ html: `<div style="font-size:26px;line-height:26px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))">${ICON[k]}</div>`, className: '', iconSize: [26, 26], iconAnchor: [13, 13] });
    return {
      markers(p) {
        Object.keys(ICON).forEach(k => {
          const v = p[k];
          if (v && v.lat != null) {
            const ll = L.latLng(+v.lat, +v.lng);
            if (!mk[k]) mk[k] = L.marker(ll, { icon: icon(k), zIndexOffset: k === 'rider' ? 1000 : 0 }).addTo(map);
            else { const a = mk[k].getLatLng(), t0 = performance.now(); if (a.distanceTo(ll) > 2 && a.distanceTo(ll) < 3000) { const step = t => { const f = Math.min(1, (t - t0) / 1200); mk[k].setLatLng([a.lat + (ll.lat - a.lat) * f, a.lng + (ll.lng - a.lng) * f]); if (f < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); } else mk[k].setLatLng(ll); }
          } else if (mk[k]) { map.removeLayer(mk[k]); delete mk[k]; }
        });
      },
      count: () => Object.keys(mk).length,
      line(pts) { if (line) map.removeLayer(line); line = pts && pts.length > 1 ? L.polyline(pts, { color: '#1b4332', weight: 5, opacity: .75 }).addTo(map) : null; },
      fit(pts) { map._zdAuto = true; if (pts.length > 1) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 16 }); else if (pts.length === 1) map.setView(pts[0], 15); setTimeout(() => map._zdAuto = false, 600); },
      resize() { map.invalidateSize(); }, onUser(cb) { userCb = cb; }
    };
  }
  async function google(el) {
    await new Promise((ok, no) => { if (window.google && google.maps) return ok(); window.__zdg = ok; load(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&callback=__zdg`).catch(no); });
    const map = new google.maps.Map(el, { center: { lat: AHD[0], lng: AHD[1] }, zoom: 12, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }), mk = {}; let line = null, userCb = () => {}, auto = false;
    map.addListener('dragstart', () => { if (!auto) userCb(); });
    return {
      markers(p) {
        Object.keys(ICON).forEach(k => {
          const v = p[k];
          if (v && v.lat != null) { const pos = { lat: +v.lat, lng: +v.lng }; if (!mk[k]) mk[k] = new google.maps.Marker({ position: pos, map, label: { text: ICON[k], fontSize: '24px' }, icon: { path: google.maps.SymbolPath.CIRCLE, scale: 0 }, zIndex: k === 'rider' ? 1000 : 1 }); else mk[k].setPosition(pos); }
          else if (mk[k]) { mk[k].setMap(null); delete mk[k]; }
        });
      },
      count: () => Object.keys(mk).length,
      line(pts) { if (line) line.setMap(null); line = pts && pts.length > 1 ? new google.maps.Polyline({ path: pts.map(a => ({ lat: a[0], lng: a[1] })), strokeColor: '#1b4332', strokeWeight: 5, strokeOpacity: .75, map }) : null; },
      fit(pts) { auto = true; if (pts.length > 1) { const b = new google.maps.LatLngBounds(); pts.forEach(a => b.extend({ lat: a[0], lng: a[1] })); map.fitBounds(b, 40); } else if (pts.length === 1) { map.setCenter({ lat: pts[0][0], lng: pts[0][1] }); map.setZoom(15); } setTimeout(() => auto = false, 800); },
      resize() { google.maps.event.trigger(map, 'resize'); }, onUser(cb) { userCb = cb; }
    };
  }
  window.ZMap = {
    async create(el, o) {
      o = o || {};
      let eng; try { eng = GOOGLE_MAPS_KEY ? await google(el) : await leaflet(el); } catch (e) { if (!GOOGLE_MAPS_KEY) throw e; eng = await leaflet(el); }
      let moved = false, lastN = 0, routeAt = 0, routeFrom = null, pts = null;
      eng.onUser(() => moved = true);
      return {
        resize() { eng.resize(); },
        async set(p) {
          eng.markers(p);
          const list = ['rider', 'dest', 'store'].filter(k => p[k] && p[k].lat != null).map(k => [+p[k].lat, +p[k].lng]);
          if (list.length !== lastN || !moved) { lastN = list.length; eng.fit(list); }
          if (p.rider && p.rider.lat != null && p.dest && p.dest.lat != null) {
            const r = { lat: +p.rider.lat, lng: +p.rider.lng }, d = { lat: +p.dest.lat, lng: +p.dest.lng };
            const km = hav(r.lat, r.lng, d.lat, d.lng);
            if (o.onInfo) o.onInfo({ km, min: Math.max(1, Math.round(km / 20 * 60)), approx: true });
            eng.line(pts && routeFrom ? pts : [[r.lat, r.lng], [d.lat, d.lng]]);
            const moved150 = !routeFrom || hav(r.lat, r.lng, routeFrom.lat, routeFrom.lng) > 0.15;
            if (Date.now() - routeAt > 20000 && moved150) {
              routeAt = Date.now(); const rt = await osrm(r, d);
              if (rt) { pts = rt.pts; routeFrom = r; eng.line(pts); if (o.onInfo) o.onInfo({ km: rt.km, min: rt.min }); }
            }
          } else { eng.line(null); pts = null; routeFrom = null; }
        }
      };
    }
  };
})();