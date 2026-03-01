import { useState } from 'react';
import { TrackerData } from '../utils/storage';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

export function GoalUpdater({ data, updateData }: Props) {
  const [mockScore, setMockScore] = useState('');

  const ugc = data.ugcNetProgress;
  const ds = data.dsProgress;
  const job = data.jobProgress;

  return (
    <div className="goal-updater">
      <h2 className="section-title">Update Progress</h2>

      {/* UGC NET */}
      <div className="updater-card ugc-update">
        <h3>📚 UGC NET JRF</h3>
        <div className="updater-grid">
          <div className="updater-field">
            <label>Topics Completed</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, ugcNetProgress: { ...d.ugcNetProgress, totalTopicsCompleted: Math.max(0, d.ugcNetProgress.totalTopicsCompleted - 1) }
              }))}>-</button>
              <span>{ugc.totalTopicsCompleted}</span>
              <button onClick={() => updateData(d => ({
                ...d, ugcNetProgress: { ...d.ugcNetProgress, totalTopicsCompleted: d.ugcNetProgress.totalTopicsCompleted + 1 }
              }))}>+</button>
              <span className="field-total">/ {ugc.totalTopics}</span>
            </div>
          </div>
          <div className="updater-field">
            <label>Papers Attempted</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, ugcNetProgress: { ...d.ugcNetProgress, papersAttempted: Math.max(0, d.ugcNetProgress.papersAttempted - 1) }
              }))}>-</button>
              <span>{ugc.papersAttempted}</span>
              <button onClick={() => updateData(d => ({
                ...d, ugcNetProgress: { ...d.ugcNetProgress, papersAttempted: d.ugcNetProgress.papersAttempted + 1 }
              }))}>+</button>
            </div>
          </div>
          <div className="updater-field">
            <label>Add Mock Score</label>
            <div className="score-input">
              <input
                type="number"
                placeholder="Score"
                value={mockScore}
                onChange={e => setMockScore(e.target.value)}
                min="0"
                max="300"
              />
              <button onClick={() => {
                const score = parseFloat(mockScore);
                if (!isNaN(score)) {
                  updateData(d => ({
                    ...d,
                    ugcNetProgress: {
                      ...d.ugcNetProgress,
                      mockScores: [...d.ugcNetProgress.mockScores, score]
                    }
                  }));
                  setMockScore('');
                }
              }}>Add</button>
            </div>
            {ugc.mockScores.length > 0 && (
              <div className="score-history">
                {ugc.mockScores.map((s, i) => (
                  <span key={i} className="score-badge">{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Science */}
      <div className="updater-card ds-update">
        <h3>🤖 Data Science (Krish Naik)</h3>
        <div className="updater-grid">
          <div className="updater-field">
            <label>Video Hours Watched</label>
            <div className="slider-input">
              <input
                type="range"
                min="0"
                max={ds.totalVideoHours}
                step="0.5"
                value={ds.totalVideoHoursWatched}
                onChange={e => updateData(d => ({
                  ...d, dsProgress: { ...d.dsProgress, totalVideoHoursWatched: parseFloat(e.target.value) }
                }))}
              />
              <span>{ds.totalVideoHoursWatched.toFixed(1)} / {ds.totalVideoHours}h</span>
            </div>
          </div>
          <div className="updater-field">
            <label>Coding Exercises</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, codingExercisesCompleted: Math.max(0, d.dsProgress.codingExercisesCompleted - 1) }
              }))}>-</button>
              <span>{ds.codingExercisesCompleted}</span>
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, codingExercisesCompleted: d.dsProgress.codingExercisesCompleted + 1 }
              }))}>+</button>
              <span className="field-total">/ {ds.totalCodingExercises}</span>
            </div>
          </div>
          <div className="updater-field">
            <label>Articles Read</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, articlesRead: Math.max(0, d.dsProgress.articlesRead - 1) }
              }))}>-</button>
              <span>{ds.articlesRead}</span>
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, articlesRead: d.dsProgress.articlesRead + 1 }
              }))}>+</button>
              <span className="field-total">/ {ds.totalArticles}</span>
            </div>
          </div>
          <div className="updater-field">
            <label>Projects Built</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, projectsBuilt: Math.max(0, d.dsProgress.projectsBuilt - 1) }
              }))}>-</button>
              <span>{ds.projectsBuilt}</span>
              <button onClick={() => updateData(d => ({
                ...d, dsProgress: { ...d.dsProgress, projectsBuilt: d.dsProgress.projectsBuilt + 1 }
              }))}>+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Prep */}
      <div className="updater-card job-update">
        <h3>💼 Job Hunt</h3>
        <div className="updater-grid">
          <div className="updater-field">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={job.resumeReady}
                onChange={e => updateData(d => ({
                  ...d, jobProgress: { ...d.jobProgress, resumeReady: e.target.checked }
                }))}
              />
              <span>Resume Ready</span>
            </label>
          </div>
          <div className="updater-field">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={job.linkedInOptimized}
                onChange={e => updateData(d => ({
                  ...d, jobProgress: { ...d.jobProgress, linkedInOptimized: e.target.checked }
                }))}
              />
              <span>LinkedIn Optimized</span>
            </label>
          </div>
          <div className="updater-field">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={job.portfolioReady}
                onChange={e => updateData(d => ({
                  ...d, jobProgress: { ...d.jobProgress, portfolioReady: e.target.checked }
                }))}
              />
              <span>Portfolio Ready</span>
            </label>
          </div>
          <div className="updater-field">
            <label>Applications</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, applicationsSubmitted: Math.max(0, d.jobProgress.applicationsSubmitted - 1) }
              }))}>-</button>
              <span>{job.applicationsSubmitted}</span>
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, applicationsSubmitted: d.jobProgress.applicationsSubmitted + 1 }
              }))}>+</button>
            </div>
          </div>
          <div className="updater-field">
            <label>Interviews</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, interviewsScheduled: Math.max(0, d.jobProgress.interviewsScheduled - 1) }
              }))}>-</button>
              <span>{job.interviewsScheduled}</span>
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, interviewsScheduled: d.jobProgress.interviewsScheduled + 1 }
              }))}>+</button>
            </div>
          </div>
          <div className="updater-field">
            <label>Offers</label>
            <div className="number-input">
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, offersReceived: Math.max(0, d.jobProgress.offersReceived - 1) }
              }))}>-</button>
              <span>{job.offersReceived}</span>
              <button onClick={() => updateData(d => ({
                ...d, jobProgress: { ...d.jobProgress, offersReceived: d.jobProgress.offersReceived + 1 }
              }))}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
