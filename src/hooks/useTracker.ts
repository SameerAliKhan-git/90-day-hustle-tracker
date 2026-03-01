import { useState, useEffect, useCallback, useRef } from 'react';
import { loadData, saveData, TrackerData } from '../utils/storage';

export function useTracker() {
  const [data, setData] = useState<TrackerData>(loadData);
  const dataRef = useRef(data);

  // Keep ref in sync
  dataRef.current = data;

  // Auto-save on every change (real-time save)
  useEffect(() => {
    saveData(data);
  }, [data]);

  // Also save periodically as a safety net
  useEffect(() => {
    const interval = setInterval(() => {
      saveData(dataRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Save before tab closes
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveData(dataRef.current);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const updateData = useCallback((updater: (prev: TrackerData) => TrackerData) => {
    setData(prev => {
      const next = updater(prev);
      return next;
    });
  }, []);

  return { data, updateData };
}
