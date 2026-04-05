import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/helpers';
import './Chart.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip__label">{d.payload.icon} {d.name}</div>
      <div className="chart-tooltip__row">
        <span className="chart-tooltip__val">{formatCurrency(d.value)}</span>
        <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>
          ({((d.value / d.payload.total) * 100).toFixed(1)}%)
        </span>
      </div>
    </div>
  );
};

export default function SpendingBreakdownChart({ data }) {
  if (!data?.length) return null;

  const total = data.reduce((s, d) => s + d.total, 0);
  const chartData = data.slice(0, 7).map(d => ({
    ...d,
    name: d.label,
    value: d.total,
    total,
  }));

  return (
    <div className="chart-card animate-fade-in stagger-5">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">Spending Breakdown</h3>
          <p className="chart-card__sub">By category this period</p>
        </div>
      </div>

      <div className="pie-wrap">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="pie-center">
          <div className="pie-center__label">Total</div>
          <div className="pie-center__value">{formatCurrency(total, true)}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="pie-legend">
        {chartData.map((d, i) => (
          <div key={i} className="pie-legend__item">
            <span className="pie-legend__dot" style={{ background: d.color }} />
            <span className="pie-legend__label">{d.icon} {d.name}</span>
            <span className="pie-legend__val">{formatCurrency(d.value, true)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
