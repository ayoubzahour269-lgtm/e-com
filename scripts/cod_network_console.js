/* ============================================================
   COD NETWORK — EXTRACTION DU CATALOGUE DEPUIS TON NAVIGATEUR
   ============================================================
   Tu es déjà connecté : ce snippet réutilise ta session (cookies)
   pour appeler leur API interne et télécharger toutes les offres.

   MODE D'EMPLOI
   1. Sur l'onglet COD Network déjà ouvert et connecté,
      va sur la page des offres / produits.
   2. F12  →  onglet "Console"
   3. Colle TOUT ce fichier  →  Entrée
   4. Un fichier cod_network_offers.json se télécharge
   5. Envoie-le moi

   Si aucun endpoint ne répond (voir message en console), passe au
   PLAN B tout en bas du fichier.
   ============================================================ */

(async () => {
  const CANDIDATES = [
    '/api/v1/offers', '/api/offers', '/api/v1/affiliate/offers',
    '/api/affiliate/offers', '/api/v1/products', '/api/products',
    '/en/api/offers', '/api/v1/offer/list', '/api/v1/campaigns',
  ];

  const origin = location.origin;
  const found = [];

  console.log('%c🔎 Scan des endpoints…', 'font-size:14px;font-weight:bold');

  for (const path of CANDIDATES) {
    for (const qs of ['?limit=500&per_page=500', '']) {
      try {
        const r = await fetch(origin + path + qs, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });
        if (!r.ok) continue;
        const ct = r.headers.get('content-type') || '';
        if (!ct.includes('json')) continue;
        const data = await r.json();
        const arr = Array.isArray(data)
          ? data
          : Object.values(data).find(v => Array.isArray(v) && v.length) || [];
        if (arr.length) {
          console.log(`%c✅ ${path}${qs} → ${arr.length} éléments`,
                      'color:#0a0;font-weight:bold');
          found.push({ endpoint: path + qs, count: arr.length, items: arr });
        }
      } catch (e) { /* endpoint suivant */ }
    }
  }

  if (!found.length) {
    console.log('%c❌ Aucun endpoint trouvé automatiquement.',
                'color:#c00;font-size:14px;font-weight:bold');
    console.log('%c→ PLAN B : onglet Network (F12), recharge la page des offres,\n' +
                '  filtre "Fetch/XHR", clique la requête qui contient les produits,\n' +
                '  puis "Copy > Copy Response". Colle-moi le résultat.',
                'font-size:13px');
    return;
  }

  // Garde le jeu de données le plus complet
  const best = found.sort((a, b) => b.count - a.count)[0];
  console.log(`%c📦 Retenu : ${best.endpoint} (${best.count} offres)`,
              'font-size:14px;font-weight:bold');
  console.table(best.items.slice(0, 10));

  // Téléchargement du JSON complet
  const blob = new Blob([JSON.stringify(best, null, 2)],
                        { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cod_network_offers.json';
  a.click();

  console.log('%c⬇️  cod_network_offers.json téléchargé — envoie-le à Claude.',
              'color:#0a0;font-size:14px;font-weight:bold');
})();

/* ============================================================
   PLAN B — si le scan échoue (API sur un autre domaine, etc.)
   ------------------------------------------------------------
   1. F12 → onglet "Network"
   2. Recharge la page des offres (Ctrl+R)
   3. Filtre "Fetch/XHR"
   4. Repère la requête dont la réponse contient les produits
   5. Clic droit → Copy → Copy Response
   6. Colle-moi le contenu

   PLAN C — le plus propre et réutilisable
   ------------------------------------------------------------
   Génère un token API dans le dashboard COD Network, puis :
      echo 'COD_NETWORK_TOKEN=xxx' >> secrets.env
      ./scripts/cod_network_offers.sh
   (secrets.env est déjà gitignoré — le token ne partira jamais dans git)
   ============================================================ */
