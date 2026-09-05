'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.css';

type TimeMode = 'now' | 'manual';

type WeightEntry = {
  id: string;
  weight: number;
  date: string;
  time: string;
  afterBathroom: boolean;
  sleepTime: string;
  lastMealTime: string;
  note: string;
  createdAt: string;
};

type WeeklySummary = {
  key: string;
  start: Date;
  end: Date;
  average: number;
  count: number;
};

const STORAGE_KEY = 'azkl3-personal-weight-tracker-v1';
const locale = 'ar-SA-u-nu-latn';

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function toDateInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function toTimeInput(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function entryTimestamp(entry: WeightEntry) {
  return new Date(`${entry.date}T${entry.time || '00:00'}:00`).getTime();
}

function getWeekStart(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const daysSinceSaturday = (result.getDay() + 1) % 7;
  result.setDate(result.getDate() - daysSinceSaturday);
  return result;
}

function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, options ?? { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function formatEntryDate(entry: WeightEntry) {
  const date = new Date(`${entry.date}T${entry.time || '00:00'}:00`);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function number(value: number, digits = 1) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function hoursSinceMeal(entry: WeightEntry) {
  if (!entry.lastMealTime || !entry.time) return null;
  const [wh, wm] = entry.time.split(':').map(Number);
  const [mh, mm] = entry.lastMealTime.split(':').map(Number);
  let weighMinutes = wh * 60 + wm;
  let mealMinutes = mh * 60 + mm;
  if (mealMinutes > weighMinutes) mealMinutes -= 24 * 60;
  const diff = (weighMinutes - mealMinutes) / 60;
  return diff >= 0 && diff <= 24 ? diff : null;
}

function TrendChart({ entries }: { entries: WeightEntry[] }) {
  const points = useMemo(() => {
    const recent = [...entries].sort((a, b) => entryTimestamp(a) - entryTimestamp(b)).slice(-30);
    if (recent.length < 2) return { recent, polyline: '', min: 0, max: 0 };
    const weights = recent.map((item) => item.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = Math.max(max - min, 0.5);
    const polyline = recent
      .map((item, index) => {
        const x = recent.length === 1 ? 50 : (index / (recent.length - 1)) * 100;
        const y = 88 - ((item.weight - min) / range) * 72;
        return `${x},${y}`;
      })
      .join(' ');
    return { recent, polyline, min, max };
  }, [entries]);

  if (points.recent.length < 2) {
    return <div className={styles.chartEmpty}>أضف تسجيلين على الأقل عشان يظهر خط التقدم.</div>;
  }

  const first = points.recent[0];
  const last = points.recent[points.recent.length - 1];

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartScale}>
        <span>{number(points.max)} كجم</span>
        <span>{number(points.min)} كجم</span>
      </div>
      <svg className={styles.chart} viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="منحنى الوزن">
        <line x1="0" y1="20" x2="100" y2="20" className={styles.gridLine} />
        <line x1="0" y1="50" x2="100" y2="50" className={styles.gridLine} />
        <line x1="0" y1="80" x2="100" y2="80" className={styles.gridLine} />
        <polyline points={points.polyline} className={styles.trendLine} />
      </svg>
      <div className={styles.chartDates}>
        <span>{formatDate(new Date(`${first.date}T00:00:00`), { day: 'numeric', month: 'short' })}</span>
        <span>{formatDate(new Date(`${last.date}T00:00:00`), { day: 'numeric', month: 'short' })}</span>
      </div>
    </div>
  );
}

export default function WeightTrackerPage() {
  const now = new Date();
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(toDateInput(now));
  const [time, setTime] = useState(toTimeInput(now));
  const [timeMode, setTimeMode] = useState<TimeMode>('now');
  const [afterBathroom, setAfterBathroom] = useState(true);
  const [sleepTime, setSleepTime] = useState('');
  const [lastMealTime, setLastMealTime] = useState('');
  const [note, setNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setEntries(parsed);
      }
    } catch {
      // Keep the page usable even if local storage is corrupted or blocked.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, loaded]);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => entryTimestamp(b) - entryTimestamp(a)),
    [entries]
  );

  const weeklySummaries = useMemo<WeeklySummary[]>(() => {
    const groups = new Map<string, WeightEntry[]>();
    entries.forEach((entry) => {
      const d = new Date(`${entry.date}T${entry.time || '00:00'}:00`);
      const start = getWeekStart(d);
      const key = toDateInput(start);
      const current = groups.get(key) ?? [];
      current.push(entry);
      groups.set(key, current);
    });

    return [...groups.entries()]
      .map(([key, group]) => {
        const start = new Date(`${key}T00:00:00`);
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return {
          key,
          start,
          end,
          average: group.reduce((sum, item) => sum + item.weight, 0) / group.length,
          count: group.length,
        };
      })
      .sort((a, b) => b.start.getTime() - a.start.getTime());
  }, [entries]);

  const latest = sortedEntries[0] ?? null;
  const oldest = sortedEntries[sortedEntries.length - 1] ?? null;
  const currentWeek = weeklySummaries[0] ?? null;
  const totalChange = latest && oldest ? latest.weight - oldest.weight : null;
  const latestPostBathroom = sortedEntries.find((item) => item.afterBathroom) ?? null;

  function resetForm() {
    const current = new Date();
    setEditingId(null);
    setWeight('');
    setDate(toDateInput(current));
    setTime(toTimeInput(current));
    setTimeMode('now');
    setAfterBathroom(true);
    setSleepTime('');
    setLastMealTime('');
    setNote('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const parsedWeight = Number(weight);
    if (!Number.isFinite(parsedWeight) || parsedWeight <= 0 || parsedWeight > 500) {
      window.alert('اكتب وزن صحيح بالكيلو.');
      return;
    }

    const current = new Date();
    const finalDate = timeMode === 'now' && !editingId ? toDateInput(current) : date;
    const finalTime = timeMode === 'now' && !editingId ? toTimeInput(current) : time;

    if (!finalDate || !finalTime) {
      window.alert('اختر التاريخ والوقت.');
      return;
    }

    const newEntry: WeightEntry = {
      id: editingId ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      weight: Math.round(parsedWeight * 100) / 100,
      date: finalDate,
      time: finalTime,
      afterBathroom,
      sleepTime,
      lastMealTime,
      note: note.trim(),
      createdAt: editingId
        ? entries.find((item) => item.id === editingId)?.createdAt ?? current.toISOString()
        : current.toISOString(),
    };

    setEntries((currentEntries) => {
      if (editingId) return currentEntries.map((item) => (item.id === editingId ? newEntry : item));
      return [...currentEntries, newEntry];
    });
    resetForm();
  }

  function editEntry(entry: WeightEntry) {
    setEditingId(entry.id);
    setWeight(String(entry.weight));
    setDate(entry.date);
    setTime(entry.time);
    setTimeMode('manual');
    setAfterBathroom(entry.afterBathroom);
    setSleepTime(entry.sleepTime);
    setLastMealTime(entry.lastMealTime);
    setNote(entry.note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteEntry(id: string) {
    if (!window.confirm('متأكد تبغى تحذف هذا التسجيل؟')) return;
    setEntries((currentEntries) => currentEntries.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  }

  function exportData() {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), entries }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `weight-tracker-backup-${toDateInput(new Date())}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const imported = Array.isArray(parsed) ? parsed : parsed.entries;
      if (!Array.isArray(imported)) throw new Error('invalid');
      const valid = imported.filter(
        (item) => item && typeof item.id === 'string' && typeof item.weight === 'number' && typeof item.date === 'string'
      );
      if (!window.confirm(`سيتم استبدال بياناتك الحالية بـ ${valid.length} تسجيل. متأكد؟`)) return;
      setEntries(valid);
      resetForm();
    } catch {
      window.alert('الملف غير صالح أو ليس نسخة احتياطية من الموقع.');
    } finally {
      event.target.value = '';
    }
  }

  function clearAll() {
    if (!window.confirm('هذا بيحذف كل سجلات الوزن من هذا الجهاز. متأكد؟')) return;
    if (!window.confirm('تأكيد أخير: حذف جميع البيانات نهائيًا؟')) return;
    setEntries([]);
    resetForm();
  }

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>متابعة شخصية</span>
            <h1>سجل وزني</h1>
            <p>سجّل وزنك بنفس الظروف قدر الإمكان، وشوف المتوسط الأسبوعي بدل ما تحكم على يوم واحد.</p>
          </div>
          <div className={styles.privacyPill}>🔒 البيانات محفوظة على جهازك</div>
        </header>

        <section className={styles.statsGrid} aria-label="ملخص الوزن">
          <article className={styles.statCard}>
            <span>آخر وزن</span>
            <strong>{latest ? `${number(latest.weight)} كجم` : '—'}</strong>
            <small>{latest ? formatEntryDate(latest) : 'ابدأ أول تسجيل'}</small>
          </article>
          <article className={styles.statCard}>
            <span>متوسط الأسبوع</span>
            <strong>{currentWeek ? `${number(currentWeek.average)} كجم` : '—'}</strong>
            <small>{currentWeek ? `${currentWeek.count} تسجيل هذا الأسبوع` : 'لا يوجد بيانات'}</small>
          </article>
          <article className={styles.statCard}>
            <span>التغير من البداية</span>
            <strong className={totalChange !== null && totalChange < 0 ? styles.good : undefined}>
              {totalChange === null ? '—' : `${totalChange > 0 ? '+' : ''}${number(totalChange)} كجم`}
            </strong>
            <small>{oldest ? `من ${formatDate(new Date(`${oldest.date}T00:00:00`), { day: 'numeric', month: 'short' })}` : '—'}</small>
          </article>
          <article className={styles.statCard}>
            <span>آخر وزن بعد دورة المياه</span>
            <strong>{latestPostBathroom ? `${number(latestPostBathroom.weight)} كجم` : '—'}</strong>
            <small>{latestPostBathroom ? formatEntryDate(latestPostBathroom) : 'ما فيه تسجيل حتى الآن'}</small>
          </article>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>{editingId ? 'تعديل تسجيل' : 'تسجيل جديد'}</span>
              <h2>{editingId ? 'عدّل القياس' : 'وش وزنك اليوم؟'}</h2>
            </div>
            {editingId && (
              <button type="button" className={styles.textButton} onClick={resetForm}>
                إلغاء التعديل
              </button>
            )}
          </div>

          <form onSubmit={submit} className={styles.form}>
            <label className={styles.fieldWide}>
              <span>الوزن بالكيلو</span>
              <div className={styles.weightInputWrap}>
                <input
                  className={styles.weightInput}
                  type="number"
                  inputMode="decimal"
                  step="0.05"
                  min="1"
                  max="500"
                  placeholder="مثال: 164.8"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  autoFocus
                  required
                />
                <b>كجم</b>
              </div>
            </label>

            <div className={styles.fieldWide}>
              <span className={styles.labelText}>وقت القياس</span>
              <div className={styles.segmented}>
                <button
                  type="button"
                  className={timeMode === 'now' ? styles.segmentActive : ''}
                  onClick={() => setTimeMode('now')}
                >
                  الآن تلقائي
                </button>
                <button
                  type="button"
                  className={timeMode === 'manual' ? styles.segmentActive : ''}
                  onClick={() => setTimeMode('manual')}
                >
                  أختار الوقت
                </button>
              </div>
            </div>

            {timeMode === 'manual' && (
              <>
                <label>
                  <span>التاريخ</span>
                  <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
                </label>
                <label>
                  <span>الساعة</span>
                  <input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
                </label>
              </>
            )}

            <div className={styles.fieldWide}>
              <span className={styles.labelText}>بعد دورة المياه؟</span>
              <div className={styles.segmented}>
                <button
                  type="button"
                  className={afterBathroom ? styles.segmentActive : ''}
                  onClick={() => setAfterBathroom(true)}
                >
                  نعم
                </button>
                <button
                  type="button"
                  className={!afterBathroom ? styles.segmentActive : ''}
                  onClick={() => setAfterBathroom(false)}
                >
                  لا
                </button>
              </div>
            </div>

            <label>
              <span>تقريبًا متى نمت؟</span>
              <input type="time" value={sleepTime} onChange={(event) => setSleepTime(event.target.value)} />
            </label>
            <label>
              <span>وقت آخر وجبة</span>
              <input type="time" value={lastMealTime} onChange={(event) => setLastMealTime(event.target.value)} />
            </label>

            <label className={styles.fieldWide}>
              <span>ملاحظة اختيارية</span>
              <input
                type="text"
                maxLength={120}
                placeholder="مثال: نوم قليل، وجبة متأخرة، تمرين..."
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>

            <button type="submit" className={styles.primaryButton}>
              {editingId ? 'حفظ التعديل' : 'حفظ الوزن'}
            </button>
          </form>
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>آخر 30 تسجيل</span>
              <h2>خط التقدم</h2>
            </div>
          </div>
          <TrendChart entries={entries} />
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>السبت — الجمعة</span>
              <h2>المتوسط الأسبوعي</h2>
            </div>
          </div>
          {weeklySummaries.length === 0 ? (
            <div className={styles.emptyState}>بعد أول تسجيل بيظهر لك متوسط الأسبوع هنا.</div>
          ) : (
            <div className={styles.weekList}>
              {weeklySummaries.map((week, index) => {
                const previous = weeklySummaries[index + 1];
                const diff = previous ? week.average - previous.average : null;
                return (
                  <article className={styles.weekRow} key={week.key}>
                    <div>
                      <strong>{number(week.average)} كجم</strong>
                      <span>
                        {formatDate(week.start, { day: 'numeric', month: 'short' })} — {formatDate(week.end, { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <div className={styles.weekMeta}>
                      <span>{week.count} تسجيل</span>
                      {diff !== null && (
                        <b className={diff < 0 ? styles.good : diff > 0 ? styles.up : undefined}>
                          {diff > 0 ? '+' : ''}{number(diff)} كجم
                        </b>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>السجل الكامل</span>
              <h2>قياساتي</h2>
            </div>
            <span className={styles.countPill}>{entries.length} تسجيل</span>
          </div>

          {sortedEntries.length === 0 ? (
            <div className={styles.emptyState}>ما عندك تسجيلات إلى الآن. سجّل أول وزن من فوق.</div>
          ) : (
            <div className={styles.entriesList}>
              {sortedEntries.map((entry) => {
                const mealGap = hoursSinceMeal(entry);
                return (
                  <article className={styles.entryRow} key={entry.id}>
                    <div className={styles.entryWeight}>
                      <strong>{number(entry.weight)}</strong>
                      <span>كجم</span>
                    </div>
                    <div className={styles.entryInfo}>
                      <b>{formatEntryDate(entry)}</b>
                      <div className={styles.tags}>
                        <span className={entry.afterBathroom ? styles.tagGood : styles.tag}>دورة المياه: {entry.afterBathroom ? 'نعم' : 'لا'}</span>
                        {entry.sleepTime && <span className={styles.tag}>النوم: {entry.sleepTime}</span>}
                        {entry.lastMealTime && <span className={styles.tag}>آخر وجبة: {entry.lastMealTime}</span>}
                        {mealGap !== null && <span className={styles.tag}>بعد الوجبة بـ {number(mealGap)} س</span>}
                      </div>
                      {entry.note && <p>{entry.note}</p>}
                    </div>
                    <div className={styles.entryActions}>
                      <button type="button" onClick={() => editEntry(entry)}>تعديل</button>
                      <button type="button" className={styles.dangerText} onClick={() => deleteEntry(entry.id)}>حذف</button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className={styles.card}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionKicker}>الخصوصية والنسخ الاحتياطي</span>
              <h2>بياناتي</h2>
            </div>
          </div>
          <p className={styles.storageNote}>
            السجلات تُحفظ في هذا المتصفح فقط ولا تُرفع تلقائيًا لأي قاعدة بيانات. خذ نسخة احتياطية بين فترة وفترة، خصوصًا قبل تغيير الجوال أو حذف بيانات المتصفح.
          </p>
          <div className={styles.backupActions}>
            <button type="button" className={styles.secondaryButton} onClick={exportData} disabled={entries.length === 0}>تصدير نسخة احتياطية</button>
            <button type="button" className={styles.secondaryButton} onClick={() => fileInputRef.current?.click()}>استيراد نسخة</button>
            <button type="button" className={styles.dangerButton} onClick={clearAll} disabled={entries.length === 0}>حذف كل البيانات</button>
            <input ref={fileInputRef} className={styles.hiddenInput} type="file" accept="application/json,.json" onChange={importData} />
          </div>
        </section>

        <footer className={styles.footer}>
          <span>سجل وزني الشخصي</span>
          <span>أفضل مقارنة: نفس الوقت ونفس ظروف القياس قدر الإمكان.</span>
        </footer>
      </div>
    </main>
  );
}
