#!/usr/bin/env python3
"""Porte bubble.html vers une section Shopify + son layout.

bubble.html reste la source unique (QA locale, captures). Ce script en dérive :
  shopify/sections/landing-bubble.liquid   — markup + CSS + JS + schema
  shopify/layout/landing-bubble.liquid     — doctype, polices, content_for_header
Les prix et textes clés deviennent des réglages de section.
"""
import re

src = open('bubble.html', encoding='utf-8').read()

style = re.search(r'<style>(.*?)</style>', src, re.S).group(1)
body = re.search(r'<body>(.*?)</body>', src, re.S).group(1)
script = re.search(r'<script>\n\(function\(\)\{(.*?)\}\)\(\);\n</script>', src, re.S)
body = body.replace(script.group(0), '')          # le JS est réinjecté en fin de section

# --- assets locaux -> asset_url Shopify ---
body = re.sub(r'"assets/([\w.-]+)"', lambda m: '"{{ \'' + m.group(1) + "' | asset_url }}\"", body)

# --- textes et prix -> réglages de section ---
SUBS = [
    ('<div class="bm-announce">توصيل إلى جميع مدن المملكة — الدفع عند الاستلام</div>',
     '<div class="bm-announce">{{ section.settings.announce }}</div>'),
    ('<h1 class="bm-h1">غطّي الشيب في ٢٥ دقيقة<em>واستعمليها كالشامبو</em></h1>',
     '<h1 class="bm-h1">{{ section.settings.h1_main }}<em>{{ section.settings.h1_gold }}</em></h1>'),
    ('<p class="bm-sub">صبغة رغوية بخلاصات الجنسنغ والفو-تي والسمسم الأسود، تغطي الشعر الأبيض تغطيةً متساوية من الجذور إلى الأطراف — بلا أمونيا وبلا خطوات معقّدة.</p>',
     '<p class="bm-sub">{{ section.settings.lead }}</p>'),
    ('<b data-price-now>299 <small>ر.س</small></b>',
     '<b data-price-now>{{ p3 }} <small>ر.س</small></b>'),
    ('<s data-price-was>499 ر.س</s>\n        <i data-price-off>خصم 40٪</i>',
     '<s data-price-was>{{ was3 }} ر.س</s>\n        <i data-price-off>خصم {{ off3 }}٪</i>'),
    ('<div class="pr"><b data-price-now>299 ر.س</b><s data-price-was>499 ر.س</s></div>',
     '<div class="pr"><b data-price-now>{{ p3 }} ر.س</b><s data-price-was>{{ was3 }} ر.س</s></div>'),
    ('<input type="radio" name="qty" value="1" data-total="129">',
     '<input type="radio" name="qty" value="1" data-total="{{ p1 }}">'),
    ('<span class="p"><span data-qp>129 ر.س</span></span>',
     '<span class="p"><span data-qp>{{ p1 }} ر.س</span></span>'),
    ('<input type="radio" name="qty" value="2" data-total="218">',
     '<input type="radio" name="qty" value="2" data-total="{{ p2 }}">'),
    ('<small>وفّري 40 ر.س</small>', '<small>وفّري {{ save2 }} ر.س</small>'),
    ('<span class="p"><span data-qp>218 ر.س</span><s>258 ر.س</s></span>',
     '<span class="p"><span data-qp>{{ p2 }} ر.س</span><s>{{ was2 }} ر.س</s></span>'),
    ('<input type="radio" name="qty" value="3" data-total="299" checked>',
     '<input type="radio" name="qty" value="3" data-total="{{ p3 }}" checked>'),
    ('<span class="p"><span data-qp>299 ر.س</span><s>499 ر.س</s></span>',
     '<span class="p"><span data-qp>{{ p3 }} ر.س</span><s>{{ was3 }} ر.س</s></span>'),
    ('<b id="totalOut">299 ر.س</b>', '<b id="totalOut">{{ p3 }} ر.س</b>'),
    ('<input type="hidden" name="total" id="f-total" value="299">',
     '<input type="hidden" name="total" id="f-total" value="{{ p3 }}">'),
    ('href="https://wa.me/966500000000"', 'href="https://wa.me/{{ section.settings.whatsapp }}"'),
]
for a, b in SUBS:
    if a not in body:
        raise SystemExit('MOTIF INTROUVABLE :\n' + a[:120])
    body = body.replace(a, b)

