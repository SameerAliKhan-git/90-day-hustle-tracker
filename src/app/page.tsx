'use client';

import { useState, useCallback } from 'react';
import { CountdownHero } from '../components/CountdownHero';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { DailyLogger } from '../components/DailyLogger';
import { GoalUpdater } from '../components/GoalUpdater';
import { WeeklyView } from '../components/WeeklyView';
import { CourseTracker } from '../components/CourseTracker';
import { DataManager } from '../components/DataManager';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { Timetable } from '../components/Timetable';
import { useTracker } from '../hooks/useTracker';

type Tab = 'timer' | 'schedule' | 'today' | 'progress' | 'course' | 'update' | 'history';

export default function Home() {
  const { data, updateData } = useTracker();
  const [activeTab, setActiveTab] = useState<Tab>('timer');

  const handleImport = useCallback(() => {
    // Will reload the page on import
  }, []);

  return (
    <div className="app">
      {/* Hero Countdown - Always visible */}
      <CountdownHero />

      {/* Navigation Tabs */}
      <nav className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          ⏱ Timer
        </button>
        <button
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📅 Schedule
        </button>
        <button
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          📝 Today
        </button>
        <button
          className={`tab-btn ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
          onClick={() => setActiveTab('course')}
        >
          📺 Course
        </button>
        <button
          className={`tab-btn ${activeTab === 'update' ? 'active' : ''}`}
          onClick={() => setActiveTab('update')}
        >
          🎯 Goals
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📅 History
        </button>
      </nav>

      {/* Tab Content */}
      <main className="tab-content">
        {activeTab === 'timer' && (
          <PomodoroTimer data={data} updateData={updateData} />
        )}
        {activeTab === 'schedule' && (
          <Timetable />
        )}
        {activeTab === 'today' && (
          <DailyLogger data={data} updateData={updateData} />
        )}
        {activeTab === 'progress' && (
          <ProgressDashboard data={data} updateData={updateData} />
        )}
        {activeTab === 'course' && (
          <CourseTracker data={data} updateData={updateData} />
        )}
        {activeTab === 'update' && (
          <GoalUpdater data={data} updateData={updateData} />
        )}
        {activeTab === 'history' && (
          <WeeklyView data={data} />
        )}
      </main>

      {/* Footer with Data Manager */}
      <footer className="app-footer">
        <DataManager onImport={handleImport} />
        <div className="save-indicator">
          <span className="save-dot" />
          Auto-saving to browser storage
        </div>
        <p className="footer-motto">&ldquo;91 days. 3 goals. No excuses. HUSTLE.&rdquo;</p>
      </footer>
    </div>
  );
}
