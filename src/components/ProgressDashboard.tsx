import { TrackerData } from '../utils/storage';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

export function ProgressDashboard({ data }: Props) {
  const ugc = data.ugcNetProgress;
  const ds = data.dsProgress;
  const job = data.jobProgress;

  const ugcPercent = ugc.totalTopics > 0 ? (ugc.totalTopicsCompleted / ugc.totalTopics) * 100 : 0;
  const dsVideoPercent = ds.totalVideoHours > 0 ? (ds.totalVideoHoursWatched / ds.totalVideoHours) * 100 : 0;
  const dsExercisePercent = ds.totalCodingExercises > 0 ? (ds.codingExercisesCompleted / ds.totalCodingExercises) * 100 : 0;
  const dsArticlePercent = ds.totalArticles > 0 ? (ds.articlesRead / ds.totalArticles) * 100 : 0;

  // Calculate total hours studied across all days
  const totalHoursStudied = Object.values(data.dailyLogs).reduce(
    (sum, log) => sum + log.totalHoursActual, 0
  );
  const totalUgcHours = Object.values(data.dailyLogs).reduce(
    (sum, log) => sum + log.ugcNetHours, 0
  );
  const totalDsHours = Object.values(data.dailyLogs).reduce(
    (sum, log) => sum + log.dataScienceHours, 0
  );
  const totalJobHours = Object.values(data.dailyLogs).reduce(
    (sum, log) => sum + log.jobPrepHours, 0
  );

  return (
    <div className="progress-dashboard">
      <h2 className="section-title">Progress Overview</h2>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card fire">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{data.streakDays}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-card time">
          <div className="stat-icon">⏱️</div>
          <div className="stat-value">{totalHoursStudied.toFixed(1)}</div>
          <div className="stat-label">Total Hours</div>
        </div>
        <div className="stat-card days">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{Object.keys(data.dailyLogs).length}</div>
          <div className="stat-label">Days Logged</div>
        </div>
      </div>

      {/* Hours Breakdown */}
      <div className="hours-breakdown">
        <div className="breakdown-item ugc">
          <span className="breakdown-label">UGC NET</span>
          <span className="breakdown-value">{totalUgcHours.toFixed(1)}h</span>
        </div>
        <div className="breakdown-item ds">
          <span className="breakdown-label">Data Science</span>
          <span className="breakdown-value">{totalDsHours.toFixed(1)}h</span>
        </div>
        <div className="breakdown-item job">
          <span className="breakdown-label">Job Prep</span>
          <span className="breakdown-value">{totalJobHours.toFixed(1)}h</span>
        </div>
      </div>

      {/* Goal Cards */}
      <div className="goal-cards">
        {/* UGC NET Card */}
        <div className="goal-card ugc-card">
          <div className="goal-header">
            <span className="goal-emoji">📚</span>
            <h3>UGC NET JRF</h3>
          </div>
          <div className="goal-progress">
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${Math.min(100, ugcPercent)}%` }} />
            </div>
            <span className="goal-percent">{ugcPercent.toFixed(0)}%</span>
          </div>
          <div className="goal-details">
            <div className="goal-detail">
              <span>Topics</span>
              <span>{ugc.totalTopicsCompleted}/{ugc.totalTopics}</span>
            </div>
            <div className="goal-detail">
              <span>Papers Done</span>
              <span>{ugc.papersAttempted}</span>
            </div>
            <div className="goal-detail">
              <span>Avg Mock Score</span>
              <span>{ugc.mockScores.length > 0 
                ? (ugc.mockScores.reduce((a, b) => a + b, 0) / ugc.mockScores.length).toFixed(1) 
                : '-'}</span>
            </div>
          </div>
        </div>

        {/* Data Science Card */}
        <div className="goal-card ds-card">
          <div className="goal-header">
            <span className="goal-emoji">🤖</span>
            <h3>Data Science</h3>
          </div>
          <div className="goal-progress">
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${Math.min(100, dsVideoPercent)}%` }} />
            </div>
            <span className="goal-percent">{dsVideoPercent.toFixed(0)}%</span>
          </div>
          <div className="goal-details">
            <div className="goal-detail">
              <span>Video Hours</span>
              <span>{ds.totalVideoHoursWatched.toFixed(1)}/{ds.totalVideoHours}h</span>
            </div>
            <div className="goal-detail">
              <span>Coding Exercises</span>
              <span>{ds.codingExercisesCompleted}/{ds.totalCodingExercises}</span>
            </div>
            <div className="goal-detail">
              <span>Articles</span>
              <span>{ds.articlesRead}/{ds.totalArticles}</span>
            </div>
            <div className="goal-detail">
              <span>Projects Built</span>
              <span>{ds.projectsBuilt}</span>
            </div>
          </div>
          <div className="sub-bars">
            <div className="sub-bar-item">
              <span>Exercises</span>
              <div className="mini-bar"><div className="mini-fill" style={{ width: `${dsExercisePercent}%` }} /></div>
            </div>
            <div className="sub-bar-item">
              <span>Articles</span>
              <div className="mini-bar"><div className="mini-fill" style={{ width: `${dsArticlePercent}%` }} /></div>
            </div>
          </div>
        </div>

        {/* Job Prep Card */}
        <div className="goal-card job-card">
          <div className="goal-header">
            <span className="goal-emoji">💼</span>
            <h3>Job Hunt</h3>
          </div>
          <div className="goal-checklist">
            <label className="check-item">
              <span className={`check-box ${job.resumeReady ? 'checked' : ''}`}>
                {job.resumeReady ? '✓' : ''}
              </span>
              Resume Ready
            </label>
            <label className="check-item">
              <span className={`check-box ${job.linkedInOptimized ? 'checked' : ''}`}>
                {job.linkedInOptimized ? '✓' : ''}
              </span>
              LinkedIn Optimized
            </label>
            <label className="check-item">
              <span className={`check-box ${job.portfolioReady ? 'checked' : ''}`}>
                {job.portfolioReady ? '✓' : ''}
              </span>
              Portfolio Ready
            </label>
          </div>
          <div className="goal-details">
            <div className="goal-detail">
              <span>Applications</span>
              <span>{job.applicationsSubmitted}</span>
            </div>
            <div className="goal-detail">
              <span>Interviews</span>
              <span>{job.interviewsScheduled}</span>
            </div>
            <div className="goal-detail">
              <span>Offers</span>
              <span>{job.offersReceived}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
