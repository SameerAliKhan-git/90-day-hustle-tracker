'use client';

import { useState, useEffect, useMemo } from 'react';

// ─── Schedule Block Types ───
type BlockCategory = 'ugc-net' | 'data-science' | 'job-prep' | 'fitness' | 'health' | 'routine' | 'break' | 'college';

interface ScheduleBlock {
  id: string;
  startTime: string; // "HH:MM" 24hr
  endTime: string;
  title: string;
  description: string;
  category: BlockCategory;
  emoji: string;
}

const CATEGORY_META: Record<BlockCategory, { label: string; color: string; gradient: string }> = {
  'ugc-net':       { label: 'UGC NET JRF', color: '#a78bfa', gradient: 'linear-gradient(135deg, #a78bfa, #c4b5fd)' },
  'data-science':  { label: 'Data Science', color: '#00f5d4', gradient: 'linear-gradient(135deg, #00f5d4, #5eead4)' },
  'job-prep':      { label: 'Job Prep', color: '#ff4d6d', gradient: 'linear-gradient(135deg, #ff4d6d, #ff8fa3)' },
  'fitness':       { label: 'Fitness', color: '#ff4d6d', gradient: 'linear-gradient(135deg, #ff4d6d, #ff8fa3)' },
  'health':        { label: 'Health', color: '#f472b6', gradient: 'linear-gradient(135deg, #f472b6, #f9a8d4)' },
  'routine':       { label: 'Routine', color: '#6b6b8a', gradient: 'linear-gradient(135deg, #6b6b8a, #8b8ba0)' },
  'break':         { label: 'Break', color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #93c5fd)' },
  'college':       { label: 'College', color: '#ffd60a', gradient: 'linear-gradient(135deg, #ffd60a, #fde68a)' },
};

// ─── The Timetable ───
// Realistic 91-day hustle schedule: ~10h study, 1h fitness, health-conscious
// ─── Weekday Schedule (College 9 AM – 4 PM) ───
const DAILY_SCHEDULE: ScheduleBlock[] = [
  {
    id: 'wake',
    startTime: '05:30',
    endTime: '06:00',
    title: 'Wake Up & Morning Routine',
    description: 'Brush, freshen up, drink warm water with lemon, 5-min stretching.',
    category: 'routine',
    emoji: '🌅',
  },
  {
    id: 'workout',
    startTime: '06:00',
    endTime: '06:45',
    title: 'Workout & Exercise',
    description: 'Strength / running / yoga — 45 min before college. No excuses.',
    category: 'fitness',
    emoji: '🏋️',
  },
  {
    id: 'bath-bfast',
    startTime: '06:45',
    endTime: '07:15',
    title: 'Bath & Healthy Breakfast',
    description: 'Cold shower → oats/eggs/fruits. Hydrate well before the long day.',
    category: 'health',
    emoji: '🥣',
  },
  {
    id: 'ugc-morning',
    startTime: '07:15',
    endTime: '08:30',
    title: 'UGC NET — Paper I (Morning Block)',
    description: 'Teaching aptitude, reasoning, comprehension. Fresh mind = best retention.',
    category: 'ugc-net',
    emoji: '📚',
  },
  {
    id: 'commute-to',
    startTime: '08:30',
    endTime: '09:00',
    title: 'Get Ready & Commute to College',
    description: 'Listen to revision podcasts or flashcard review during commute.',
    category: 'routine',
    emoji: '🚌',
  },
  {
    id: 'college-am',
    startTime: '09:00',
    endTime: '12:30',
    title: 'College — Morning Lectures',
    description: 'Master\'s program classes. Pay attention — it overlaps with UGC syllabus. Use free periods for quick revision.',
    category: 'college',
    emoji: '🎓',
  },
  {
    id: 'college-lunch',
    startTime: '12:30',
    endTime: '13:00',
    title: 'Lunch at College',
    description: 'Balanced meal. Use remaining time for light DS reading on phone.',
    category: 'health',
    emoji: '🍛',
  },
  {
    id: 'college-pm',
    startTime: '13:00',
    endTime: '16:00',
    title: 'College — Afternoon Lectures',
    description: 'Attend all classes. Use free slots to solve UGC PYQs or review notes.',
    category: 'college',
    emoji: '🎓',
  },
  {
    id: 'commute-back',
    startTime: '16:00',
    endTime: '16:30',
    title: 'Commute Back + Tea Break',
    description: 'Head home. Quick chai/snack. Decompress for 10 min then grind.',
    category: 'break',
    emoji: '🍵',
  },
  {
    id: 'ds1',
    startTime: '16:30',
    endTime: '18:30',
    title: 'Data Science — Krish Naik Course',
    description: 'Watch lectures, code along. Python → ML → DL → NLP. Hands-on practice.',
    category: 'data-science',
    emoji: '🧪',
  },
  {
    id: 'fitness2',
    startTime: '18:30',
    endTime: '19:00',
    title: 'Evening Walk / Light Yoga',
    description: 'Evening jog or stretching. Clears the head after long day.',
    category: 'fitness',
    emoji: '🧘',
  },
  {
    id: 'dinner',
    startTime: '19:00',
    endTime: '19:30',
    title: 'Dinner',
    description: 'Light dinner — include protein & veggies. No heavy fried food.',
    category: 'health',
    emoji: '🥗',
  },
  {
    id: 'ugc-evening',
    startTime: '19:30',
    endTime: '21:00',
    title: 'UGC NET — Paper II & Mock Tests',
    description: 'Core CS: DSA, DBMS, OS, CN, TOC. Practice mock papers, PYQ analysis.',
    category: 'ugc-net',
    emoji: '📝',
  },
  {
    id: 'job1',
    startTime: '21:00',
    endTime: '22:00',
    title: 'Job Prep — Resume, LinkedIn & Applications',
    description: 'Portfolio updates, apply to 2-3 jobs, mock interview prep, DSA practice.',
    category: 'job-prep',
    emoji: '💼',
  },
  {
    id: 'wind-down',
    startTime: '22:00',
    endTime: '22:30',
    title: 'Wind Down & Reflection',
    description: 'Log progress in tracker. Plan tomorrow. Gratitude journaling. NO screens after this.',
    category: 'routine',
    emoji: '📓',
  },
  {
    id: 'sleep',
    startTime: '22:30',
    endTime: '05:30',
    title: 'Sleep — 7 Hours',
    description: '7 hours of quality sleep. Phone on silent, room dark. Recovery is growth.',
    category: 'health',
    emoji: '😴',
  },
];

// ─── Helper: Parse "HH:MM" to minutes since midnight ───
function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// ─── Helper: Format "HH:MM" to 12hr ───
function formatTime12(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
}

// ─── Helper: get block duration label ───
function durationLabel(start: string, end: string): string {
  let diff = timeToMinutes(end) - timeToMinutes(start);
  if (diff < 0) diff += 24 * 60; // overnight
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// ─── Weekend Schedule ───
const WEEKEND_SCHEDULE: ScheduleBlock[] = [
  { id: 'w-wake', startTime: '06:30', endTime: '07:00', title: 'Wake Up & Morning Routine', description: 'Extra 1hr sleep on weekends. Stretch, hydrate, freshen up.', category: 'routine', emoji: '🌅' },
  { id: 'w-workout', startTime: '07:00', endTime: '08:00', title: 'Extended Workout', description: 'Long run, full-body workout, or outdoor sports. Push harder on weekends.', category: 'fitness', emoji: '🏋️' },
  { id: 'w-bath', startTime: '08:00', endTime: '08:30', title: 'Bath & Breakfast', description: 'Relaxed breakfast — cook something nice. Protein-heavy.', category: 'health', emoji: '🥣' },
  { id: 'w-ugc1', startTime: '08:30', endTime: '11:00', title: 'UGC NET — Deep Study Block', description: 'Long uninterrupted study session. Mock tests + revision of weak areas.', category: 'ugc-net', emoji: '📚' },
  { id: 'w-break1', startTime: '11:00', endTime: '11:15', title: 'Break', description: 'Walk, stretch, snack.', category: 'break', emoji: '☕' },
  { id: 'w-ds1', startTime: '11:15', endTime: '13:30', title: 'Data Science — Course + Projects', description: 'Krish Naik course lectures + project work. Build portfolio pieces.', category: 'data-science', emoji: '🧪' },
  { id: 'w-lunch', startTime: '13:30', endTime: '14:30', title: 'Lunch & Longer Rest', description: 'Longer break on weekends. Eat well, 20-min nap if needed.', category: 'health', emoji: '🍛' },
  { id: 'w-ugc2', startTime: '14:30', endTime: '16:30', title: 'UGC NET — Paper II Practice', description: 'Solve previous year papers. Focus on problem-solving speed.', category: 'ugc-net', emoji: '📝' },
  { id: 'w-break2', startTime: '16:30', endTime: '17:00', title: 'Tea Break & Recharge', description: 'Chai/coffee, light walk. Social media catch-up (limit 15 min).', category: 'break', emoji: '🍵' },
  { id: 'w-ds2', startTime: '17:00', endTime: '19:00', title: 'Data Science — Kaggle & Practice', description: 'Kaggle competitions, EDA practice, model optimization.', category: 'data-science', emoji: '💻' },
  { id: 'w-dinner', startTime: '19:00', endTime: '19:30', title: 'Dinner', description: 'Light dinner. Include veggies and protein.', category: 'health', emoji: '🥗' },
  { id: 'w-job', startTime: '19:30', endTime: '21:00', title: 'Job Prep — Portfolio & Applications', description: 'Update GitHub, build projects, apply to jobs, practice DSA.', category: 'job-prep', emoji: '💼' },
  { id: 'w-review', startTime: '21:00', endTime: '22:00', title: 'Weekly Review & Planning', description: 'Review the week. Set next week goals. Plan schedule adjustments.', category: 'routine', emoji: '📓' },
  { id: 'w-sleep', startTime: '22:00', endTime: '06:30', title: 'Sleep — 8.5 Hours', description: 'Extra recovery sleep on weekends. Recharge for the week ahead.', category: 'health', emoji: '😴' },
];

type DayType = 'weekday' | 'weekend';

// ─── Component ───
export function Timetable() {
  const [now, setNow] = useState<Date | null>(null);
  const [dayType, setDayType] = useState<DayType>('weekday');

  useEffect(() => {
    const d = new Date();
    setNow(d);
    // Auto-detect weekday/weekend
    const dow = d.getDay();
    if (dow === 0 || dow === 6) setDayType('weekend');
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const activeSchedule = dayType === 'weekday' ? DAILY_SCHEDULE : WEEKEND_SCHEDULE;

  // Current time in minutes
  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1;

  // Determine status of each block
  const blockStatuses = useMemo(() => {
    if (!now) return activeSchedule.map(() => 'upcoming' as const);

    return activeSchedule.map(block => {
      const start = timeToMinutes(block.startTime);
      const end = timeToMinutes(block.endTime);

      // Handle overnight block
      if (end <= start) {
        if (nowMinutes >= end && nowMinutes < start) return 'passed' as const;
        if (nowMinutes >= start || nowMinutes < end) return 'current' as const;
        return 'passed' as const;
      }

      if (nowMinutes >= end) return 'passed' as const;
      if (nowMinutes >= start && nowMinutes < end) return 'current' as const;
      return 'upcoming' as const;
    });
  }, [now, nowMinutes, activeSchedule]);

  // Summary: total hours per category
  const summary = useMemo(() => {
    const totals: Partial<Record<BlockCategory, number>> = {};
    activeSchedule.forEach(block => {
      if (block.category === 'routine' || block.category === 'break' || block.category === 'health') return;
      let diff = timeToMinutes(block.endTime) - timeToMinutes(block.startTime);
      if (diff < 0) diff += 24 * 60;
      totals[block.category] = (totals[block.category] || 0) + diff;
    });
    return totals;
  }, [activeSchedule]);

  return (
    <div className="timetable">
      {/* Header with glass date card */}
      <div className="tt-header-row">
        <div className="tt-header">
          <h3 className="tt-title">📅 Daily Battle Plan</h3>
          <p className="tt-subtitle">
            {now ? now.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }) : '...'}
            {now && <span className="tt-now"> • {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>}
          </p>
        </div>
        <div className="tt-glass-card">
          <span className="tt-glass-weekday">{now ? now.toLocaleDateString('en-US', { weekday: 'long' }) : '---'}</span>
          <span className="tt-glass-date">{now ? String(now.getDate()).padStart(2, '0') : '--'}</span>
          <span className="tt-glass-month">{now ? now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '---'}</span>
        </div>
      </div>

      {/* Day type toggle */}
      <div className="tt-day-toggle">
        <button className={`tt-day-btn ${dayType === 'weekday' ? 'active' : ''}`} onClick={() => setDayType('weekday')}>Weekday</button>
        <button className={`tt-day-btn ${dayType === 'weekend' ? 'active' : ''}`} onClick={() => setDayType('weekend')}>Weekend</button>
      </div>

      {/* Summary chips */}
      <div className="tt-summary">
        {(Object.entries(summary) as [BlockCategory, number][]).map(([cat, mins]) => (
          <div
            key={cat}
            className="tt-chip"
            style={{ '--chip-color': CATEGORY_META[cat].color } as React.CSSProperties}
          >
            <span className="tt-chip-dot" />
            <span className="tt-chip-label">{CATEGORY_META[cat].label}</span>
            <span className="tt-chip-value">{Math.floor(mins / 60)}h{mins % 60 > 0 ? ` ${mins % 60}m` : ''}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="tt-timeline">
        {activeSchedule.map((block, i) => {
          const status = blockStatuses[i];
          const meta = CATEGORY_META[block.category];

          return (
            <div
              key={block.id}
              className={`tt-block ${status}`}
            >
              {/* Time column */}
              <div className="tt-time-col">
                <span className="tt-time-start">{formatTime12(block.startTime)}</span>
                <span className="tt-duration">{durationLabel(block.startTime, block.endTime)}</span>
              </div>

              {/* Timeline track */}
              <div className="tt-track">
                <div
                  className={`tt-dot ${status}`}
                  style={{ background: status === 'current' ? meta.color : undefined }}
                />
                {i < activeSchedule.length - 1 && (
                  <div className={`tt-line ${status}`} />
                )}
              </div>

              {/* Content card */}
              <div
                className={`tt-card ${status}`}
                style={{
                  '--card-color': meta.color,
                  '--card-gradient': meta.gradient,
                } as React.CSSProperties}
              >
                <div className="tt-card-header">
                  <span className="tt-emoji">{block.emoji}</span>
                  <div className="tt-card-titles">
                    <span className="tt-card-title">{block.title}</span>
                    <span className="tt-card-category" style={{ color: meta.color }}>{meta.label}</span>
                  </div>
                  {status === 'current' && (
                    <span className="tt-live-badge">NOW</span>
                  )}
                </div>
                <p className="tt-card-desc">{block.description}</p>
                <div className="tt-card-time-range">
                  {formatTime12(block.startTime)} — {formatTime12(block.endTime)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="tt-footer-note">
        <span>🎓 <strong>College:</strong> 9AM–4PM</span>
        <span>📖 <strong>Self-Study:</strong> ~{dayType === 'weekday' ? '5.5' : '10'}h</span>
        <span>😴 <strong>Sleep:</strong> 7h</span>
        <span>🔒 Passed slots are blurred</span>
      </div>
    </div>
  );
}
