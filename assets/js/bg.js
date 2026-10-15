// Lightweight blueprint "data rain": cyan glyphs travel down grid columns, pulses run along lines, occasional scan sweep. ~30fps, pauses when hidden, off for reduced motion.
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const c=document.createElement('canvas');c.id='bgfx';c.setAttribute('aria-hidden','true');document.body.prepend(c);const x=c.getContext('2d');
let W,H,cols=[],pulses=[],sweep=-1,last=0,raf;const G=22,CH='01ABCDEF<>/#';
const size=()=>{W=c.width=innerWidth;H=c.height=innerHeight;cols=[];for(let i=G;i<W;i+=G*5)if(Math.random()<.35)cols.push({x:i,y:Math.random()*H,v:1+Math.random()*2})};
size();addEventListener('resize',size);
const tick=t=>{raf=requestAnimationFrame(tick);if(t-last<33)return;last=t;x.clearRect(0,0,W,H);x.font='10px "JetBrains Mono",monospace';
for(const k of cols){k.y+=k.v;if(k.y>H+120){k.y=-60;k.v=1+Math.random()*2}for(let j=0;j<8;j++){x.fillStyle=`rgba(63,216,255,${(.22-j*.026).toFixed(3)})`;x.fillText(CH[(Math.random()*CH.length)|0],k.x+3,k.y-j*12)}}
if(Math.random()<.04&&pulses.length<6){const h=Math.random()<.5;pulses.push({h,p:0,l:h?Math.round(Math.random()*H/110)*110:Math.round(Math.random()*W/110)*110})}
pulses=pulses.filter(p=>{p.p+=8;const L=p.h?W:H;if(p.p>L)return false;const g=p.h?x.createLinearGradient(p.p-90,0,p.p,0):x.createLinearGradient(0,p.p-90,0,p.p);g.addColorStop(0,'rgba(63,216,255,0)');g.addColorStop(1,'rgba(63,216,255,.55)');x.fillStyle=g;p.h?x.fillRect(p.p-90,p.l,90,1):x.fillRect(p.l,p.p-90,1,90);return true});
if(sweep<0&&Math.random()<.002)sweep=0;if(sweep>=0){sweep+=12;const g=x.createLinearGradient(0,sweep-60,0,sweep);g.addColorStop(0,'rgba(63,216,255,0)');g.addColorStop(1,'rgba(63,216,255,.07)');x.fillStyle=g;x.fillRect(0,sweep-60,W,60);if(sweep>H+60)sweep=-1}};
raf=requestAnimationFrame(tick);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else raf=requestAnimationFrame(tick)})})();
