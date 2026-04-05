import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, Area, AreaChart, ReferenceLine
} from 'recharts';
import { formatCurrency } from '../../utils/helpers';
import './Chart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="chart-tooltip__row">
          <span style={{ color: p.color }}>●</span>
          <span className="chart-tooltip__key">{p.name}</span>
          <span className="chart-tooltip__val">{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrendChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="chart-card animate-fade-in stagger-4">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Balance Trend</h3>
          <p className="chart-card__sub">Monthly net balance over time</p>
        </div>
        <div className="chart-legend">
          <span className="chart-legend__item"><span style={{ background: 'var(--accent)' }} />Balance</span>
          <span className="chart-legend__item"><span style={{ background: '#74b9ff' }} />Income</span>
          <span className="chart-legend__item"><span style={{ background: 'var(--danger)' }} />Expenses</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#74b9ff" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#74b9ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
            tickFormatter={v => formatCurrency(v, true)} width={60} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#74b9ff" strokeWidth={2}
            fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4 }} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--danger)" strokeWidth={2}
            fill="none" dot={false} activeDot={{ r: 4 }} strokeDasharray="4 3" />
          <Area type="monotone" dataKey="balance" name="Balance" stroke="var(--accent)" strokeWidth={2.5}
            fill="url(#balanceGrad)" dot={false} activeDot={{ r: 5, fill: 'var(--accent)' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
