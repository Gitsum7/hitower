(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches,$=s=>document.querySelector(s);
const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('nav a').forEach(a=>a.getAttribute('href')===p&&a.classList.add('on'));
const ck=$('#clock');if(ck){const t=()=>ck.textContent=new Date().toISOString().slice(11,19)+'Z';t();setInterval(t,1000)}
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>rm?el.classList.add('in'):io.observe(el));
const svg=$('#map');if(!svg)return;const NS='http://www.w3.org/2000/svg';
const B=[["Adaptive Adventure","I",[["Archive & Field Library","Field notes, gear logs and route records for accessible off-grid expeditions."]]],
["Hydrogen & Off-Grid Power","II",[["Van Power Systems","Hydrogen fuel-cell and hybrid battery architectures for van conversions and generators."]]],
["Water & Power Communities","III",[["Coastal EV Access","CPRA records study of public EV charging access and pricing on public coastal land."]]],
["Open Hardware & Plain Text","IV",[["Off-Grid Battery Resilience","Open logging tools that model real-world battery capacity and energy use."]]],
["Integrity Desk","V",[["Critical-Mineral Market Integrity","Flagging fraudulent bulk copper and scrap offers against benchmark pricing."],["Case Files & Consumer Protection","Documented cases of marketplace fraud, compiled to warn and protect buyers."]]]];
const el=(n,a,par)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);(par||svg).appendChild(e);return e};
const pol=(r,d)=>[r*Math.cos((d-90)*Math.PI/180),r*Math.sin((d-90)*Math.PI/180)];
const g=el('g',{class:'spin'});[60,110,165].forEach(r=>el('circle',{class:'ring',r,'stroke-dasharray':r==110?'1 5':''},g));
const L=el('g',{}),N=el('g',{});const pl=$('#plaque');let open=null;
el('g',{class:'node core'},N);const core=N.lastChild;el('circle',{r:22},core);el('text',{'text-anchor':'middle',y:3,style:'font-size:7px;fill:#e5232f'},core).textContent='HITOWER';
B.forEach(([name,num,kids],i)=>{const a=i*72,[x,y]=pol(95,a);el('line',{class:'link',x1:0,y1:0,x2:x,y2:y},L);
const n=el('g',{class:'node',tabindex:0,role:'button','aria-label':name},N);el('circle',{cx:x,cy:y,r:11},n);
el('text',{x,y:y+3,'text-anchor':'middle',style:'fill:#e5232f'},n).textContent=num;
const words=name.split(' ');const ty=y+(y<0?-20:24);const tl=el('text',{x,y:ty,'text-anchor':'middle'},n);
[words.slice(0,2).join(' '),words.slice(2).join(' ')].forEach((w,k)=>{if(w){const s=el('tspan',{x,dy:k?10:0},tl);s.textContent=w}});
const subs=kids.map(([kn,kd],j)=>{const da=(j-(kids.length-1)/2)*26,[sx,sy]=pol(160,a+da);
const ln=el('line',{class:'link sub',x1:x,y1:y,x2:sx,y2:sy},L);const s=el('g',{class:'node sub',tabindex:0,role:'button','aria-label':kn},N);
el('circle',{cx:sx,cy:sy,r:6},s);const t=el('text',{x:sx,y:sy+(sy<0?-11:16),'text-anchor':'middle',style:'font-size:6.5px'},s);t.textContent=kn.split(' ').slice(0,2).join(' ');
const go=e=>{e.stopPropagation();document.querySelectorAll('.node.sub').forEach(q=>q.classList.remove('on'));s.classList.add('on');
pl.innerHTML=`<div class="lbl"><b>SEALED // CLEARANCE PENDING</b> · ${num}-${j+1}</div><h3>${kn}</h3><p style="margin:0;color:#cfcfd3">${kd}</p>`;pl.className='plaque show'};
s.addEventListener('click',go);s.addEventListener('keydown',e=>e.key==='Enter'&&go(e));return [s,ln]});
const tog=()=>{const on=!n.classList.contains('on');document.querySelectorAll('.node.on').forEach(q=>q.classList.remove('on'));document.querySelectorAll('.sub').forEach(q=>q.classList.remove('show'));
if(on){n.classList.add('on');subs.flat().forEach(q=>q.classList.add('show'))}pl.className='plaque';$('#sel').textContent=on?name.toUpperCase():'NONE'};
n.addEventListener('click',tog);n.addEventListener('keydown',e=>e.key==='Enter'&&tog())});
})();
