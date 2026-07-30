(()=>{
  if(window.__SL7_CHARACTERS_V4__) return;
  window.__SL7_CHARACTERS_V4__=true;

  const ORDER=['GK','RB','CB','LB','CDM','CM','CAM','RW','LW','ST'];
  const LABELS={GK:'حراس المرمى',RB:'ظهير أيمن',CB:'قلب دفاع',LB:'ظهير أيسر',CDM:'محور دفاعي',CM:'وسط',CAM:'صانع لعب',RW:'جناح أيمن',LW:'جناح أيسر',ST:'مهاجم'};
  const POOL_SLUGS={
    GK:['marcelo-grohe','david-ospina','yassine-bounou','edouard-mendy','koen-casteels','bento','predrag-rajkovic','marek-rodak','milan-borjan','paulo-victor','moustapha-zeghba','ibrahim-sehic','mailson','vladimir-stojkovic','farouk-ben-mustapha'],
    RB:['joao-cancelo','junior-caicara','marcelo-goiano','nahitan-nandez','hamari-traore','ivan-tomecak','daniel-opare','mokhtar-belkhiter','youssouf-sabaly','mohamed-simakan','nacho-fernandez','fabiano-leismann','ramon-arias','paulo-diaz','luiz-felipe'],
    CB:['kalidou-koulibaly','aymeric-laporte','merih-demiral','luiz-felipe','jason-denayer','romain-saiss','marwane-saadane','farouk-chafai','iago-santos','andrei-burca','mohammed-salisu','nacho-fernandez','mohamed-simakan','ahmed-hegazi','roger-ibanez'],
    LB:['alex-telles','ezgjan-alioski','nuno-sequeira','pedro-rebocho','hamza-mendyl','theo-hernandez','rayan-ait-nouri','mohamed-abdel-shafy','hussein-el-sayed','ruben-lima','cristian-ganea','aaron-martin','romain-saiss','francisco-calvo','renan-lodi'],
    CDM:['marcelo-brozovic','ngolo-kante','fabinho','ruben-neves','franck-kessie','seko-fofana','grzegorz-krychowiak','tarek-hamed','luiz-gustavo','alfred-ndiaye','nemanja-gudelj','sandro-manoel','petros','gustavo-cuellar','karim-el-ahmadi'],
    CM:['sergej-milinkovic-savic','georginio-wijnaldum','sofiane-bendebka','otavio','houssem-aouar','gabri-veiga','enzo-millot','cameron-puertas','filip-kiss','brahian-aleman','adrien-silva','haris-medunjanin','ever-banega','franck-kessie','ruben-neves'],
    CAM:['elton','jehad-al-hussien','carlos-villanueva','kaku','alejandro-pozuelo','christian-cueva','luis-jimenez','mbark-boussoufa','saad-bguir','cristian-guanca','giuliano','carlos-eduardo','matheus-pereira','luciano-vietto','anderson-talisca'],
    RW:['riyad-mahrez','moussa-diaby','malcom','mohammed-fouzair','danilo-asprilla','iury-medeiros','amine-bassi','nordin-amrabat','andre-carrillo','helder-costa','romarinho','jota','allan-saint-maximin','sadio-mane','cristian-tello'],
    LW:['sadio-mane','neymar','allan-saint-maximin','jota','garry-rodrigues','cristian-tello','fashion-sakala','steven-bergwijn','yannick-carrasco','ibrahima-ndiaye','toko-ekambi','youssef-msakni','achraf-bencharki','ahmed-musa','musa-barrow'],
    ST:['cristiano-ronaldo','karim-benzema','aleksandar-mitrovic','roberto-firmino','pierre-emerick-aubameyang','moussa-dembele','ivan-toney','marcos-leonardo','mateo-retegui','carlos-junior','romarinho','bafetimbi-gomis','abderrazak-hamdallah','omar-al-somah','moussa-marega']
  };

  const catalog=Array.isArray(window.SL7_FOREIGN_PLAYER_CATALOG)?window.SL7_FOREIGN_PLAYER_CATALOG:[];
  const bySlug=new Map(catalog.map(p=>[p.slug,p]));
  const byName=new Map(catalog.map(p=>[p.name,p]));
  const pools={};
  ORDER.forEach(pos=>{pools[pos]=(POOL_SLUGS[pos]||[]).map(slug=>bySlug.get(slug)).filter(Boolean).slice(0,15)});
  window.SL7_POSITION_POOLS=pools;
  window.SL7_POSITION_COUNTS=Object.fromEntries(ORDER.map(pos=>[pos,pools[pos].length]));

  const esc=value=>String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  function hash(value){let h=2166136261;for(const c of String(value||'')){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
  function localShuffle(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
  const localRand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const SKINS=['#f1c7a5','#dca77e','#c98d63','#b9764e','#9b5f3e','#7a482f','#5a3427'];
  const HAIRS=['#171513','#2c2019','#4b3525','#69482e','#080808','#5f5b57'];
  const BGS=[['#0e3328','#06120e'],['#183c31','#071612'],['#24342c','#07110e'],['#12392f','#08130f']];

  function fallbackPortrait(name,mode='avatar',position=''){
    const wide=mode==='card',w=wide?480:240,h=wide?640:240;
    const initials=String(name||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#174a39"/><stop offset="1" stop-color="#061712"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="50%" cy="38%" r="31%" fill="#d3b56c" fill-opacity=".14"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#e8d08b" font-family="Arial" font-size="${wide?78:54}" font-weight="900">${esc(initials)}</text>${wide?`<text x="50%" y="88%" text-anchor="middle" fill="#fff" font-family="Arial" font-size="28" font-weight="900">${esc(name)}</text><text x="50%" y="94%" text-anchor="middle" fill="#d3b56c" font-family="Arial" font-size="15">${esc(position)}</text>`:''}</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function characterSvg(player,mode='avatar',position=''){
    try{
      const name=player?.name||String(player||'لاعب'),key=hash(player?.slug||name),wide=mode==='card';
      const w=wide?480:240,h=wide?640:240;
      const skin=SKINS[key%SKINS.length];
      const hair=HAIRS[Math.floor(key/8)%HAIRS.length];
      const bg=BGS[Math.floor(key/32)%BGS.length];
      const beard=(key%4)!==0,hairStyle=key%4,eyeGap=24+(key%8),label=position||player?.positions?.[0]||'';
      const hairPaths=[
        'M-70 -58 Q-48 -112 0 -105 Q55 -105 72 -55 Q48 -79 0 -80 Q-40 -80 -70 -58Z',
        'M-75 -54 Q-65 -105 -12 -112 Q44 -120 78 -53 Q51 -75 15 -82 Q-30 -87 -75 -54Z',
        'M-74 -56 Q-20 -125 75 -58 L62 -84 Q20 -118 -24 -99 Q-55 -86 -74 -56Z',
        'M-70 -50 Q-70 -103 -20 -110 Q42 -118 75 -54 Q30 -78 -4 -78 Q-39 -78 -70 -50Z'
      ];
      const tx=wide?240:120,ty=wide?245:102,scale=wide?1.55:.72,gold='#d1ad5d';
      const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient><radialGradient id="halo"><stop stop-color="${gold}" stop-opacity=".3"/><stop offset="1" stop-color="${gold}" stop-opacity="0"/></radialGradient><linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#155744"/><stop offset="1" stop-color="#07251c"/></linearGradient></defs><rect width="100%" height="100%" rx="${wide?34:0}" fill="url(#bg)"/><circle cx="${tx}" cy="${wide?210:96}" r="${wide?205:110}" fill="url(#halo)"/><g transform="translate(${tx} ${ty}) scale(${scale})"><path d="M-105 170 Q-86 104 -48 92 L-28 72 H28 L48 92 Q86 104 105 170Z" fill="url(#shirt)"/><path d="M-58 -32 Q-57 -83 0 -88 Q57 -83 58 -32 L52 30 Q45 79 0 83 Q-45 79 -52 30Z" fill="${skin}"/><ellipse cx="-58" cy="5" rx="9" ry="18" fill="${skin}"/><ellipse cx="58" cy="5" rx="9" ry="18" fill="${skin}"/><path d="${hairPaths[hairStyle]}" fill="${hair}"/><path d="M-${eyeGap+14} -13 Q-${eyeGap} -16 -${eyeGap-13} -11M${eyeGap-13} -11 Q${eyeGap} -16 ${eyeGap+14} -13" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/><ellipse cx="-${eyeGap}" cy="1" rx="7" ry="4.5" fill="#fff"/><ellipse cx="${eyeGap}" cy="1" rx="7" ry="4.5" fill="#fff"/><circle cx="-${eyeGap}" cy="2" r="2.8" fill="#171b18"/><circle cx="${eyeGap}" cy="2" r="2.8" fill="#171b18"/><path d="M0 2 Q-5 20 -1 28 Q5 30 10 27" fill="none" stroke="#8e5139" stroke-width="3"/>${beard?`<path d="M-38 36 Q-32 82 0 96 Q32 82 38 36 Q24 64 0 70 Q-25 64 -38 36Z" fill="${hair}" opacity=".9"/><path d="M-26 31 Q-11 20 0 29 Q11 20 26 31 Q13 43 0 37 Q-13 43 -26 31Z" fill="${hair}"/>`:''}<path d="M-17 49 Q0 57 17 49" fill="none" stroke="#6d342b" stroke-width="4"/><path d="M-94 126 Q0 93 94 126 L104 180 H-104Z" fill="url(#shirt)"/><path d="M-30 118 L0 144 L30 118" fill="none" stroke="#f2f2ec" stroke-width="8"/><text x="69" y="151" text-anchor="middle" fill="${gold}" font-size="16" font-weight="900" font-family="Arial">SL7</text></g>${wide?`<g font-family="Arial"><rect x="24" y="24" width="76" height="38" rx="19" fill="#06120e" stroke="${gold}"/><text x="62" y="50" text-anchor="middle" fill="${gold}" font-size="18" font-weight="900">${esc(label)}</text><text x="240" y="560" text-anchor="middle" fill="#fff" font-size="34" font-weight="900">${esc(name)}</text><text x="240" y="595" text-anchor="middle" fill="${gold}" font-size="14" letter-spacing="4">SL7 FC CHARACTER</text></g>`:''}</svg>`;
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    }catch(error){console.error('SL7 portrait fallback',error);return fallbackPortrait(player?.name||player,mode,position)}
  }

  window.sl7CharacterPortrait=characterSvg;
  window.hydrateSL7Faces=async()=>{};
  const getMeta=p=>bySlug.get(p?.slug)||byName.get(p?.name)||p||{name:'لاعب',positions:['ANY']};

  function balancedBots(){
    const quotas=[['GK',2],['CB',4],['LB',2],['RB',2],['CDM',2],['CM',2],['CAM',2],['LW',2],['RW',2],['ST',2]],chosen=[],used=new Set();
    for(const [position,count] of quotas){const candidates=localShuffle((pools[position]||[]).filter(p=>!used.has(p.slug)));candidates.slice(0,count).forEach(p=>{used.add(p.slug);chosen.push(p)})}
    if(chosen.length<22){localShuffle(ORDER.flatMap(pos=>pools[pos]).filter(p=>p&&!used.has(p.slug))).slice(0,22-chosen.length).forEach(p=>chosen.push(p))}
    return chosen.map((p,i)=>({id:`bot-${p.slug}-${i}`,slug:p.slug,name:p.name,nameEn:p.nameEn,country:p.country,positions:p.positions,rating:localRand(46,55),potential:localRand(74,89),apps:0,goals:0,assists:0,form:0}));
  }
  if(typeof makeBots==='function') makeBots=balancedBots;
  if(typeof state!=='undefined'&&state){
    const current=new Map((state.bots||[]).map(p=>[p.name,p]));
    if(state.botPoolVersion!==4){state.bots=balancedBots().map(p=>current.has(p.name)?{...p,...current.get(p.name),slug:p.slug,positions:p.positions}:p);state.botPoolVersion=4;try{save()}catch{}}
  }

  if(typeof playerTile==='function') playerTile=function(p,type){const meta=getMeta(p),src=characterSvg(meta,'card',p.positions?.[0]);return `<div class="player-tile with-photo character-edition"><div class="player-rating">${p.rating}</div><div class="player-photo-wrap"><img class="player-photo character-photo" src="${src}" alt="${esc(p.name)}" loading="lazy"></div><div class="player-card-copy"><b>${esc(p.name)}</b><small>${(p.positions||[]).join(' / ')} · ${type}</small><em>${p.apps||0} مباراة · ${p.goals||0} هدف</em><span class="player-source">${esc(meta.country||'Saudi League')}</span></div></div>`};

  if(typeof pitch==='function') pitch=function(lineup){return `<div class="pitch"><div class="pitch-lines"><i class="center-circle"></i><i class="half-line"></i><i class="box top"></i><i class="box bottom"></i></div>${lineup.map(p=>{const meta=getMeta(p),src=characterSvg(meta,'avatar',p.slot||p.positions?.[0]);return `<div class="pitch-player ${p.type==='ثابت'?'fixed':'bot'}" style="left:${p.x}%;top:${p.y}%"><span class="shirt has-avatar character-shirt"><img class="player-avatar-mini" src="${src}" alt="${esc(p.name)}"><i class="mini-rating">${p.rating}</i></span><b>${typeof shortName==='function'?shortName(p.name):esc(p.name)}</b><small>${p.slot}</small></div>`}).join('')}</div>`};

  window.__sl7PoolPos=window.__sl7PoolPos||'GK';
  window.sl7SetPoolPosition=pos=>{if(!pools[pos])return;window.__sl7PoolPos=pos;document.querySelectorAll('[data-pool-pos]').forEach(el=>el.classList.toggle('active',el.dataset.poolPos===pos));document.querySelectorAll('[data-pool-tab]').forEach(el=>el.classList.toggle('active',el.dataset.poolTab===pos))};
  function poolLibrary(){const active=window.__sl7PoolPos||'GK';const tabs=ORDER.map(pos=>`<button class="pool-tab ${pos===active?'active':''}" data-pool-tab="${pos}" onclick="sl7SetPoolPosition('${pos}')"><b>${pos}</b><small>15</small></button>`).join('');const sections=ORDER.map(pos=>`<div class="character-pool-grid ${pos===active?'active':''}" data-pool-pos="${pos}">${(pools[pos]||[]).map((p,index)=>`<article class="character-pool-player"><div class="pool-rank">${String(index+1).padStart(2,'0')}</div><img src="${characterSvg(p,'card',pos)}" alt="${esc(p.name)}" loading="lazy"><div><b>${esc(p.name)}</b><span>${LABELS[pos]}</span><small>${esc(p.country||'')}</small></div></article>`).join('')}</div>`).join('');return `<article class="card character-library"><div class="section-head big"><div><span class="eyebrow">BOT PLAYER POOL</span><h2>مكتبة البوتات المعتمدة</h2><p>15 لاعبًا لكل مركز · 150 بطاقة مركزية · شخصيات لعبة موحّدة</p></div><span class="pool-total">150</span></div><div class="pool-tabs">${tabs}</div>${sections}<div class="pool-disclaimer">شخصيات لعبة مولّدة بصريًا داخل الموقع وليست صورًا فوتوغرافية.</div></article>`}
  if(typeof squad==='function'){const previousSquad=squad;squad=function(){const html=previousSquad();return html.replace(/<\/section>\s*$/,`${poolLibrary()}</section>`)}}
  if(typeof render==='function'){const previousRender=render;render=function(){previousRender();setTimeout(()=>window.sl7SetPoolPosition(window.__sl7PoolPos||'GK'),0)}}

  const originalResolve=window.resolveEvent;
  if(typeof originalResolve==='function') window.resolveEvent=function(index){try{return originalResolve(index)}catch(error){console.error('SL7 event transition recovered',error);try{if(typeof pending!=='undefined'&&pending)pending.eventResolved=true;if(typeof view!=='undefined')view='prematch';if(typeof render==='function')render();if(typeof save==='function')save()}catch(second){console.error(second)}return false}};
  try{render()}catch(error){console.error('SL7 initial render recovered',error)}
})();