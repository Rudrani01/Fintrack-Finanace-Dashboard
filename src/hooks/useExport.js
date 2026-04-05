import { formatDate } from '../utils/helpers';

export function useExport() {
  const exportCSV = (transactions, filename = 'transactions') => {
    const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Note'];
    const rows = transactions.map(t => [
      formatDate(t.date),
      `"${t.description}"`,
      t.amount,
      t.type,
      t.category,
      `"${t.note || ''}"`,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    downloadFile(`${filename}.csv`, csv, 'text/csv');
  };

  const exportJSON = (transactions, filename = 'transactions') => {
    const clean = transactions.map(({ id, date, description, amount, type, category, note }) => ({
      id, date, description, amount, type, category, note: note || '',
    }));
    downloadFile(`${filename}.json`, JSON.stringify(clean, null, 2), 'application/json');
  };

  return { exportCSV, exportJSON };
}

function downloadFile(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}