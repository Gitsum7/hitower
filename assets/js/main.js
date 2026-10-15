(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const p=location.pathname.split('/').pop()||'index.html';document.querySelectorAll('nav a').forEach(a=>{if(a.getAttribute('href')===p)a.classList.add('on')});
const io=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>rm?el.classList.add('in'):io.observe(el));
const t=document.querySelector('.term');if(!t)return;const lines=JSON.parse(t.dataset.lines);
if(rm){t.textContent=lines.join('\n');return}let i=0,j=0,out='';
(function step(){if(i>=lines.length){t.innerHTML=out+'<span class="c">█</span>';return}
if(j<=lines[i].length){t.innerHTML=out+lines[i].slice(0,j++)+'<span class="c">█</span>';setTimeout(step,18)}else{out+=lines[i++]+'\n';j=0;setTimeout(step,260)}})();})();
