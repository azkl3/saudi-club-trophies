(()=>{
  if(window.__SL7_MARKET_TIMER_GUARD_V1__) return;
  window.__SL7_MARKET_TIMER_GUARD_V1__=true;

  const originalStartTimer=startTimer;
  startTimer=function(){
    if(state?.botTransferPending) return;
    return originalStartTimer();
  };

  const originalEndSeason=endSeason;
  endSeason=function(reason){
    const result=originalEndSeason(reason);
    if(state?.botTransferPending){
      state.seasonStarted=false;
      try{clearInterval(timerId)}catch{}
      try{save()}catch{}
    }
    return result;
  };

  const originalFinishMarket=window.sl7FinishMarket;
  if(typeof originalFinishMarket==='function'){
    window.sl7FinishMarket=function(){
      if(state) state.seasonStarted=true;
      return originalFinishMarket();
    };
  }

  document.addEventListener('error',event=>{
    const img=event.target;
    if(!(img instanceof HTMLImageElement)||!img.closest('.market-player')||img.dataset.marketFallback) return;
    img.dataset.marketFallback='1';
    const player=(window.SL7_FOREIGN_PLAYER_CATALOG||[]).find(p=>p.name===img.alt)||{name:img.alt,positions:['ANY']};
    if(typeof window.sl7CharacterPortrait==='function') img.src=window.sl7CharacterPortrait(player,'avatar',player.positions?.[0]);
  },true);

  if(state?.botTransferPending){
    state.seasonStarted=false;
    try{clearInterval(timerId);save();render()}catch(error){console.error(error)}
  }
})();