(()=>{
  const root=document.getElementById('app');
  if(!root)return;

  const chanceDots=(total,used)=>{
    const remaining=Math.max(0,total-used);
    return `<div class="chance-dots" aria-label="${remaining} فرص متبقية">${Array.from({length:total},(_,i)=>`<i class="${i<used?'lost':'available'}"></i>`).join('')}</div><small>${remaining} متبقية</small>`;
  };

  const injectMatchProgress=()=>{
    const grid=document.querySelector('.prematch-grid');
    if(!grid||document.querySelector('.match-status-card'))return;
    if(typeof state==='undefined'||!state||typeof DIVISIONS==='undefined'||typeof shieldSvg!=='function')return;

    const division=DIVISIONS[state.division];
    const nextDivision=state.division===1?'elite':state.division-1;
    const route=`<div class="status-route">${shieldSvg(state.division,'sm')}<span class="status-arrow"><i></i><i></i><i></i></span>${shieldSvg(nextDivision,'sm')}</div>`;
    const card=document.createElement('article');

    if(state.phase==='playoff'){
      const matchesRemaining=Math.max(0,division.pGames-state.playoffGames);
      const winsRemaining=Math.max(0,division.pWins-state.playoffWins);
      card.className='match-status-card promotion';
      card.innerHTML=`${route}<div class="status-copy"><strong>PROMOTION MATCH</strong><span>المباريات المتبقية: <b>${matchesRemaining}</b></span><span>الانتصارات المطلوبة للصعود: <b>${winsRemaining}</b></span></div>`;
    }else{
      const unlimited=!Number.isFinite(division.maxLosses);
      const chances=unlimited?'<span class="unlimited-chances">∞</span><small>غير محدودة</small>':chanceDots(division.maxLosses,state.losses);
      card.className='match-status-card league';
      card.innerHTML=`${route}<div class="status-copy"><strong>LEAGUE MATCH</strong><span class="points-line"><b>${state.points}/${division.points}</b> نقاط</span><div class="status-chances"><span>الفرص:</span>${chances}</div></div>`;
    }

    grid.before(card);
  };

  const observer=new MutationObserver(()=>requestAnimationFrame(injectMatchProgress));
  observer.observe(root,{childList:true,subtree:true});
  injectMatchProgress();
})();
