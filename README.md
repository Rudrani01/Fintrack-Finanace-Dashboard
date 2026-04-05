# Fintrack — Finance Dashboard

A clean, interactive personal finance dashboard built as a frontend development assessment. Fintrack allows users to track income, expenses, and spending patterns through an intuitive interface with role-based access control.

---

## Live Preview

https://fintrack-finanace-dashboard.vercel.app

---

## Tech Stack

| Category | Choice | Reason |
|---|---|---|
| Framework | React 18 | Functional components + hooks throughout |
| Bundler | Vite | Fast HMR, lightweight, modern tooling |
| Routing | React Router v6 | Clean page-based navigation |
| Charts | Recharts | React-native chart components, responsive |
| Icons | Lucide React | Consistent, clean icon system |
| Styling | Pure CSS + CSS Variables | Full control, no bloat, easy theming |
| State | Context API | 3 focused contexts — right scale for this project |
| Persistence | localStorage | Data survives page refresh |
| Mock API | setTimeout-based | Simulates real async fetch/CRUD behavior |

---

## Project Structure

```
src/
├── api/
│   └── mockApi.js              # Simulated async API with CRUD + delay
├── constants/
│   └── constants.js            # Mock transactions, categories, roles
├── context/
│   ├── ThemeContext.jsx         # Light / dark mode state
│   ├── RoleContext.jsx          # Admin / viewer role state
│   └── TransactionContext.jsx  # Global transactions state + CRUD
├── hooks/
│   ├── useTransactions.js      # Filtering, sorting, derived data
│   ├── useRoleGuard.js         # Role-based visibility logic
│   ├── useExport.js            # CSV and JSON export
│   └── useLocalStorage.js      # Reusable localStorage hook
├── pages/
│   ├── Dashboard.jsx           # Overview page (/)
│   ├── Transactions.jsx        # Transactions page (/transactions)
│   └── Insights.jsx            # Insights page (/insights)
├── components/
│   ├── common/                 # Sidebar, Topbar, Button, Modal, Badge, EmptyState, LoadingSpinner
│   ├── dashboard/              # SummaryCard, BalanceTrendChart, SpendingBreakdownChart
│   ├── transactions/           # TransactionTable, TransactionRow, TransactionForm, TransactionFilters
│   └── insights/               # InsightCard, MonthlyComparison
├── styles/
│   ├── variables.css           # All CSS variables + dark mode overrides
│   ├── global.css              # Reset, typography, base layout
│   └── animations.css          # Keyframes and transition classes
└── utils/
    └── helpers.js              # formatCurrency, formatDate, groupBy, percentChange
```

---

## Features

### Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses, Transaction count with month-over-month trend indicators
- **Balance Trend Chart** — Area chart showing income, expenses and net balance over time (Recharts)
- **Spending Breakdown** — Donut chart with category breakdown and legend
- **Recent Transactions** — Last 6 transactions with quick link to full list

### Transactions
- Full transaction list with date, description, category icon, amount and type badge
- **Search** — filter by description or category name
- **Filter** — by transaction type (income/expense) and category
- **Sort** — by date, amount or name in ascending/descending order
- **Add Transaction** — modal form with validation (Admin only)
- **Edit Transaction** — pre-filled modal form (Admin only)
- **Delete Transaction** — confirmation modal (Admin only)
- **Export** — download filtered transactions as CSV or JSON

### Insights
- Savings rate with average monthly savings
- Top spending category with total and transaction count
- Average monthly expense
- Income vs last month (percentage change)
- Expenses vs last month (percentage change)
- Highest spending month
- Monthly income vs expenses bar chart
- Full category breakdown with progress bars and percentages

### Role Based UI
Roles are simulated on the frontend — no backend or auth required. Switch roles via the sidebar toggle.

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard, charts, insights | ✓ | ✓ |
| View transaction list | ✓ | ✓ |
| Search, filter, sort | ✓ | ✓ |
| Export CSV / JSON | ✓ | ✓ |
| Add transaction | ✗ | ✓ |
| Edit transaction | ✗ | ✓ |
| Delete transaction | ✗ | ✓ |

### Optional Enhancements Implemented
- ✓ Dark mode — full theme via CSS variables, persisted to localStorage
- ✓ Data persistence — transactions survive page refresh via localStorage
- ✓ Mock API integration — async CRUD with simulated network delay
- ✓ Animations — fade-in, stagger delays, hover transitions throughout
- ✓ Export functionality — CSV and JSON download
- ✓ Advanced filtering — search + type + category + sort combined

---

## State Management

Three focused contexts, each owning one concern:

**TransactionContext** — holds `transactions[]`, `loading`, `error` and exposes `addTransaction`, `updateTransaction`, `deleteTransaction`. Loads from localStorage on mount, falls back to mock API, and persists changes automatically.

**ThemeContext** — holds `theme` (light/dark) and exposes `toggleTheme`. Applies `data-theme` attribute to the document root.

**RoleContext** — holds `role` (admin/viewer) and exposes `setRole`. Persisted to localStorage.

Custom hooks (`useTransactions`, `useCategorySpending`, `useMonthlyData`) consume context and derive computed data using `useMemo` so calculations only re-run when the underlying data changes.

---

## Code Splitting

All three pages are lazy loaded using `React.lazy` and `Suspense`:

```jsx
const Dashboard    = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Insights     = lazy(() => import('./pages/Insights'));
```

This means each page's JavaScript is only downloaded when the user navigates to it.

---

## Design Decisions

- **Pure CSS over a component library** — gives full control over every visual detail and avoids unnecessary bundle size
- **CSS variables for theming** — a single `[data-theme="dark"]` override switches the entire app, no JS required
- **Context API over Redux** — three focused contexts, each owning one concern, which is the right scale for this project.
- **Mock API with setTimeout** — makes the app behave like a real async application, allowing loading states and error handling to be demonstrated
- **Lucide React for icons** — consistent stroke-based icon set that works well at small sizes and in both themes

---

## Author

Built as part of a frontend development assessment for Zorvyn.