liquid = f"""{{% comment %}}
  Landing Bubble Mousse — généré depuis bubble.html par creative/bubble/port_to_shopify.py.
  Ne pas éditer à la main : modifier bubble.html puis relancer le script.
  Layout attendu : landing-bubble
{{% endcomment %}}

{{%- assign p1 = section.settings.price_1 -%}}
{{%- assign p2 = section.settings.price_2 -%}}
{{%- assign p3 = section.settings.price_3 -%}}
{{%- assign was2 = p1 | times: 2 -%}}
{{%- assign was3 = section.settings.price_3_was -%}}
{{%- assign save2 = was2 | minus: p2 -%}}
{{%- assign off3 = was3 | minus: p3 | times: 100 | divided_by: was3 -%}}

<div class="bm-root" dir="rtl">
{body}
</div>

<style>{style}</style>

<script>
(function(){{{script.group(1)}}})();
</script>

{{% schema %}}
{{
  "name": "Landing Bubble Mousse",
  "settings": [
    {{ "type": "header", "content": "النصوص" }},
    {{ "type": "text", "id": "announce", "label": "شريط أعلى الصفحة",
       "default": "توصيل إلى جميع مدن المملكة — الدفع عند الاستلام" }},
    {{ "type": "text", "id": "h1_main", "label": "العنوان الرئيسي", "default": "غطّي الشيب في ٢٥ دقيقة" }},
    {{ "type": "text", "id": "h1_gold", "label": "العنوان — السطر الذهبي", "default": "واستعمليها كالشامبو" }},
    {{ "type": "textarea", "id": "lead", "label": "الفقرة التعريفية",
       "default": "صبغة رغوية بخلاصات الجنسنغ والفو-تي والسمسم الأسود، تغطي الشعر الأبيض تغطيةً متساوية من الجذور إلى الأطراف — بلا أمونيا وبلا خطوات معقّدة." }},
    {{ "type": "header", "content": "الأسعار (ر.س)" }},
    {{ "type": "number", "id": "price_1", "label": "عبوة واحدة", "default": 129 }},
    {{ "type": "number", "id": "price_2", "label": "عبوتان", "default": 218 }},
    {{ "type": "number", "id": "price_3", "label": "ثلاث عبوات (العرض)", "default": 299 }},
    {{ "type": "number", "id": "price_3_was", "label": "السعر قبل الخصم", "default": 499 }},
    {{ "type": "header", "content": "التواصل" }},
    {{ "type": "text", "id": "whatsapp", "label": "رقم واتساب (966...)", "default": "966500000000" }}
  ],
  "presets": [ {{ "name": "Landing Bubble Mousse" }} ]
}}
{{% endschema %}}
"""

layout = """<!doctype html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page_title | default: shop.name }}</title>
  {{ content_for_header }}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Reem+Kufi:wght@500;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box}
    body{margin:0;background:#F3EFE4;color:#14120E;font-family:'Tajawal',system-ui,sans-serif;
         -webkit-font-smoothing:antialiased;overflow-x:hidden}
    img{max-width:100%}
  </style>
</head>
<body>
  {{ content_for_layout }}
</body>
</html>
"""

open('shopify/sections/landing-bubble.liquid', 'w', encoding='utf-8').write(liquid)
open('shopify/layout/landing-bubble.liquid', 'w', encoding='utf-8').write(layout)

template = """{
  "layout": "landing-bubble",
  "sections": {
    "main": { "type": "landing-bubble", "settings": {} }
  },
  "order": ["main"]
}
"""
open('shopify/templates/product.bubble-landing.json', 'w', encoding='utf-8').write(template)
print('section :', len(liquid), 'octets')
print('layout  :', len(layout), 'octets')
print('template: product.bubble-landing.json')
