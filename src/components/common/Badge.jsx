import './Badge.css';

export default function Badge({ children, variant = 'default', dot = false, style }) {
  return (
    <span className={`badge badge--${variant}`} style={style}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}
