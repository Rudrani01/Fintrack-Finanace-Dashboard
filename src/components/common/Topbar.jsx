import './Topbar.css';

export default function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="topbar__menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="3" width="16" height="2" rx="1" fill="currentColor"/>
          <rect x="1" y="8" width="16" height="2" rx="1" fill="currentColor"/>
          <rect x="1" y="13" width="10" height="2" rx="1" fill="currentColor"/>
        </svg>
      </button>
      <span className="topbar__title">Fintrack</span>
    </header>
  );
}
