#!/usr/bin/env python3
"""QA de la landing Bubble Mousse : captures multi-largeurs + tests fonctionnels."""
import sys
from playwright.sync_api import sync_playwright

CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
URL = 'file:///home/user/e-com/bubble.html'
SHOTS = sys.argv[1] if len(sys.argv) > 1 else '/tmp/shots'

WIDTHS = [(320, 'xs'), (390, 'mobile'), (768, 'tablet'), (1280, 'desktop')]
fails = []


def check(name, cond, detail=''):
    print(('  OK   ' if cond else '  ÉCHEC ') + name + (' — ' + detail if detail else ''))
    if not cond:
        fails.append(name)


with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])

    for w, label in WIDTHS:
        pg = b.new_page(viewport={'width': w, 'height': 900})
        pg.goto(URL); pg.wait_for_timeout(1200)
        pg.evaluate("document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('in'))")
        pg.wait_for_timeout(300)
        sw = pg.evaluate('document.documentElement.scrollWidth')
        check(f'{label} {w}px — pas de scroll horizontal', sw <= w + 1, f'scrollWidth={sw}')
        pg.screenshot(path=f'{SHOTS}/{label}.png', full_page=True)
        pg.close()

    # ---- Tests fonctionnels sur mobile ----
    pg = b.new_page(viewport={'width': 390, 'height': 844})
    pg.goto(URL); pg.wait_for_timeout(1000)

    check('un seul <h1>', pg.locator('h1').count() == 1)
    check('title + meta description',
          bool(pg.title()) and pg.locator('meta[name=description]').count() == 1)

    # Above the fold : H1, visuel, prix, CTA, signal de confiance
    vis = pg.evaluate("""() => {
      const inFold = s => { const e=document.querySelector(s); if(!e) return false;
        const r=e.getBoundingClientRect(); return r.top < 844 && r.bottom > 0; };
      return {h1:inFold('h1'), img:inFold('.bm-hero-visual img'), price:inFold('[data-price-now]'),
              cta:inFold('.bm-hero .bm-cta'), trust:inFold('.bm-hero-proof')};
    }""")
    check('above the fold complet (H1/visuel/prix/CTA/confiance)', all(vis.values()), str(vis))

    # Interaction signature
    pg.eval_on_selector('#revealRange', "el => { el.value = 80; el.dispatchEvent(new Event('input')); }")
    split = pg.eval_on_selector('#revealBox', "el => getComputedStyle(el).getPropertyValue('--split')")
    check('révélateur avant/après réagit', '80' in split, f'--split={split.strip()}')

    # Sélecteur de quantité -> total + champs cachés
    pg.eval_on_selector("input[name=qty][value='1']", "el => { el.checked = true; el.dispatchEvent(new Event('change')); }")
    total = pg.inner_text('#totalOut')
    hidden = pg.input_value('#f-total')
    check('quantité met à jour le total', '129' in total and hidden == '129', f'{total} / {hidden}')

    # Validation formulaire : soumission vide bloquée
    pg.eval_on_selector("input[name=qty][value='3']", "el => { el.checked = true; el.dispatchEvent(new Event('change')); }")
    pg.click('#submitBtn')
    pg.wait_for_timeout(300)
    check('soumission vide bloquée', pg.locator('.bm-field[data-invalid]').count() > 0)
    check('pas d\'état succès prématuré', not pg.locator('#formWrap.bm-sent').count())

    # Téléphone invalide puis valide
    pg.fill('#f-name', 'نورة العتيبي'); pg.fill('#f-phone', '123'); pg.fill('#f-city', 'الرياض')
    pg.fill('#f-address', 'حي النرجس، شارع الأمير'); pg.click('#submitBtn'); pg.wait_for_timeout(200)
    check('téléphone invalide rejeté', pg.locator('#f-phone').evaluate(
        "el => el.closest('.bm-field').hasAttribute('data-invalid')"))
    pg.fill('#f-phone', '0512345678'); pg.click('#submitBtn'); pg.wait_for_timeout(1200)
    check('état succès après soumission valide', pg.locator('#formWrap.bm-sent').count() == 1)
    check('double envoi verrouillé', pg.eval_on_selector('#submitBtn', 'el => el.disabled'))
    pg.screenshot(path=f'{SHOTS}/form-success.png')
    pg.close()

    # ---- Reduced motion ----
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    pg = ctx.new_page(); pg.goto(URL); pg.wait_for_timeout(800)
    op = pg.eval_on_selector('.bm-sec-head[data-reveal]', "el => getComputedStyle(el).opacity")
    check('reduced-motion : contenu visible sans animation', float(op) == 1.0, f'opacity={op}')
    dur = pg.eval_on_selector('.bm-cta', "el => getComputedStyle(el).transitionDuration")
    check('reduced-motion : transitions neutralisées', dur in ('0s', '0s, 0s'), f'duration={dur}')
    pg.screenshot(path=f'{SHOTS}/reduced-motion.png')
    ctx.close()

    # ---- Poids de la page ----
    ctx = b.new_context(viewport={'width': 390, 'height': 844})
    pg = ctx.new_page()
    total_bytes = {'n': 0}
    pg.on('response', lambda r: total_bytes.__setitem__(
        'n', total_bytes['n'] + int(r.headers.get('content-length') or 0)))
    pg.goto(URL); pg.wait_for_timeout(1500)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); pg.wait_for_timeout(1500)
    ctx.close()
    b.close()

print('\n' + ('TOUT PASSE' if not fails else 'ÉCHECS : ' + ', '.join(fails)))
sys.exit(1 if fails else 0)
