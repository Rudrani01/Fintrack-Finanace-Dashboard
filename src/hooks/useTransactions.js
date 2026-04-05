import { useMemo } from 'react';
import { useTransactionContext } from '../context/TransactionContext';
import { groupBy, getMonthKey, getMonthLabel } from '../utils/helpers';
import { CATEGORIES } from '../constants/constants';

export function useTransactions(filters = {}) {
  const ctx = useTransactionContext();
  const { transactions } = ctx;

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (filters.type && filters.type !== 'all')         result = result.filter(t => t.type === filters.type);
    if (filters.category && filters.category !== 'all') result = result.filter(t => t.category === filters.category);
    if (filters.dateFrom) result = result.filter(t => new Date(t.date) >= new Date(filters.dateFrom));
    if (filters.dateTo)   result = result.filter(t => new Date(t.date) <= new Date(filters.dateTo));
    if (filters.amountMin !== undefined && filters.amountMin !== '') result = result.filter(t => t.amount >= Number(filters.amountMin));
    if (filters.amountMax !== undefined && filters.amountMax !== '') result = result.filter(t => t.amount <= Number(filters.amountMax));

    const sortBy  = filters.sortBy  || 'date';
    const sortDir = filters.sortDir || 'desc';

    result.sort((a, b) => {
      let diff;
      if      (sortBy === 'date')        diff = new Date(a.date) - new Date(b.date);
      else if (sortBy === 'amount')      diff = a.amount - b.amount;
      else if (sortBy === 'description') diff = a.description.localeCompare(b.description);
      else diff = 0;
      return sortDir === 'desc' ? -diff : diff;
    });

    return result;
  }, [transactions, filters]);

  return { ...ctx, filtered };
}

export function useSummary(transactions) {
  return useMemo(() => {
    const income   = transactions.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);
}

export function useMonthlyData(transactions) {
  return useMemo(() => {
    const grouped = groupBy(transactions, t => getMonthKey(t.date));
    return Object.keys(grouped).sort().map(key => {
      const txns    = grouped[key];
      const income   = txns.filter(t => t.type === 'income').reduce((s, t)  => s + t.amount, 0);
      const expenses = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
      return { month: getMonthLabel(key), key, income, expenses, balance: income - expenses };
    });
  }, [transactions]);
}

export function useCategorySpending(transactions) {
  return useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const grouped  = groupBy(expenses, 'category');
    return Object.entries(grouped)
      .map(([cat, txns]) => {
        const catInfo = CATEGORIES.find(c => c.id === cat) || { label: cat, color: '#b2bec3', LucideIcon: null };
        return {
          category:    cat,
          label:       catInfo.label,
          color:       catInfo.color,
          LucideIcon:  catInfo.LucideIcon,
          total:       txns.reduce((s, t) => s + t.amount, 0),
          count:       txns.length,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [transactions]);
}
