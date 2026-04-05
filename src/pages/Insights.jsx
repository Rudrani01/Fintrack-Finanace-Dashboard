import { useMemo } from 'react';
import { PiggyBank, Flame, BarChart2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useTransactionContext } from '../context/TransactionContext';
import { useSummary, useMonthlyData, useCategorySpending } from '../hooks/useTransactions';
import { formatCurrency, percentChange } from '../utils/helpers';
import InsightCard from '../components/insights/InsightCard';
import MonthlyComparison from '../components/insights/MonthlyComparison';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Insights.css';

export default function Insights() {
  const { transactions, loading } = useTransactionContext();
  const summary = useSummary(transactions);
  const monthlyData = useMonthlyData(transactions);
  const categoryData = useCategorySpending(transactions);

  const lastTwo = monthlyData.slice(-2);
  const prev = lastTwo[0];
  const curr = lastTwo[1];

  const savingsRate = summary.income > 0
    ? (((summary.income - summary.expenses) / summary.income) * 100).toFixed(1)
    : '0.0';

  const topCategory = categoryData[0];

  const avgMonthlyExpense = useMemo(() => {
    if (!monthlyData.length) return 0;
    return monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length;
  }, [monthlyData]);

  const expenseTrend = prev && curr ? percentChange(curr.expenses, prev.expenses) : null;
  const incomeTrend  = prev && curr ? percentChange(curr.income,   prev.income)   : null;

  const biggestMonth = useMemo(() => {
    if (!monthlyData.length) return null;
    return monthlyData.reduce((max, m) => m.expenses > max.expenses ? m : max, monthlyData[0]);
  }, [monthlyData]);

  if (loading) return <LoadingSpinner text="Crunching numbers…" />;

  return (
    <div className="page-wrapper page-enter">
      <div className="page-header">
        <h1 className="page-title">Insights</h1>
        <p className="page-subtitle">Patterns and observations from your financial data</p>
      </div>

      <div className="insights-grid">
        <InsightCard icon={PiggyBank}   title="Savings Rate"            index={0} value={`${savingsRate}%`}                                                            sub={`Avg ₹${((summary.income - summary.expenses) / (monthlyData.length || 1)).toLocaleString('en-IN')} saved/month`} accent="var(--accent)" />
        <InsightCard icon={Flame}       title="Top Spending Category"   index={1} value={topCategory?.label || '—'}                                                   sub={topCategory ? `${formatCurrency(topCategory.total)} · ${topCategory.count} transactions` : ''} accent="#ff5e7e" />
        <InsightCard icon={BarChart2}   title="Avg Monthly Expense"     index={2} value={formatCurrency(avgMonthlyExpense, true)}                                      sub={`Over ${monthlyData.length} months`} accent="#a29bfe" />
        <InsightCard icon={TrendingUp}  title="Income vs Last Month"    index={3} value={incomeTrend  !== null ? `${incomeTrend  > 0 ? '+' : ''}${incomeTrend.toFixed(1)}%`  : '—'} sub={curr ? `${curr.month}: ${formatCurrency(curr.income, true)}`   : ''} accent={incomeTrend  > 0 ? 'var(--accent)' : '#ff5e7e'} />
        <InsightCard icon={TrendingDown} title="Expenses vs Last Month" index={4} value={expenseTrend !== null ? `${expenseTrend > 0 ? '+' : ''}${expenseTrend.toFixed(1)}%` : '—'} sub={curr ? `${curr.month}: ${formatCurrency(curr.expenses, true)}` : ''} accent={expenseTrend < 0 ? 'var(--accent)' : '#ff5e7e'} />
        <InsightCard icon={Calendar}    title="Highest Spend Month"     index={5} value={biggestMonth?.month || '—'}                                                  sub={biggestMonth ? `${formatCurrency(biggestMonth.expenses)} in expenses` : ''} accent="#ffc542" />
      </div>

      <MonthlyComparison data={monthlyData} />

      <div className="cat-breakdown animate-fade-in stagger-4">
        <h3 className="cat-breakdown__title">Spending by Category</h3>
        <div className="cat-breakdown__list">
          {categoryData.map((cat) => {
            const total = categoryData.reduce((s, c) => s + c.total, 0);
            const pct = total > 0 ? ((cat.total / total) * 100).toFixed(1) : 0;
            return (
              <div key={cat.category} className="cat-row">
                <div className="cat-row__left">
                  <span className="cat-row__icon" style={{ background: cat.color + '22', color: cat.color }}>
                    {cat.LucideIcon && <cat.LucideIcon size={14} />}
                  </span>
                  <span className="cat-row__label">{cat.label}</span>
                  <span className="cat-row__count">{cat.count} txns</span>
                </div>
                <div className="cat-row__right">
                  <div className="cat-row__bar-wrap">
                    <div className="cat-row__bar" style={{ width: `${pct}%`, background: cat.color }} />
                  </div>
                  <span className="cat-row__pct">{pct}%</span>
                  <span className="cat-row__amount">{formatCurrency(cat.total, true)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
