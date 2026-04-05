import { Wallet, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useTransactionContext } from '../context/TransactionContext';
import { useSummary, useMonthlyData, useCategorySpending } from '../hooks/useTransactions';
import { percentChange, formatDate } from '../utils/helpers';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Dashboard.css';

export default function Dashboard() {
  const { transactions, loading } = useTransactionContext();
  const summary = useSummary(transactions);
  const monthlyData = useMonthlyData(transactions);
  const categoryData = useCategorySpending(transactions);

  const lastTwo = monthlyData.slice(-2);
  const prevMonth = lastTwo[0];
  const curMonth = lastTwo[1];

  const balanceTrend = prevMonth && curMonth ? percentChange(curMonth.balance, prevMonth.balance) : null;
  const incomeTrend  = prevMonth && curMonth ? percentChange(curMonth.income, prevMonth.income) : null;
  const expenseTrend = prevMonth && curMonth ? percentChange(curMonth.expenses, prevMonth.expenses) : null;

  if (loading) return <LoadingSpinner text="Loading your finances…" />;

  return (
    <div className="page-wrapper page-enter">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your financial overview at a glance</p>
      </div>

      <div className="summary-grid">
        <SummaryCard title="Total Balance"   amount={summary.balance}        icon={Wallet}      variant="balance" trend={balanceTrend} trendLabel="vs last month" index={0} />
        <SummaryCard title="Total Income"    amount={summary.income}         icon={TrendingUp}  variant="income"  trend={incomeTrend}  trendLabel="vs last month" index={1} />
        <SummaryCard title="Total Expenses"  amount={summary.expenses}       icon={TrendingDown} variant="expense" trend={expenseTrend} trendLabel="vs last month" index={2} />
        <SummaryCard title="Transactions"    amount={transactions.length}    icon={RefreshCw}   variant="default" index={3} isCount />
      </div>

      <div className="charts-grid">
        <BalanceTrendChart data={monthlyData} />
        <SpendingBreakdownChart data={categoryData} />
      </div>

      <div className="recent-section animate-fade-in stagger-6">
        <div className="recent-header">
          <h2 className="recent-title">Recent Transactions</h2>
          <a href="/transactions" className="recent-link">View all →</a>
        </div>
        <div className="recent-list">
          {transactions.slice(0, 6).map((txn, i) => (
            <div key={txn.id} className={`recent-row animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <div className="recent-row__left">
                <div className="recent-row__desc">{txn.description}</div>
                <div className="recent-row__meta">{formatDate(txn.date, 'short')} · {txn.category}</div>
              </div>
              <div className={`recent-row__amount ${txn.type === 'income' ? 'amount--income' : 'amount--expense'}`}>
                {txn.type === 'income' ? '+' : '−'}₹{txn.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
