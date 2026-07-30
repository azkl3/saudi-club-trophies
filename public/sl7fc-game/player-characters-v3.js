(()=>{
  if(window.__SL7_CHARACTERS_V3__) return;
  window.__SL7_CHARACTERS_V3__=true;

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
  ORDER.forEach(pos=>{
    pools[pos]=(POOL_SLUGS[pos]||[]).map(slug=>bySlug.get(slug)).filter(Boolean).slice(0,15);
  });
  window.SL7_POSITION_POOLS=pools;
  window.SL7_POSITION_COUNTS=Object.fromEntries(ORDER.map(pos=>[pos,pools[pos].length]));

  function esc(value){
    return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function hash(value){
    let h=2166136261;
    for(const c of String(value||'')){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}
    return Math.abs(h>>>0);
  }
  function localShuffle(items){
    const copy=[...items];
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}
    return copy;
  }
  function localRand(a,b){return Math.floor(Math.random()*(b-a+1))+a}

  const SKINS=['#f1c7a5','#dca77e','#c98d63','#b9764e','#9b5f3e','#7a482f','#5a3427'];
  const HAIRS=['#171513','#2c2019','#4b3525','#69482e','#080808','#5f5b57'];
  const BGS=[['#0e3328','#06120e'],['#183c31','#071612'],['#24342c','#07110e'],['#12392f','#08130f']];

  function characterSvg(player,mode='avatar',position=''){
    const name=player?.name||String(player||'لاعب');
    const key=hash(player?.slug||name);
    const wide=mode==='card';
    const w=wide?480:240,h=wide?640:240;
    const skin=SKINS[key%SKINS.length],hair=HAIRS[(key>>3)%HAIRS.length],bg=BGS[(key>>5)%BGS.length];
    const beard=(key%4)!==0,hairStyle=key%5,eyeGap=24+(key%8),jaw=76+(key%18),brow=(key%3)+2;
    const jersey='#0d3d30',gold='#d1ad5d',white='#f2f2ec';
    const faceY=wide?245:100,scale=wide?1.55:.72;
    const tx=wide?240:120;
    const shoulderY=wide?424:172;
    const labelPos=position||player?.positions?.[0]||'';
    const hairPath=[
      `M-70 -62 Q-48 -112 0 -105 Q55 -105 72 -55 Q48 -79 0 -80 Q-40 -80 -70 -62Z`,
      `M-75 -56 Q-65 -105 -12 -112 Q44 -120 78 -55 Q51 -75 15 -82 Q-30 -87 -75 -56Z`,
      `M-74 -58 Q-20 -125 75 -60 L62 -84 Q20 -118 -24 -99 Q-55 -86 -74 -58Z`,
      `M-70 -52 Q-70 -103 -20 -110 Q42 -118 75 -56 Q30 -78 -4 -78 Q-39 -78 -70 -52Z`,
      `M-74 -54 Q-37 -119 0 -114 Q43 -115 75 -54 Q40 -88 0 -88 Q-41 -88 -74 -54Z`
    ][hairStyle];
    const beardPath=beard?`<path d="M-${jaw/2} 36 Q-${jaw/2-5} 82 0 96 Q${jaw/2-5} 82 ${jaw/2} 36 Q24 64 0 70 Q-25 64 -${jaw/2} 36Z" fill="${hair}" opacity=".92"/>`:'';
    const moustache=beard?`<path d="M-26 31 Q-11 20 0 29 Q11 20 26 31 Q13 43 0 37 Q-13 43 -26 31Z" fill="${hair}" opacity=".9"/>`:'';
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
        <radialGradient id="halo"><stop stop-color="${gold}" stop-opacity=".32"/><stop offset="1" stop-color="${gold}" stop-opacity="0"/></radialGradient>
        <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#155744"/><stop offset="1" stop-color="#07251c"/></linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="9" stdDeviation="10" flood-color="#000" flood-opacity=".45"/></filter>
      </defs>
      <rect width="100%" height="100%" rx="${wide?34:0}" fill="url(#bg)"/>
      <circle cx="${tx}" cy="${wide?210:95}" r="${wide?205:110}" fill="url(#halo)"/>
      <g opacity=".09" stroke="${gold}"><path d="M0 ${h*.28} L${w} ${h*.06}M0 ${h*.48} L${w} ${h*.26}M0 ${h*.68} L${w} ${h*.46}"/></g>
      <g transform="translate(${tx} ${faceY}) scale(${scale})" filter="url(#shadow)">
        <path d="M-105 ${shoulderY/scale-faceY/scale+40} Q-85 105 -48 92 L-30 74 H30 L48 92 Q85 105 105 ${shoulderY/scale-faceY/scale+40} Z" fill="url(#shirt)"/>
        <path d="M-32 70 L0 102 L32 70 L22 60 H-22Z" fill="${white}"/>
        <path d="M-22 60 L0 82 L22 60 L15 52 H-15Z" fill="${jersey}"/>
        <path d="M-58 -32 Q-57 -83 0 -88 Q57 -83 58 -32 L52 30 Q45 79 0 83 Q-45 79 -52 30Z" fill="${skin}"/>
        <ellipse cx="-58" cy="5" rx="9" ry="18" fill="${skin}"/><ellipse cx="58" cy="5" rx="9" ry="18" fill="${skin}"/>
        <path d="${hairPath}" fill="${hair}"/>
        <path d="M-${eyeGap+14} -13 Q-${eyeGap} -${12+brow} -${eyeGap-13} -11" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
        <path d="M${eyeGap-13} -11 Q${eyeGap} -${12+brow} ${eyeGap+14} -13" fill="none" stroke="${hair}" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="-${eyeGap}" cy="1" rx="7" ry="4.5" fill="#fff" opacity=".86"/><ellipse cx="${eyeGap}" cy="1" rx="7" ry="4.5" fill="#fff" opacity=".86"/>
        <circle cx="-${eyeGap}" cy="2" r="2.8" fill="#171b18"/><circle cx="${eyeGap}" cy="2" r="2.8" fill="#171b18"/>
        <path d="M0 2 Q-5 20 -1 28 Q5 30 10 27" fill="none" stroke="#8e5139" stroke-width="3" stroke-linecap="round" opacity=".7"/>
        ${beardPath}${moustache}
        <path d="M-17 49 Q0 57 17 49" fill="none" stroke="#6d342b" stroke-width="4" stroke-linecap="round"/>
        <path d="M-94 126 Q0 93 94 126 L104 180 H-104Z" fill="url(#shirt)"/>
        <path d="M-30 118 L0 144 L30 118" fill="none" stroke="${white}" stroke-width="8"/>
        <path d="M-76 130 L-63 157 L-50 130" fill="none" stroke="${gold}" stroke-width="3" opacity=".8"/>
        <text x="69" y="151" text-anchor="middle" fill="${gold}" font-size="16" font-weight="900" font-family="Arial">SL7</text>
      </g>
      ${wide?`<g font-family="Arial,sans-serif"><rect x="24" y="24" width="76" height="38" rx="19" fill="#06120e" stroke="${gold}" stroke-opacity=".55"/><text x="62" y="50" text-anchor="middle" fill="${gold}" font-size="18" font-weight="900">${esc(labelPos)}</text><text x="240" y="560" text-anchor="middle" fill="#fff" font-size="34" font-weight="900">${esc(name)}</text><text x="240" y="595" text-anchor="middle" fill="${gold}" font-size="14" letter-spacing="4">SL7 FC CHARACTER</text></g>`:''}
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
  window.sl7CharacterPortrait=characterSvg;
  window.hydrateSL7Faces=async()=>{};

  function getMeta(p){return bySlug.get(p?.slug)||byName.get(p?.name)||p||{name:'لاعب',positions:['ANY']}}

  function balancedBots(){
    const quotas=[['GK',2],['CB',4],['LB',2],['RB',2],['CDM',2],['CM',2],['CAM',2],['LW',2],['RW',2],['ST',2]];
    const chosen=[],used=new Set();
    for(const [position,count] of quotas){
      const candidates=localShuffle((pools[position]||[]).filter(p=>!used.has(p.slug)));
      candidates.slice(0,count).forEach(p=>{used.add(p.slug);chosen.push(p)});
    }
    if(chosen.length<22){
      const all=localShuffle(ORDER.flatMap(pos=>pools[pos]).filter(p=>p&&!used.has(p.slug)));
      all.slice(0,22-chosen.length).forEach(p=>{used.add(p.slug);chosen.push(p)});
    }
    return chosen.map((p,i)=>({
      id:`bot-${p.slug}-${i}`,slug:p.slug,name:p.name,nameEn:p.nameEn,country:p.country,
      positions:p.positions,rating:localRand(46,55),potential:localRand(74,89),apps:0,goals:0,assists:0,form:0
    }));
  }
  if(typeof makeBots==='function') makeBots=balancedBots;

  if(typeof state!=='undefined'&&state){
    const currentByName=new Map((state.bots||[]).map(p=>[p.name,p]));
    if(state.botPoolVersion!==3){
      state.bots=balancedBots().map(p=>currentByName.has(p.name)?{...p,...currentByName.get(p.name),slug:p.slug,positions:p.positions}:p);
      state.botPoolVersion=3;
      try{save()}catch{}
    }else{
      state.bots=(state.bots||[]).map(p=>{const meta=getMeta(p);return meta?.slug?{...p,slug:meta.slug,nameEn:meta.nameEn,country:meta.country,positions:p.positions||meta.positions}:p});
    }
  }

  if(typeof playerTile==='function'){
    playerTile=function(p,type){
      const meta=getMeta(p),src=characterSvg(meta,'card',p.positions?.[0]);
      return `<div class="player-tile with-photo character-edition"><div class="player-rating">${p.rating}</div><div class="player-photo-wrap"><img class="player-photo character-photo" src="${src}" alt="${esc(p.name)}" loading="lazy"></div><div class="player-card-copy"><b>${esc(p.name)}</b><small>${(p.positions||[]).join(' / ')} · ${type}</small><em>${p.apps||0} مباراة · ${p.goals||0} هدف</em><span class="player-source">${esc(meta.country||'Saudi League')}</span></div></div>`;
    };
  }

  if(typeof pitch==='function'){
    pitch=function(lineup){
      return `<div class="pitch"><div class="pitch-lines"><i class="center-circle"></i><i class="half-line"></i><i class="box top"></i><i class="box bottom"></i></div>${lineup.map(p=>{
        const meta=getMeta(p),src=characterSvg(meta,'avatar',p.slot||p.positions?.[0]);
        return `<div class="pitch-player ${p.type==='ثابت'?'fixed':'bot'}" style="left:${p.x}%;top:${p.y}%"><span class="shirt has-avatar character-shirt"><img class="player-avatar-mini" src="${src}" alt="${esc(p.name)}"><i class="mini-rating">${p.rating}</i></span><b>${typeof shortName==='function'?shortName(p.name):esc(p.name)}</b><small>${p.slot}</small></div>`;
      }).join('')}</div>`;
    };
  }

  window.__sl7PoolPos=window.__sl7PoolPos||'GK';
  window.sl7SetPoolPosition=pos=>{
    if(!pools[pos]) return;
    window.__sl7PoolPos=pos;
    document.querySelectorAll('[data-pool-pos]').forEach(el=>el.classList.toggle('active',el.dataset.poolPos===pos));
    document.querySelectorAll('[data-pool-tab]').forEach(el=>el.classList.toggle('active',el.dataset.poolTab===pos));
  };

  function poolLibrary(){
    const active=window.__sl7PoolPos||'GK';
    const tabs=ORDER.map(pos=>`<button class="pool-tab ${pos===active?'active':''}" data-pool-tab="${pos}" onclick="sl7SetPoolPosition('${pos}')"><b>${pos}</b><small>15</small></button>`).join('');
    const sections=ORDER.map(pos=>`<div class="character-pool-grid ${pos===active?'active':''}" data-pool-pos="${pos}">${(pools[pos]||[]).map((p,index)=>`<article class="character-pool-player"><div class="pool-rank">${String(index+1).padStart(2,'0')}</div><img src="${characterSvg(p,'card',pos)}" alt="${esc(p.name)}" loading="lazy"><div><b>${esc(p.name)}</b><span>${LABELS[pos]}</span><small>${esc(p.country||'')}</small></div></article>`).join('')}</div>`).join('');
    return `<article class="card character-library"><div class="section-head big"><div><span class="eyebrow">BOT PLAYER POOL</span><h2>مكتبة البوتات المعتمدة</h2><p>15 لاعبًا لكل مركز · 150 بطاقة مركزية · شخصيات لعبة موحّدة</p></div><span class="pool-total">150</span></div><div class="pool-tabs">${tabs}</div>${sections}<div class="pool-disclaimer">صور النسخة التجريبية شخصيات لعبة مولّدة بصريًا داخل الموقع، وليست صورًا فوتوغرافية للاعبين.</div></article>`;
  }

  if(typeof squad==='function'){
    const previousSquad=squad;
    squad=function(){
      const html=previousSquad();
      return html.replace(/<\/section>\s*$/,`${poolLibrary()}</section>`);
    };
  }

  if(typeof render==='function'){
    const previousRender=render;
    render=function(){previousRender();setTimeout(()=>window.sl7SetPoolPosition(window.__sl7PoolPos||'GK'),0)};
  }

  try{render()}catch{}
})();
