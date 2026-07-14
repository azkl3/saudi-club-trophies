"use client";

import {
  ArrowLeft,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDot,
  ExternalLink,
  FileCheck2,
  Filter,
  Flag,
  Globe2,
  Landmark,
  Library,
  MapPin,
  Medal,
  Menu,
  Search,
  Shield,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { archiveStats, clubs, competitionTotals, sources, type Club, type TrophyCategory, type TrophyKind } from "./data";

const kindIcon: Record<TrophyKind, typeof Trophy> = {
  league: Medal,
  king: Trophy,
  crown: Award,
  super: Sparkles,
  founder: Landmark,
  asia: Globe2,
  arab: Flag,
  gulf: CircleDot,
  other: Shield,
};

const filters = ["الكل", "إجمالي موثق", "الرياض", "جدة", "الشرقية", "أبطال الكؤوس"] as const;

function TrophyMark({ kind, small = false }: { kind: TrophyKind; small?: boolean }) {
  const Icon = kindIcon[kind];
  return (
    <span className={`trophy-mark trophy-${kind} ${small ? "small" : ""}`} aria-hidden="true">
      <span className="trophy-halo" />
      <Icon strokeWidth={1.45} />
    </span>
  );
}

function ClubCrest({ club, size = "normal" }: { club: Club; size?: "normal" | "large" | "small" }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`club-crest club-crest-${size}`}
      style={{ "--club": club.primary, "--club2": club.secondary, "--clubInk": club.ink } as React.CSSProperties}
      title={`الشعار الرسمي لنادي ${club.name}`}
    >
      {failed ? <span className="crest-fallback"><Shield /><b>{club.short}</b></span> : (
        <img src={club.logo} alt={`شعار نادي ${club.name}`} referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      )}
    </span>
  );
}

function VerificationBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`verified ${compact ? "compact" : ""}`}>
      <Check size={12} strokeWidth={3} />
      {compact ? "موثق" : "مُطابق للسجل الرسمي"}
    </span>
  );
}

