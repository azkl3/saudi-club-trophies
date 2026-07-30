(()=>{
  if(window.__SL7_LEAGUE_RULES_V2__) return;
  window.__SL7_LEAGUE_RULES_V2__=true;

  const ensureRuleState=()=>{
    if(typeof state!=='undefined'&&state&&typeof state.relegationPending!=='boolean'){
      state.relegationPending=false;
    }
  };

  const style=document.createElement('style');
  style.textContent=`
    .relegation-alert{margin:0 0 18px;border:1px solid rgba(239,97,97,.45);background:linear-gradient(135deg,rgba(116,22,28,.72),rgba(43,10,14,.92));box-shadow:0 18px 48px rgba(0,0,0,.22)}
    .relegation-alert .badge{margin-bottom:10px}.relegation-alert h3{margin:0 0 7px;color:#fff}.relegation-alert p{margin:0;color:rgba(255,255,255,.72);line-height:1.8}
    .relegation-prematch{margin:0 0 14px;text-align:center;border-color:rgba(239,97,97,.45);color:#ffd1d1;background:rgba(116,22,28,.25)}
  `;
  document.head.appendChild(style);

  const originalDashboard=dashboard;
  dashboard=function(){
    ensureRuleState();
    let html=originalDashboard();
    if(!state?.relegationPending) return html;
    const alert=`<article class="card relegation-alert"><span class="badge danger">RELEGATION MATCH</span><h3>مباراة الهبوط</h3><p>بلغ الفريق الحد الأقصى للخسائر. المباراة القادمة حاسمة: الفوز يبقي SL7 FC في الدفجن ويصفّر عداد الخسائر، والخسارة تعني الهبوط. التعادل يعيد مباراة الهبوط.</p></article>`;
    html=html.replace('<section class="screen">',`<section class="screen">${alert}`);
    html=html.replace('LEAGUE','RELEGATION');
    return html;
  };

  const originalPrematch=prematch;
  prematch=function(){
    ensureRuleState();
    let html=originalPrematch();
    if(!state?.relegationPending) return html;
    html=html.replace('LEAGUE MATCH','RELEGATION MATCH');
    if(pending?.eventResolved){
      html=html.replace('<div class="prematch-grid">','<div class="notice relegation-prematch">هذه مباراة هبوط حاسمة. الفوز يبقيك، الخسارة تهبط بك، والتعادل يعيد المباراة.</div><div class="prematch-grid">');
    }
    return html;
  };

  matchLog=function(m){
    const cls=m.outcome==='W'?'win':m.outcome==='L'?'loss':'draw';
    const phase=m.phase==='playoff'?' · تصفيات':m.phase==='relegation'?' · مباراة هبوط':'';
    return`<div class="match-log"><span class="result-dot ${cls}">${m.outcome}</span><div><b>${m.opponent}</b><small>Division ${m.division}${phase}${m.event?` · ${m.event}`:''}</small></div><strong>${m.gf}–${m.ga}</strong></div>`;
  };

  const originalCreateOpponent=createOpponent;
  createOpponent=function(){
    ensureRuleState();
    const opponent=originalCreateOpponent();
    if(state?.relegationPending) opponent.power+=rand(2,4);
    return opponent;
  };

  applyResult=function(m){
    ensureRuleState();
    const relegationMatch=Boolean(state.relegationPending);
    if(relegationMatch) m.phase='relegation';

    const a=currentAttempt();
    a.matches.push(m);
    a.stats.m++;
    a.stats.gf+=m.gf;
    a.stats.ga+=m.ga;
    state.allStats.matches++;
    state.allStats.gf+=m.gf;
    state.allStats.ga+=m.ga;
    state.divisionMatches++;

    if(m.outcome==='W'){
      a.stats.w++;
      state.allStats.wins++;
      state.morale=clamp(state.morale+4,15,100);
      state.reputation+=2;
      state.budget+=10;
      state.form=clamp(state.form+1,-4,4);
      if(!relegationMatch){
        if(state.phase==='league') state.points+=3;
        else state.playoffWins++;
      }
    }else if(m.outcome==='D'){
      a.stats.d++;
      state.allStats.draws++;
      state.morale=clamp(state.morale+1,15,100);
      if(!relegationMatch&&state.phase==='league') state.points+=1;
    }else{
      a.stats.l++;
      state.allStats.losses++;
      state.morale=clamp(state.morale-5,15,100);
      state.form=clamp(state.form-1,-4,4);
      if(!relegationMatch&&state.phase==='league') state.losses++;
    }

    developBots(m.outcome);

    if(relegationMatch){
      if(m.outcome==='W'){
        state.relegationPending=false;
        state.losses=0;
        state.form=1;
        toast('نجا SL7 FC من الهبوط وبقي في نفس الدفجن!');
      }else if(m.outcome==='D'){
        state.losses=DIVISIONS[state.division].maxLosses;
        toast('تعادل في مباراة الهبوط — ستُعاد المباراة الحاسمة');
      }else{
        state.relegationPending=false;
        state.losses=0;
        relegate();
      }
      return;
    }

    processProgress();
  };

  processProgress=function(){
    ensureRuleState();
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
      }else if(state.divisionMatches>=d.maxMatches){
        endAttempt(`تجاوز حد المباريات في Division ${state.division}`);
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
      if(state.divisionMatches>=d.maxMatches){
        endAttempt(`استنزاف المحاولة في Division ${state.division}`);
      }else{
        toast(`فشلت التصفيات — خُصمت 3 نقاط وأصبح رصيدك ${state.points}`);
      }
    }
  };

  const originalPromote=promote;
  promote=function(){ensureRuleState();state.relegationPending=false;return originalPromote()};
  const originalRelegate=relegate;
  relegate=function(){ensureRuleState();state.relegationPending=false;return originalRelegate()};
  const originalEndAttempt=endAttempt;
  endAttempt=function(reason,success=false){ensureRuleState();state.relegationPending=false;return originalEndAttempt(reason,success)};
  const originalEndSeason=endSeason;
  endSeason=function(reason){ensureRuleState();state.relegationPending=false;return originalEndSeason(reason)};

  ensureRuleState();
  try{save();render()}catch(error){console.error('SL7 league rules v2',error)}
})();