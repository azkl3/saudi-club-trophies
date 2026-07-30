(()=>{
  const PLAYERS = [
    ['marcelo-grohe','مارسيلو غروهي','Marcelo Grohe',['GK'],'Brazil'],
    ['brad-jones','براد جونز','Brad Jones',['GK'],'Australia'],
    ['vladimir-stojkovic','فلاديمير ستويكوفيتش','Vladimir Stojkovic',['GK'],'Serbia'],
    ['rais-mbolhi','رايس مبولحي','Rais Mbolhi',['GK'],'Algeria'],
    ['mailson','مايلسون','Mailson',['GK'],'Brazil'],
    ['cassio-angus','كاسيو أنجوس','Cassio Anjos',['GK'],'Brazil'],
    ['ahmed-hegazi','أحمد حجازي','Ahmed Hegazi',['CB'],'Egypt'],
    ['bruno-uvini','برونو أوفيني','Bruno Uvini',['CB'],'Brazil'],
    ['jang-hyun-soo','جانغ هيون سو','Jang Hyun-soo',['CB'],'South Korea'],
    ['alberto-botia','ألبرتو بوتيا','Alberto Botia',['CB'],'Spain'],
    ['igor-rossi','إيغور روسي','Igor Rossi',['CB'],'Brazil'],
    ['lisandro-lopez','ليساندرو لوبيز','Lisandro Lopez',['CB'],'Argentina'],
    ['maicon','مايكون','Maicon',['CB'],'Brazil'],
    ['naldo','نالدو','Naldo',['CB'],'Brazil'],
    ['roger-ibanez','روجر إيبانيز','Roger Ibanez',['CB'],'Brazil'],
    ['ghislain-konan','كونان','Ghislain Konan',['LB'],'Ivory Coast'],
    ['lucas-lima','لوكاس ليما','Lucas Lima',['LB'],'Brazil'],
    ['renan-lodi','رينان لودي','Renan Lodi',['LB'],'Brazil'],
    ['joao-cancelo','جواو كانسيلو','Joao Cancelo',['RB','LB'],'Portugal'],
    ['mario-mitaj','ماريو ميتاي','Mario Mitaj',['LB','RB'],'Albania'],
    ['ever-banega','إيفر بانيغا','Ever Banega',['CM','CDM','CAM'],'Argentina'],
    ['petros','بيتروس','Petros',['CDM','CM'],'Brazil'],
    ['josef-de-souza','جوزيف دي سوزا','Josef de Souza',['CDM','CM'],'Brazil'],
    ['karim-el-ahmadi','كريم الأحمدي','Karim El Ahmadi',['CDM','CM'],'Morocco'],
    ['gustavo-cuellar','جوستافو كويلار','Gustavo Cuellar',['CDM','CM'],'Colombia'],
    ['anselmo','أنسيلمو','Anselmo',['CDM','CM'],'Brazil'],
    ['victor-ayala','فيكتور أيالا','Victor Ayala',['CM','CAM'],'Paraguay'],
    ['giuliano','جوليانو','Giuliano',['CAM','CM'],'Brazil'],
    ['carlos-eduardo','كارلوس إدواردو','Carlos Eduardo',['CAM','CM'],'Brazil'],
    ['matheus-pereira','ماتيوس بيريرا','Matheus Pereira',['CAM','RW'],'Brazil'],
    ['cristian-guanca','كريستيان جوانكا','Cristian Guanca',['CAM','RW'],'Argentina'],
    ['sebastian-giovinco','سيباستيان جيوفينكو','Sebastian Giovinco',['CAM','ST'],'Italy'],
    ['luciano-vietto','لوسيانو فييتو','Luciano Vietto',['CAM','ST'],'Argentina'],
    ['nordin-amrabat','نور الدين أمرابط','Nordin Amrabat',['RW','LW'],'Morocco'],
    ['andre-carrillo','أندريه كاريلو','Andre Carrillo',['RW','LW'],'Peru'],
    ['helder-costa','هيلدر كوستا','Helder Costa',['RW','LW'],'Angola'],
    ['musa-barrow','موسى بارو','Musa Barrow',['LW','ST'],'Gambia'],
    ['djaniny','دجانيني','Djaniny',['ST','LW'],'Cape Verde'],
    ['romarinho','رومارينهو','Romarinho',['ST','RW'],'Brazil'],
    ['bafetimbi-gomis','بافيتيمبي غوميز','Bafetimbi Gomis',['ST'],'France'],
    ['abderrazak-hamdallah','عبدالرزاق حمدالله','Abderrazak Hamdallah',['ST'],'Morocco'],
    ['anderson-talisca','أندرسون تاليسكا','Anderson Talisca',['CAM','ST'],'Brazil'],
    ['omar-al-somah','عمر السومة','Omar Al-Somah',['ST'],'Syria'],
    ['aleksandar-prijovic','ألكسندر بريجوفيتش','Aleksandar Prijovic',['ST'],'Serbia'],
    ['carlos-strandberg','كارلوس ستراندبيرغ','Carlos Strandberg',['ST'],'Sweden'],
    ['leandre-tawamba','لياندر تاوامبا','Leandre Tawamba',['ST'],'Cameroon'],
    ['youssef-el-arabi','يوسف العربي','Youssef El-Arabi',['ST'],'Morocco'],
    ['moussa-marega','موسى ماريغا','Moussa Marega',['ST','RW'],'Mali'],
    ['mbaye-diagne','مباي دياني','Mbaye Diagne',['ST'],'Senegal'],
    ['vincent-aboubakar','فنسنت أبوبكر','Vincent Aboubakar',['ST'],'Cameroon'],
    ['odion-ighalo','إيغالو','Odion Ighalo',['ST'],'Nigeria'],
    ['fernando-martinez','فيرناندو مارتينيز','Fernando Martinez',['ST'],'Spain'],
    ['mahmoud-kahraba','كهربا','Mahmoud Kahraba',['RW','ST'],'Egypt'],
    ['abdelmoumene-djabou','عبدالمؤمن جابو','Abdelmoumene Djabou',['CAM','RW'],'Algeria']
  ].map(([slug,name,nameEn,positions,country])=>({
    slug,name,nameEn,positions,country,
    images:{
      base:`assets/players/${slug}/base.webp`,
      card:`assets/players/${slug}/card.webp`,
      avatar:`assets/players/${slug}/avatar.webp`,
      transparent:`assets/players/${slug}/transparent.webp`
    }
  }));

  window.SL7_FOREIGN_PLAYER_CATALOG = PLAYERS;
  const byName = new Map(PLAYERS.map(p=>[p.name,p]));

  function initials(name){
    return String(name||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('');
  }
  function escapeHtml(value){
    return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function fallbackData(name,mode='avatar'){
    const wide=mode==='card',w=wide?480:180,h=wide?640:180,size=wide?72:46;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#194b3b"/><stop offset="1" stop-color="#061712"/></linearGradient><radialGradient id="r"><stop stop-color="#d3b56c" stop-opacity=".28"/><stop offset="1" stop-color="#d3b56c" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="50%" cy="28%" r="44%" fill="url(#r)"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#e8d08b" font-family="Arial,sans-serif" font-size="${size}" font-weight="900">${escapeHtml(initials(name))}</text><text x="50%" y="88%" text-anchor="middle" fill="#ffffff" fill-opacity=".34" font-family="Arial,sans-serif" font-size="${wide?19:0}" letter-spacing="4">SL7 FC</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
  window.sl7ImgFallback = (img,name,mode='avatar')=>{
    if(!img||img.dataset.fallbackApplied)return;
    img.dataset.fallbackApplied='1';
    img.src=fallbackData(name,mode);
  };
  function enrichBot(bot){
    const meta=byName.get(bot.name);
    return meta?{...bot,slug:meta.slug,nameEn:meta.nameEn,country:meta.country,images:meta.images}:bot;
  }

  if(typeof FOREIGN!=='undefined'){
    FOREIGN.splice(0,FOREIGN.length,...PLAYERS.map(p=>[p.name,p.positions,p]));
  }
  if(typeof makeBots==='function'){
    makeBots=function(){
      return shuffle(PLAYERS).slice(0,22).map((p,i)=>({
        id:`bot-${p.slug}-${i}`,
        slug:p.slug,
        name:p.name,
        nameEn:p.nameEn,
        country:p.country,
        positions:p.positions,
        images:p.images,
        rating:rand(46,55),
        potential:rand(74,89),
        apps:0,goals:0,assists:0,form:0
      }));
    };
  }
  if(typeof state!=='undefined'&&state?.bots){
    state.bots=state.bots.map(enrichBot);
    try{save()}catch{}
  }
  if(typeof playerTile==='function'){
    playerTile=function(p,type){
      const meta=byName.get(p.name),images=p.images||meta?.images;
      const src=images?.card||fallbackData(p.name,'card');
      return `<div class="player-tile with-photo"><div class="player-rating">${p.rating}</div><div class="player-photo-wrap"><img class="player-photo" src="${src}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="sl7ImgFallback(this,'${escapeHtml(p.name)}','card')"></div><div class="player-card-copy"><b>${escapeHtml(p.name)}</b><small>${p.positions.join(' / ')} · ${type}</small><em>${p.apps||0} مباراة · ${p.goals||0} هدف</em><span class="player-source">${escapeHtml(p.country||meta?.country||'')}</span></div></div>`;
    };
  }
  if(typeof pitch==='function'){
    pitch=function(lineup){
      return `<div class="pitch"><div class="pitch-lines"><i class="center-circle"></i><i class="half-line"></i><i class="box top"></i><i class="box bottom"></i></div>${lineup.map(p=>{
        const meta=byName.get(p.name),images=p.images||meta?.images,src=images?.avatar||fallbackData(p.name,'avatar');
        return `<div class="pitch-player ${p.type==='ثابت'?'fixed':'bot'}" style="left:${p.x}%;top:${p.y}%"><span class="shirt has-avatar"><img class="player-avatar-mini" src="${src}" alt="${escapeHtml(p.name)}" onerror="sl7ImgFallback(this,'${escapeHtml(p.name)}','avatar')"><i class="mini-rating">${p.rating}</i></span><b>${shortName(p.name)}</b><small>${p.slot}</small></div>`;
      }).join('')}</div>`;
    };
  }
  if(typeof render==='function'){
    try{render()}catch{}
  }
})();