function ClubCard({ club, onOpen }: { club: Club; onOpen: (club: Club) => void }) {
  return (
    <button
      className="club-card"
      style={{ "--club": club.primary, "--club2": club.secondary, "--clubInk": club.ink } as React.CSSProperties}
      onClick={() => onOpen(club)}
      aria-label={`فتح سجل نادي ${club.name}`}
    >
      <span className="card-noise" />
      <span className="card-watermark">{club.short}</span>
      <span className="club-card-top">
        <ClubCrest club={club} />
        {club.rank ? <span className="rank">#{club.rank.toLocaleString("ar-SA")}</span> : <VerificationBadge compact />}
      </span>
      <span className="club-card-copy">
        <span className="club-city"><MapPin size={13} /> {club.city}</span>
        <strong>{club.name}</strong>
        <span>{club.tagline}</span>
      </span>
      <span className="club-card-total">
        <span>
          <b>{(club.officialTotal ?? club.majorTotal).toLocaleString("ar-SA")}</b>
          <small>{club.officialTotal ? "بطولة موثقة" : "بطولة كبرى"}</small>
        </span>
        <ArrowLeft size={22} />
      </span>
    </button>
  );
}

function TrophyCabinet({ club }: { club: Club }) {
  const detailed = club.categories.filter((item) => item.editions.length > 0);
  const aggregates = club.categories.filter((item) => item.editions.length === 0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => setActiveIndex(0), [club.id]);
  const active = detailed[Math.min(activeIndex, Math.max(detailed.length - 1, 0))];
  if (!active) return null;

  return (
    <div className="museum-cabinet">
      <div className="cabinet-tabs" role="tablist" aria-label="أقسام بطولات النادي">
        {detailed.map((item, index) => (
          <button
            key={`${item.name}-${index}`}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            role="tab"
            aria-selected={index === activeIndex}
          >
            <TrophyMark kind={item.kind} small />
            <span><b>{item.name}</b><small>{item.count.toLocaleString("ar-SA")} ألقاب</small></span>
          </button>
        ))}
      </div>

      <section className="cabinet-room" role="tabpanel">
        <header className="cabinet-room-head">
          <div>
            <span className="cabinet-label">الرف المختار</span>
            <h4>{active.name}</h4>
            <p>كل كأس أدناه يمثل نسخة مستقلة باسمها التاريخي وموسم التتويج.</p>
          </div>
          <span className="cabinet-count"><b>{active.count.toLocaleString("ar-SA")}</b><small>كأس موثق</small></span>
        </header>

        <div className="trophy-shelves">
          {active.editions.map((edition, index) => (
            <article className="trophy-case" key={`${edition.season}-${edition.title}-${index}`}>
              <span className="case-glass" />
              <div className="case-number">{String(index + 1).padStart(2, "0")}</div>
              <TrophyMark kind={active.kind} />
              <div className="trophy-plaque">
                <time>{edition.season}</time>
                <h5>{edition.title}</h5>
                <span><Check size={11} /> {active.verifiedBy}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {aggregates.length ? (
        <div className="aggregate-records">
          {aggregates.map((item) => (
            <article key={item.name}>
              <FileCheck2 />
              <div><b>{item.count.toLocaleString("ar-SA")} لقبًا إضافيًا</b><p>{item.note}</p></div>
              <span>راجع التقرير الرسمي</span>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ClubDrawer({ club, onClose }: { club: Club; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label={`سجل نادي ${club.name}`} onMouseDown={onClose}>
      <article
        className="club-drawer"
        style={{ "--club": club.primary, "--club2": club.secondary, "--clubInk": club.ink } as React.CSSProperties}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" onClick={onClose} aria-label="إغلاق"><X size={21} /></button>
        <header className="drawer-hero">
          <span className="drawer-pattern" />
          <div className="drawer-headline">
            <div className="drawer-meta">
              <VerificationBadge />
              <span><MapPin size={14} /> {club.city}</span>
              <span>تأسس {club.founded}</span>
            </div>
            <h2>{club.name}</h2>
            <p>{club.tagline}</p>
          </div>
          <ClubCrest club={club} size="large" />
          <div className="drawer-totals">
            <span><b>{(club.officialTotal ?? club.majorTotal).toLocaleString("ar-SA")}</b><small>{club.officialTotal ? "إجمالي موثق" : "بطولات كبرى"}</small></span>
            <i />
            <span><b>{club.majorTotal.toLocaleString("ar-SA")}</b><small>بطولات محلية كبرى</small></span>
          </div>
        </header>

        <div className="drawer-body">
          <section className="club-intro">
            <div>
              <span className="eyebrow">عن النادي</span>
              <h3>قصة باللون <em>والذهب</em></h3>
              <p>{club.bio}</p>
            </div>
            <div className="archive-frames" aria-label="لوحات بصرية من هوية النادي">
              <span><b>{club.founded}</b><small>البداية</small></span>
              <span><Trophy size={34} /><small>المجد</small></span>
              <span><b>{club.city}</b><small>المدينة</small></span>
            </div>
          </section>

          <section className="club-trophies">
            <div className="section-heading compact-heading">
              <div><span className="eyebrow">خزانة النادي</span><h3>متحف الكؤوس موسمًا بموسم</h3></div>
              <span className="record-state"><FileCheck2 size={16} /> {club.fullRecord ? "الإجمالي مطابق للتقرير" : "سجل البطولات الكبرى"}</span>
            </div>
            <TrophyCabinet club={club} />
          </section>

          <section className="timeline-section">
            <div className="section-heading compact-heading">
              <div><span className="eyebrow">محطات مختارة</span><h3>الخط الزمني</h3></div>
            </div>
            <div className="timeline">
              {club.moments.map((moment, index) => (
                <article key={`${moment.year}-${index}`}>
                  <span className="timeline-dot" />
                  <time>{moment.year}</time>
                  <h4>{moment.title}</h4>
                  <p>{moment.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="club-sources">
            <div>
              <span className="eyebrow">سلسلة الإثبات</span>
              <h3>مصادر هذا السجل</h3>
              <p>كل رقم معروض مرتبط بمرجع رسمي أو بملخص منشور عن التقرير النهائي. لا تُحسب الوصافة ضمن الألقاب.</p>
            </div>
            <div className="source-links">
              {club.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  <FileCheck2 size={18} />
                  <span>{source.label}</span>
                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

function Rankings() {
  const ranked = clubs.filter((club) => club.officialTotal).slice(0, 9);
  const max = ranked[0]?.officialTotal ?? 90;
  return (
    <section className="rankings section-shell" id="ranking">
      <div className="section-heading">
        <div><span className="eyebrow">الترتيب العام</span><h2>الأكثر تتويجًا حتى 2025</h2></div>
        <p>الإجمالي يشمل البطولات المحلية والإقليمية والقارية المصنفة في مشروع التوثيق، وليس البطولات الخمس الكبرى فقط.</p>
      </div>
      <div className="rank-table">
        {ranked.map((club) => (
          <div className="rank-row" key={club.id}>
            <span className="rank-number">{club.rank?.toLocaleString("ar-SA")}</span>
            <ClubCrest club={club} size="small" />
            <strong>{club.name}</strong>
            <span className="rank-bar"><i style={{ width: `${((club.officialTotal ?? 0) / max) * 100}%`, background: `linear-gradient(90deg, ${club.primary}, ${club.secondary})` }} /></span>
            <b>{club.officialTotal?.toLocaleString("ar-SA")}</b>
          </div>
        ))}
      </div>
      <a className="text-link" href={sources.ranking} target="_blank" rel="noreferrer">قراءة ملخص الترتيب المنشور <ExternalLink size={14} /></a>
    </section>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("الكل");
  const [selected, setSelected] = useState<Club | null>(null);
  const [mobileNav, setMobileNav] = useState(false);

  const filtered = useMemo(() => {
    const normalized = query.trim();
    return clubs.filter((club) => {
      const matchesQuery = !normalized || [club.name, club.city, club.tagline].some((value) => value.includes(normalized));
      const matchesFilter =
        filter === "الكل" ||
        (filter === "إجمالي موثق" && Boolean(club.officialTotal)) ||
        (filter === "الرياض" && club.city === "الرياض") ||
        (filter === "جدة" && club.city === "جدة") ||
        (filter === "الشرقية" && ["الدمام", "الخبر", "الأحساء"].includes(club.city)) ||
        (filter === "أبطال الكؤوس" && club.categories.some((category) => ["king", "crown"].includes(category.kind)));
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="الصفحة الرئيسية">
          <span className="brand-mark"><Trophy size={18} /></span>
          <span><b>خزانة</b><small>البطولات السعودية</small></span>
        </a>
        <nav className={mobileNav ? "open" : ""}>
          <a href="#clubs" onClick={() => setMobileNav(false)}>الأندية</a>
          <a href="#ranking" onClick={() => setMobileNav(false)}>الترتيب</a>
          <a href="#method" onClick={() => setMobileNav(false)}>المنهجية</a>
          <a href={sources.report} target="_blank" rel="noreferrer">التقرير الرسمي <ExternalLink size={12} /></a>
        </nav>
        <span className="header-status"><i /> آخر توثيق: 2025</span>
        <button className="menu-button" onClick={() => setMobileNav((value) => !value)} aria-label="فتح القائمة">{mobileNav ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <span className="hero-grid" />
        <span className="hero-glow hero-glow-one" />
        <span className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <span className="hero-kicker"><FileCheck2 size={15} /> النسخة الموسوعية الأولى</span>
          <h1>هنا تُحفظ<br /><em>بطولات الوطن</em></h1>
          <p>أرشيف بصري تفاعلي يحكي تاريخ أبطال الكرة السعودية؛ من أول دوري عام 1957 إلى التقرير النهائي لمشروع التوثيق.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#clubs">استكشف الأندية <ArrowLeft size={18} /></a>
            <a className="secondary-action" href={sources.saffNews} target="_blank" rel="noreferrer"><BookOpen size={17} /> منهجية التوثيق</a>
          </div>
        </div>
        <div className="hero-vault" aria-label="عرض بصري للبطولات">
          <div className="vault-orbit orbit-one"><span>الدوري</span><span>الملك</span><span>آسيا</span></div>
          <div className="vault-orbit orbit-two"><i /><i /><i /></div>
          <div className="hero-cup"><span className="cup-shine" /><Trophy /></div>
          <span className="vault-caption"><b>إرثٌ</b> لا يُختصر برقم</span>
        </div>
        <div className="hero-stats">
          {archiveStats.map((stat) => <span key={stat.label}><b>{stat.value}</b><small>{stat.label}</small></span>)}
        </div>
      </section>

      <section className="competitions-strip" aria-label="إحصاءات المسابقات الكبرى">
        <div className="strip-title"><Award size={18} /><span>المسابقات الكبرى</span></div>
        {competitionTotals.map((item) => (
          <div key={item.label}><b>{item.value.toLocaleString("ar-SA")}</b><span>{item.label}</span><small>{item.detail}</small></div>
        ))}
        <div className="strip-note"><Check size={14} /> وفق التصنيف المعتمد</div>
      </section>

      <section className="clubs-section section-shell" id="clubs">
        <div className="section-heading">
          <div><span className="eyebrow">السجل الذهبي</span><h2>اختر ناديك.. وافتح الخزانة</h2></div>
          <p>جميع أبطال البطولات المحلية الكبرى حاضرون هنا، مع إجماليات التقرير للأندية التسعة الأعلى تتويجًا.</p>
        </div>

        <div className="explorer-bar">
          <label className="search-box">
            <Search size={19} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم النادي أو المدينة..." />
            {query ? <button onClick={() => setQuery("")} aria-label="مسح البحث"><X size={15} /></button> : null}
          </label>
          <div className="filter-pills" aria-label="تصفية الأندية">
            <Filter size={16} />
            {filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}
          </div>
        </div>

        <div className="result-line"><span>{filtered.length.toLocaleString("ar-SA")} نادٍ</span><i /></div>
        <div className="clubs-grid">
          {filtered.map((club) => <ClubCard key={club.id} club={club} onOpen={setSelected} />)}
        </div>
        {!filtered.length ? <div className="empty-state"><Search size={26} /><h3>لا يوجد نادٍ مطابق</h3><p>جرّب اسمًا أو مدينة أخرى.</p></div> : null}
      </section>

      <Rankings />

      <section className="method-section" id="method">
        <div className="section-shell method-shell">
          <div className="method-copy">
            <span className="eyebrow light">المنهجية</span>
            <h2>الرقم وحده لا يكفي.<br />المصدر جزء من القصة.</h2>
            <p>بُنيت هذه النسخة على التقرير النهائي لمشروع توثيق تاريخ كرة القدم السعودية، والسجل الذهبي المنشور في سعوديبيديا، ثم صفحات الأندية الرسمية عند توفر التفصيل.</p>
            <div className="method-points">
              <span><FileCheck2 /><b>لائحة الجهة المنظمة</b><small>المرجع الأول في تصنيف المسابقة</small></span>
              <span><Library /><b>مقارنة المصادر</b><small>لا يُقبل تعارض غير مفسّر</small></span>
              <span><Shield /><b>نطاق واضح</b><small>الفريق الأول والبطولات الكبرى</small></span>
            </div>
          </div>
          <aside className="scope-card">
            <span className="scope-icon"><BookOpen /></span>
            <small>نطاق النسخة 1.0</small>
            <h3>13 بطلًا للمسابقات الكبرى</h3>
            <p>يشمل الدليل جميع أبطال الدوري وكأس الملك وكأس ولي العهد والسوبر وكأس المؤسس، وإجمالي البطولات الموثق للتسعة الأوائل. بطولات الدرجات والفئات السنية البالغ أبطالها 155 ناديًا هي المرحلة التالية.</p>
            <a href={sources.report} target="_blank" rel="noreferrer">فتح التقرير النهائي <ExternalLink size={15} /></a>
          </aside>
        </div>
      </section>

      <section className="source-band section-shell">
        <div><span className="eyebrow">المراجع الأساسية</span><h2>وثيقة، ثم رقم، ثم قصة.</h2></div>
        <div className="source-band-links">
          <a href={sources.saffNews} target="_blank" rel="noreferrer"><span><FileCheck2 /><b>الاتحاد السعودي</b><small>إعلان التقرير النهائي</small></span><ExternalLink /></a>
          <a href={sources.saudipedia} target="_blank" rel="noreferrer"><span><Landmark /><b>سعوديبيديا</b><small>السجل الذهبي للمسابقات الكبرى</small></span><ExternalLink /></a>
          <a href={sources.ranking} target="_blank" rel="noreferrer"><span><Medal /><b>التقرير المنشور</b><small>ترتيب الإجماليات حتى 2025</small></span><ExternalLink /></a>
        </div>
      </section>

      <footer>
        <a href="#top" className="brand footer-brand"><span className="brand-mark"><Trophy size={18} /></span><span><b>خزانة</b><small>البطولات السعودية</small></span></a>
        <p>مشروع موسوعي مستقل لعرض التاريخ الموثق بصريًا. تُعرض شعارات الأندية الحقيقية مع إحالة إلى مرجع ملف كل شعار داخل سجل النادي.</p>
        <span>البيانات الأساسية: مشروع توثيق تاريخ كرة القدم السعودية © 2025</span>
      </footer>

      {selected ? <ClubDrawer club={selected} onClose={() => setSelected(null)} /> : null}
    </main>
  );
}
