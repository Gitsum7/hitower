# Builds static pages from src/ with shared header/nav/footer. Run: python3 build.py
import re,os
NAV=[('','Home'),('research.html','Research'),('pi.html','PI'),('catalog/','Catalog'),('leaders/','Leaders'),('local/','Local'),('donate/','Donate'),('threat-lab/','Threat Lab'),('cyber-armory/','Cyber Armory'),('contact/','Contact'),('access/','Access')]
MORE=[('pi.html','PI'),('team.html','Team'),('report/','Report'),('2a/','2A'),('reserve/','The Reserve'),('credits-programs/','Programs'),('score-credits/','Score credits')]
INS={'donate':'donate','catalog':'catalog','leaders':'leaders','local':'local','contact':'contact','report':'report','access':'access','2a':'2a','reserve':'reserve','score-credits':'score-credits','credits-programs':'credits-programs','threat-lab':'threat-lab','cyber-armory':'cyber-armory','research':'research','pi':'research','team':'leaders'}
for f in sorted(os.listdir('src')):
    n=f[:-5];s=open('src/'+f).read();t=re.match(r'<!--title:(.*?)-->',s).group(1);dm=re.search(r'<!--desc:(.*?)-->',s);D=dm.group(1) if dm else 'HiTower Institute: independent research lab for off-grid power, water and resilience engineering.';body=re.sub(r'<!--(title|desc):.*?-->\n?','',s)
    folder=n not in('index','pi','research','team','404');R='../' if folder else '';me=(n+'/') if folder else ('' if n=='index' else f)
    ni=lambda h:(f'<img class="ni" src="{R}assets/insignia/{INS[h.strip("/").replace(".html","")]}.svg" alt="">' if h.strip('/').replace('.html','') in INS else '')
    ik=INS.get(n)
    if ik:
        body=re.sub(r'(<section class="hero">)',r'\1'+f'<img class="ins" src="{R}assets/insignia/{ik}.svg" alt="">',body,1)
        body=re.sub(r'(class="btn r"[^>]*>)',r'\1'+f'<img class="ico" src="{R}assets/insignia/{ik}.svg" alt="">',body)
        body=body.replace('<div class="lock"><div>','<div class="lock"><div>'+f'<img class="ins" src="{R}assets/insignia/{ik}.svg" alt="">',1)
    nav=''.join(f'<a href="{R}{h or "./"}"{" class=\"on\" aria-current=\"page\"" if h==me else ""}>{ni(h)}{l}</a>' for h,l in NAV)
    more=''.join(f'<a href="{R}{h}">{l}</a>' for h,l in MORE)
    html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#040C16"><title>{t}</title><meta name="description" content="{D}"><meta property="og:title" content="{t}"><meta property="og:description" content="{D}"><meta property="og:type" content="website"><meta property="og:image" content="https://hitower.institute/assets/og.png"><meta name="twitter:card" content="summary_large_image"><link rel="manifest" href="{R}manifest.webmanifest">
<link rel="icon" href="{R}favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="{R}assets/logo/3d/favicon-32.png"><link rel="apple-touch-icon" href="{R}assets/logo/3d/favicon-180.png"><link rel="stylesheet" href="{R}assets/css/main.css"></head>
<body data-root="{R}"><div class="bar"><span><span class="dot"></span>Quantum-safe channel // concept</span><span>Node status: online</span><span>Node time <span id="clock">--:--:--Z</span></span></div>
<header><a class="logo" href="{R}./"><img src="{R}assets/logo/refined-3d.svg" alt=""><span>HITOWER</span></a><nav aria-label="Primary">{nav}</nav></header><main>
{body}
</main><footer><div class="foot">{more}</div><br>HiTower Institute // San Diego, CA, USA // Nonprofit in formation // Est. 2026 // <a href="mailto:secoya@hitower.institute">secoya@hitower.institute</a><br>Score: public-domain and CC0 recordings, see <a href="{R}score-credits/">credits</a>. Not legal or tax advice. For emergencies call 911.</footer>
<a class="fab" href="tel:+12027501391">Non-emergency line</a>
<div id="player" class="player" role="region" aria-label="Score"><button id="pplay" type="button" aria-pressed="false">▶ Engage score</button><button id="pnext" type="button" aria-label="Next track">Next</button><button id="pmute" type="button">Mute</button><label for="pvol" class="hp">Volume</label><input id="pvol" type="range" min="0" max="1" step="0.05" value="0.35"><span id="pstat">Score standby</span></div>
<script src="{R}assets/js/bg.js" defer></script><script src="{R}assets/js/main.js" defer></script><script src="{R}assets/js/site.js" defer></script></body></html>'''
    if n=='404':html=html.replace('<head>','<head><script>document.write(\'<base href="\'+(location.hostname.endswith("github.io")?"/hitower/":"/")+\'">\')</script>',1).replace('href="/hitower/"','href="https://gitsum7.github.io/hitower/"')
    out=(n+'/index.html') if folder else f
    os.makedirs(os.path.dirname(out) or '.',exist_ok=True);open(out,'w').write(html)
