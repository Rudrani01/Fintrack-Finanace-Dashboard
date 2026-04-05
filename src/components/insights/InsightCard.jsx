import './InsightCard.css';

export default function InsightCard({ icon: Icon, title, value, sub, accent, index = 0 }) {
  return (
    <div className={`insight-card animate-fade-in stagger-${index + 1}`}>
      <div className="insight-card__icon" style={accent ? { background: accent + '22', color: accent } : {}}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="insight-card__content">
        <div className="insight-card__title">{title}</div>
        <div className="insight-card__value" style={accent ? { color: accent } : {}}>{value}</div>
        {sub && <div className="insight-card__sub">{sub}</div>}
      </div>
    </div>
  );
}
