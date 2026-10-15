(()=>{const R=document.body.dataset.root||'',$=s=>document.querySelector(s),J=u=>fetch(R+u).then(r=>r.json());
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
// Gate (cosmetic only: static site, nothing secret behind it). Key hash = SHA-256 of placeholder key; change in config below.
const KEY_HASH='071e89627a2d7f5598184ff60144d1f03699fa7ab7e212718f71a65a07c92e28';
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
// Leaders
const ld=$('#leaders');if(ld)J('data/leaders.json').then(L=>ld.innerHTML=L.map(([c,xs])=>`<article><div class="lbl"><b>Sector</b> // ${c}</div><ul>${xs.map(([n,u])=>`<li><a href="${u}" rel="noopener" target="_blank">${n}</a></li>`).join('')}</ul></article>`).join(''));
// Local
const lz=$('#zipf');if(lz)lz.addEventListener('submit',e=>{e.preventDefault();const z=lz.zip.value.trim(),o=$('#zout');
if(!/^\d{5}$/.test(z)){o.innerHTML='<b>Invalid ZIP.</b> Enter 5 digits.';return}
const L=[['211 (local help line directory)','https://www.211.org/'],['findhelp.org results for '+z,'https://www.findhelp.org/search_results/'+z],['SNAP state directory (USDA)','https://www.fns.usda.gov/snap/state-directory'],['Goodwill locator','https://www.goodwill.org/locator/'],['Meals on Wheels locator','https://www.mealsonwheelsamerica.org/find-meals'],['SAM.gov contract opportunities','https://sam.gov/search/?index=opp']];
o.innerHTML='<ul>'+L.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')+'</ul><small>Some directories ask for your ZIP again on their own site.</small>'});
// Audio
const pl=$('#player');if(pl){const a=new Audio(),st=$('#pstat');let T=[],i=0;a.muted=localStorage.getItem('htMute')==='1';$('#pmute').textContent=a.muted?'Unmute':'Mute';
J('data/playlist.json').then(p=>{T=p.tracks||[];st.textContent=T.length?'Channel ready':'No licensed tracks loaded'});
const load=()=>{if(!T.length)return false;a.src=R+T[i].src;st.textContent=T[i].title;return true};
$('#pplay').onclick=()=>{if(a.paused){if(!a.src&&!load())return;a.play().catch(()=>{});$('#pplay').textContent='Pause'}else{a.pause();$('#pplay').textContent='Play'}};
$('#pnext').onclick=()=>{if(!T.length)return;i=(i+1)%T.length;load();a.play().catch(()=>{})};a.onended=()=>$('#pnext').click();
$('#pmute').onclick=()=>{a.muted=!a.muted;localStorage.setItem('htMute',a.muted?'1':'0');$('#pmute').textContent=a.muted?'Unmute':'Mute'};$('#pvol').oninput=e=>a.volume=e.target.value}
})();
