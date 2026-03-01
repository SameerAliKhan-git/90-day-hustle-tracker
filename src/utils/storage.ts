// Local storage utilities — real-time auto-save

const STORAGE_KEY = '90day-hustle-tracker';

export interface TaskEntry {
  id: string;
  task: string;
  category: 'ugc-net' | 'data-science' | 'job-prep';
  hours: number;
  completed: boolean;
  notes: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  dayNumber: number;
  tasks: TaskEntry[];
  totalHoursPlanned: number;
  totalHoursActual: number;
  mood: 1 | 2 | 3 | 4 | 5;
  reflection: string;
  wakeUpTime: string;
  sleepTime: string;

  // Category breakdowns
  ugcNetHours: number;
  dataScienceHours: number;
  jobPrepHours: number;

  // Milestones
  ugcNetTopics: string[];
  dsTopics: string[];
  jobActions: string[];
}

export interface CourseProgress {
  completedLectures: Record<string, boolean>;
  sectionNotes: Record<number, string>;
  lastWatchedLectureId: string;
  lastWatchedSectionId: number;
  totalMinutesWatched: number;
}

export interface TrackerData {
  dailyLogs: Record<string, DailyLog>;
  courseProgress: CourseProgress;
  ugcNetProgress: {
    totalTopicsCompleted: number;
    totalTopics: number;
    papersAttempted: number;
    mockScores: number[];
  };
  dsProgress: {
    totalVideoHoursWatched: number;
    totalVideoHours: number; // 99
    codingExercisesCompleted: number;
    totalCodingExercises: number; // 20
    articlesRead: number;
    totalArticles: number; // 19
    projectsBuilt: number;
  };
  jobProgress: {
    resumeReady: boolean;
    linkedInOptimized: boolean;
    portfolioReady: boolean;
    applicationsSubmitted: number;
    interviewsScheduled: number;
    offersReceived: number;
  };
  streakDays: number;
  lastActiveDate: string;
}

const defaultData: TrackerData = {
  dailyLogs: {},
  courseProgress: {
    completedLectures: {},
    sectionNotes: {},
    lastWatchedLectureId: '',
    lastWatchedSectionId: 0,
    totalMinutesWatched: 0,
  },
  ugcNetProgress: {
    totalTopicsCompleted: 0,
    totalTopics: 50, // Approximate UGC NET syllabus topics
    papersAttempted: 0,
    mockScores: [],
  },
  dsProgress: {
    totalVideoHoursWatched: 0,
    totalVideoHours: 99,
    codingExercisesCompleted: 0,
    totalCodingExercises: 20,
    articlesRead: 0,
    totalArticles: 19,
    projectsBuilt: 0,
  },
  jobProgress: {
    resumeReady: false,
    linkedInOptimized: false,
    portfolioReady: false,
    applicationsSubmitted: 0,
    interviewsScheduled: 0,
    offersReceived: 0,
  },
  streakDays: 0,
  lastActiveDate: '',
};

export function loadData(): TrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultData };
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed };
  } catch {
    return { ...defaultData };
  }
}

export function saveData(data: TrackerData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save:', e);
  }
}

export function createEmptyDailyLog(date: string, dayNumber: number): DailyLog {
  return {
    date,
    dayNumber,
    tasks: [],
    totalHoursPlanned: 0,
    totalHoursActual: 0,
    mood: 3,
    reflection: '',
    wakeUpTime: '',
    sleepTime: '',
    ugcNetHours: 0,
    dataScienceHours: 0,
    jobPrepHours: 0,
    ugcNetTopics: [],
    dsTopics: [],
    jobActions: [],
  };
}

export function exportData(): string {
  const data = loadData();
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as TrackerData;
    saveData(data);
    return true;
  } catch {
    return false;
  }
}
