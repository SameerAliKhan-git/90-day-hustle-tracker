'use client';

import { useState, useEffect, useMemo } from 'react';

// ─── Schedule Block Types ───
type BlockCategory = 'ugc-net' | 'data-science' | 'job-prep' | 'fitness' | 'health' | 'routine' | 'break';

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
  'ugc-net':       { label: 'UGC NET JRF', color: '#818cf8', gradient: 'linear-gradient(135deg, #818cf8, #a78bfa)' },
  'data-science':  { label: 'Data Science', color: '#34d399', gradient: 'linear-gradient(135deg, #34d399, #6ee7b7)' },
  'job-prep':      { label: 'Job Prep', color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24, #fcd34d)' },
  'fitness':       { label: 'Fitness', color: '#f87171', gradient: 'linear-gradient(135deg, #f87171, #fca5a5)' },
  'health':        { label: 'Health', color: '#f472b6', gradient: 'linear-gradient(135deg, #f472b6, #f9a8d4)' },
  'routine':       { label: 'Routine', color: '#9ca3af', gradient: 'linear-gradient(135deg, #6b7280, #9ca3af)' },
  'break':         { label: 'Break', color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #93c5fd)' },
};

// ─── The Timetable ───
// Realistic 91-day hustle schedule: ~10h study, 1h fitness, health-conscious
const DAILY_SCHEDULE: ScheduleBlock[] = [
  {
    id: 'wake',
    startTime: '05:30',
    endTime: '06:00',
    title: 'Wake Up & Morning Routine',
    description: 'Brush, freshen up, drink warm water with lemon, 5-min stretching',
    category: 'routine',
    emoji: '🌅',
  },
  {
    id: 'workout',
    startTime: '06:00',
    endTime: '07:00',
    title: 'Workout & Exercise',
    description: 'Strength training / running / yoga — alternate days. No excuses.',
    category: 'fitness',
    emoji: '🏋️',
  },
  {
    id: 'bath-bfast',
    startTime: '07:00',
    endTime: '07:30',
    title: 'Bath & Healthy Breakfast',
    description: 'Cold shower → oats/eggs/fruits, no junk. Hydrate well.',
    category: 'health',
    emoji: '🥣',
  },
  {
    id: 'ugc1',
    startTime: '07:30',
    endTime: '09:30',
    title: 'UGC NET — Paper I (Reasoning & Aptitude)',
    description: 'Teaching aptitude, research methodology, reasoning, comprehension. Fresh mind = best retention.',
    category: 'ugc-net',
    emoji: '📚',
  },
  {
    id: 'break1',
    startTime: '09:30',
    endTime: '09:45',
    title: 'Short Break',
    description: 'Walk around, hydrate, eye rest. No phone scrolling.',
    category: 'break',
    emoji: '☕',
  },
  {
    id: 'ugc2',
    startTime: '09:45',
    endTime: '11:45',
    title: 'UGC NET — Paper II (Computer Science)',
    description: 'Core CS subjects: DSA, DBMS, OS, CN, TOC. Solve previous year Qs.',
    category: 'ugc-net',
    emoji: '📖',
  },
  {
    id: 'break2',
    startTime: '11:45',
    endTime: '12:00',
    title: 'Short Break + Snack',
    description: 'Light healthy snack — dry fruits/banana. Stretch your back.',
    category: 'health',
    emoji: '🍌',
  },
  {
    id: 'ds1',
    startTime: '12:00',
    endTime: '14:00',
    title: 'Data Science — Krish Naik Course',
    description: 'Watch lectures, code along. Python → ML → DL → NLP. Hands-on practice.',
    category: 'data-science',
    emoji: '🧪',
  },
  {
    id: 'lunch',
    startTime: '14:00',
    endTime: '14:45',
    title: 'Lunch & Rest',
    description: 'Balanced meal: dal-rice/roti-sabzi, salad. No heavy fried food. 10-min power nap.',
    category: 'health',
    emoji: '🍛',
  },
  {
    id: 'ds2',
    startTime: '14:45',
    endTime: '16:45',
    title: 'Data Science — Projects & Practice',
    description: 'Build projects, Kaggle notebooks, EDA, model training. Portfolio-worthy work.',
    category: 'data-science',
    emoji: '💻',
  },
  {
    id: 'break3',
    startTime: '16:45',
    endTime: '17:00',
    title: 'Tea Break & Walk',
    description: 'Green tea/chai, 10-min walk. Clear your head.',
    category: 'break',
    emoji: '🍵',
  },
  {
    id: 'ugc3',
    startTime: '17:00',
    endTime: '18:30',
    title: 'UGC NET — Mock Tests & Revision',
    description: 'Practice mock papers, revise weak topics, PYQ analysis.',
    category: 'ugc-net',
    emoji: '📝',
  },
  {
    id: 'fitness2',
    startTime: '18:30',
    endTime: '19:00',
    title: 'Evening Walk / Light Yoga',
    description: 'Evening jog or yoga for recovery. Helps sleep quality.',
    category: 'fitness',
    emoji: '🧘',
  },
  {
    id: 'dinner',
    startTime: '19:00',
    endTime: '19:30',
    title: 'Dinner',
    description: 'Light dinner by 7:30 PM. Avoid late eating. Include protein.',
    category: 'health',
    emoji: '🥗',
  },
  {
    id: 'job1',
    startTime: '19:30',
    endTime: '21:00',
    title: 'Job Prep — Resume, LinkedIn & Applications',
    description: 'Portfolio building, resume updates, apply to 2-3 jobs daily, mock interview prep.',
    category: 'job-prep',
    emoji: '💼',
  },
  {
    id: 'ds3',
    startTime: '21:00',
    endTime: '22:00',
    title: 'Data Science — Articles & Light Review',
    description: 'Read DS articles, review notes, watch short concept videos. Low-intensity.',
    category: 'data-science',
    emoji: '📰',
  },
  {
    id: 'wind-down',
    startTime: '22:00',
    endTime: '22:30',
    title: 'Wind Down & Reflection',
    description: 'Log today\'s progress in tracker. Plan tomorrow. Gratitude journaling. NO screens after this.',
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

// ─── Component ───
export function Timetable() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000); // Update every 30s
    return () => clearInterval(timer);
  }, []);

  // Current time in minutes
  const nowMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1;

  // Determine status of each block
  const blockStatuses = useMemo(() => {
    if (!now) return DAILY_SCHEDULE.map(() => 'upcoming' as const);

    return DAILY_SCHEDULE.map(block => {
      const start = timeToMinutes(block.startTime);
      let end = timeToMinutes(block.endTime);

      // Handle overnight block (sleep: 22:30 → 05:30)
      if (end <= start) {
        // Overnight: ended if current time is past end AND before start
        if (nowMinutes >= end && nowMinutes < start) return 'passed' as const;
        if (nowMinutes >= start || nowMinutes < end) return 'current' as const;
        return 'passed' as const;
      }

      if (nowMinutes >= end) return 'passed' as const;
      if (nowMinutes >= start && nowMinutes < end) return 'current' as const;
      return 'upcoming' as const;
    });
  }, [now, nowMinutes]);

  // Summary: total hours per category
  const summary = useMemo(() => {
    const totals: Partial<Record<BlockCategory, number>> = {};
    DAILY_SCHEDULE.forEach(block => {
      if (block.category === 'routine' || block.category === 'break') return;
      let diff = timeToMinutes(block.endTime) - timeToMinutes(block.startTime);
      if (diff < 0) diff += 24 * 60;
      totals[block.category] = (totals[block.category] || 0) + diff;
    });
    return totals;
  }, []);

  return (
    <div className="timetable">
      {/* Header */}
      <div className="tt-header">
        <h3 className="tt-title">📅 Daily Battle Plan</h3>
        <p className="tt-subtitle">
          {now ? now.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' }) : '...'}
          {now && <span className="tt-now"> • {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>}
        </p>
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
        {DAILY_SCHEDULE.map((block, i) => {
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
                {i < DAILY_SCHEDULE.length - 1 && (
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
        <span>💡 <strong>Study:</strong> ~10h</span>
        <span>🏋️ <strong>Fitness:</strong> ~1.5h</span>
        <span>😴 <strong>Sleep:</strong> 7h</span>
        <span>🔒 Passed time slots are blurred</span>
      </div>
    </div>
  );
}
