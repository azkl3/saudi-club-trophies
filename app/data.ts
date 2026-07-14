export type TrophyKind = "league" | "king" | "crown" | "super" | "founder" | "asia" | "arab" | "gulf" | "other";

export type TrophyEdition = {
  season: string;
  title: string;
  label?: string;
};

export type TrophyCategory = {
  name: string;
  count: number;
  kind: TrophyKind;
  editions: TrophyEdition[];
  note?: string;
  verifiedBy: "التقرير النهائي" | "سعوديبيديا" | "الموقع الرسمي للنادي" | "أرشيف المسابقة";
};

export type Club = {
  id: string;
  name: string;
  short: string;
  city: string;
  founded: string;
  logo: string;
  logoSource: string;
  primary: string;
  secondary: string;
  ink: string;
  officialTotal?: number;
  majorTotal: number;
  rank?: number;
  fullRecord: boolean;
  tagline: string;
  bio: string;
  categories: TrophyCategory[];
  moments: { year: string; title: string; text: string }[];
  sources: { label: string; url: string }[];
};

export const sources = {
  report: "https://www.saff.com.sa/uploadcenter/saffFilesJzVmq1756655390.pdf",
  saffNews: "https://www.saff.com.sa/news.php?id=3861",
  saudipedia: "https://saudipedia.com/مشروع-توثيق-تاريخ-كرة-القدم-السعودية",
  ranking: "https://arriyadiyah.com/873179/مشروع-التوثيق..-الهلال-90-بطولة..-الاتحاد-59..-الأهلي-53..-والنصر-48",
  hilalOfficial: "https://alhilal.com/ar/news/tsawn-btwlh-lzaym-alkrh-alsawdyh-bad-ialan-altqryr-alnhaey-mn-fryq-aml",
  ittihadOfficial: "https://www.ittihadclub.sa/ar/club",
  ahliOfficial: "https://www.alahlifc.sa/news/53-بطولة-رسمية-للفريق-الاول-لكرة-القدم",
  logos: "https://commons.wikimedia.org/",
};

const majorSource = { label: "السجل الذهبي للبطولات الكبرى - سعوديبيديا", url: sources.saudipedia };
const reportSource = { label: "التقرير النهائي لمشروع التوثيق", url: sources.report };
const rankingSource = { label: "ملخص إجماليات الأندية من التقرير", url: sources.ranking };
const logoSource = "https://en.wikipedia.org/";

const seasonText = (season: string) => season.replace("-", "–");

function domesticTitle(kind: TrophyKind, season: string) {
  const start = Number(season.slice(0, 4));
  if (kind === "league") {
    if (start >= 2022) return "دوري روشن السعودي";
    if (start >= 2018) return "دوري كأس الأمير محمد بن سلمان";
    if (start === 2017 || start === 2008) return "الدوري السعودي للمحترفين";
    if (start === 2016) return "دوري جميل السعودي للمحترفين";
    if (start >= 2013) return "دوري عبداللطيف جميل للمحترفين";
    if (start >= 2009) return "دوري زين السعودي للمحترفين";
    if (start >= 2008) return "الدوري السعودي للمحترفين";
    if (start >= 1990) return "كأس دوري خادم الحرمين الشريفين";
    if (start === 1981) return "الدوري السعودي المشترك";
    if (start >= 1976) return "الدوري السعودي الممتاز";
    if (start >= 1970) return "بطولة المملكة على كأس جلالة الملك";
    return "الدوري العام على كأس جلالة الملك";
  }
  if (kind === "king") {
    if (start >= 2007 && start <= 2012) return "كأس خادم الحرمين الشريفين للأبطال";
    if (start >= 1986) return "كأس خادم الحرمين الشريفين";
    return "كأس جلالة الملك";
  }
  if (kind === "crown") return start >= 2013 ? "كأس سمو ولي العهد للمحترفين" : "كأس سمو ولي العهد";
  if (kind === "super") return "كأس السوبر السعودي";
  if (kind === "founder") return "كأس المؤسس";
  return "بطولة موثقة";
}

