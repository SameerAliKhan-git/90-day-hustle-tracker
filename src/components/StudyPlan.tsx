'use client';

import { useState, useMemo } from 'react';
import { TrackerData } from '../utils/storage';
import { STUDY_PLAN, getStudyPlanStats } from '../utils/studyPlanData';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

export function StudyPlan({ data, updateData }: Props) {
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({});
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [showSyllabus, setShowSyllabus] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const completed = data.studyPlanProgress || {};
  const stats = useMemo(() => getStudyPlanStats(completed), [completed]);

  // Build flat search index once
  const allTopicsFlat = useMemo(() => {
    const items: { id: string; title: string; unitNum: number; unitTitle: string; day: number; dayTitle: string }[] = [];
    for (const unit of STUDY_PLAN) {
      for (const day of unit.days) {
        for (const topic of day.topics) {
          items.push({
            id: topic.id,
            title: topic.title,
            unitNum: unit.unit,
            unitTitle: unit.title,
            day: day.day,
            dayTitle: day.title,
          });
        }
      }
    }
    return items;
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return allTopicsFlat.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.dayTitle.toLowerCase().includes(q) ||
      t.unitTitle.toLowerCase().includes(q)
    );
  }, [searchQuery, allTopicsFlat]);

  const toggleUnit = (unit: number) => {
    setExpandedUnits(prev => ({ ...prev, [unit]: !prev[unit] }));
  };

  const toggleDay = (day: number) => {
    setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleTopic = (topicId: string) => {
    updateData(prev => ({
      ...prev,
      studyPlanProgress: {
        ...prev.studyPlanProgress,
        [topicId]: !prev.studyPlanProgress?.[topicId],
      },
    }));
  };

  const toggleAllDayTopics = (dayTopicIds: string[], allDone: boolean) => {
    updateData(prev => {
      const updated = { ...prev.studyPlanProgress };
      for (const id of dayTopicIds) {
        if (allDone) {
          delete updated[id];
        } else {
          updated[id] = true;
        }
      }
      return { ...prev, studyPlanProgress: updated };
    });
  };

  const overallPercent = stats.totalTopics > 0
    ? Math.round((stats.completedCount / stats.totalTopics) * 100)
    : 0;

  return (
    <div className="study-plan">
      <div className="section-title">📅 60-Day <span>Study Plan</span></div>
      <p className="sp-subtitle">UGC NET — Computer Science & Applications (Code 87)</p>

      {/* Overall Progress */}
      <div className="sp-overview">
        <div className="sp-overview-ring">
          <svg className="sp-ring-svg" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="url(#sp-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - overallPercent / 100)}`}
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="sp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#c4b5fd" />
              </linearGradient>
            </defs>
            <text x="60" y="54" textAnchor="middle" fill="#e8e8f0" fontSize="24" fontFamily="'Bebas Neue', sans-serif" letterSpacing="1">{overallPercent}%</text>
            <text x="60" y="72" textAnchor="middle" fill="#6b6b8a" fontSize="8" fontWeight="600" letterSpacing="1.5">COMPLETE</text>
          </svg>
        </div>
        <div className="sp-overview-stats">
          <div className="sp-stat-item">
            <span className="sp-stat-val">{stats.completedCount}</span>
            <span className="sp-stat-total">/{stats.totalTopics}</span>
            <span className="sp-stat-lbl">TOPICS DONE</span>
          </div>
          <div className="sp-stat-item">
            <span className="sp-stat-val">10</span>
            <span className="sp-stat-lbl">UNITS</span>
          </div>
          <div className="sp-stat-item">
            <span className="sp-stat-val">60</span>
            <span className="sp-stat-lbl">DAYS</span>
          </div>
        </div>
      </div>

      {/* Overall bar */}
      <div className="sp-main-bar">
        <div className="sp-bar-bg">
          <div className="sp-bar-fill" style={{ width: `${overallPercent}%` }} />
        </div>
        <div className="sp-bar-labels">
          <span>{stats.completedCount} topics completed</span>
          <span>{stats.totalTopics - stats.completedCount} remaining</span>
        </div>
      </div>

      {/* Search — study from the middle */}
      <div className="sp-search-wrapper">
        <div className="sp-search-box">
          <span className="sp-search-icon">🔍</span>
          <input
            type="text"
            className="sp-search-input"
            placeholder="Search topic to mark as done (e.g. Paging, DFA, SQL)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="sp-search-clear" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>
        {searchResults.length > 0 && (
          <div className="sp-search-results">
            <div className="sp-search-count">{searchResults.length} topic{searchResults.length !== 1 ? 's' : ''} found</div>
            {searchResults.map(item => {
              const isDone = !!completed[item.id];
              return (
                <div
                  key={item.id}
                  className={`sp-search-item ${isDone ? 'completed' : ''}`}
                  onClick={() => toggleTopic(item.id)}
                >
                  <span className={`sp-topic-check ${isDone ? 'checked' : ''}`}>
                    {isDone ? '✓' : ''}
                  </span>
                  <div className="sp-search-item-info">
                    <span className="sp-search-item-title">{item.title}</span>
                    <span className="sp-search-item-meta">Unit {item.unitNum} · Day {item.day} — {item.dayTitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {searchQuery.length >= 2 && searchResults.length === 0 && (
          <div className="sp-search-results">
            <div className="sp-search-empty">No topics match &ldquo;{searchQuery}&rdquo;</div>
          </div>
        )}
      </div>

      {/* Units */}
      <div className="sp-units">
        {STUDY_PLAN.map((unit, unitIdx) => {
          const unitStat = stats.unitStats[unitIdx];
          const unitPercent = unitStat.total > 0
            ? Math.round((unitStat.completed / unitStat.total) * 100)
            : 0;
          const isUnitExpanded = expandedUnits[unit.unit] ?? false;
          const isUnitDone = unitStat.completed === unitStat.total && unitStat.total > 0;

          return (
            <div key={unit.unit} className={`sp-unit ${isUnitDone ? 'done' : ''}`}>
              {/* Unit Header */}
              <div className="sp-unit-header" onClick={() => toggleUnit(unit.unit)}>
                <div className="sp-unit-left">
                  <span className="sp-unit-badge">U{unit.unit}</span>
                  <div className="sp-unit-info">
                    <span className="sp-unit-label">Unit {unit.unit} · Days {unit.days[0].day}–{unit.days[unit.days.length - 1].day}</span>
                    <span className="sp-unit-name">{unit.title}</span>
                  </div>
                </div>
                <div className="sp-unit-right">
                  <div className="sp-unit-progress">
                    <div className="sp-unit-minibar">
                      <div className="sp-unit-minifill" style={{ width: `${unitPercent}%` }} />
                    </div>
                    <span className="sp-unit-count">{unitStat.completed}/{unitStat.total}</span>
                  </div>
                  <span className={`section-chevron ${isUnitExpanded ? 'open' : ''}`}>›</span>
                </div>
              </div>

              {/* Expanded: Days */}
              {isUnitExpanded && (
                <div className="sp-unit-body">
                  {/* Syllabus Toggle */}
                  <button
                    className="sp-syllabus-toggle"
                    onClick={(e) => { e.stopPropagation(); setShowSyllabus(showSyllabus === unit.unit ? null : unit.unit); }}
                  >
                    {showSyllabus === unit.unit ? '▾ Hide Syllabus' : '▸ View Full Syllabus'}
                  </button>

                  {showSyllabus === unit.unit && (
                    <div className="sp-syllabus">
                      {unit.syllabusTopics.map((topic, i) => (
                        <div key={i} className="sp-syllabus-item">
                          <span className="sp-syllabus-bullet">•</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {unit.days.map(day => {
                    const isDayExpanded = expandedDays[day.day] ?? false;
                    const dayCompletedCount = day.topics.filter(t => completed[t.id]).length;
                    const allDayDone = dayCompletedCount === day.topics.length;
                    const dayPercent = day.topics.length > 0
                      ? Math.round((dayCompletedCount / day.topics.length) * 100)
                      : 0;
                    const dayTopicIds = day.topics.map(t => t.id);

                    return (
                      <div key={day.day} className={`sp-day ${allDayDone ? 'done' : ''}`}>
                        {/* Day Header */}
                        <div className="sp-day-header" onClick={() => toggleDay(day.day)}>
                          <button
                            className="sp-day-toggle-all"
                            onClick={(e) => { e.stopPropagation(); toggleAllDayTopics(dayTopicIds, allDayDone); }}
                          >
                            <span className={`sp-day-check ${allDayDone ? 'checked' : dayCompletedCount > 0 ? 'partial' : ''}`}>
                              {allDayDone ? '✓' : dayCompletedCount > 0 ? '—' : ''}
                            </span>
                          </button>
                          <div className="sp-day-info">
                            <span className="sp-day-number">Day {day.day}</span>
                            <span className="sp-day-title">{day.title}</span>
                          </div>
                          <div className="sp-day-right">
                            <span className="sp-day-count">{dayCompletedCount}/{day.topics.length}</span>
                            <span className="sp-day-percent">{dayPercent}%</span>
                            <span className={`section-chevron ${isDayExpanded ? 'open' : ''}`}>›</span>
                          </div>
                        </div>

                        {/* Expanded: Topics */}
                        {isDayExpanded && (
                          <div className="sp-topics">
                            {day.topics.map(topic => {
                              const isDone = !!completed[topic.id];
                              return (
                                <div
                                  key={topic.id}
                                  className={`sp-topic ${isDone ? 'completed' : ''}`}
                                  onClick={() => toggleTopic(topic.id)}
                                >
                                  <span className={`sp-topic-check ${isDone ? 'checked' : ''}`}>
                                    {isDone ? '✓' : ''}
                                  </span>
                                  <span className="sp-topic-title">{topic.title}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
