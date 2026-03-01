// Utility functions for the tracker

export const TARGET_DATE = new Date('2026-05-30T23:59:59');
export const START_DATE = new Date('2026-03-01T00:00:00');
export const TOTAL_DAYS = 91;

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  percentComplete: number;
}

export function getTimeRemaining(): TimeRemaining {
  const now = new Date();
  const totalMs = TARGET_DATE.getTime() - now.getTime();
  const elapsed = now.getTime() - START_DATE.getTime();
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime();
  const percentComplete = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  if (totalMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0, percentComplete: 100 };
  }

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalMs, percentComplete };
}

export function getDayNumber(): number {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  return Math.min(TOTAL_DAYS, Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24))));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getDateKey(date?: Date): string {
  const d = date || new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
