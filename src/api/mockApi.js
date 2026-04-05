import { MOCK_TRANSACTIONS } from '../constants/constants';

const delay = (ms = 600) => new Promise(res => setTimeout(res, ms));

let store = [...MOCK_TRANSACTIONS];

export const mockApi = {
  async fetchTransactions() {
    await delay(700);
    return [...store].sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  async addTransaction(txn) {
    await delay(300);
    const newTxn = {
      ...txn,
      id: `txn_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    store = [newTxn, ...store];
    return newTxn;
  },

  async updateTransaction(id, updates) {
    await delay(300);
    store = store.map(t => t.id === id ? { ...t, ...updates } : t);
    return store.find(t => t.id === id);
  },

  async deleteTransaction(id) {
    await delay(300);
    store = store.filter(t => t.id !== id);
    return id;
  },

  // Reset to mock data (useful for dev)
  reset() {
    store = [...MOCK_TRANSACTIONS];
  },
};