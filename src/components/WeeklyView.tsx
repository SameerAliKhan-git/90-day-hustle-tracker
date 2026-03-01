import { TrackerData } from '../utils/storage';

interface Props {
  data: TrackerData;
}

export function WeeklyView({ data }: Props) {
  const logs = Object.values(data.dailyLogs).sort((a, b) => b.date.localeCompare(a.date));

  if (logs.length === 0) {
    return (
      <div className="weekly-view">
        <h2 className="section-title">History</h2>
        <div className="empty-history">
          <p>No logs yet. Start tracking today!</p>
        </div>
      </div>
    );
  }

  // Group by week
  const weeks: Record<string, typeof logs> = {};
  logs.forEach(log => {
    const d = new Date(log.date);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    if (!weeks[weekKey]) weeks[weekKey] = [];
    weeks[weekKey].push(log);
  });

  return (
    <div className="weekly-view">
      <h2 className="section-title">History & Logs</h2>

      {/* Heatmap-style grid */}
      <div className="heatmap">
        <h4>Activity Heatmap</h4>
        <div className="heatmap-grid">
          {Array.from({ length: 91 }, (_, i) => {
            const date = new Date('2026-03-01');
            date.setDate(date.getDate() + i);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const log = data.dailyLogs[key];
            const hours = log?.totalHoursActual || 0;
            const intensity = hours === 0 ? 0 : hours < 3 ? 1 : hours < 6 ? 2 : hours < 8 ? 3 : 4;
            return (
              <div
                key={key}
                className={`heatmap-cell intensity-${intensity}`}
                title={`Day ${i + 1} (${key}): ${hours.toFixed(1)}h`}
              />
            );
          })}
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          <div className="heatmap-cell intensity-0" />
          <div className="heatmap-cell intensity-1" />
          <div className="heatmap-cell intensity-2" />
          <div className="heatmap-cell intensity-3" />
          <div className="heatmap-cell intensity-4" />
          <span>More</span>
        </div>
      </div>

      {/* Day-by-day log */}
      <div className="log-list">
        {logs.slice(0, 14).map(log => (
          <div key={log.date} className="log-entry">
            <div className="log-entry-header">
              <span className="log-day">Day {log.dayNumber}</span>
              <span className="log-date">{log.date}</span>
              <span className="log-mood">
                {log.mood === 5 ? '🔥' : log.mood === 4 ? '😊' : log.mood === 3 ? '😐' : log.mood === 2 ? '😔' : '😫'}
              </span>
            </div>
            <div className="log-entry-stats">
              <span className="log-hours">{log.totalHoursActual.toFixed(1)}h total</span>
              <span className="log-breakdown">
                📚 {log.ugcNetHours.toFixed(1)}h
                &nbsp; 🤖 {log.dataScienceHours.toFixed(1)}h
                &nbsp; 💼 {log.jobPrepHours.toFixed(1)}h
              </span>
            </div>
            <div className="log-entry-tasks">
              {log.tasks.filter(t => t.completed).length}/{log.tasks.length} tasks completed
            </div>
            {log.reflection && (
              <div className="log-reflection">"{log.reflection}"</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
