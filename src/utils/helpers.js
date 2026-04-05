export const formatCurrency = (amount, compact = false) => {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr, style = 'medium') => {
  const date = new Date(dateStr);
  if (style === 'short') return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  if (style === 'long') return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
};

export const groupBy = (arr, key) => {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
};

export const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

export const getMonthLabel = (key) => {
  const [year, month] = key.split('-');
  const d = new Date(parseInt(year), parseInt(month) - 1, 1);
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
};

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const percentChange = (current, previous) => {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
};
