import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { formatCurrency } from '../../utils/helpers';
import '../dashboard/Chart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="chart-tooltip__row">
          <span style={{ color: p.fill }}>●</span>
          <span className="chart-tooltip__key">{p.name}</span>
          <span className="chart-tooltip__val">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyComparison({ data }) {
  if (!data?.length) return null;

  return (
    <div className="chart-card animate-fade-in stagger-3">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Monthly Comparison</h3>
          <p className="chart-card__sub">Income vs Expenses month over month</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
            tickFormatter={v => formatCurrency(v, true)} width={58} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" name="Income" fill="#74b9ff" radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="expenses" name="Expenses" fill="var(--danger)" radius={[4, 4, 0, 0]} maxBarSize={32} opacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
