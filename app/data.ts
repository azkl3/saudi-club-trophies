export type TrophyKind = "league" | "king" | "crown" | "super" | "founder" | "asia" | "arab" | "gulf" | "other";

export type TrophyCategory = {
  name: string;
  count: number;
  kind: TrophyKind;
  years?: string[];
  note?: string;
  verifiedBy: "التقرير النهائي" | "سعوديبيديا" | "الموقع الرسمي للنادي" | "أرشيف المسابقة";
};

export type Club = {
  id: string;
  name: string;
  short: string;
  city: string;
  founded: string;
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
};

const majorSource = { label: "السجل الذهبي للبطولات الكبرى - سعوديبيديا", url: sources.saudipedia };
const reportSource = { label: "التقرير النهائي لمشروع التوثيق", url: sources.report };
const rankingSource = { label: "ملخص إجماليات الأندية من التقرير", url: sources.ranking };

const major = (
  league = 0,
  king = 0,
  crown = 0,
  superCup = 0,
  founder = 0,
): TrophyCategory[] => [
  ...(league ? [{ name: "الدوري السعودي", count: league, kind: "league" as const, verifiedBy: "سعوديبيديا" as const }] : []),
  ...(king ? [{ name: "كأس خادم الحرمين الشريفين", count: king, kind: "king" as const, verifiedBy: "سعوديبيديا" as const }] : []),
  ...(crown ? [{ name: "كأس ولي العهد", count: crown, kind: "crown" as const, verifiedBy: "سعوديبيديا" as const }] : []),
  ...(superCup ? [{ name: "كأس السوبر السعودي", count: superCup, kind: "super" as const, verifiedBy: "سعوديبيديا" as const }] : []),
  ...(founder ? [{ name: "كأس المؤسس", count: founder, kind: "founder" as const, years: ["1999"], verifiedBy: "سعوديبيديا" as const }] : []),
];

