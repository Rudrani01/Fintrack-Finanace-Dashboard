import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'md', text }) {
  return (
    <div className={`spinner-wrap spinner-wrap--${size}`}>
      <div className="spinner" />
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );
}
