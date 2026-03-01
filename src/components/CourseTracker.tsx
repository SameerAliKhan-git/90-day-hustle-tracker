import { useState, useMemo } from 'react';
import { COURSE_SECTIONS, TOTAL_COURSE_HOURS } from '../utils/courseData';
import { TrackerData, CourseProgress } from '../utils/storage';

interface Props {
  data: TrackerData;
  updateData: (updater: (prev: TrackerData) => TrackerData) => void;
}

const DEFAULT_COURSE_PROGRESS: CourseProgress = {
  completedLectures: {},
  sectionNotes: {},
  lastWatchedLectureId: '',
  lastWatchedSectionId: 0,
  totalMinutesWatched: 0,
};

export function CourseTracker({ data, updateData }: Props) {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Get course progress from tracker data (stored in dsProgress as extension)
  const courseProgress: CourseProgress = useMemo(() => {
    const stored = data.courseProgress;
    return stored ? { ...DEFAULT_COURSE_PROGRESS, ...stored } : DEFAULT_COURSE_PROGRESS;
  }, [data]);

  const updateCourseProgress = (updater: (prev: CourseProgress) => CourseProgress) => {
    updateData(prev => {
      const current = prev.courseProgress || DEFAULT_COURSE_PROGRESS;
      const updated = updater({ ...DEFAULT_COURSE_PROGRESS, ...current });

      // Count total minutes from completed lectures
      let totalMin = 0;
      COURSE_SECTIONS.forEach(section => {
        section.lectures.forEach(lecture => {
          if (updated.completedLectures[lecture.id]) {
            totalMin += lecture.durationMinutes;
          }
        });
      });
      updated.totalMinutesWatched = totalMin;

      // Sync video hours back to dsProgress
      const videoHoursWatched = Math.round((totalMin / 60) * 10) / 10;

      return {
        ...prev,
        courseProgress: updated,
        dsProgress: {
          ...prev.dsProgress,
          totalVideoHoursWatched: videoHoursWatched,
        },
      };
    });
  };

  const toggleLecture = (lectureId: string) => {
    updateCourseProgress(prev => ({
      ...prev,
      completedLectures: {
        ...prev.completedLectures,
        [lectureId]: !prev.completedLectures[lectureId],
      },
      lastWatchedLectureId: lectureId,
    }));
  };

  const toggleSection = (sectionId: number) => {
    const section = COURSE_SECTIONS.find(s => s.id === sectionId);
    if (!section) return;

    const allCompleted = section.lectures.every(l => courseProgress.completedLectures[l.id]);

    updateCourseProgress(prev => {
      const updated = { ...prev.completedLectures };
      section.lectures.forEach(l => {
        updated[l.id] = !allCompleted;
      });
      return { ...prev, completedLectures: updated };
    });
  };

  // Stats
  const totalLectures = COURSE_SECTIONS.reduce((sum, s) => sum + s.lectures.length, 0);
  const completedLectures = Object.values(courseProgress.completedLectures).filter(Boolean).length;
  const completionPercent = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;
  const hoursWatched = (courseProgress.totalMinutesWatched / 60);
  const hoursRemaining = TOTAL_COURSE_HOURS - hoursWatched;

  // Section-level stats
  const sectionStats = useMemo(() => {
    return COURSE_SECTIONS.map(section => {
      const completed = section.lectures.filter(l => courseProgress.completedLectures[l.id]).length;
      const total = section.lectures.length;
      const percent = total > 0 ? (completed / total) * 100 : 0;
      return { id: section.id, completed, total, percent };
    });
  }, [courseProgress.completedLectures]);

  // Find current section (first incomplete)
  const currentSection = sectionStats.find(s => s.percent < 100) || sectionStats[0];

  // Filtered sections
  const filteredSections = COURSE_SECTIONS.filter(section => {
    const stats = sectionStats.find(s => s.id === section.id)!;
    if (filter === 'completed') return stats.percent === 100;
    if (filter === 'pending') return stats.percent < 100;
    return true;
  });

  // Days estimate
  const avgHoursPerDay = 4; // DS time per day as planned
  const daysToComplete = Math.ceil(hoursRemaining / avgHoursPerDay);

  return (
    <div className="course-tracker">
      <div className="course-header">
        <h2 className="section-title">📺 Course Tracker</h2>
        <a
          href="https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          target="_blank"
          rel="noopener noreferrer"
          className="course-link"
        >
          Open in Udemy ↗
        </a>
      </div>

      <div className="course-title-bar">
        <h3>Complete Data Science, ML, DL, NLP Bootcamp</h3>
        <p className="course-instructor">by Krish Naik</p>
      </div>

      {/* Overall Progress */}
      <div className="course-overview">
        <div className="course-progress-ring">
          <svg viewBox="0 0 120 120" className="progress-ring-svg">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#courseGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - completionPercent / 100)}`}
              transform="rotate(-90, 60, 60)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <defs>
              <linearGradient id="courseGradient">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#6ee7b7" />
              </linearGradient>
            </defs>
            <text x="60" y="55" textAnchor="middle" fill="#f0f0f5" fontSize="20" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              {completionPercent.toFixed(1)}%
            </text>
            <text x="60" y="72" textAnchor="middle" fill="#9999bb" fontSize="9">
              COMPLETE
            </text>
          </svg>
        </div>

        <div className="course-stats-grid">
          <div className="course-stat">
            <span className="course-stat-value">{completedLectures}</span>
            <span className="course-stat-total">/ {totalLectures}</span>
            <span className="course-stat-label">Lectures</span>
          </div>
          <div className="course-stat">
            <span className="course-stat-value">{hoursWatched.toFixed(1)}</span>
            <span className="course-stat-total">/ {TOTAL_COURSE_HOURS}h</span>
            <span className="course-stat-label">Hours Watched</span>
          </div>
          <div className="course-stat">
            <span className="course-stat-value">{hoursRemaining.toFixed(1)}h</span>
            <span className="course-stat-total"></span>
            <span className="course-stat-label">Remaining</span>
          </div>
          <div className="course-stat">
            <span className="course-stat-value">~{daysToComplete}d</span>
            <span className="course-stat-total"></span>
            <span className="course-stat-label">ETA @ {avgHoursPerDay}h/day</span>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="course-main-bar">
        <div className="course-bar-bg">
          <div
            className="course-bar-fill"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <div className="course-bar-labels">
          <span>{completedLectures} of {totalLectures} lectures completed</span>
          <span>{hoursWatched.toFixed(1)}h / {TOTAL_COURSE_HOURS}h</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="course-filters">
        <button
          className={`course-filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({COURSE_SECTIONS.length})
        </button>
        <button
          className={`course-filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({sectionStats.filter(s => s.percent < 100).length})
        </button>
        <button
          className={`course-filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Done ({sectionStats.filter(s => s.percent === 100).length})
        </button>
      </div>

      {/* Section List */}
      <div className="course-sections">
        {filteredSections.map(section => {
          const stats = sectionStats.find(s => s.id === section.id)!;
          const isExpanded = expandedSection === section.id;
          const isCurrent = currentSection?.id === section.id;

          return (
            <div
              key={section.id}
              className={`course-section ${isExpanded ? 'expanded' : ''} ${stats.percent === 100 ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              {/* Section Header */}
              <div
                className="course-section-header"
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              >
                <div className="section-left">
                  <button
                    className="section-toggle-all"
                    onClick={e => { e.stopPropagation(); toggleSection(section.id); }}
                    title="Toggle all lectures in this section"
                  >
                    <span className={`section-check ${stats.percent === 100 ? 'checked' : stats.percent > 0 ? 'partial' : ''}`}>
                      {stats.percent === 100 ? '✓' : stats.percent > 0 ? '—' : ''}
                    </span>
                  </button>
                  <div className="section-info">
                    <span className="section-number">Section {section.id}</span>
                    <span className="section-name">{section.title}</span>
                  </div>
                </div>
                <div className="section-right">
                  <div className="section-mini-progress">
                    <div className="section-mini-bar">
                      <div
                        className="section-mini-fill"
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                    <span className="section-count">{stats.completed}/{stats.total}</span>
                  </div>
                  <span className="section-duration">{section.totalDuration}</span>
                  <span className={`section-chevron ${isExpanded ? 'open' : ''}`}>▸</span>
                </div>
              </div>

              {/* Section Lectures */}
              {isExpanded && (
                <div className="course-lectures">
                  {section.lectures.map((lecture, idx) => {
                    const isComplete = courseProgress.completedLectures[lecture.id];
                    return (
                      <div
                        key={lecture.id}
                        className={`course-lecture ${isComplete ? 'completed' : ''}`}
                        onClick={() => toggleLecture(lecture.id)}
                      >
                        <span className={`lecture-check ${isComplete ? 'checked' : ''}`}>
                          {isComplete ? '✓' : (idx + 1)}
                        </span>
                        <span className="lecture-title">{lecture.title}</span>
                        <span className="lecture-duration">{lecture.duration}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom info */}
      <div className="course-resources">
        <h4>Course Resources</h4>
        <div className="resources-grid">
          <div className="resource-item">
            <span className="resource-icon">🎬</span>
            <span>{TOTAL_COURSE_HOURS}h video</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">💻</span>
            <span>20 coding exercises</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">📄</span>
            <span>19 articles</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">📁</span>
            <span>165 downloads</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">🏅</span>
            <span>Certificate</span>
          </div>
          <div className="resource-item">
            <span className="resource-icon">🎭</span>
            <span>2 Role Plays</span>
          </div>
        </div>
      </div>
    </div>
  );
}
