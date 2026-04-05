import './EmptyState.css';

export default function EmptyState({ icon = '📭', title = 'Nothing here', message, action }) {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state__icon">{icon}</div>
      <div className="empty-state__title">{title}</div>
      {message && <div className="empty-state__message">{message}</div>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
