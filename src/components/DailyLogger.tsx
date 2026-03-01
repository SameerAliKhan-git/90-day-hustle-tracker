import { useState, useEffect, useCallback } from 'react';
import { TrackerData, DailyLog, TaskEntry, createEmptyDailyLog } from '../utils/storage';
import { getDateKey, getDayNumber, formatDate } from '../utils/dateUtils';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

const CATEGORIES = [
  { value: 'ugc-net' as const, label: 'UGC NET', color: '#a78bfa' },
  { value: 'data-science' as const, label: 'Data Science', color: '#00f5d4' },
  { value: 'job-prep' as const, label: 'Job Prep', color: '#ff4d6d' },
];

const MOODS = [
  { value: 1 as const, emoji: '😫', label: 'Terrible' },
  { value: 2 as const, emoji: '😔', label: 'Bad' },
  { value: 3 as const, emoji: '😐', label: 'Okay' },
  { value: 4 as const, emoji: '😊', label: 'Good' },
  { value: 5 as const, emoji: '🔥', label: 'On Fire' },
];

export function DailyLogger({ data, updateData }: Props) {
  const todayKey = getDateKey();
  const dayNumber = getDayNumber();

  // Get or create today's log
  const todayLog: DailyLog = data.dailyLogs[todayKey] || createEmptyDailyLog(todayKey, dayNumber);

  // New task form state
  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState<TaskEntry['category']>('ugc-net');
  const [newHours, setNewHours] = useState('');

  // Update today's log helper
  const updateTodayLog = useCallback((updater: (log: DailyLog) => DailyLog) => {
    updateData(prev => {
      const currentLog = prev.dailyLogs[todayKey] || createEmptyDailyLog(todayKey, dayNumber);
      const updated = updater({ ...currentLog });
      
      // Recalculate category hours
      updated.ugcNetHours = updated.tasks
        .filter(t => t.category === 'ugc-net' && t.completed)
        .reduce((sum, t) => sum + t.hours, 0);
      updated.dataScienceHours = updated.tasks
        .filter(t => t.category === 'data-science' && t.completed)
        .reduce((sum, t) => sum + t.hours, 0);
      updated.jobPrepHours = updated.tasks
        .filter(t => t.category === 'job-prep' && t.completed)
        .reduce((sum, t) => sum + t.hours, 0);
      updated.totalHoursActual = updated.ugcNetHours + updated.dataScienceHours + updated.jobPrepHours;

      // Update streak
      let streakDays = prev.streakDays;
      if (prev.lastActiveDate !== todayKey) {
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
        dailyLogs: { ...prev.dailyLogs, [todayKey]: updated },
        streakDays,
        lastActiveDate: todayKey,
      };
    });
  }, [updateData, todayKey, dayNumber]);

  // Auto-save on any interaction (mark today as active)
  useEffect(() => {
    if (!data.dailyLogs[todayKey]) {
      updateTodayLog(log => log);
    }
  }, [todayKey, data.dailyLogs, updateTodayLog]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: TaskEntry = {
      id: Date.now().toString(),
      task: newTask.trim(),
      category: newCategory,
      hours: parseFloat(newHours) || 0,
      completed: false,
      notes: '',
    };
    updateTodayLog(log => ({
      ...log,
      tasks: [...log.tasks, task],
      totalHoursPlanned: log.totalHoursPlanned + task.hours,
    }));
    setNewTask('');
    setNewHours('');
  };

  const toggleTask = (taskId: string) => {
    updateTodayLog(log => ({
      ...log,
      tasks: log.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const deleteTask = (taskId: string) => {
    updateTodayLog(log => ({
      ...log,
      tasks: log.tasks.filter(t => t.id !== taskId),
    }));
  };

  const setMood = (mood: DailyLog['mood']) => {
    updateTodayLog(log => ({ ...log, mood }));
  };

  const completedTasks = todayLog.tasks.filter(t => t.completed).length;
  const totalTasks = todayLog.tasks.length;

  return (
    <div className="daily-logger">
      <div className="logger-header">
        <h2 className="section-title">Today's Battle Plan</h2>
        <div className="logger-date">
          <span className="logger-day">Day {dayNumber}</span>
          <span className="logger-full-date">{formatDate(new Date())}</span>
        </div>
      </div>

      {/* Quick Stats for Today */}
      <div className="today-stats">
        <div className="today-stat">
          <span className="today-stat-value">{completedTasks}/{totalTasks}</span>
          <span className="today-stat-label">Tasks</span>
        </div>
        <div className="today-stat">
          <span className="today-stat-value">{todayLog.totalHoursActual.toFixed(1)}h</span>
          <span className="today-stat-label">Completed</span>
        </div>
        <div className="today-stat">
          <span className="today-stat-value">{todayLog.totalHoursPlanned.toFixed(1)}h</span>
          <span className="today-stat-label">Planned</span>
        </div>
      </div>

      {/* Time Tracking */}
      <div className="time-tracking">
        <div className="time-input-group">
          <label>
            <span>⏰ Wake Up</span>
            <input
              type="time"
              value={todayLog.wakeUpTime}
              onChange={e => updateTodayLog(log => ({ ...log, wakeUpTime: e.target.value }))}
            />
          </label>
          <label>
            <span>🌙 Sleep</span>
            <input
              type="time"
              value={todayLog.sleepTime}
              onChange={e => updateTodayLog(log => ({ ...log, sleepTime: e.target.value }))}
            />
          </label>
        </div>
      </div>

      {/* Add Task */}
      <div className="add-task-form">
        <input
          type="text"
          placeholder="What are you going to crush today?"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
          className="task-input"
        />
        <div className="task-meta-row">
          <select
            value={newCategory}
            onChange={e => setNewCategory(e.target.value as TaskEntry['category'])}
            className="category-select"
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Hours"
            value={newHours}
            onChange={e => setNewHours(e.target.value)}
            min="0"
            max="24"
            step="0.5"
            className="hours-input"
          />
          <button onClick={addTask} className="add-btn">+ Add</button>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {CATEGORIES.map(cat => {
          const categoryTasks = todayLog.tasks.filter(t => t.category === cat.value);
          if (categoryTasks.length === 0) return null;
          return (
            <div key={cat.value} className="task-category-group">
              <h4 className="task-category-title" style={{ color: cat.color }}>
                {cat.label}
              </h4>
              {categoryTasks.map(task => (
                <div
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <button
                    className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? '✓' : ''}
                  </button>
                  <div className="task-info">
                    <span className="task-name">{task.task}</span>
                    <span className="task-hours">{task.hours}h</span>
                  </div>
                  <button className="task-delete" onClick={() => deleteTask(task.id)}>×</button>
                </div>
              ))}
            </div>
          );
        })}
        {todayLog.tasks.length === 0 && (
          <div className="empty-tasks">
            <p>No tasks yet. Add your first task above! 💪</p>
          </div>
        )}
      </div>

      {/* Mood & Reflection */}
      <div className="mood-section">
        <h4>How's the hustle going?</h4>
        <div className="mood-selector">
          {MOODS.map(m => (
            <button
              key={m.value}
              className={`mood-btn ${todayLog.mood === m.value ? 'active' : ''}`}
              onClick={() => setMood(m.value)}
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="reflection-section">
        <h4>Today's Reflection</h4>
        <textarea
          placeholder="What did you learn? What went well? What to improve tomorrow?"
          value={todayLog.reflection}
          onChange={e => updateTodayLog(log => ({ ...log, reflection: e.target.value }))}
          className="reflection-textarea"
          rows={3}
        />
      </div>

      {/* Topic Tracking */}
      <div className="topics-section">
        <TopicInput
          label="📚 UGC NET Topics Covered"
          topics={todayLog.ugcNetTopics}
          onChange={topics => updateTodayLog(log => ({ ...log, ugcNetTopics: topics }))}
          color="#a78bfa"
        />
        <TopicInput
          label="🤖 DS Topics/Sections Done"
          topics={todayLog.dsTopics}
          onChange={topics => updateTodayLog(log => ({ ...log, dsTopics: topics }))}
          color="#00f5d4"
        />
        <TopicInput
          label="💼 Job Actions Taken"
          topics={todayLog.jobActions}
          onChange={topics => updateTodayLog(log => ({ ...log, jobActions: topics }))}
          color="#ff4d6d"
        />
      </div>
    </div>
  );
}

// Mini-component for topic list input
function TopicInput({
  label,
  topics,
  onChange,
  color,
}: {
  label: string;
  topics: string[];
  onChange: (topics: string[]) => void;
  color: string;
}) {
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    onChange([...topics, input.trim()]);
    setInput('');
  };

  const remove = (index: number) => {
    onChange(topics.filter((_, i) => i !== index));
  };

  return (
    <div className="topic-input-group">
      <h5 style={{ color }}>{label}</h5>
      <div className="topic-add-row">
        <input
          type="text"
          placeholder="Add topic..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button onClick={add}>+</button>
      </div>
      <div className="topic-tags">
        {topics.map((t, i) => (
          <span key={i} className="topic-tag" style={{ borderColor: color }}>
            {t}
            <button onClick={() => remove(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}
