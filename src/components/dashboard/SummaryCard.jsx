import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import './SummaryCard.css';

export default function SummaryCard({ title, amount, icon: Icon, variant = 'default', trend, trendLabel, index = 0, isCount = false }) {
  const trendPositive = trend > 0;

  return (
    <div className={`summary-card summary-card--${variant} animate-fade-in stagger-${index + 1}`}>
      <div className="summary-card__top">
        <span className="summary-card__label">{title}</span>
        <div className="summary-card__icon-wrap">
          {Icon && <Icon size={18} />}
        </div>
      </div>
      <div className="summary-card__amount">
        {isCount ? amount : formatCurrency(amount)}
      </div>
      {trend !== undefined && trend !== null && (
        <div className={`summary-card__trend ${trendPositive ? 'trend--up' : 'trend--down'}`}>
          {trendPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{Math.abs(trend).toFixed(1)}%</span>
          {trendLabel && <span className="trend__label">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