const editions = (kind: TrophyKind, seasons: string[]): TrophyEdition[] =>
  seasons.map((season) => ({ season: seasonText(season), title: domesticTitle(kind, season) }));

const namedEditions = (items: [string, string][]): TrophyEdition[] =>
  items.map(([season, title]) => ({ season: seasonText(season), title }));

const category = (
  name: string,
  kind: TrophyKind,
  items: TrophyEdition[],
  verifiedBy: TrophyCategory["verifiedBy"] = "التقرير النهائي",
  note?: string,
  count = items.length,
): TrophyCategory => ({ name, kind, count, editions: items, verifiedBy, note });

const domestic = (name: string, kind: TrophyKind, seasons: string[], verifiedBy: TrophyCategory["verifiedBy"] = "سعوديبيديا") =>
  category(name, kind, editions(kind, seasons), verifiedBy);

const residual = (count: number, note: string): TrophyCategory =>
  category("الرصيد الإضافي في التقرير", "other", [], "التقرير النهائي", note, count);

export const clubs: Club[] = [
  {
    id: "alhilal", name: "الهلال", short: "هـ", city: "الرياض", founded: "1957",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Al_Hilal_SFC_Logo.svg/250px-Al_Hilal_SFC_Logo.svg.png", logoSource,
    primary: "#0759d7", secondary: "#c9e3ff", ink: "#ffffff", officialTotal: 90, majorTotal: 49, rank: 1, fullRecord: true,
    tagline: "زعيم السجل الذهبي",
    bio: "نادي العاصمة وصاحب الرقم الأعلى في إجمالي البطولات الموثقة حتى 2025. يجمع سجله بين الهيمنة المحلية والامتداد القاري الأوسع لنادٍ سعودي.",
    categories: [
      domestic("الدوري السعودي", "league", ["1961-1962","1964-1965","1976-1977","1978-1979","1984-1985","1985-1986","1987-1988","1989-1990","1995-1996","1997-1998","2001-2002","2004-2005","2007-2008","2009-2010","2010-2011","2016-2017","2017-2018","2019-2020","2020-2021","2021-2022","2023-2024"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["1963-1964","1979-1980","1981-1982","1983-1984","1988-1989","2014-2015","2016-2017","2019-2020","2022-2023"]),
      domestic("كأس ولي العهد", "crown", ["1963-1964","1964-1965","1994-1995","1999-2000","2002-2003","2005-2006","2007-2008","2008-2009","2009-2010","2010-2011","2011-2012","2012-2013","2015-2016"]),
      domestic("كأس السوبر السعودي", "super", ["2015","2018","2021","2023","2024"]),
      domestic("كأس المؤسس", "founder", ["1999-2000"]),
      category("البطولات الآسيوية", "asia", namedEditions([["1991","بطولة الأندية الآسيوية أبطال الدوري"],["1997","كأس الكؤوس الآسيوية"],["1997","كأس السوبر الآسيوي"],["2000","بطولة الأندية الآسيوية أبطال الدوري"],["2000","كأس السوبر الآسيوي"],["2002","كأس الكؤوس الآسيوية"],["2019","دوري أبطال آسيا"],["2021","دوري أبطال آسيا"]]), "الموقع الرسمي للنادي"),
      category("البطولات العربية", "arab", namedEditions([["1994","بطولة الأندية العربية أبطال الدوري"],["1995","بطولة الأندية العربية أبطال الدوري"],["2000","كأس الكؤوس العربية"],["2001","كأس السوبر العربي"]]), "الموقع الرسمي للنادي"),
      category("البطولات الخليجية", "gulf", namedEditions([["1986","بطولة الأندية الخليجية أبطال الدوري"],["1998","بطولة الأندية الخليجية أبطال الدوري"]]), "الموقع الرسمي للنادي"),
      category("السوبر السعودي المصري", "other", namedEditions([["2001","كأس السوبر السعودي المصري"]]), "الموقع الرسمي للنادي"),
      residual(25, "يشمل بطولات المناطق وكأس الاتحاد ومسابقات رسمية أخرى؛ يحتفظ التقرير النهائي بقائمة الموسم والجهة المنظمة لكل لقب."),
    ],
    moments: [
      { year: "1957", title: "البداية", text: "تأسيس النادي في الرياض." },
      { year: "1991", title: "اللقب القاري الأول", text: "بداية فصل آسيوي استثنائي." },
      { year: "1999", title: "كأس المؤسس", text: "النسخة الوحيدة ذهبت إلى الهلال." },
      { year: "2025", title: "90 بطولة موثقة", text: "صدارة السجل العام في التقرير النهائي." },
    ],
    sources: [reportSource, majorSource, { label: "تفصيل الـ90 بطولة - نادي الهلال", url: sources.hilalOfficial }, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alittihad", name: "الاتحاد", short: "ع", city: "جدة", founded: "1927",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Al-Ittihad_Club_%28Jeddah%29_logo.svg/250px-Al-Ittihad_Club_%28Jeddah%29_logo.svg.png", logoSource,
    primary: "#f2c400", secondary: "#161616", ink: "#111111", officialTotal: 59, majorTotal: 29, rank: 2, fullRecord: true,
    tagline: "العميد.. أقدم الحكاية",
    bio: "تأسس في جدة عام 1927 ليكون ناديًا مفتوحًا للجميع. سجلّه يجمع بين عمق البدايات، 14 دوريًا، وأشهر ثنائية آسيوية متتالية لنادٍ سعودي.",
    categories: [
      domestic("الدوري السعودي", "league", ["1958-1959","1959-1960","1960-1961","1963-1964","1981-1982","1996-1997","1998-1999","1999-2000","2000-2001","2002-2003","2006-2007","2008-2009","2022-2023","2024-2025"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["1966-1967","1987-1988","2009-2010","2012-2013","2017-2018","2024-2025"]),
      domestic("كأس ولي العهد", "crown", ["1958-1959","1959-1960","1963-1964","1990-1991","1996-1997","2000-2001","2003-2004","2016-2017"]),
      domestic("كأس السوبر السعودي", "super", ["2022-2023"]),
      category("البطولات الآسيوية", "asia", namedEditions([["1999","كأس الكؤوس الآسيوية"],["2004","دوري أبطال آسيا"],["2005","دوري أبطال آسيا"]]), "أرشيف المسابقة"),
      category("البطولة العربية", "arab", namedEditions([["2005","دوري أبطال العرب"]]), "أرشيف المسابقة"),
      category("البطولة الخليجية", "gulf", namedEditions([["1999","بطولة الأندية الخليجية أبطال الدوري"]]), "أرشيف المسابقة"),
      category("السوبر السعودي المصري", "other", namedEditions([["2001","كأس السوبر السعودي المصري"],["2003","كأس السوبر السعودي المصري"]]), "أرشيف المسابقة"),
      residual(23, "بطولات المناطق وكأس الاتحاد ومسابقات رسمية أخرى تكمل إجمالي 59 لقبًا في التقرير النهائي."),
    ],
    moments: [
      { year: "1927", title: "ميلاد العميد", text: "تأسيس أقدم نادٍ سعودي قائم." },
      { year: "2004–05", title: "آسيا مرتين", text: "لقبان متتاليان لدوري أبطال آسيا." },
      { year: "2009", title: "دوري المحترفين", text: "تتويج بالنسخة الاحترافية في موسم 2008–09." },
      { year: "2025", title: "ثنائية محلية", text: "دوري روشن وكأس الملك في موسم واحد." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "نبذة التأسيس - نادي الاتحاد", url: sources.ittihadOfficial }, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alahli", name: "الأهلي", short: "أ", city: "جدة", founded: "1937",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Al_Ahli_Saudi_FC_logo.svg/250px-Al_Ahli_Saudi_FC_logo.svg.png", logoSource,
    primary: "#087f4d", secondary: "#ffffff", ink: "#ffffff", officialTotal: 53, majorTotal: 25, rank: 3, fullRecord: true,
    tagline: "قلعة الكؤوس", bio: "أحد أقطاب جدة وصاحب حضور تاريخي في بطولات الكؤوس. اعتمد النادي 53 بطولة للفريق الأول، وأضاف المجد الآسيوي للنخبة في 2025.",
    categories: [
      domestic("الدوري السعودي", "league", ["1962-1963","1965-1966","1968-1969","1970-1971","1971-1972","1972-1973","1977-1978","1983-1984","2015-2016"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["1969-1970","1976-1977","1977-1978","1978-1979","1982-1983","2010-2011","2011-2012","2015-2016"]),
      domestic("كأس ولي العهد", "crown", ["1957-1958","1970-1971","1997-1998","2001-2002","2006-2007","2014-2015"]),
      domestic("كأس السوبر السعودي", "super", ["2016","2025"]),
      category("دوري أبطال آسيا للنخبة", "asia", namedEditions([["2025","دوري أبطال آسيا للنخبة"]]), "أرشيف المسابقة"),
      category("البطولات العربية والخليجية", "arab", namedEditions([["1985","بطولة الأندية الخليجية"],["2002","بطولة الأندية العربية الموحدة"],["2002","بطولة الأندية الخليجية"],["2008","بطولة الأندية الخليجية"]]), "أرشيف المسابقة"),
      residual(23, "بطولات المناطق وكأس الاتحاد ومسابقات رسمية أخرى تكمل إجمالي 53 لقبًا المعتمد للنادي."),
    ],
    moments: [
      { year: "1937", title: "تأسيس القلعة", text: "بداية النادي الأهلي في جدة." },
      { year: "2016", title: "ثلاثية محلية", text: "الدوري وكأس الملك ثم السوبر." },
      { year: "2025", title: "بطل آسيا", text: "التتويج بدوري أبطال آسيا للنخبة." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "اعتماد 53 بطولة - نادي الأهلي", url: sources.ahliOfficial }, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alnassr", name: "النصر", short: "ن", city: "الرياض", founded: "1955",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Nassr_FC_Logo.svg/250px-Nassr_FC_Logo.svg.png", logoSource,
    primary: "#f7d117", secondary: "#1451a3", ink: "#111111", officialTotal: 48, majorTotal: 20, rank: 4, fullRecord: true,
    tagline: "فارس نجد", bio: "نادي العاصمة صاحب 48 بطولة في ترتيب التقرير النهائي، ومن أوائل الأندية السعودية حضورًا في واجهة الكرة العالمية والقارية.",
    categories: [
      domestic("الدوري السعودي", "league", ["1973-1974","1975-1976","1979-1980","1980-1981","1988-1989","1993-1994","1994-1995","2013-2014","2014-2015","2018-2019"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["1975-1976","1980-1981","1985-1986","1986-1987","1989-1990"]),
      domestic("كأس ولي العهد", "crown", ["1972-1973","1973-1974","2013-2014"]),
      domestic("كأس السوبر السعودي", "super", ["2019","2020"]),
      category("البطولات الآسيوية", "asia", namedEditions([["1998","كأس الكؤوس الآسيوية"],["1998","كأس السوبر الآسيوي"]]), "أرشيف المسابقة"),
      category("كأس العرب للأندية", "arab", namedEditions([["2023","كأس الملك سلمان للأندية العربية"]]), "أرشيف المسابقة"),
      category("البطولات الخليجية", "gulf", namedEditions([["1996","بطولة الأندية الخليجية أبطال الدوري"],["1997","بطولة الأندية الخليجية أبطال الدوري"]]), "أرشيف المسابقة"),
      residual(23, "بطولات المناطق وكأس الاتحاد ومسابقات رسمية أخرى ضمن إجمالي 48 لقبًا."),
    ],
    moments: [
      { year: "1955", title: "من قلب الرياض", text: "انطلاق مسيرة فارس نجد." },
      { year: "1998", title: "ثنائية آسيوية", text: "كأس الكؤوس والسوبر الآسيوي." },
      { year: "2023", title: "بطل العرب", text: "كأس الملك سلمان للأندية العربية." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alshabab", name: "الشباب", short: "ش", city: "الرياض", founded: "1947",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Al_Shabab_FC_%28Riyadh%29.svg/250px-Al_Shabab_FC_%28Riyadh%29.svg.png", logoSource,
    primary: "#f4f4f1", secondary: "#1b1b1b", ink: "#111111", officialTotal: 43, majorTotal: 13, rank: 5, fullRecord: true,
    tagline: "شيخ الأندية", bio: "نادي عريق من الرياض حقق سلسلة دوري تاريخية في التسعينيات، ويمتد سجله من البطولات المحلية إلى الألقاب الآسيوية والعربية والخليجية.",
    categories: [
      domestic("الدوري السعودي", "league", ["1990-1991","1991-1992","1992-1993","2003-2004","2005-2006","2011-2012"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["2007-2008","2008-2009","2013-2014"]),
      domestic("كأس ولي العهد", "crown", ["1992-1993","1995-1996","1998-1999"]),
      domestic("كأس السوبر السعودي", "super", ["2014"]),
      category("كأس الكؤوس الآسيوية", "asia", namedEditions([["2001","كأس الكؤوس الآسيوية"]]), "أرشيف المسابقة"),
      category("البطولات العربية", "arab", namedEditions([["1992","بطولة الأندية العربية أبطال الدوري"],["1995","كأس الكؤوس العربية"],["1999","كأس السوبر العربي"],["2000","بطولة الأندية العربية أبطال الدوري"]]), "أرشيف المسابقة"),
      category("البطولات الخليجية", "gulf", namedEditions([["1993","بطولة الأندية الخليجية"],["1994","بطولة الأندية الخليجية"]]), "أرشيف المسابقة"),
      residual(23, "بطولات المناطق وكأس الاتحاد ومسابقات رسمية أخرى ضمن إجمالي 43 لقبًا."),
    ],
    moments: [
      { year: "1947", title: "البداية", text: "تأسيس أحد أعرق أندية العاصمة." },
      { year: "1991–93", title: "ثلاثية الدوري", text: "ثلاثة ألقاب متتالية." },
      { year: "2001", title: "المجد الآسيوي", text: "كأس الكؤوس الآسيوية." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alettifaq", name: "الاتفاق", short: "ت", city: "الدمام", founded: "1945",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Al-Ettifaq_FC_logo.svg/250px-Al-Ettifaq_FC_logo.svg.png", logoSource,
    primary: "#d91f2c", secondary: "#126b3a", ink: "#ffffff", officialTotal: 42, majorTotal: 5, rank: 6, fullRecord: true,
    tagline: "فارس الدهناء", bio: "واجهة تاريخية للكرة في المنطقة الشرقية؛ جمع الدوري والكأس وحضورًا خليجيًا وعربيًا مؤثرًا.",
    categories: [
      domestic("الدوري السعودي", "league", ["1982-1983","1986-1987"]),
      domestic("كأس خادم الحرمين الشريفين", "king", ["1965-1966","1984-1985"]),
      domestic("كأس ولي العهد", "crown", ["1965-1966"]),
      category("البطولات العربية", "arab", namedEditions([["1984","بطولة الأندية العربية أبطال الدوري"],["1988","بطولة الأندية العربية أبطال الدوري"]]), "أرشيف المسابقة"),
      category("البطولات الخليجية", "gulf", namedEditions([["1983","بطولة الأندية الخليجية"],["1988","بطولة الأندية الخليجية"],["2006","بطولة الأندية الخليجية"]]), "أرشيف المسابقة"),
      residual(32, "بطولات المنطقة الشرقية ومسابقات أخرى تكمل إجمالي 42 لقبًا في التقرير النهائي."),
    ],
    moments: [
      { year: "1945", title: "من الدمام", text: "بداية فارس الدهناء." },
      { year: "1983", title: "دوري بلا خسارة", text: "أول لقب دوري في حقبة ذهبية." },
      { year: "1984–88", title: "الوهج العربي", text: "لقبان عربيان." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alqadsiah", name: "القادسية", short: "ق", city: "الخبر", founded: "1967",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/QAD_LOGO.png/250px-QAD_LOGO.png", logoSource,
    primary: "#d71920", secondary: "#f4d21f", ink: "#ffffff", officialTotal: 14, majorTotal: 1, rank: 7, fullRecord: true,
    tagline: "فخر الخبر", bio: "نادي الخبر وصاحب إرث بارز في كرة القدم السعودية؛ يتضمن سجله كأس ولي العهد ومجدًا آسيويًا في كأس الكؤوس.",
    categories: [
      domestic("كأس ولي العهد", "crown", ["1991-1992"]),
      category("كأس الكؤوس الآسيوية", "asia", namedEditions([["1994","كأس الكؤوس الآسيوية"]]), "أرشيف المسابقة"),
      residual(12, "بطولات المنطقة الشرقية ومسابقات أخرى ضمن إجمالي 14 لقبًا."),
    ],
    moments: [{ year: "1992", title: "كأس ولي العهد", text: "أحد أهم ألقاب النادي." }, { year: "1994", title: "بطل آسيا", text: "رفع كأس الكؤوس الآسيوية." }],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alfateh", name: "الفتح", short: "ف", city: "الأحساء", founded: "1958",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Al_Fateh_SC_Logo.svg/250px-Al_Fateh_SC_Logo.svg.png", logoSource,
    primary: "#123d8e", secondary: "#39a64a", ink: "#ffffff", officialTotal: 12, majorTotal: 2, rank: 8, fullRecord: true,
    tagline: "النموذجي", bio: "نادي الأحساء الذي كتب واحدة من أجمل قصص الدوري السعودي حين انتزع اللقب في 2013، ثم أصبح أول بطل للسوبر السعودي.",
    categories: [domestic("الدوري السعودي", "league", ["2012-2013"]), domestic("كأس السوبر السعودي", "super", ["2013"]), residual(10, "بطولات الدرجات والمناطق في التقرير النهائي.")],
    moments: [{ year: "2013", title: "عام النموذجي", text: "لقب الدوري ثم أول نسخة من السوبر." }],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "altaawoun", name: "التعاون", short: "ت", city: "بريدة", founded: "1956",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Al_Taawoun_FC_Logo.svg/250px-Al_Taawoun_FC_Logo.svg.png", logoSource,
    primary: "#f3cf17", secondary: "#174f9d", ink: "#111111", officialTotal: 11, majorTotal: 1, rank: 9, fullRecord: true,
    tagline: "سكري القصيم", bio: "ممثل بارز للقصيم في السجل الذهبي، وتوّج صعوده بإنجاز كأس الملك في 2019 ضمن مسيرة موثقة من 11 بطولة.",
    categories: [domestic("كأس خادم الحرمين الشريفين", "king", ["2018-2019"]), residual(10, "بطولات القصيم والدرجات في التقرير النهائي.")],
    moments: [{ year: "2019", title: "بطل كأس الملك", text: "أغلى ألقاب التعاون." }],
    sources: [reportSource, majorSource, rankingSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alwehda", name: "الوحدة", short: "و", city: "مكة المكرمة", founded: "1945",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Al_Wehda_FC_Logo.svg/250px-Al_Wehda_FC_Logo.svg.png", logoSource,
    primary: "#d61f2c", secondary: "#ffffff", ink: "#ffffff", majorTotal: 3, fullRecord: false,
    tagline: "فرسان مكة", bio: "أحد أقدم أندية المملكة، وأول بطل للدوري السعودي وفق تصنيف مشروع التوثيق.",
    categories: [domestic("الدوري السعودي", "league", ["1957-1958"]), domestic("كأس خادم الحرمين الشريفين", "king", ["1966-1967"]), domestic("كأس ولي العهد", "crown", ["1960-1961"])],
    moments: [{ year: "1957–58", title: "أول بطل للدوري", text: "الوحدة يفتتح السجل الذهبي." }, { year: "1966–67", title: "أول كأس ملك", text: "أول بطل للنسخة المصنفة بخروج المغلوب." }],
    sources: [majorSource, reportSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alriyadh", name: "الرياض", short: "ر", city: "الرياض", founded: "1953",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Al-Riyadh_SC.svg/250px-Al-Riyadh_SC.svg.png", logoSource,
    primary: "#c61f39", secondary: "#111111", ink: "#ffffff", majorTotal: 1, fullRecord: false,
    tagline: "مدرسة الوسطى", bio: "نادٍ عريق من العاصمة، دخل السجل الذهبي للبطولات الكبرى بتحقيق كأس ولي العهد.",
    categories: [domestic("كأس ولي العهد", "crown", ["1993-1994"])],
    moments: [{ year: "1994", title: "كأس ولي العهد", text: "المحطة الأبرز في سجل النادي." }],
    sources: [majorSource, reportSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alfaisaly", name: "الفيصلي", short: "ص", city: "حرمة", founded: "1954",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Al-Faisaly_FC_New_Logo.png/250px-Al-Faisaly_FC_New_Logo.png", logoSource,
    primary: "#7f1838", secondary: "#ffffff", ink: "#ffffff", majorTotal: 1, fullRecord: false,
    tagline: "عنابي سدير", bio: "نادي مدينة حرمة الذي توّج مسيرته بلقب كأس خادم الحرمين الشريفين.",
    categories: [domestic("كأس خادم الحرمين الشريفين", "king", ["2020-2021"])],
    moments: [{ year: "2021", title: "بطل كأس الملك", text: "أكبر إنجاز محلي في تاريخ النادي." }],
    sources: [majorSource, reportSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
  {
    id: "alfayha", name: "الفيحاء", short: "ح", city: "المجمعة", founded: "1953",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0f/Al-Fayha_FC.svg/250px-Al-Fayha_FC.svg.png", logoSource,
    primary: "#f07a21", secondary: "#3d4a9f", ink: "#ffffff", majorTotal: 1, fullRecord: false,
    tagline: "برتقالي المجمعة", bio: "نادي المجمعة الذي صنع واحدة من مفاجآت كأس الملك الحديثة ودخل بها سجل الأبطال الكبار.",
    categories: [domestic("كأس خادم الحرمين الشريفين", "king", ["2021-2022"])],
    moments: [{ year: "2022", title: "بطل كأس الملك", text: "تتويج تاريخي للفيحاء." }],
    sources: [majorSource, reportSource, { label: "مرجع ملف الشعار", url: logoSource }],
  },
];

export const competitionTotals = [
  { label: "الدوري", value: 68, detail: "4 نسخ لم تكتمل" },
  { label: "كأس الملك", value: 38, detail: "10 أبطال" },
  { label: "كأس ولي العهد", value: 37, detail: "9 أبطال" },
  { label: "السوبر", value: 13, detail: "6 أبطال" },
];

export const archiveStats = [
  { value: "123", label: "سنة موثقة" },
  { value: "3,910", label: "مسابقة للأندية" },
  { value: "155", label: "ناديًا بطلًا" },
  { value: "800", label: "وثيقة ومقابلة" },
];