export const clubs: Club[] = [
  {
    id: "alhilal",
    name: "الهلال",
    short: "هـ",
    city: "الرياض",
    founded: "1957",
    primary: "#0759d7",
    secondary: "#c9e3ff",
    ink: "#ffffff",
    officialTotal: 90,
    majorTotal: 49,
    rank: 1,
    fullRecord: true,
    tagline: "زعيم السجل الذهبي",
    bio: "نادي العاصمة وصاحب الرقم الأعلى في إجمالي البطولات الموثقة حتى 2025. يجمع سجله بين الهيمنة المحلية والامتداد القاري الأوسع لنادٍ سعودي.",
    categories: [
      ...major(21, 9, 13, 5, 1),
      { name: "البطولات الآسيوية", count: 8, kind: "asia", years: ["1991", "1997", "2000", "2002", "2019", "2021"], note: "تشمل دوري أبطال آسيا، كأس الكؤوس والسوبر الآسيوي.", verifiedBy: "الموقع الرسمي للنادي" },
      { name: "البطولات العربية", count: 4, kind: "arab", verifiedBy: "الموقع الرسمي للنادي" },
      { name: "البطولات الخليجية", count: 2, kind: "gulf", verifiedBy: "الموقع الرسمي للنادي" },
      { name: "السوبر السعودي المصري", count: 1, kind: "other", verifiedBy: "الموقع الرسمي للنادي" },
      { name: "بطولات أخرى موثقة", count: 11, kind: "other", years: ["1959", "1979", "1995", "1998", "2000", "2005", "2011", "2013", "2022", "2024"], verifiedBy: "الموقع الرسمي للنادي" },
      { name: "بطولات المنطقة الوسطى", count: 8, kind: "other", years: ["1961", "1963", "1964", "1965", "1966", "1967", "1969"], verifiedBy: "الموقع الرسمي للنادي" },
    ],
    moments: [
      { year: "1957", title: "البداية", text: "تأسيس النادي في الرياض وانطلاق رحلة امتدت عبر سبعة عقود." },
      { year: "1991", title: "اللقب القاري الأول", text: "بداية فصل آسيوي جعل الهلال في صدارة الأندية السعودية قارياً." },
      { year: "1999", title: "كأس المؤسس", text: "النسخة الوحيدة من البطولة ذهبت إلى الهلال." },
      { year: "2025", title: "90 بطولة موثقة", text: "تثبيت صدارة السجل العام في التقرير النهائي للمشروع." },
    ],
    sources: [reportSource, majorSource, { label: "تفصيل الـ90 بطولة - نادي الهلال", url: sources.hilalOfficial }],
  },
  {
    id: "alittihad",
    name: "الاتحاد",
    short: "ع",
    city: "جدة",
    founded: "1927",
    primary: "#f2c400",
    secondary: "#161616",
    ink: "#111111",
    officialTotal: 59,
    majorTotal: 29,
    rank: 2,
    fullRecord: true,
    tagline: "العميد.. أقدم الحكاية",
    bio: "تأسس في جدة عام 1927 ليكون ناديًا مفتوحًا للجميع. سجلّه يجمع بين عمق البدايات، 14 دوريًا، وأشهر ثنائية آسيوية متتالية لنادٍ سعودي.",
    categories: [
      ...major(14, 6, 8, 1),
      { name: "البطولات الآسيوية", count: 3, kind: "asia", years: ["1999", "2004", "2005"], note: "كأس الكؤوس الآسيوية ولقبان متتاليان لدوري أبطال آسيا.", verifiedBy: "أرشيف المسابقة" },
      { name: "البطولة العربية", count: 1, kind: "arab", years: ["2005"], verifiedBy: "أرشيف المسابقة" },
      { name: "البطولة الخليجية", count: 1, kind: "gulf", years: ["1999"], verifiedBy: "أرشيف المسابقة" },
      { name: "السوبر السعودي المصري", count: 2, kind: "other", years: ["2001", "2003"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات مناطق ومسابقات أخرى", count: 23, kind: "other", note: "الفرق بين إجمالي 59 بطولة وتفاصيل المسابقات المعروضة أعلاه؛ يعرض التقرير النهائي السجل الزمني الكامل.", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1927", title: "ميلاد العميد", text: "اجتماع المؤسسين في جدة وتأسيس أقدم نادٍ سعودي قائم." },
      { year: "1999", title: "ثلاثية خارجية", text: "عام مفصلي في حضور الاتحاد آسيوياً وخليجياً." },
      { year: "2004–05", title: "آسيا مرتين", text: "احتفاظ استثنائي بلقب دوري أبطال آسيا في نسختين متتاليتين." },
      { year: "2025", title: "الثنائية المحلية", text: "إضافة الدوري وكأس الملك إلى الرصيد الموثق." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "نبذة التأسيس - نادي الاتحاد", url: sources.ittihadOfficial }],
  },
  {
    id: "alahli",
    name: "الأهلي",
    short: "أ",
    city: "جدة",
    founded: "1937",
    primary: "#087f4d",
    secondary: "#ffffff",
    ink: "#ffffff",
    officialTotal: 53,
    majorTotal: 25,
    rank: 3,
    fullRecord: true,
    tagline: "قلعة الكؤوس",
    bio: "أحد أقطاب جدة وصاحب حضور تاريخي في بطولات الكؤوس. اعتمد النادي 53 بطولة للفريق الأول، من بينها 9 دوريات، ثم أضاف المجد الآسيوي للنخبة في 2025.",
    categories: [
      ...major(9, 8, 6, 2),
      { name: "دوري أبطال آسيا للنخبة", count: 1, kind: "asia", years: ["2025"], verifiedBy: "أرشيف المسابقة" },
      { name: "البطولات العربية والخليجية", count: 4, kind: "arab", years: ["1985", "2002", "2008"], note: "يجمع هذا القسم الألقاب العربية والخليجية المتداولة في أرشيف النادي.", verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات مناطق ومسابقات أخرى", count: 23, kind: "other", note: "استكمال إجمالي 53 بطولة المعتمد رسميًا للنادي.", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1937", title: "تأسيس القلعة", text: "بداية النادي الأهلي في مدينة جدة." },
      { year: "1966", title: "عصر الكؤوس", text: "منعطف تاريخي رسّخ هوية النادي في بطولات خروج المغلوب." },
      { year: "2016", title: "ثلاثية محلية", text: "موسم جمع الدوري وكأس الملك وكأس السوبر." },
      { year: "2025", title: "بطل آسيا", text: "التتويج بدوري أبطال آسيا للنخبة للمرة الأولى." },
    ],
    sources: [reportSource, majorSource, rankingSource, { label: "اعتماد 53 بطولة - نادي الأهلي", url: sources.ahliOfficial }],
  },
  {
    id: "alnassr",
    name: "النصر",
    short: "ن",
    city: "الرياض",
    founded: "1955",
    primary: "#f7d117",
    secondary: "#1451a3",
    ink: "#111111",
    officialTotal: 48,
    majorTotal: 20,
    rank: 4,
    fullRecord: true,
    tagline: "فارس نجد",
    bio: "نادي العاصمة صاحب 48 بطولة في ترتيب التقرير النهائي، ومن أوائل الأندية السعودية حضورًا في واجهة الكرة العالمية والقارية.",
    categories: [
      ...major(10, 5, 3, 2),
      { name: "البطولات الآسيوية", count: 2, kind: "asia", years: ["1998"], note: "كأس الكؤوس الآسيوية وكأس السوبر الآسيوي.", verifiedBy: "أرشيف المسابقة" },
      { name: "كأس العرب للأندية", count: 1, kind: "arab", years: ["2023"], verifiedBy: "أرشيف المسابقة" },
      { name: "البطولات الخليجية", count: 2, kind: "gulf", verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات مناطق ومسابقات أخرى", count: 23, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1955", title: "من قلب الرياض", text: "انطلاق مسيرة فارس نجد." },
      { year: "1998", title: "ثنائية آسيوية", text: "تتويج بكأس الكؤوس والسوبر الآسيوي." },
      { year: "2000", title: "العالمية", text: "تمثيل آسيا في النسخة الأولى من كأس العالم للأندية." },
      { year: "2025", title: "48 بطولة", text: "المركز الرابع في ترتيب إجمالي الألقاب الموثقة." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "alshabab",
    name: "الشباب",
    short: "ش",
    city: "الرياض",
    founded: "1947",
    primary: "#f4f4f1",
    secondary: "#1b1b1b",
    ink: "#111111",
    officialTotal: 43,
    majorTotal: 13,
    rank: 5,
    fullRecord: true,
    tagline: "شيخ الأندية",
    bio: "نادي رياضي عريق من الرياض، حقق سلسلة دوري تاريخية في التسعينيات، ويمتد سجله من البطولات المحلية إلى الألقاب الآسيوية والعربية والخليجية.",
    categories: [
      ...major(6, 3, 3, 1),
      { name: "بطولة آسيوية", count: 1, kind: "asia", years: ["2001"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات عربية", count: 4, kind: "arab", years: ["1992", "1995", "1999", "2000"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات خليجية", count: 2, kind: "gulf", verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات مناطق ومسابقات أخرى", count: 23, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1947", title: "البداية", text: "تأسيس أحد أعرق أندية العاصمة." },
      { year: "1991–93", title: "ثلاثية الدوري", text: "ثلاثة ألقاب دوري متتالية صنعت حقبة خالدة." },
      { year: "2001", title: "المجد الآسيوي", text: "التتويج بكأس الكؤوس الآسيوية." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "alettifaq",
    name: "الاتفاق",
    short: "ت",
    city: "الدمام",
    founded: "1945",
    primary: "#d91f2c",
    secondary: "#126b3a",
    ink: "#ffffff",
    officialTotal: 42,
    majorTotal: 5,
    rank: 6,
    fullRecord: true,
    tagline: "فارس الدهناء",
    bio: "واجهة تاريخية للكرة في المنطقة الشرقية؛ جمع الدوري والكأس وحضورًا خليجيًا وعربيًا مؤثرًا، وحل سادسًا في إجمالي البطولات الموثقة.",
    categories: [
      ...major(2, 2, 1, 0),
      { name: "بطولات عربية", count: 2, kind: "arab", years: ["1984", "1988"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات خليجية", count: 3, kind: "gulf", years: ["1983", "1988", "2006"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات مناطق ومسابقات أخرى", count: 32, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1945", title: "من الدمام", text: "بداية أحد أكبر أندية المنطقة الشرقية." },
      { year: "1983", title: "دوري بلا خسارة", text: "أول لقب دوري يتوّج موسمًا استثنائيًا." },
      { year: "1984–88", title: "الوهج العربي", text: "لقبان عربيان في حقبة ذهبية." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "alqadsiah",
    name: "القادسية",
    short: "ق",
    city: "الخبر",
    founded: "1967",
    primary: "#d71920",
    secondary: "#f4d21f",
    ink: "#ffffff",
    officialTotal: 14,
    majorTotal: 1,
    rank: 7,
    fullRecord: true,
    tagline: "فخر الخبر",
    bio: "نادي الخبر وصاحب إرث بارز في كرة القدم السعودية؛ يتضمن سجله كأس ولي العهد ومجدًا آسيويًا في كأس الكؤوس.",
    categories: [
      ...major(0, 0, 1, 0),
      { name: "كأس الكؤوس الآسيوية", count: 1, kind: "asia", years: ["1994"], verifiedBy: "أرشيف المسابقة" },
      { name: "بطولات أخرى موثقة", count: 12, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1967", title: "هوية الخبر", text: "تأسيس القادسية بشكله المعروف." },
      { year: "1992", title: "كأس ولي العهد", text: "واحد من أهم ألقاب النادي المحلية." },
      { year: "1994", title: "بطل آسيا", text: "رفع كأس الكؤوس الآسيوية." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "alfateh",
    name: "الفتح",
    short: "ف",
    city: "الأحساء",
    founded: "1958",
    primary: "#123d8e",
    secondary: "#39a64a",
    ink: "#ffffff",
    officialTotal: 12,
    majorTotal: 2,
    rank: 8,
    fullRecord: true,
    tagline: "النموذجي",
    bio: "نادي الأحساء الذي كتب واحدة من أجمل قصص الدوري السعودي حين انتزع اللقب في 2013، ثم أصبح أول بطل للسوبر السعودي.",
    categories: [
      ...major(1, 0, 0, 1),
      { name: "بطولات أخرى موثقة", count: 10, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1958", title: "البداية", text: "تأسيس النادي في الأحساء." },
      { year: "2013", title: "عام النموذجي", text: "لقب الدوري ثم أول نسخة من السوبر السعودي." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "altaawoun",
    name: "التعاون",
    short: "ت",
    city: "بريدة",
    founded: "1956",
    primary: "#f3cf17",
    secondary: "#174f9d",
    ink: "#111111",
    officialTotal: 11,
    majorTotal: 1,
    rank: 9,
    fullRecord: true,
    tagline: "سكري القصيم",
    bio: "ممثل بارز للقصيم في السجل الذهبي، وتوّج صعوده بإنجاز كأس الملك في 2019 ضمن مسيرة موثقة من 11 بطولة.",
    categories: [
      ...major(0, 1, 0, 0),
      { name: "بطولات أخرى موثقة", count: 10, kind: "other", verifiedBy: "التقرير النهائي" },
    ],
    moments: [
      { year: "1956", title: "من بريدة", text: "ولادة النادي في قلب القصيم." },
      { year: "2019", title: "بطل كأس الملك", text: "أغلى ألقاب التعاون وأبرز محطات تاريخه." },
    ],
    sources: [reportSource, majorSource, rankingSource],
  },
  {
    id: "alwehda",
    name: "الوحدة",
    short: "و",
    city: "مكة المكرمة",
    founded: "1945",
    primary: "#d61f2c",
    secondary: "#ffffff",
    ink: "#ffffff",
    majorTotal: 3,
    fullRecord: false,
    tagline: "فرسان مكة",
    bio: "أحد أقدم أندية المملكة، وأول بطل للدوري السعودي وفق تصنيف مشروع التوثيق، وأول أبطال كأس الملك في نسخته المصنفة بنظام خروج المغلوب.",
    categories: major(1, 1, 1, 0),
    moments: [
      { year: "1957–58", title: "أول بطل للدوري", text: "الوحدة يفتتح السجل الذهبي للمسابقة." },
      { year: "1966–67", title: "أول كأس ملك", text: "أول بطل للنسخة المصنفة بنظام خروج المغلوب." },
    ],
    sources: [majorSource, reportSource],
  },
  {
    id: "alriyadh",
    name: "الرياض",
    short: "ر",
    city: "الرياض",
    founded: "1953",
    primary: "#c61f39",
    secondary: "#111111",
    ink: "#ffffff",
    majorTotal: 1,
    fullRecord: false,
    tagline: "مدرسة الوسطى",
    bio: "نادٍ عريق من العاصمة، دخل السجل الذهبي للبطولات الكبرى بتحقيق كأس ولي العهد.",
    categories: major(0, 0, 1, 0),
    moments: [{ year: "1994", title: "كأس ولي العهد", text: "المحطة الأبرز في سجل البطولات الكبرى للنادي." }],
    sources: [majorSource, reportSource],
  },
  {
    id: "alfaisaly",
    name: "الفيصلي",
    short: "ص",
    city: "حرمة",
    founded: "1954",
    primary: "#7f1838",
    secondary: "#ffffff",
    ink: "#ffffff",
    majorTotal: 1,
    fullRecord: false,
    tagline: "عنابي سدير",
    bio: "نادي مدينة حرمة الذي توّج مسيرته بلقب كأس خادم الحرمين الشريفين، مثبتًا اسمه بين أبطال المسابقات الكبرى.",
    categories: major(0, 1, 0, 0),
    moments: [{ year: "2021", title: "بطل كأس الملك", text: "أكبر إنجاز محلي في تاريخ النادي." }],
    sources: [majorSource, reportSource],
  },
  {
    id: "alfayha",
    name: "الفيحاء",
    short: "ح",
    city: "المجمعة",
    founded: "1953",
    primary: "#f07a21",
    secondary: "#3d4a9f",
    ink: "#ffffff",
    majorTotal: 1,
    fullRecord: false,
    tagline: "برتقالي المجمعة",
    bio: "نادي المجمعة الذي صنع واحدة من مفاجآت كأس الملك الحديثة ودخل بها سجل الأبطال الكبار.",
    categories: major(0, 1, 0, 0),
    moments: [{ year: "2022", title: "بطل كأس الملك", text: "تتويج تاريخي وضع الفيحاء في السجل الذهبي." }],
    sources: [majorSource, reportSource],
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
