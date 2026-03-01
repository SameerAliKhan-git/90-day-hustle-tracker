'use client';

import { useCountdown } from '../hooks/useCountdown';
import { getDayNumber, TOTAL_DAYS } from '../utils/dateUtils';
import { useState, useEffect } from 'react';

export function CountdownHero() {
  const time = useCountdown();
  const [dayNumber, setDayNumber] = useState(1);

  useEffect(() => {
    setDayNumber(getDayNumber());
  }, []);

  // Show placeholder while SSR / before mount to avoid hydration mismatch
  const display = (n: number) => time.mounted ? String(n).padStart(2, '0') : '--';

  return (
    <div className="countdown-hero">
      <div className="hero-top">
        <div className="day-badge">
          <span className="day-label">DAY</span>
          <span className="day-number">{time.mounted ? dayNumber : '-'}</span>
          <span className="day-total">of {TOTAL_DAYS}</span>
        </div>
        <div className="hero-title">
          <h1>90-DAY HUSTLE</h1>
          <p className="hero-subtitle"><span style={{color:'#a78bfa'}}>UGC NET JRF</span> &bull; <span style={{color:'#00f5d4'}}>Data Science</span> &bull; <span style={{color:'#ff4d6d'}}>Job Ready</span></p>
          <p className="hero-deadline">Deadline: May 30, 2026</p>
        </div>
      </div>

      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-value">{display(time.days)}</span>
          <span className="countdown-label">DAYS</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{display(time.hours)}</span>
          <span className="countdown-label">HOURS</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{display(time.minutes)}</span>
          <span className="countdown-label">MINS</span>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <span className="countdown-value">{display(time.seconds)}</span>
          <span className="countdown-label">SECS</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${time.percentComplete}%` }}
          />
        </div>
        <span className="progress-text">
          {time.mounted ? `${time.percentComplete.toFixed(1)}% of journey complete` : 'Loading...'}
        </span>
      </div>

      {time.mounted && time.days <= 30 && (
        <div className="urgency-banner">
          {time.days <= 7 ? '🔥 FINAL WEEK! GIVE EVERYTHING!' : 
           time.days <= 14 ? '⚡ 2 WEEKS LEFT — SPRINT MODE!' :
           '🚀 30 days to go — Stay focused!'}
        </div>
      )}
    </div>
  );
}
