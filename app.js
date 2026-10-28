/* menu mobilne */
(function(){
  const h=document.querySelector('.ham'),p=document.getElementById('panel'); if(!h||!p)return;
  const ustaw=o=>{h.setAttribute('aria-expanded',o);p.classList.toggle('otwarte',o);document.body.style.overflow=o?'hidden':''};
  h.addEventListener('click',()=>ustaw(h.getAttribute('aria-expanded')!=='true'));
  p.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>ustaw(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')ustaw(false)});
  matchMedia('(min-width:1061px)').addEventListener('change',e=>{if(e.matches)ustaw(false)});
})();

/* dolny pasek na telefonie: dopiero po przewinieciu za przyciski w hero, chowany w kontakcie */
(function(){
  const m=document.querySelector('.mob'),c=document.querySelector('.hero-cta'); if(!m||!c||!('IntersectionObserver' in window))return;
  const k=document.getElementById('kontakt');
  let zaHero=false,wKontakcie=false;
  const odsw=()=>{const w=zaHero&&!wKontakcie;m.classList.toggle('widac',w);m.setAttribute('aria-hidden',!w);m.querySelectorAll('a').forEach(a=>a.tabIndex=w?0:-1)};
  new IntersectionObserver(([e])=>{zaHero=!e.isIntersecting&&e.boundingClientRect.top<0;odsw()}).observe(c);
  if(k)new IntersectionObserver(([e])=>{wKontakcie=e.isIntersecting;odsw()},{threshold:.15}).observe(k);
})();

/* wybor okazji: ustawia pole w formularzu i przewija do kontaktu */
(function(){
  const sel=document.getElementById('okazja'),f=document.getElementById('form'); if(!sel||!f)return;
  document.querySelectorAll('[data-okazja]').forEach(el=>el.addEventListener('click',e=>{
    const v=el.dataset.okazja; if([...sel.options].some(o=>o.value===v))sel.value=v;
    if(el.tagName==='BUTTON'){e.preventDefault();document.getElementById('kontakt').scrollIntoView({behavior:'smooth'})}
    f.classList.add('blysk');setTimeout(()=>f.classList.remove('blysk'),1400);
  }));
})();

/* formularz (wizualizacja): przygotowuje wiadomosc e-mail */
(function(){
  const f=document.getElementById('form'),info=document.getElementById('formInfo'); if(!f)return;
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const kto=f.kto.value.trim(),kon=f.kontakt.value.trim();
    if(!kon){info.textContent='Podaj telefon lub e-mail, żebyśmy mogli odpowiedzieć.';f.kontakt.focus();return}
    const d=f.data.value?new Date(f.data.value).toLocaleDateString('pl-PL'):'';
    const body=['Dzień dobry,','','Dotyczy: '+f.okazja.value,d&&('Data: '+d),f.osoby.value.trim()&&('Liczba osób: '+f.osoby.value.trim()),'',f.tresc.value.trim(),'',[kto,kon].filter(Boolean).join(', ')].filter(x=>x!==false&&x!==undefined).join('\n');
    info.textContent='Otwieram program pocztowy z gotową wiadomością...';
    location.href='mailto:artur.nowak@gastroarena.pl?subject='+encodeURIComponent('Zapytanie: '+f.okazja.value)+'&body='+encodeURIComponent(body);
  });
})();
