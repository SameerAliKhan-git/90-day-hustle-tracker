import { exportData, importData } from '../utils/storage';

interface Props {
  onImport: () => void;
}

export function DataManager({ onImport }: Props) {
  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `90day-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const success = importData(reader.result as string);
        if (success) {
          onImport();
          alert('Data imported successfully! Refreshing...');
          window.location.reload();
        } else {
          alert('Failed to import data. Check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="data-manager">
      <h4>Backup & Restore</h4>
      <p className="data-info">Your data is saved locally in your browser. Export backups regularly!</p>
      <div className="data-actions">
        <button onClick={handleExport} className="export-btn">
          📥 Export Backup
        </button>
        <button onClick={handleImport} className="import-btn">
          📤 Import Data
        </button>
      </div>
    </div>
  );
}
