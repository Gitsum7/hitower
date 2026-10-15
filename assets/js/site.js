(()=>{const R=document.body.dataset.root||'',$=s=>document.querySelector(s),J=u=>fetch(R+u).then(r=>r.json());
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
// Gate (cosmetic only: static site, nothing secret behind it). Key hash = SHA-256 of placeholder key; change in config below.
const KEY_HASH='ce78b9113e95d973029a90fddda5c3ee2f9fe1644e536b3616672c96d171824c';
const gf=$('#gate');if(gf)gf.addEventListener('submit',async e=>{e.preventDefault();const v=gf.key.value.trim();
const h=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v)))].map(b=>b.toString(16).padStart(2,'0')).join('');
$('#gmsg').textContent=h===KEY_HASH?'Authenticated. Clearance pending: no content is released at this node yet.':'Decryption failed. Key rejected.'});
// Forms (Formspree placeholder)
document.querySelectorAll('form[data-fs]').forEach(f=>f.addEventListener('submit',e=>{const m=f.querySelector('.fmsg');
if(f.querySelector('.hp input')?.value){e.preventDefault();return}
if(f.action.includes('FORMSPREE_ID')){e.preventDefault();m.textContent='Uplink not configured yet. Nothing was transmitted.'}}));
// Donate calculator
const dc=$('#calc');if(dc)J('data/tax-2026.json').then(T=>{$('#taxyr').textContent=T.year;$('#taxsrc').href=T.source;
const tax=(ti,s)=>{let t=0,b=T.brackets[s];for(let i=0;i<b.length;i++){const lo=b[i][0],hi=b[i+1]?b[i+1][0]:Infinity;if(ti>lo)t+=(Math.min(ti,hi)-lo)*b[i][1]}return t};
dc.addEventListener('submit',e=>{e.preventDefault();const s=dc.fs.value,agi=+dc.inc.value||0,gift=+dc.gift.value||0,oth=+dc.oth.value||0,it=dc.it.value==='y',std=T.standard[s];
const ded=Math.min(gift,T.cash_limit_pct_agi*agi),carry=gift-ded,o=$('#cout');
if(!it||oth+ded<=std){o.innerHTML=`Estimated tax savings: <b>$0</b>. True cost of your gift: <b>${money(gift)}</b>.<br><small>Your itemized total (${money(oth+ded)}) does not exceed the ${T.year} standard deduction (${money(std)}), or you are not itemizing, so this model shows no federal savings.</small>`;return}
const sv=tax(Math.max(0,agi-Math.max(std,oth)),s)-tax(Math.max(0,agi-(oth+ded)),s);
o.innerHTML=`Deductible this year: <b>${money(ded)}</b><br>Estimated tax savings: <b>${money(sv)}</b><br>True cost of your gift: <b>${money(gift-sv)}</b>${carry>0?`<br>Carryover (up to 5 years): <b>${money(carry)}</b>`:''}`})});
// Catalog
const ic={chip:'<rect x="30" y="20" width="40" height="40" fill="none" stroke="currentColor"/><path d="M38 20v-8M50 20v-8M62 20v-8M38 60v8M50 60v8M62 60v8" stroke="currentColor"/>',h2:'<circle cx="50" cy="40" r="20" fill="none" stroke="currentColor"/><text x="50" y="46" text-anchor="middle" font-size="16" fill="currentColor">H₂</text>',sat:'<path d="M30 60 L70 20 M45 45 a20 20 0 0 1 10 -25" fill="none" stroke="currentColor"/><circle cx="72" cy="18" r="4" fill="currentColor"/>',home1:'<path d="M30 60V35h40v25Z" fill="none" stroke="currentColor"/>',home2:'<path d="M20 60V35h30v25ZM50 60V30h30v30Z" fill="none" stroke="currentColor"/>',home3:'<path d="M10 60V40h25v20ZM35 60V25h30v35ZM65 60V40h25v20Z" fill="none" stroke="currentColor"/><path d="M50 25v-10" stroke="currentColor"/>',water:'<path d="M50 15 C40 35 34 42 34 50 a16 16 0 0 0 32 0 C66 42 60 35 50 15Z" fill="none" stroke="currentColor"/>',shield:'<path d="M50 14 L72 22 V42 C72 54 62 62 50 66 C38 62 28 54 28 42 V22Z" fill="none" stroke="currentColor"/>'};
const cg=$('#cards');if(cg)J('data/catalog.json').then(L=>cg.innerHTML=L.map(i=>`<article class="card"><svg viewBox="0 0 100 76" style="color:var(--r)" aria-hidden="true">${ic[i.icon]}</svg><div class="lbl"><b>${i.cat}</b></div><h3>${i.name}</h3><p>${i.desc}</p>${i.soon?'<span class="badge">Coming soon · US only · legal review pending</span>':`<p><b>${i.price}</b> <span class="badge">Placeholder, not a quote</span></p>`}${i.link?`<a class="btn" href="${i.link}" rel="noopener" target="_blank">Open official site</a>`:''}${i.soon?'':`<a class="btn r" href="#req" data-item="${i.name}">Request item</a>`}</article>`).join(''));
document.addEventListener('click',e=>{const a=e.target.closest('[data-item]');if(a){$('#req-item').value=a.dataset.item}});
// Credits
const cr=$('#credits');if(cr)J('data/playlist.json').then(p=>cr.innerHTML=p.tracks.map(t=>`<article><div class="lbl"><b>${t.composer}</b></div><h3>${t.title}</h3><p>${t.performer}<br><span class="badge">${t.license}</span></p><a href="${t.source}" target="_blank" rel="noopener">Source file page</a></article>`).join(''));
// Leaders
const ld=$('#leaders');if(ld)J('data/leaders.json').then(L=>ld.innerHTML=L.map(([c,xs])=>`<article><div class="lbl"><b>Sector</b> // ${c}</div><ul>${xs.map(([n,u])=>`<li><a href="${u}" rel="noopener" target="_blank">${n}</a></li>`).join('')}</ul></article>`).join(''));
// Local
const lz=$('#zipf');if(lz)lz.addEventListener('submit',e=>{e.preventDefault();const z=lz.zip.value.trim(),o=$('#zout');
if(!/^\d{5}$/.test(z)){o.innerHTML='<b>Invalid ZIP.</b> Enter 5 digits.';return}
const L=[['211 (local help line directory)','https://www.211.org/'],['findhelp.org results for '+z,'https://www.findhelp.org/search_results/'+z],['SNAP state directory (USDA)','https://www.fns.usda.gov/snap/state-directory'],['Goodwill locator','https://www.goodwill.org/locator/'],['Meals on Wheels locator','https://www.mealsonwheelsamerica.org/find-meals'],['SAM.gov contract opportunities','https://sam.gov/search/?index=opp']];
o.innerHTML='<ul>'+L.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')+'</ul><small>Some directories ask for your ZIP again on their own site.</small>'});
// Audio: score starts only on user tap, fades in to the chosen volume
const pl=$('#player');if(pl){const a=new Audio(),st=$('#pstat'),bp=$('#pplay'),vol=$('#pvol');let T=[],i=0,fd;a.preload='none';a.muted=localStorage.getItem('htMute')==='1';$('#pmute').textContent=a.muted?'Unmute':'Mute';
J('data/playlist.json').then(p=>{T=p.tracks||[];st.textContent=T.length?'Score standby':'No licensed tracks loaded'});
const fade=()=>{clearInterval(fd);a.volume=0;const tgt=+vol.value;fd=setInterval(()=>{a.volume=Math.min(tgt,a.volume+tgt/30);if(a.volume>=tgt)clearInterval(fd)},100)};
const load=()=>{if(!T.length)return false;a.src=R+T[i].src;st.textContent=T[i].title+' // '+T[i].composer;return true};
const go=()=>{a.play().then(fade).catch(()=>{});bp.textContent='■ Disengage score';bp.setAttribute('aria-pressed','true')};
bp.onclick=()=>{if(a.paused){if(!a.src&&!load())return;go()}else{a.pause();bp.textContent='▶ Engage score';bp.setAttribute('aria-pressed','false')}};
$('#pnext').onclick=()=>{if(!T.length)return;i=(i+1)%T.length;load();go()};a.onended=()=>$('#pnext').click();
$('#pmute').onclick=()=>{a.muted=!a.muted;localStorage.setItem('htMute',a.muted?'1':'0');$('#pmute').textContent=a.muted?'Unmute':'Mute'};vol.oninput=()=>{clearInterval(fd);a.volume=+vol.value}}
// Decrypt reveal on page headers
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('.hero h1,.hero h2').forEach(h=>{if(h.querySelector('*'))return;const t=h.textContent,G='#%&01<>/ABCDEF';let f=0;h.setAttribute('aria-label',t);const iv=setInterval(()=>{f++;h.textContent=[...t].map((c,k)=>c===' '||k<f/2?c:G[(Math.random()*G.length)|0]).join('');if(f/2>=t.length){clearInterval(iv);h.textContent=t}},33)});
// Count-up stats
document.querySelectorAll('[data-count]').forEach(e=>{const n=+e.dataset.count;let v=0;const st=Math.max(1,n/40),iv=setInterval(()=>{v=Math.min(n,v+st);e.textContent=Math.round(v);if(v>=n)clearInterval(iv)},30)});
})();
// Stepper
document.querySelectorAll('.steps button').forEach(b=>b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o)}));
// Earth ops: IP-located weather (ipwho.is -> ipapi.co -> San Diego) + modular Disaster Forecast. Keyless; cached 10 min.
(()=>{const eo=document.getElementById('earthops'),wxe=document.getElementById('wx'),hz=document.getElementById('hazards');if(!eo&&!wxe&&!hz)return;
const get=(k,u,o)=>{try{const c=JSON.parse(sessionStorage.getItem(k)||'null');if(c&&Date.now()-c.t<6e5)return Promise.resolve(c.d)}catch(e){}
const ac=new AbortController();setTimeout(()=>ac.abort(),7000);return fetch(u,Object.assign({signal:ac.signal},o||{})).then(r=>{if(!r.ok)throw 0;return r.json()}).then(d=>{try{sessionStorage.setItem(k,JSON.stringify({t:Date.now(),d}))}catch(e){}return d}).catch(()=>null)};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SD={lat:32.7157,lon:-117.1611,city:'San Diego',cc:'US',fb:1};
const loc=get('ip1','https://ipwho.is/').then(d=>d&&d.success!==false&&d.latitude?{lat:d.latitude,lon:d.longitude,city:d.city,cc:d.country_code}:get('ip2','https://ipapi.co/json/').then(d=>d&&d.latitude?{lat:d.latitude,lon:d.longitude,city:d.city,cc:d.country_code}:SD)).then(l=>l||SD);
const WMO={0:'Clear',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',66:'Freezing rain',67:'Freezing rain',71:'Light snow',73:'Snow',75:'Heavy snow',77:'Snow grains',80:'Showers',81:'Showers',82:'Violent showers',85:'Snow showers',86:'Snow showers',95:'Thunderstorm',96:'Thunderstorm + hail',99:'Thunderstorm + hail'};
const us=l=>l.cc==='US';
const fx=l=>get('fx'+l.lat.toFixed(2)+l.lon.toFixed(2),`https://api.open-meteo.com/v1/forecast?latitude=${l.lat}&longitude=${l.lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_gusts_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max&hourly=cape&forecast_days=4&timezone=auto`+(us(l)?'&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch':''));
// Hazard modules: add more by pushing {id,name,run(loc,fx)->Promise<html>}
const MODS=[
{id:'storms',name:'Incoming Storms',run:async(l,f)=>{const out=[];
 if(us(l)){const a=await get('nws'+l.lat.toFixed(2)+l.lon.toFixed(2),`https://api.weather.gov/alerts/active?point=${(+l.lat).toFixed(4)},${(+l.lon).toFixed(4)}`,{headers:{Accept:'application/geo+json'}});
  if(a&&a.features){const rx=/storm|hurricane|tropical|flood|wind|winter|blizzard|ice|snow|tornado|thunder|surf|gale|typhoon|rain|freeze|dust/i;const al=a.features.map(x=>x.properties).filter(p=>rx.test(p.event));
   out.push(al.length?'<ul>'+al.slice(0,8).map(p=>`<li><span class="badge sev-${esc((p.severity||'').toLowerCase())}">${esc(p.severity||'n/a')}</span> <b>${esc(p.event)}</b> · until ${esc(p.ends||p.expires?new Date(p.ends||p.expires).toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'TBD')}<br><small>${esc(p.headline||p.areaDesc)}</small></li>`).join('')+'</ul>':'<p>NWS: no active storm, flood, wind or winter alerts for your point.</p>')}
  else out.push('<p>NWS alert feed unavailable right now.</p>')}
 if(f&&f.daily){const d=f.daily,u=us(l),gT=u?40:65,pT=u?1:25,cape=Math.max(0,...(f.hourly?.cape||[0]));const flags=[];
  d.time.forEach((t,i)=>{const g=d.wind_gusts_10m_max[i],p=d.precipitation_sum[i],c=d.weather_code[i];if(g>=gT||p>=pT||c>=95)flags.push(`${new Date(t+'T12:00').toLocaleDateString([], {weekday:'short'})}: ${WMO[c]||'—'}, gusts ${Math.round(g)}${u?' mph':' km/h'}, precip ${p}${u?'"':' mm'}`)});
  const risk=flags.length>1||cape>2000?'ELEVATED':flags.length||cape>1000?'WATCH':'LOW';
  out.push(`<p>4-day storm outlook: <b>${risk}</b> <small>(peak CAPE ${Math.round(cape)} J/kg)</small></p>`+(flags.length?'<ul>'+flags.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''))}
 out.push('<p><small>Tropical systems: <a href="https://www.nhc.noaa.gov/" target="_blank" rel="noopener">NHC active storms</a></small></p>');return out.join('')}},
{id:'quakes',name:'Seismic',run:async l=>{const d=await get('q','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson');if(!d)return '<p>USGS feed unavailable.</p>';
 const R=6371,near=d.features.filter(x=>{const[lo,la]=x.geometry.coordinates,dl=(la-l.lat)*Math.PI/180,dn=(lo-l.lon)*Math.PI/180,h=Math.sin(dl/2)**2+Math.cos(l.lat*Math.PI/180)*Math.cos(la*Math.PI/180)*Math.sin(dn/2)**2;return 2*R*Math.asin(Math.sqrt(h))<1000});
 const m=Math.max(0,...d.features.map(f=>f.properties.mag));return `<p>Global M4.5+ last 24h: <b>${d.features.length}</b>${d.features.length?` (max M${m.toFixed(1)})`:''} · within 1000 km of you: <b>${near.length}</b></p>`}},
{id:'space',name:'Space Weather',run:async()=>{const d=await get('kp','https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');if(!d||!d.length)return '<p>NOAA SWPC feed unavailable.</p>';const r=d[d.length-1],kp=+(r.Kp??r.kp_index??r[1]);if(isNaN(kp))return '<p>Kp unavailable.</p>';
 return `<p>Planetary Kp: <b>${kp.toFixed(1)}</b> · ${kp>=7?'Strong geomagnetic storm (G3+)':kp>=5?'Geomagnetic storm (G1+)':kp>=4?'Unsettled':'Quiet'}</p>`}}];
loc.then(async l=>{const f=await fx(l),u=us(l),c=f&&f.current;const where=esc(l.city||'your area')+(l.fb?' (default node)':'');
 if(wxe){wxe.innerHTML=c?`<div class="lbl"><b>●</b> Local weather // ${where}</div><p class="wxnow"><b>${Math.round(c.temperature_2m)}°${u?'F':'C'}</b> ${esc(WMO[c.weather_code]||'')} · feels ${Math.round(c.apparent_temperature)}° · wind ${Math.round(c.wind_speed_10m)} (gusts ${Math.round(c.wind_gusts_10m)}) ${u?'mph':'km/h'} · RH ${c.relative_humidity_2m}%</p><div class="wxd">`+f.daily.time.map((t,i)=>`<div><small>${new Date(t+'T12:00').toLocaleDateString([], {weekday:'short'})}</small><b>${Math.round(f.daily.temperature_2m_max[i])}°/${Math.round(f.daily.temperature_2m_min[i])}°</b><small>${esc(WMO[f.daily.weather_code[i]]||'')} · ${f.daily.precipitation_probability_max[i]??0}%</small></div>`).join('')+'</div><small class="lbl">Location approximated from IP · Open-Meteo</small>':`<div class="lbl">Local weather // ${where}</div><p>Weather feed offline. Try again shortly.</p>`}
 if(eo){eo.innerHTML=`Earth ops // ${where}`+(c?` <b>${Math.round(c.temperature_2m)}°${u?'F':'C'}</b>`:'')+' · disaster forecast below <small>(USGS · NOAA · NWS · Open-Meteo)</small>'}
 if(hz){hz.innerHTML='<div class="lbl"><b>●</b> Disaster Forecast // '+where+'</div><div class="hzg">'+MODS.map(m=>`<article class="card" id="hz-${m.id}"><h3>${m.name}</h3><div>Acquiring…</div></article>`).join('')+'</div>';
  MODS.forEach(m=>Promise.resolve().then(()=>m.run(l,f)).catch(()=>'<p>Module offline.</p>').then(h=>{hz.querySelector(`#hz-${m.id} div`).innerHTML=h}))}});
})();
