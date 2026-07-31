(()=>{
  if(window.__SL7_NO_ATTEMPTS_V1__) return;
  window.__SL7_NO_ATTEMPTS_V1__=true;

  const emptyStats=()=>({m:0,w:0,d:0,l:0,gf:0,ga:0});
  const addStats=(target,source={})=>{for(const key of ['m','w','d','l','gf','ga']) target[key]+=(Number(source[key])||0);return target};
  const mergeSeasonAttempts=season=>{
    if(!season) return season;
    const attempts=Array.isArray(season.attempts)?season.attempts:[];
    if(attempts.length<=1){
      if(!attempts.length) season.attempts=[newAttempt(1)];
      season.attempts[0].number=1;
      return season;
    }
    const merged={
      number:1,
      startedAt:Math.min(...attempts.map(a=>a.startedAt||Date.now())),
      endedAt:attempts.some(a=>!a.endedAt)?null:Math.max(...attempts.map(a=>a.endedAt||0)),
      endReason:attempts.map(a=>a.endReason).filter(Boolean).at(-1)||null,
      bestDivision:Math.min(...attempts.map(a=>Number(a.bestDivision)||5)),
      matches:attempts.flatMap(a=>Array.isArray(a.matches)?a.matches:[]),
      events:attempts.flatMap(a=>Array.isArray(a.events)?a.events:[]),
      stats:attempts.reduce((sum,a)=>addStats(sum,a.stats),emptyStats())
    };
    season.attempts=[merged];
    return season;
  };

  const normalizeState=()=>{
    if(typeof state==='undefined'||!state) return;
    state.attempt=1;
    state.returnsToFive=0;
    state.currentSeason=mergeSeasonAttempts(state.currentSeason||{number:state.season||1,attempts:[newAttempt(1)],startedAt:Date.now()});
    if(Array.isArray(state.history)) state.history=state.history.map(mergeSeasonAttempts);
    for(const d of Object.values(DIVISIONS)) d.maxMatches=Infinity;
  };

  currentAttempt=function(){
    normalizeState();
    return state.currentSeason.attempts[0];
  };

  const originalFreshGame=freshGame;
  freshGame=function(...args){
    const game=originalFreshGame(...args);
    game.attempt=1;
    game.returnsToFive=0;
    game.currentSeason.attempts=[game.currentSeason.attempts[0]||newAttempt(1)];
    return game;
  };

  const originalHeader=header;
  header=function(){
    normalizeState();
    return originalHeader().replace(/\s·\sA\d+/g,'');
  };

  const originalHome=home;
  home=function(){
    return originalHome()
      .replace('عشرة مواسم، ثلاث محاولات في كل موسم، وقرارات تغيّر تاريخ النادي.','عشرة مواسم، وكل موسم رحلة واحدة مستمرة حتى انتهاء الوقت أو الوصول إلى الإيليت. قراراتك تغيّر تاريخ النادي.')
      .replace('<span>تاريخ كامل</span>','<span>بدون حد محاولات</span><span>تاريخ كامل</span>');
  };

  const originalSetup=setup;
  setup=function(){
    return originalSetup().replace('المؤقت يشمل المحاولات الثلاث. ظهور الحدث عشوائي، ونسبته ترتفع تدريجيًا حتى 58% في Division 1.','المؤقت هو الحد الوحيد للموسم: لا يوجد عدد محاولات ولا حد مباريات. ظهور الحدث عشوائي، ونسبته ترتفع تدريجيًا حتى 58% في Division 1.');
  };

  const originalDashboard=dashboard;
  dashboard=function(){
    normalizeState();
    const d=DIVISIONS[state.division];
    let html=originalDashboard();
    html=html.replace(new RegExp(`SEASON ${state.season}\\s*·\\s*ATTEMPT\\s*${state.attempt}`,'g'),`SEASON ${state.season}`);
    html=html.replace(/آخر مباريات المحاولة/g,'آخر مباريات الموسم');
    html=html.replace(new RegExp(`لعبت ${state.divisionMatches} من حد (?:Infinity|∞|${d.maxMatches}) مباراة في هذا الدفجن\\.`,'g'),`لعبت ${state.divisionMatches} مباراة في هذا الدفجن. لا يوجد حد مباريات؛ الوقت هو الحد الوحيد.`);
    html=html.replace(/كل مباراة هنا قد تصعد بك أو تعيدك إلى مرحلة النقاط\./g,'كل مباراة هنا قد تصعد بك أو تعيدك إلى مرحلة النقاط، والموسم يستمر ما دام الوقت متبقيًا.');
    return html;
  };

  const originalHistory=history;
  history=function(){
    normalizeState();
    return originalHistory()
      .replace(/المحاولة ١/g,'سجل الموسم')
      .replace(/المحاولة 1/g,'سجل الموسم');
  };

  relegate=function(){
    normalizeState();
    state.relegationPending=false;
    if(state.division===5){
      state.points=0;
      state.losses=0;
      state.phase='league';
      state.playoffWins=0;
      state.playoffGames=0;
      state.form=-1;
      state.morale=clamp(state.morale-5,15,100);
      toast('أنت في Division 5 — تستمر الرحلة حتى انتهاء الوقت');
      return;
    }
    state.division++;
    state.phase='league';
    state.points=0;
    state.losses=0;
    state.playoffWins=0;
    state.playoffGames=0;
    state.divisionMatches=0;
    state.form=-2;
    state.morale=clamp(state.morale-8,15,100);
    toast(`هبوط إلى Division ${state.division} — الموسم ما زال مستمرًا`);
  };

  processProgress=function(){
    normalizeState();
    const d=DIVISIONS[state.division];
    if(state.phase==='league'){
      if(state.points>=d.points){
        state.phase='playoff';
        state.playoffWins=0;
        state.playoffGames=0;
        state.points=d.points;
        state.losses=0;
        toast('تأهلت إلى تصفيات الصعود!');
      }else if(Number.isFinite(d.maxLosses)&&state.losses>=d.maxLosses){
        state.relegationPending=true;
        state.losses=d.maxLosses;
        toast('وصلت إلى حد الخسائر — المباراة القادمة مباراة هبوط');
      }
      return;
    }
    state.playoffGames++;
    if(state.playoffWins>=d.pWins){
      promote();
    }else if(state.playoffGames>=d.pGames){
      state.phase='league';
      state.points=Math.max(0,d.points-3);
      state.losses=0;
      state.playoffWins=0;
      state.playoffGames=0;
      toast(`فشلت التصفيات — خُصمت 3 نقاط وأصبح رصيدك ${state.points}`);
    }
  };

  endAttempt=function(reason,success=false){
    normalizeState();
    state.relegationPending=false;
    if(success){
      const record=currentAttempt();
      record.endedAt=Date.now();
      record.endReason=reason;
      record.success=true;
      endSeason('الوصول إلى الإيليت');
      return;
    }
    toast('لا يوجد نظام محاولات — الموسم مستمر حتى انتهاء الوقت');
    save();
    view='dashboard';
    render();
  };

  const originalEndSeason=endSeason;
  endSeason=function(reason){
    normalizeState();
    const result=originalEndSeason(reason);
    normalizeState();
    try{save()}catch{}
    return result;
  };

  normalizeState();
  try{save();render()}catch(error){console.error('SL7 no-attempts patch',error)}
})();