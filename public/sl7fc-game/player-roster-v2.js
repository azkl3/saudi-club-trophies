(()=>{
  if(window.__SL7_ROSTER_V2__) return;
  window.__SL7_ROSTER_V2__=true;

  const EXTRA=[
    ['david-ospina','دافيد أوسبينا','David Ospina',['GK'],'Colombia'],
    ['yassine-bounou','ياسين بونو','Yassine Bounou',['GK'],'Morocco'],
    ['edouard-mendy','إدوارد ميندي','Edouard Mendy',['GK'],'Senegal'],
    ['koen-casteels','كوين كاستيلس','Koen Casteels',['GK'],'Belgium'],
    ['bento','بينتو','Bento Matheus Krepski',['GK'],'Brazil'],
    ['predrag-rajkovic','بريدراج رايكوفيتش','Predrag Rajkovic',['GK'],'Serbia'],
    ['marek-rodak','ماريك روداك','Marek Rodak',['GK'],'Slovakia'],
    ['milan-borjan','ميلان بورجان','Milan Borjan',['GK'],'Canada'],
    ['paulo-victor','باولو فيكتور','Paulo Victor goalkeeper',['GK'],'Brazil'],
    ['moustapha-zeghba','مصطفى زغبة','Moustapha Zeghba',['GK'],'Algeria'],
    ['silviu-lung-jr','سيلفيو لونغ جونيور','Silviu Lung Jr.',['GK'],'Romania'],
    ['jacob-rinne','ياكوب ريني','Jacob Rinne',['GK'],'Sweden'],
    ['ibrahim-sehic','إبراهيم شيهيتش','Ibrahim Sehic',['GK'],'Bosnia and Herzegovina'],
    ['andre-moreira','أندريه موريرا','Andre Moreira goalkeeper',['GK'],'Portugal'],
    ['farouk-ben-mustapha','فاروق بن مصطفى','Farouk Ben Mustapha',['GK'],'Tunisia'],
    ['devis-epassy','ديفيس إيباسي','Devis Epassy',['GK'],'Cameroon'],
    ['luis-maximiano','لويس ماكسيميانو','Luis Maximiano',['GK'],'Portugal'],

    ['kalidou-koulibaly','كاليدو كوليبالي','Kalidou Koulibaly',['CB'],'Senegal'],
    ['aymeric-laporte','إيمريك لابورت','Aymeric Laporte',['CB'],'Spain'],
    ['merih-demiral','ميريح ديميرال','Merih Demiral',['CB'],'Turkey'],
    ['luiz-felipe','لويز فيليبي','Luiz Felipe footballer 1997',['CB','RB'],'Italy'],
    ['jason-denayer','جيسون ديناير','Jason Denayer',['CB'],'Belgium'],
    ['jack-hendry','جاك هندري','Jack Hendry',['CB','RB'],'Scotland'],
    ['romain-saiss','رومان سايس','Romain Saiss',['CB','LB'],'Morocco'],
    ['marwane-saadane','مروان سعدان','Marwane Saadane',['CB','CDM'],'Morocco'],
    ['farouk-chafai','فاروق شافعي','Farouk Chafai',['CB'],'Algeria'],
    ['iago-santos','إياغو سانتوس','Iago Santos',['CB'],'Brazil'],
    ['dankler','دانكلير','Dankler',['CB','RB'],'Brazil'],
    ['aderllan-santos','أديرلان سانتوس','Aderllan Santos',['CB','RB'],'Brazil'],
    ['ricardo-machado','ريكاردو ماتشادو','Ricardo Machado footballer',['CB'],'Portugal'],
    ['sergio-vittor','سيرجيو فيتور','Sergio Vittor',['CB','CDM'],'Argentina'],
    ['andrei-burca','أندريه بوركا','Andrei Burca',['CB'],'Romania'],
    ['francisco-calvo','فرانسيسكو كالفو','Francisco Calvo',['CB','LB'],'Costa Rica'],
    ['norbert-gyomber','نوربرت غيومبر','Norbert Gyomber',['CB'],'Slovakia'],
    ['mohammed-salisu','محمد ساليسو','Mohammed Salisu',['CB'],'Ghana'],
    ['nacho-fernandez','ناتشو فيرنانديز','Nacho Fernandez footballer',['CB','RB','LB'],'Spain'],
    ['mohamed-simakan','محمد سيماكان','Mohamed Simakan',['CB','RB'],'France'],
    ['nathan-zeze','ناثان زيزي','Nathan Zeze',['CB'],'France'],
    ['yusuf-akcicek','يوسف أكشيشيك','Yusuf Akcicek',['CB'],'Turkey'],
    ['jan-carlo-simic','يان كارلو سيميتش','Jan-Carlo Simic',['CB'],'Serbia'],
    ['natan','ناتان','Natan Bernardo de Souza',['CB'],'Brazil'],
    ['kader-mangane','قادر مانغان','Kader Mangane',['CB'],'Senegal'],
    ['digao','ديغاو','Digao footballer 1988',['CB'],'Brazil'],
    ['fabiano-leismann','فابيانو ليسمان','Fabiano Leismann',['CB','RB'],'Brazil'],
    ['bruno-viana','برونو فيانا','Bruno Viana',['CB'],'Brazil'],
    ['enzo-roco','إنزو روكو','Enzo Roco',['CB'],'Chile'],
    ['ramon-arias','رامون أرياس','Ramon Arias footballer',['CB','RB'],'Uruguay'],
    ['cristian-sapunaru','كريستيان سابونارو','Cristian Sapunaru',['CB','RB'],'Romania'],
    ['alin-tosca','ألين توشكا','Alin Tosca',['CB','LB'],'Romania'],
    ['oumar-gonzalez','عمر غونزاليس','Oumar Gonzalez',['CB'],'Cameroon'],
    ['paulo-diaz','باولو دياز','Paulo Diaz footballer',['CB','RB'],'Chile'],

    ['alex-telles','أليكس تيليس','Alex Telles',['LB'],'Brazil'],
    ['ezgjan-alioski','إزغيان أليوسكي','Ezgjan Alioski',['LB','LW'],'North Macedonia'],
    ['nuno-sequeira','نونو سيكيرا','Nuno Sequeira',['LB'],'Portugal'],
    ['pedro-rebocho','بيدرو ريبوتشو','Pedro Rebocho',['LB','RB'],'Portugal'],
    ['hamza-mendyl','حمزة منديل','Hamza Mendyl',['LB'],'Morocco'],
    ['theo-hernandez','ثيو هيرنانديز','Theo Hernandez',['LB','LW'],'France'],
    ['rayan-ait-nouri','ريان آيت نوري','Rayan Ait-Nouri',['LB','LW'],'Algeria'],
    ['mohamed-abdel-shafy','محمد عبدالشافي','Mohamed Abdel-Shafy',['LB'],'Egypt'],
    ['hussein-el-sayed','حسين السيد','Hussein El Sayed',['LB'],'Egypt'],
    ['ruben-lima','روبن ليما','Ruben Lima footballer',['LB'],'Portugal'],
    ['cristian-ganea','كريستيان غانيا','Cristian Ganea',['LB'],'Romania'],
    ['aaron-martin','آرون مارتن','Aaron Martin footballer 1997',['LB','CM'],'Spain'],
    ['junior-caicara','جونيور كايكارا','Junior Caicara',['RB'],'Brazil'],
    ['marcelo-goiano','مارسيلو غويانو','Marcelo Goiano',['RB'],'Brazil'],
    ['nahitan-nandez','ناهيتان نانديز','Nahitan Nandez',['RB','CM','RM'],'Uruguay'],
    ['hamari-traore','هاماري تراوري','Hamari Traore',['RB'],'Mali'],
    ['ivan-tomecak','إيفان توميتشاك','Ivan Tomecak',['RB'],'Croatia'],
    ['daniel-opare','دانييل أوباري','Daniel Opare',['RB'],'Ghana'],
    ['mokhtar-belkhiter','مختار بلخيثر','Mokhtar Belkhiter',['RB'],'Algeria'],
    ['youssouf-sabaly','يوسف سابالي','Youssouf Sabaly',['RB'],'Senegal'],

    ['marcelo-brozovic','مارسيلو بروزوفيتش','Marcelo Brozovic',['CDM','CM'],'Croatia'],
    ['ngolo-kante','نغولو كانتي',"N'Golo Kante",['CDM','CM'],'France'],
    ['fabinho','فابينيو','Fabinho footballer 1993',['CDM','CM'],'Brazil'],
    ['ruben-neves','روبن نيفيز','Ruben Neves',['CDM','CM'],'Portugal'],
    ['franck-kessie','فرانك كيسيه','Franck Kessie',['CM','CDM'],'Ivory Coast'],
    ['seko-fofana','سيكو فوفانا','Seko Fofana',['CM','CDM'],'Ivory Coast'],
    ['grzegorz-krychowiak','غريغورز كريتشوفياك','Grzegorz Krychowiak',['CDM','CM'],'Poland'],
    ['tarek-hamed','طارق حامد','Tarek Hamed',['CDM','CM'],'Egypt'],
    ['luiz-gustavo','لويز غوستافو','Luiz Gustavo',['CDM','CM'],'Brazil'],
    ['alfred-ndiaye','ألفريد ندياي',"Alfred N'Diaye",['CDM','CM'],'Senegal'],
    ['didier-ndong','ديدييه ندونغ','Didier Ndong',['CM','CDM'],'Gabon'],
    ['nemanja-gudelj','نيمانيا غوديلي','Nemanja Gudelj',['CDM','CB'],'Serbia'],
    ['sandro-manoel','ساندرو مانويل','Sandro Manoel',['CDM','CM'],'Brazil'],
    ['sofiane-bendebka','سفيان بن دبكة','Sofiane Bendebka',['CM','CAM'],'Algeria'],
    ['otavio','أوتافيو','Otavio footballer 1995',['CM','CAM','RW'],'Portugal'],
    ['houssem-aouar','حسام عوار','Houssem Aouar',['CM','CAM'],'Algeria'],
    ['georginio-wijnaldum','جورجينيو فينالدوم','Georginio Wijnaldum',['CM','CAM'],'Netherlands'],
    ['sergej-milinkovic-savic','سيرجي ميلينكوفيتش سافيتش','Sergej Milinkovic-Savic',['CM','CAM'],'Serbia'],
    ['gabri-veiga','غابري فيغا','Gabri Veiga',['CM','CAM'],'Spain'],
    ['enzo-millot','إنزو ميو','Enzo Millot',['CAM','CM'],'France'],
    ['cameron-puertas','كاميرون بويرتاس','Cameron Puertas',['CAM','CM'],'Switzerland'],
    ['filip-kiss','فيليب كيش','Filip Kiss',['CM','CDM'],'Slovakia'],
    ['brahian-aleman','براهيان أليمان','Brahian Aleman',['CAM','CM'],'Uruguay'],
    ['adrien-silva','أدريان سيلفا','Adrien Silva',['CM','CDM'],'Portugal'],
    ['haris-medunjanin','حارث مدونجانين','Haris Medunjanin',['CM','CAM'],'Bosnia and Herzegovina'],
    ['elton','إلتون','Elton Jose Xavier Gomes',['CAM'],'Brazil'],
    ['jehad-al-hussien','جهاد الحسين','Jehad Al-Hussien',['CAM','CM'],'Syria'],
    ['carlos-villanueva','كارلوس فيلانويفا','Carlos Villanueva footballer',['CAM','CM'],'Chile'],
    ['kaku','كاكو','Alejandro Romero Gamarra',['CAM','RW'],'Paraguay'],
    ['alejandro-pozuelo','أليخاندرو بوزويلو','Alejandro Pozuelo',['CAM','CM'],'Spain'],
    ['christian-cueva','كريستيان كويفا','Christian Cueva',['CAM','LW'],'Peru'],
    ['luis-jimenez','لويس خيمينيز','Luis Jimenez footballer',['CAM','CM'],'Chile'],
    ['mbark-boussoufa','مبارك بوصوفة','Mbark Boussoufa',['CAM','LW'],'Morocco'],
    ['saad-bguir','سعد بقير','Saad Bguir',['CAM','CM'],'Tunisia'],

    ['sadio-mane','ساديو ماني','Sadio Mane',['LW','RW','ST'],'Senegal'],
    ['neymar','نيمار','Neymar',['LW','CAM'],'Brazil'],
    ['riyad-mahrez','رياض محرز','Riyad Mahrez',['RW'],'Algeria'],
    ['allan-saint-maximin','ألان سانت ماكسيمان','Allan Saint-Maximin',['LW','RW'],'France'],
    ['jota','جوتا','Jota Portuguese footballer 1999',['LW','RW'],'Portugal'],
    ['garry-rodrigues','غاري رودريغيز','Garry Rodrigues',['LW','RW'],'Cape Verde'],
    ['cristian-tello','كريستيان تيو','Cristian Tello',['LW','RW'],'Spain'],
    ['fashion-sakala','فاشون ساكالا','Fashion Sakala',['LW','RW','ST'],'Zambia'],
    ['moussa-diaby','موسى ديابي','Moussa Diaby',['RW','LW'],'France'],
    ['steven-bergwijn','ستيفن بيرغفاين','Steven Bergwijn',['LW','RW'],'Netherlands'],
    ['yannick-carrasco','يانيك كاراسكو','Yannick Carrasco',['LW','RW'],'Belgium'],
    ['ibrahima-ndiaye','إبراهيما نداي','Ibrahima Ndiaye footballer 1998',['LW','RW'],'Senegal'],
    ['toko-ekambi','كارل توكو إيكامبي','Karl Toko Ekambi',['LW','ST'],'Cameroon'],
    ['youssef-msakni','يوسف المساكني','Youssef Msakni',['LW','CAM'],'Tunisia'],
    ['achraf-bencharki','أشرف بن شرقي','Achraf Bencharki',['LW','RW'],'Morocco'],
    ['sasa-jovanovic','ساسا يوفانوفيتش','Sasa Jovanovic footballer',['RW','LW'],'Serbia'],
    ['reinaldo-lenis','رينالدو لينيس','Reinaldo Lenis',['LW','RW'],'Colombia'],
    ['ahmed-musa','أحمد موسى','Ahmed Musa',['LW','RW','ST'],'Nigeria'],
    ['malcom','مالكوم','Malcom footballer',['RW','LW'],'Brazil'],
    ['mohammed-fouzair','محمد فوزير','Mohammed Fouzair',['RW','CAM'],'Morocco'],
    ['danilo-asprilla','دانيلو أسبريا','Danilo Asprilla',['RW','ST'],'Colombia'],
    ['iury-medeiros','يوري ميديروس','Iury Medeiros',['RW','LW'],'Portugal'],
    ['amine-bassi','أمين باسي','Amine Bassi',['CAM','RW'],'Morocco'],

    ['cristiano-ronaldo','كريستيانو رونالدو','Cristiano Ronaldo',['ST','LW'],'Portugal'],
    ['karim-benzema','كريم بنزيما','Karim Benzema',['ST'],'France'],
    ['aleksandar-mitrovic','ألكسندر ميتروفيتش','Aleksandar Mitrovic',['ST'],'Serbia'],
    ['roberto-firmino','روبرتو فيرمينو','Roberto Firmino',['ST','CAM'],'Brazil'],
    ['pierre-emerick-aubameyang','بيير إيميريك أوباميانغ','Pierre-Emerick Aubameyang',['ST','LW'],'Gabon'],
    ['moussa-dembele','موسى ديمبيلي','Moussa Dembele footballer 1996',['ST'],'France'],
    ['ivan-toney','إيفان توني','Ivan Toney',['ST'],'England'],
    ['marcos-leonardo','ماركوس ليوناردو','Marcos Leonardo',['ST'],'Brazil'],
    ['mateo-retegui','ماتيو ريتيغي','Mateo Retegui',['ST'],'Italy'],
    ['leo-bonatini','ليو بوناتيني','Leo Bonatini',['ST'],'Brazil'],
    ['carlos-junior','كارلوس جونيور','Carlos Junior footballer',['ST','LW'],'Brazil'],
    ['julio-tavares','جوليو تافاريس','Julio Tavares',['ST'],'Cape Verde'],
    ['fakhreddine-ben-youssef','فخر الدين بن يوسف','Fakhreddine Ben Youssef',['ST','RW'],'Tunisia'],
    ['ahmed-akaichi','أحمد العكايشي','Ahmed Akaichi',['ST'],'Tunisia'],
    ['makhete-diop','ماخيتي ديوب','Makhete Diop',['ST'],'Senegal'],
    ['william-jebor','ويليام جيبور','William Jebor',['ST'],'Liberia'],
    ['gelmin-rivas','غيلمين ريفاس','Gelmin Rivas',['ST'],'Venezuela'],
    ['sebastian-tagliabue','سيباستيان تيغالي','Sebastian Tagliabue',['ST'],'Argentina'],
    ['samuel-armenteros','سامويل أرمينتيروس','Samuel Armenteros',['ST'],'Sweden'],
    ['mame-thiam','مامي تيام','Mame Thiam',['ST','LW'],'Senegal'],
    ['youssouf-niakate','يوسف نياكاتي','Youssouf Niakate',['ST'],'France'],
    ['eder','إيدر','Eder footballer 1987',['ST'],'Portugal'],
    ['knowledge-musona','نوليدج موسونا','Knowledge Musona',['ST','LW'],'Zimbabwe']
  ].map(([slug,name,nameEn,positions,country])=>({slug,name,nameEn,positions,country}));

  const base=Array.isArray(window.SL7_FOREIGN_PLAYER_CATALOG)?window.SL7_FOREIGN_PLAYER_CATALOG:[];
  const map=new Map();
  [...base,...EXTRA].forEach(p=>map.set(p.slug||p.name,{...p}));
  const PLAYERS=[...map.values()];
  window.SL7_FOREIGN_PLAYER_CATALOG=PLAYERS;
  const byName=new Map(PLAYERS.map(p=>[p.name,p]));
  const bySlug=new Map(PLAYERS.map(p=>[p.slug,p]));

  if(typeof FOREIGN!=='undefined'){
    FOREIGN.splice(0,FOREIGN.length,...PLAYERS.map(p=>[p.name,p.positions,p]));
  }

  const POSITION_ORDER=['GK','RB','CB','LB','CDM','CM','CAM','RW','LW','ST'];
  const POSITION_COUNTS=Object.fromEntries(POSITION_ORDER.map(pos=>[pos,PLAYERS.filter(p=>p.positions.includes(pos)).length]));
  window.SL7_POSITION_COUNTS=POSITION_COUNTS;

  function balancedBots(){
    const quotas=[['GK',2],['CB',4],['LB',2],['RB',2],['CDM',2],['CM',2],['CAM',2],['LW',2],['RW',2],['ST',2]];
    const chosen=[],used=new Set();
    const take=(position,count)=>{
      const pool=shuffle(PLAYERS.filter(p=>p.positions.includes(position)&&!used.has(p.slug)));
      pool.slice(0,count).forEach(p=>{used.add(p.slug);chosen.push(p)});
    };
    quotas.forEach(([p,n])=>take(p,n));
    if(chosen.length<22) shuffle(PLAYERS.filter(p=>!used.has(p.slug))).slice(0,22-chosen.length).forEach(p=>chosen.push(p));
    return chosen.map((p,i)=>({
      id:`bot-${p.slug}-${i}`,slug:p.slug,name:p.name,nameEn:p.nameEn,country:p.country,
      positions:p.positions,rating:rand(46,55),potential:rand(74,89),apps:0,goals:0,assists:0,form:0
    }));
  }
  if(typeof makeBots==='function') makeBots=balancedBots;

  function enrich(bot){const p=byName.get(bot.name)||bySlug.get(bot.slug);return p?{...bot,...p,positions:bot.positions||p.positions}:bot}
  if(typeof state!=='undefined'&&state?.bots){state.bots=state.bots.map(enrich);try{save()}catch{}}

  const CACHE_KEY='sl7fc-wikimedia-player-faces-v2';
  let photoCache={};
  try{photoCache=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch{}
  const pending=new Map();

  function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
  function initials(name){return String(name||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('')}
  function fallback(name,wide=false){
    const w=wide?480:220,h=wide?640:220,size=wide?74:52;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#174a39"/><stop offset="1" stop-color="#061712"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="50%" cy="36%" r="34%" fill="#d3b56c" fill-opacity=".12"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#e8d08b" font-family="Arial" font-size="${size}" font-weight="900">${escapeHtml(initials(name))}</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  async function wikiSearch(host,query){
    const url=`https://${host}/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages&piprop=thumbnail&pithumbsize=700&format=json&origin=*`;
    const r=await fetch(url,{mode:'cors'}); if(!r.ok)return null;
    const j=await r.json(),pages=Object.values(j?.query?.pages||{});
    return pages.find(p=>p.thumbnail?.source)?.thumbnail?.source||null;
  }
  async function commonsSearch(query){
    const url=`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=6&prop=imageinfo&iiprop=url&iiurlwidth=700&format=json&origin=*`;
    const r=await fetch(url,{mode:'cors'});if(!r.ok)return null;
    const j=await r.json(),pages=Object.values(j?.query?.pages||{});
    return pages.find(p=>p.imageinfo?.[0]?.thumburl)?.imageinfo?.[0]?.thumburl||null;
  }
  async function resolveFace(p){
    if(Object.prototype.hasOwnProperty.call(photoCache,p.slug)) return photoCache[p.slug]||null;
    if(pending.has(p.slug)) return pending.get(p.slug);
    const task=(async()=>{
      let src=null;
      const queries=[`${p.nameEn} footballer`,p.nameEn];
      for(const q of queries){
        try{src=await wikiSearch('en.wikipedia.org',q)}catch{}
        if(src)break;
      }
      if(!src){try{src=await wikiSearch('ar.wikipedia.org',`${p.name} لاعب كرة قدم`)}catch{}}
      if(!src){try{src=await commonsSearch(`${p.nameEn} footballer`)}catch{}}
      photoCache[p.slug]=src||'';
      try{localStorage.setItem(CACHE_KEY,JSON.stringify(photoCache))}catch{}
      pending.delete(p.slug);
      return src;
    })();
    pending.set(p.slug,task);return task;
  }

  function cachedFace(p){return photoCache[p.slug]||null}
  async function hydrateFaces(){
    const imgs=[...document.querySelectorAll('img[data-sl7-slug]')];
    const slugs=[...new Set(imgs.map(i=>i.dataset.sl7Slug))];
    let cursor=0;
    async function worker(){
      while(cursor<slugs.length){
        const slug=slugs[cursor++],p=bySlug.get(slug);if(!p)continue;
        const src=await resolveFace(p);if(!src)continue;
        document.querySelectorAll(`img[data-sl7-slug="${CSS.escape(slug)}"]`).forEach(img=>{img.src=src;img.classList.add('face-loaded')});
      }
    }
    await Promise.all(Array.from({length:Math.min(5,slugs.length)},worker));
  }
  window.hydrateSL7Faces=hydrateFaces;

  if(typeof playerTile==='function'){
    playerTile=function(p,type){
      const meta=byName.get(p.name)||bySlug.get(p.slug)||p,src=cachedFace(meta)||fallback(p.name,true);
      return `<div class="player-tile with-photo"><div class="player-rating">${p.rating}</div><div class="player-photo-wrap"><img class="player-photo" data-sl7-slug="${escapeHtml(meta.slug||'')}" src="${src}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.src='${fallback(p.name,true)}'"></div><div class="player-card-copy"><b>${escapeHtml(p.name)}</b><small>${p.positions.join(' / ')} · ${type}</small><em>${p.apps||0} مباراة · ${p.goals||0} هدف</em><span class="player-source">${escapeHtml(meta.country||'')}</span></div></div>`;
    }
  }
  if(typeof pitch==='function'){
    pitch=function(lineup){
      return `<div class="pitch"><div class="pitch-lines"><i class="center-circle"></i><i class="half-line"></i><i class="box top"></i><i class="box bottom"></i></div>${lineup.map(p=>{
        const meta=byName.get(p.name)||bySlug.get(p.slug)||p,src=p.type==='ثابت'?fallback(p.name):cachedFace(meta)||fallback(p.name);
        return `<div class="pitch-player ${p.type==='ثابت'?'fixed':'bot'}" style="left:${p.x}%;top:${p.y}%"><span class="shirt has-avatar"><img class="player-avatar-mini" ${p.type==='ثابت'?'':`data-sl7-slug="${escapeHtml(meta.slug||'')}"`} src="${src}" alt="${escapeHtml(p.name)}" onerror="this.src='${fallback(p.name)}'"><i class="mini-rating">${p.rating}</i></span><b>${shortName(p.name)}</b><small>${p.slot}</small></div>`;
      }).join('')}</div>`;
    }
  }

  if(typeof squad==='function'){
    const oldSquad=squad;
    squad=function(){
      const counts=POSITION_ORDER.map(p=>`<div><b>${POSITION_COUNTS[p]||0}</b><span>${p}</span></div>`).join('');
      const html=oldSquad();
      return html.replace('<div class="section-head big"><h2>قائمة البوتات الأجانب</h2>',`<article class="card roster-pool-card"><div class="section-head"><h3>قاعدة اللاعبين الأجانب</h3><span>${PLAYERS.length} لاعب</span></div><div class="position-pool-grid">${counts}</div><small class="pool-note">التشكيلة تسحب تلقائيًا 22 بوتًا بتوزيع متوازن على جميع المراكز.</small></article><div class="section-head big"><h2>قائمة البوتات الأجانب</h2>`);
    }
  }

  if(typeof render==='function'){
    const baseRender=render;
    render=function(){baseRender();setTimeout(hydrateFaces,30)};
  }
  try{render()}catch{}
})();