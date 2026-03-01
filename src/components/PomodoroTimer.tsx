'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TrackerData, DailyLog, createEmptyDailyLog } from '../utils/storage';
import { getDateKey, getDayNumber } from '../utils/dateUtils';

type StudyGoal = 'ugc-net' | 'data-science' | 'job-prep';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

const GOAL_LABELS: Record<StudyGoal, { label: string; emoji: string; color: string }> = {
  'ugc-net': { label: 'UGC NET JRF', emoji: '📚', color: '#818cf8' },
  'data-science': { label: 'Data Science', emoji: '🧪', color: '#34d399' },
  'job-prep': { label: 'Job Prep', emoji: '💼', color: '#fbbf24' },
};

const SESSION_DURATION = 60 * 60; // 1 hour in seconds
const BREAK_DURATION = 10 * 60; // 10 minute break

type TimerState = 'idle' | 'running' | 'paused' | 'break' | 'done';

interface PomodoroSession {
  goal: StudyGoal;
  startedAt: number;
  totalSeconds: number;
  completedSessions: number;
}

export function PomodoroTimer({ data, updateData }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<StudyGoal>('ugc-net');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(SESSION_DURATION);
  const [elapsedThisSession, setElapsedThisSession] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalStudyToday, setTotalStudyToday] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionGoalRef = useRef<StudyGoal>(selectedGoal);

  // Track today's total study from pomodoro sessions
  const todayKey = getDateKey(new Date());

  // Load today's pomodoro data from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`pomodoro-${todayKey}`);
      if (stored) {
        const session: PomodoroSession = JSON.parse(stored);
        setCompletedSessions(session.completedSessions);
        setTotalStudyToday(session.totalSeconds);
        setSelectedGoal(session.goal);
      }
    } catch { /* ignore */ }
  }, [todayKey]);

  // Create a simple beep sound
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create audio context for notification beep
      audioRef.current = null; // Will use Web Audio API instead
    }
  }, []);

  const playNotification = useCallback(() => {
    try {
      const ctx = new AudioContext();
      // Play 3 beeps
      [0, 0.3, 0.6].forEach(delay => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'sine';
        gain.gain.value = 0.3;
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.15);
      });
    } catch { /* Audio not available */ }
  }, []);

  const saveTimeToTracker = useCallback((goal: StudyGoal, seconds: number) => {
    if (seconds < 60) return; // Don't save less than 1 minute

    const hours = Math.round((seconds / 3600) * 100) / 100;
    const dateKey = getDateKey(new Date());
    const dayNum = getDayNumber();

    updateData(prev => {
      const currentLog: DailyLog = prev.dailyLogs[dateKey] || createEmptyDailyLog(dateKey, dayNum);
      const updated = { ...currentLog };

      // Add hours to the correct category
      if (goal === 'ugc-net') updated.ugcNetHours += hours;
      else if (goal === 'data-science') updated.dataScienceHours += hours;
      else if (goal === 'job-prep') updated.jobPrepHours += hours;

      updated.totalHoursActual = updated.ugcNetHours + updated.dataScienceHours + updated.jobPrepHours;

      // Update streak
      let streakDays = prev.streakDays;
      if (prev.lastActiveDate !== dateKey) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = getDateKey(yesterday);
        if (prev.lastActiveDate === yesterdayKey) {
          streakDays += 1;
        } else if (!prev.lastActiveDate) {
          streakDays = 1;
        } else {
          streakDays = 1;
        }
      }

      return {
        ...prev,
        dailyLogs: { ...prev.dailyLogs, [dateKey]: updated },
        streakDays,
        lastActiveDate: dateKey,
      };
    });
  }, [updateData]);

  const savePomodoroSession = useCallback((goal: StudyGoal, addSeconds: number, addCompleted: number) => {
    setTotalStudyToday(prev => {
      const newTotal = prev + addSeconds;
      setCompletedSessions(prevSessions => {
        const newSessions = prevSessions + addCompleted;
        try {
          localStorage.setItem(`pomodoro-${todayKey}`, JSON.stringify({
            goal,
            startedAt: Date.now(),
            totalSeconds: newTotal,
            completedSessions: newSessions,
          }));
        } catch { /* ignore */ }
        return newSessions;
      });
      return newTotal;
    });
  }, [todayKey]);

  // Timer tick
  useEffect(() => {
    if (timerState === 'running' || timerState === 'break') {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            // Timer finished
            if (timerState === 'running') {
              // Study session completed
              playNotification();
              const goal = sessionGoalRef.current;
              saveTimeToTracker(goal, SESSION_DURATION);
              savePomodoroSession(goal, SESSION_DURATION, 1);
              setElapsedThisSession(0);
              setTimerState('break');
              return BREAK_DURATION;
            } else {
              // Break finished
              playNotification();
              setTimerState('done');
              return 0;
            }
          }
          if (timerState === 'running') {
            setElapsedThisSession(p => p + 1);
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [timerState, playNotification, saveTimeToTracker, savePomodoroSession]);

  const startTimer = () => {
    sessionGoalRef.current = selectedGoal;
    setSecondsLeft(SESSION_DURATION);
    setElapsedThisSession(0);
    setTimerState('running');
  };

  const pauseTimer = () => {
    setTimerState('paused');
  };

  const resumeTimer = () => {
    setTimerState('running');
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Save whatever time was accumulated
    if (elapsedThisSession > 0 && timerState !== 'break') {
      const goal = sessionGoalRef.current;
      saveTimeToTracker(goal, elapsedThisSession);
      savePomodoroSession(goal, elapsedThisSession, 0);
    }
    setElapsedThisSession(0);
    setSecondsLeft(SESSION_DURATION);
    setTimerState('idle');
  };

  const startNewSession = () => {
    setSecondsLeft(SESSION_DURATION);
    setElapsedThisSession(0);
    setTimerState('idle');
  };

  const skipBreak = () => {
    setSecondsLeft(SESSION_DURATION);
    setElapsedThisSession(0);
    setTimerState('idle');
  };

  // Format time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatHoursMinutes = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  // Progress circle values
  const totalDuration = timerState === 'break' ? BREAK_DURATION : SESSION_DURATION;
  const progress = ((totalDuration - secondsLeft) / totalDuration) * 100;
  const circumference = 2 * Math.PI * 120;
  const dashOffset = circumference - (progress / 100) * circumference;

  const activeGoal = timerState === 'idle' || timerState === 'done'
    ? GOAL_LABELS[selectedGoal]
    : GOAL_LABELS[sessionGoalRef.current];

  const ringColor = timerState === 'break' ? '#34d399' : activeGoal.color;

  return (
    <div className="pomodoro">
      {/* Timer Display */}
      <div className="pomodoro-ring-container">
        <svg className="pomodoro-ring-svg" viewBox="0 0 260 260">
          {/* Background circle */}
          <circle
            cx="130" cy="130" r="120"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="130" cy="130" r="120"
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 130 130)"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
          {/* Glow effect */}
          {timerState === 'running' && (
            <circle
              cx="130" cy="130" r="120"
              fill="none"
              stroke={ringColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 130 130)"
              opacity="0.4"
              filter="blur(6px)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          )}
        </svg>
        <div className="pomodoro-ring-inner">
          {timerState === 'break' ? (
            <>
              <span className="pomodoro-state-label">☕ BREAK</span>
              <span className="pomodoro-time">{formatTime(secondsLeft)}</span>
              <span className="pomodoro-sublabel">Relax, stretch, hydrate</span>
            </>
          ) : (
            <>
              <span className="pomodoro-state-label">
                {timerState === 'running' ? '🔥 FOCUS' : timerState === 'paused' ? '⏸ PAUSED' : timerState === 'done' ? '✅ DONE' : '⏱ READY'}
              </span>
              <span className="pomodoro-time">{formatTime(secondsLeft)}</span>
              <span className="pomodoro-sublabel" style={{ color: activeGoal.color }}>
                {activeGoal.emoji} {activeGoal.label}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Goal Selector - Only when idle */}
      {(timerState === 'idle' || timerState === 'done') && (
        <div className="pomodoro-goals">
          <p className="pomodoro-goals-label">What are you studying?</p>
          <div className="pomodoro-goal-buttons">
            {(Object.entries(GOAL_LABELS) as [StudyGoal, typeof GOAL_LABELS[StudyGoal]][]).map(([key, val]) => (
              <button
                key={key}
                className={`pomodoro-goal-btn ${selectedGoal === key ? 'active' : ''}`}
                onClick={() => setSelectedGoal(key)}
                style={{
                  '--goal-color': val.color,
                  borderColor: selectedGoal === key ? val.color : undefined,
                  background: selectedGoal === key ? `${val.color}15` : undefined,
                } as React.CSSProperties}
              >
                <span className="goal-emoji">{val.emoji}</span>
                <span className="goal-name">{val.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="pomodoro-controls">
        {timerState === 'idle' && (
          <button className="pomo-btn pomo-btn-start" onClick={startTimer}>
            ▶ Start 1hr Focus
          </button>
        )}
        {timerState === 'running' && (
          <>
            <button className="pomo-btn pomo-btn-pause" onClick={pauseTimer}>
              ⏸ Pause
            </button>
            <button className="pomo-btn pomo-btn-stop" onClick={stopTimer}>
              ⏹ Stop & Save
            </button>
          </>
        )}
        {timerState === 'paused' && (
          <>
            <button className="pomo-btn pomo-btn-start" onClick={resumeTimer}>
              ▶ Resume
            </button>
            <button className="pomo-btn pomo-btn-stop" onClick={stopTimer}>
              ⏹ Stop & Save
            </button>
          </>
        )}
        {timerState === 'break' && (
          <button className="pomo-btn pomo-btn-skip" onClick={skipBreak}>
            ⏭ Skip Break
          </button>
        )}
        {timerState === 'done' && (
          <button className="pomo-btn pomo-btn-start" onClick={startNewSession}>
            🔁 New Session
          </button>
        )}
      </div>

      {/* Today's Stats */}
      <div className="pomodoro-stats">
        <div className="pomo-stat">
          <span className="pomo-stat-value">{completedSessions}</span>
          <span className="pomo-stat-label">Sessions</span>
        </div>
        <div className="pomo-stat-divider" />
        <div className="pomo-stat">
          <span className="pomo-stat-value">{formatHoursMinutes(totalStudyToday)}</span>
          <span className="pomo-stat-label">Focused Today</span>
        </div>
        <div className="pomo-stat-divider" />
        <div className="pomo-stat">
          <span className="pomo-stat-value">{formatHoursMinutes(elapsedThisSession)}</span>
          <span className="pomo-stat-label">This Session</span>
        </div>
      </div>

      {/* Session info */}
      <div className="pomodoro-info">
        <span>📌 1hr focus → 10min break</span>
        <span>💾 Time auto-saves to your daily log</span>
      </div>
    </div>
  );
}
