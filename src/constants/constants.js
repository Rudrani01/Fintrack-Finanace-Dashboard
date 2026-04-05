import {
  Briefcase, Laptop, UtensilsCrossed, Car, Film,
  HeartPulse, ShoppingBag, Zap, Home, Package
} from 'lucide-react';

export const ROLES = { ADMIN: 'admin', VIEWER: 'viewer' };
export const TRANSACTION_TYPES = { INCOME: 'income', EXPENSE: 'expense' };

export const CATEGORIES = [
  { id: 'salary',        label: 'Salary',          color: '#5B5FED', LucideIcon: Briefcase,       type: 'income'  },
  { id: 'freelance',     label: 'Freelance',        color: '#81ecec', LucideIcon: Laptop,          type: 'income'  },
  { id: 'food',          label: 'Food & Dining',    color: '#ff7675', LucideIcon: UtensilsCrossed, type: 'expense' },
  { id: 'transport',     label: 'Transport',        color: '#74b9ff', LucideIcon: Car,             type: 'expense' },
  { id: 'entertainment', label: 'Entertainment',    color: '#a29bfe', LucideIcon: Film,            type: 'expense' },
  { id: 'health',        label: 'Health',           color: '#55efc4', LucideIcon: HeartPulse,      type: 'expense' },
  { id: 'shopping',      label: 'Shopping',         color: '#fd79a8', LucideIcon: ShoppingBag,     type: 'expense' },
  { id: 'utilities',     label: 'Utilities',        color: '#ffc542', LucideIcon: Zap,             type: 'expense' },
  { id: 'rent',          label: 'Rent',             color: '#fab1a0', LucideIcon: Home,            type: 'expense' },
  { id: 'other',         label: 'Other',            color: '#b2bec3', LucideIcon: Package,         type: 'expense' },
];

export const getCategoryById = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

let _id = 1;
const mkId = () => `txn_${String(_id++).padStart(4, '0')}`;

export const MOCK_TRANSACTIONS = [
  { id: mkId(), date: '2024-01-02', description: 'Monthly Salary',          amount: 85000, category: 'salary',        type: 'income'  },
  { id: mkId(), date: '2024-01-03', description: 'Apartment Rent',          amount: 18000, category: 'rent',          type: 'expense' },
  { id: mkId(), date: '2024-01-05', description: 'Grocery Run',             amount: 2400,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-01-08', description: 'Metro Monthly Pass',      amount: 1200,  category: 'transport',     type: 'expense' },
  { id: mkId(), date: '2024-01-10', description: 'Netflix + Spotify',       amount: 950,   category: 'entertainment', type: 'expense' },
  { id: mkId(), date: '2024-01-12', description: 'Freelance - Acme Co',     amount: 22000, category: 'freelance',     type: 'income'  },
  { id: mkId(), date: '2024-01-15', description: 'Electricity & Internet',  amount: 3200,  category: 'utilities',     type: 'expense' },
  { id: mkId(), date: '2024-01-18', description: 'Doctor Visit',            amount: 800,   category: 'health',        type: 'expense' },
  { id: mkId(), date: '2024-01-22', description: 'Weekend Dining Out',      amount: 1800,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-01-25', description: 'Amazon Shopping',         amount: 3500,  category: 'shopping',      type: 'expense' },
  { id: mkId(), date: '2024-01-28', description: 'Fuel Refill',             amount: 2200,  category: 'transport',     type: 'expense' },
  { id: mkId(), date: '2024-02-01', description: 'Monthly Salary',          amount: 85000, category: 'salary',        type: 'income'  },
  { id: mkId(), date: '2024-02-02', description: 'Apartment Rent',          amount: 18000, category: 'rent',          type: 'expense' },
  { id: mkId(), date: '2024-02-05', description: 'Grocery Run',             amount: 2100,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-02-10', description: 'Movie Tickets x4',        amount: 1400,  category: 'entertainment', type: 'expense' },
  { id: mkId(), date: '2024-02-14', description: 'Valentine Dinner',        amount: 3200,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-02-16', description: 'Freelance - UI Design',   amount: 18000, category: 'freelance',     type: 'income'  },
  { id: mkId(), date: '2024-02-18', description: 'Gym Membership',          amount: 2500,  category: 'health',        type: 'expense' },
  { id: mkId(), date: '2024-02-20', description: 'Electricity & Internet',  amount: 2900,  category: 'utilities',     type: 'expense' },
  { id: mkId(), date: '2024-02-24', description: 'Clothing Haul',           amount: 5600,  category: 'shopping',      type: 'expense' },
  { id: mkId(), date: '2024-02-27', description: 'Cab Rides',               amount: 1800,  category: 'transport',     type: 'expense' },
  { id: mkId(), date: '2024-03-01', description: 'Monthly Salary',          amount: 85000, category: 'salary',        type: 'income'  },
  { id: mkId(), date: '2024-03-02', description: 'Apartment Rent',          amount: 18000, category: 'rent',          type: 'expense' },
  { id: mkId(), date: '2024-03-04', description: 'Grocery + Veggies',       amount: 1900,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-03-06', description: 'Freelance - Dashboard',   amount: 35000, category: 'freelance',     type: 'income'  },
  { id: mkId(), date: '2024-03-08', description: 'Electricity & Internet',  amount: 3100,  category: 'utilities',     type: 'expense' },
  { id: mkId(), date: '2024-03-12', description: 'Zomato Orders',           amount: 2800,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-03-15', description: 'Metro + Ola Rides',       amount: 1600,  category: 'transport',     type: 'expense' },
  { id: mkId(), date: '2024-03-20', description: 'Medical Check-up',        amount: 1500,  category: 'health',        type: 'expense' },
  { id: mkId(), date: '2024-03-22', description: 'Concert Tickets',         amount: 4000,  category: 'entertainment', type: 'expense' },
  { id: mkId(), date: '2024-03-28', description: 'Electronics - Earbuds',   amount: 7500,  category: 'shopping',      type: 'expense' },
  { id: mkId(), date: '2024-04-01', description: 'Monthly Salary',          amount: 88000, category: 'salary',        type: 'income',  note: 'Increment applied' },
  { id: mkId(), date: '2024-04-02', description: 'Apartment Rent',          amount: 18000, category: 'rent',          type: 'expense' },
  { id: mkId(), date: '2024-04-05', description: 'Grocery Run',             amount: 2300,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-04-10', description: 'Freelance - Mobile App',  amount: 28000, category: 'freelance',     type: 'income'  },
  { id: mkId(), date: '2024-04-14', description: 'Electricity & Internet',  amount: 2850,  category: 'utilities',     type: 'expense' },
  { id: mkId(), date: '2024-04-16', description: 'Restaurant Outing',       amount: 2200,  category: 'food',          type: 'expense' },
  { id: mkId(), date: '2024-04-19', description: 'Fuel Refill',             amount: 2400,  category: 'transport',     type: 'expense' },
  { id: mkId(), date: '2024-04-22', description: 'Sports Gear',             amount: 4200,  category: 'shopping',      type: 'expense' },
  { id: mkId(), date: '2024-04-25', description: 'Streaming Services',      amount: 950,   category: 'entertainment', type: 'expense' },
  { id: mkId(), date: '2024-04-28', description: 'Pharmacy',                amount: 600,   category: 'health',        type: 'expense' },
];

export const CHART_COLORS = ['#5B5FED','#ff5e7e','#74b9ff','#a29bfe','#ffc542','#fd79a8','#55efc4','#fab1a0','#81ecec','#b2bec3'];
