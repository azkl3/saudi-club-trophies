(()=>{
  if(window.__SL7_SEASON_MARKET_LINEUP_V1__) return;
  window.__SL7_SEASON_MARKET_LINEUP_V1__=true;

  const esc=value=>String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const catalog=Array.isArray(window.SL7_FOREIGN_PLAYER_CATALOG)?window.SL7_FOREIGN_PLAYER_CATALOG:[];
  const positionPenalty=(player,slot)=>{
    const positions=Array.isArray(player?.positions)?player.positions:[];
    if(positions.includes('ANY')) return 0;
    let index=positions.indexOf(slot);
    if(index<0&&slot==='RM') index=positions.indexOf('RW');
    if(index<0&&slot==='LM') index=positions.indexOf('LW');
    return index<0?6:Math.min(index,3);
  };

  const originalTeamBase=teamBase;
  teamBase=function(lineup){
    if(!Array.isArray(lineup)||!lineup.length) return originalTeamBase(lineup);
    const total=lineup.reduce((sum,p)=>sum+Math.max(35,(Number(p.rating)||50)-positionPenalty(p,p.slot)),0);
    return Math.round(total/lineup.length);
  };

  const style=document.createElement('style');
  style.textContent=`
    .lineup-editor{margin-top:18px;border-top:1px solid rgba(255,255,255,.09);padding-top:16px}
    .lineup-editor-head{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px}.lineup-editor-head h3{margin:0}.lineup-editor-head p{margin:4px 0 0;color:rgba(255,255,255,.56);font-size:13px}
    .lineup-lists{display:grid;grid-template-columns:1fr 1fr;gap:12px}.lineup-list{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:12px;min-height:210px}.lineup-list h4{margin:0 0 10px;font-size:14px;color:#e6ce86}
    .lineup-scroll{display:flex;flex-direction:column;gap:8px;max-height:330px;overflow:auto;padding-left:2px}
    .swap-player{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:right;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);color:#fff;border-radius:12px;padding:10px;cursor:pointer}.swap-player:hover,.swap-player.selected{border-color:rgba(211,181,108,.75);background:rgba(211,181,108,.1)}
    .swap-player b{display:block}.swap-player small{display:block;color:rgba(255,255,255,.5);margin-top:3px}.swap-player span{font-weight:900;color:#e4ca7d}.swap-player em{font-style:normal;font-size:11px;color:#ffb1b1}
    .market-screen{padding-bottom:40px}.market-hero{text-align:center;margin-bottom:18px}.market-hero h2{font-size:clamp(30px,7vw,54px);margin:6px 0}.market-hero p{color:rgba(255,255,255,.62);line-height:1.8}.market-counter{display:inline-flex;margin-top:10px;padding:7px 12px;border-radius:999px;background:rgba(211,181,108,.12);border:1px solid rgba(211,181,108,.3);color:#e7cf88;font-weight:900}
    .market-columns{display:grid;grid-template-columns:1fr 1fr;gap:16px}.market-panel{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:14px}.market-panel h3{margin:0 0 5px}.market-panel>p{margin:0 0 12px;color:rgba(255,255,255,.52);font-size:13px}.market-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-height:520px;overflow:auto}
    .market-player{position:relative;display:flex;gap:10px;align-items:center;text-align:right;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);color:#fff;border-radius:14px;padding:10px;cursor:pointer}.market-player:hover,.market-player.selected{border-color:#d3b56c;background:rgba(211,181,108,.1)}.market-player.used{opacity:.38;pointer-events:none}.market-player img{width:48px;height:48px;border-radius:12px;object-fit:cover;background:#092119}.market-player b{display:block;font-size:13px}.market-player small{display:block;color:rgba(255,255,255,.48);margin-top:3px}.market-player strong{margin-right:auto;color:#e6cd83}
    .market-summary{margin-top:16px}.market-pair{display:flex;justify-content:space-between;gap:12px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07);margin-top:8px}.market-pair span{color:#ffb1b1}.market-pair b{color:#8de4b4}.market-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
    .history-transfers{margin:0 0 18px}.history-transfers .mini-list{margin-top:10px}.history-transfers .mini-list div{align-items:flex-start}
    @media(max-width:780px){.lineup-lists,.market-columns{grid-template-columns:1fr}.market-grid{grid-template-columns:1fr}.lineup-scroll{max-height:260px}}
  `;
  document.head.appendChild(style);

  function allAvailableForPending(){
    if(!pending) return [];
    const fixed=(pending.fixed||[]).filter(p=>p.available).map(p=>({...p,type:'ثابت'}));
    const bots=(state?.bots||[]).map(p=>({...p,available:true,type:'بوت'}));
    return [...fixed,...bots];
  }

  function benchForPending(){
    const starters=new Set((pending?.lineup||[]).map(p=>p.id));
    return allAvailableForPending().filter(p=>!starters.has(p.id)).sort((a,b)=>(b.rating||0)-(a.rating||0));
  }

  function fitLabel(player,slot){
    const penalty=positionPenalty(player,slot);
    if(penalty===0) return '<small>مناسب للمركز</small>';
    if(penalty<=3) return `<small>مركز ثانوي · خصم ${penalty}</small>`;
    return `<em>خارج مركزه · خصم ${penalty}</em>`;
  }

  window.sl7PickStarter=id=>{
    if(!pending?.eventResolved) return;
    pending.selectedStarterId=pending.selectedStarterId===id?null:id;
    render();
  };

  window.sl7SwapBench=id=>{
    if(!pending?.eventResolved) return;
    const starterId=pending.selectedStarterId;
    if(!starterId) return toast('اختر لاعبًا أساسيًا أولًا');
    const starterIndex=pending.lineup.findIndex(p=>p.id===starterId);
    if(starterIndex<0) return;
    const bench=benchForPending().find(p=>p.id===id);
    if(!bench) return toast('هذا اللاعب غير متاح');
    const old=pending.lineup[starterIndex];
    pending.lineup[starterIndex]={...bench,slot:old.slot,x:old.x,y:old.y};
    pending.base=teamBase(pending.lineup);
    pending.manualEdited=true;
    pending.selectedStarterId=null;
    calculateOdds();
    toast(`دخل ${bench.name} بدل ${old.name}`);
    render();
  };

  window.sl7AutoLineup=()=>{
    if(!pending) return;
    pending.lineup=buildLineup(pending.fixed,state.bots,state.formation);
    pending.base=teamBase(pending.lineup);
    pending.manualEdited=false;
    pending.selectedStarterId=null;
    calculateOdds();
    toast('تمت إعادة التشكيلة التلقائية');
    render();
  };

  const originalChangeFormation=changeFormation;
  changeFormation=function(value){
    if(pending){pending.selectedStarterId=null;pending.manualEdited=false}
    return originalChangeFormation(value);
  };

  function lineupEditor(){
    const starters=pending.lineup||[];
    const bench=benchForPending();
    const selected=pending.selectedStarterId;
    return `<div class="lineup-editor"><div class="lineup-editor-head"><div><h3>تعديل التشكيلة يدويًا</h3><p>اختر لاعبًا أساسيًا ثم اختر بديله من الاحتياط. تتغير القوة والنسب مباشرة.</p></div><button class="btn ghost" onclick="sl7AutoLineup()">إعادة تلقائية</button></div><div class="lineup-lists"><div class="lineup-list"><h4>الأساسيون</h4><div class="lineup-scroll">${starters.map(p=>`<button class="swap-player ${selected===p.id?'selected':''}" onclick="sl7PickStarter('${esc(p.id)}')"><div><b>${esc(p.name)}</b>${fitLabel(p,p.slot)}</div><div><span>${p.rating}</span><small>${p.slot}</small></div></button>`).join('')}</div></div><div class="lineup-list"><h4>الاحتياط المتاح</h4><div class="lineup-scroll">${bench.length?bench.map(p=>`<button class="swap-player" onclick="sl7SwapBench('${esc(p.id)}')"><div><b>${esc(p.name)}</b><small>${esc((p.positions||[]).join(' / '))} · ${p.type}</small></div><span>${p.rating}</span></button>`).join(''):'<div class="empty">لا يوجد بدلاء متاحون.</div>'}</div></div></div></div>`;
  }

  const originalPrematch=prematch;
  prematch=function(){
    let html=originalPrematch();
    if(!pending||!pending.eventResolved) return html;
    const editor=lineupEditor();
    if(html.includes('<div class="availability">')) return html.replace('<div class="availability">',`${editor}<div class="availability">`);
    return html.replace('</section>',`${editor}</section>`);
  };

  function avgBotRating(){
    const bots=state?.bots||[];
    return bots.length?Math.round(bots.reduce((sum,p)=>sum+(Number(p.rating)||0),0)/bots.length):55;
  }

  function makeMarketCandidates(){
    const currentNames=new Set((state?.bots||[]).map(p=>p.name));
    const pool=shuffle(catalog.filter(p=>!currentNames.has(p.name)));
    const average=avgBotRating();
    return pool.slice(0,12).map((p,index)=>({
      id:`market-${p.slug}-${state.season}-${index}`,
      slug:p.slug,
      name:p.name,
      nameEn:p.nameEn,
      country:p.country,
      positions:p.positions,
      images:p.images,
      rating:clamp(average+rand(-2,2),46,88),
      potential:clamp(Math.max(average+8,rand(76,90)),76,92),
      apps:0,goals:0,assists:0,form:0
    }));
  }

  function ensureTransferState(){
    if(!state) return;
    state.botTransferHistory||=[];
    if(state.botTransferPending&&!state.botTransferDraft){
      state.botTransferDraft={selectedOut:null,pairs:[],candidates:makeMarketCandidates()};
    }
  }

  window.sl7MarketPickOut=id=>{
    ensureTransferState();
    const draft=state.botTransferDraft;
    if(draft.pairs.some(p=>p.outId===id)) return toast('اخترت هذا اللاعب للتغيير بالفعل');
    draft.selectedOut=draft.selectedOut===id?null:id;
    save();render();
  };

  window.sl7MarketPickIn=slug=>{
    ensureTransferState();
    const draft=state.botTransferDraft;
    if(draft.pairs.length>=3) return toast('وصلت للحد الأقصى: 3 تغييرات');
    if(!draft.selectedOut) return toast('اختر البوت الذي تريد إخراجه أولًا');
    if(draft.pairs.some(p=>p.inSlug===slug)) return;
    const outgoing=state.bots.find(p=>p.id===draft.selectedOut);
    const incoming=draft.candidates.find(p=>p.slug===slug);
    if(!outgoing||!incoming) return;
    draft.pairs.push({outId:outgoing.id,outName:outgoing.name,inSlug:incoming.slug,inName:incoming.name});
    draft.selectedOut=null;
    save();render();
  };

  window.sl7MarketUndo=()=>{
    ensureTransferState();
    if(!state.botTransferDraft.pairs.length) return toast('لا يوجد تبديل للتراجع عنه');
    state.botTransferDraft.pairs.pop();
    state.botTransferDraft.selectedOut=null;
    save();render();
  };

  window.sl7FinishMarket=()=>{
    ensureTransferState();
    const draft=state.botTransferDraft;
    const applied=[];
    for(const pair of draft.pairs){
      const index=state.bots.findIndex(p=>p.id===pair.outId);
      const candidate=draft.candidates.find(p=>p.slug===pair.inSlug);
      if(index<0||!candidate) continue;
      const replacement={...candidate,id:`bot-${candidate.slug}-${Date.now()}-${index}`};
      const outgoing=state.bots[index];
      state.bots[index]=replacement;
      applied.push({out:outgoing.name,in:replacement.name,rating:replacement.rating,positions:replacement.positions});
    }
    if(applied.length){
      const record={season:state.season,at:Date.now(),changes:applied};
      state.botTransferHistory.push(record);
      state.currentSeason.botChanges=applied;
    }
    state.botTransferPending=false;
    state.botTransferDraft=null;
    save();
    toast(applied.length?`تم تغيير ${applied.length} بوت`:'تم تخطي سوق البوتات');
    render();
  };

  function marketPortrait(player){
    return player?.images?.avatar||player?.images?.card||(typeof window.sl7CharacterPortrait==='function'?window.sl7CharacterPortrait(player,'avatar',player.positions?.[0]):'');
  }

  function marketDashboard(){
    ensureTransferState();
    const draft=state.botTransferDraft;
    const outgoingUsed=new Set(draft.pairs.map(p=>p.outId));
    const incomingUsed=new Set(draft.pairs.map(p=>p.inSlug));
    return `<section class="screen market-screen"><div class="market-hero"><span class="eyebrow">END OF SEASON MARKET</span><h2>تغيير بوتات الفريق</h2><p>قبل بدء مباريات الموسم ${state.season} تستطيع تغيير حتى ثلاثة بوتات. اختر لاعبًا من فريقك ثم اختر البديل من السوق.</p><span class="market-counter">${draft.pairs.length} / 3 تغييرات</span></div><div class="market-columns"><article class="market-panel"><h3>بوتات SL7 FC</h3><p>اختر اللاعب الذي تريد الاستغناء عنه.</p><div class="market-grid">${state.bots.map(p=>`<button class="market-player ${draft.selectedOut===p.id?'selected':''} ${outgoingUsed.has(p.id)?'used':''}" onclick="sl7MarketPickOut('${esc(p.id)}')"><img src="${marketPortrait(p)}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><small>${esc((p.positions||[]).join(' / '))}</small></div><strong>${p.rating}</strong></button>`).join('')}</div></article><article class="market-panel"><h3>الخيارات المتاحة</h3><p>التقييم قريب من مستوى فريقك الحالي حتى يستمر التطور تراكميًا.</p><div class="market-grid">${draft.candidates.map(p=>`<button class="market-player ${incomingUsed.has(p.slug)?'used':''}" onclick="sl7MarketPickIn('${esc(p.slug)}')"><img src="${marketPortrait(p)}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><small>${esc((p.positions||[]).join(' / '))}</small></div><strong>${p.rating}</strong></button>`).join('')}</div></article></div><article class="card market-summary"><h3>التغييرات المختارة</h3>${draft.pairs.length?draft.pairs.map(p=>`<div class="market-pair"><span>${esc(p.outName)}</span><i>←</i><b>${esc(p.inName)}</b></div>`).join(''):'<div class="empty">لم تختر أي تغيير حتى الآن.</div>'}<div class="market-actions"><button class="btn ghost" onclick="sl7MarketUndo()">تراجع عن آخر تبديل</button><button class="btn primary" onclick="sl7FinishMarket()">تأكيد وبدء الموسم</button><button class="btn ghost" onclick="state.botTransferDraft.pairs=[];sl7FinishMarket()">تخطي بدون تغيير</button></div></article></section>`;
  }

  const originalDashboard=dashboard;
  dashboard=function(){
    ensureTransferState();
    if(state?.botTransferPending) return marketDashboard();
    return originalDashboard();
  };

  const originalEndSeason=endSeason;
  endSeason=function(reason){
    const endingSeason=state?.season||1;
    const finalCareer=endingSeason>=10;
    const result=originalEndSeason(reason);
    if(!state||finalCareer||state.careerComplete) return result;
    state.botTransferPending=true;
    state.botTransferFromSeason=endingSeason;
    state.botTransferDraft={selectedOut:null,pairs:[],candidates:makeMarketCandidates()};
    view='dashboard';
    save();
    render();
    toast('انتهى الموسم — تستطيع تغيير حتى 3 بوتات');
    return result;
  };

  const originalHistory=history;
  history=function(){
    ensureTransferState();
    let html=originalHistory();
    if(!state.botTransferHistory?.length) return html;
    const card=`<article class="card history-transfers"><div class="section-head"><h3>سجل تغييرات البوتات</h3><span>${state.botTransferHistory.length} موسم</span></div><div class="mini-list">${[...state.botTransferHistory].reverse().map(r=>`<div><span>بداية الموسم ${r.season}</span><b>${r.changes.map(c=>`${esc(c.out)} ← ${esc(c.in)}`).join(' · ')}</b></div>`).join('')}</div></article>`;
    return html.replace('<div class="stats premium-stats">',`${card}<div class="stats premium-stats">`);
  };

  ensureTransferState();
  try{save();render()}catch(error){console.error('SL7 season market and lineup patch',error)}
})();