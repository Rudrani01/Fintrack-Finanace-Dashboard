import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockApi } from '../api/mockApi';

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockApi.fetchTransactions();
      setTransactions(data);
    } catch (e) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Load from localStorage first if available
    // Clear old data if dates are stale
    const firstRun = localStorage.getItem("fd_version") !== "2";
    if (firstRun) { localStorage.removeItem("fd_transactions"); localStorage.setItem("fd_version", "2"); }
    const saved = localStorage.getItem('fd_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTransactions(parsed);
        setLoading(false);
        return;
      } catch {}
    }
    fetchAll();
  }, [fetchAll]);

  // Persist to localStorage on changes
  useEffect(() => {
    if (!loading && transactions.length > 0) {
      localStorage.setItem('fd_transactions', JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  const addTransaction = async (txn) => {
    const newTxn = await mockApi.addTransaction(txn);
    setTransactions(prev => [newTxn, ...prev]);
    return newTxn;
  };

  const updateTransaction = async (id, updates) => {
    const updated = await mockApi.updateTransaction(id, updates);
    setTransactions(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  const deleteTransaction = async (id) => {
    await mockApi.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      loading,
      error,
      fetchAll,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactionContext must be inside TransactionProvider');
  return ctx;
};