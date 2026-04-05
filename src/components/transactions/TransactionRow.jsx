import { Pencil, Trash2, Tag } from 'lucide-react';
import { CATEGORIES } from '../../constants/constants';
import { formatCurrency, formatDate } from '../../utils/helpers';
import './TransactionRow.css';

export default function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  if (!txn) return null;

  const cat = CATEGORIES.find(c => c.id === txn.category) || CATEGORIES[CATEGORIES.length - 1];
  const Icon = cat?.LucideIcon || Tag;

  return (
    <div className="txn-row">
      <div className="txn-row__cat-icon" style={{ background: (cat.color || '#b2bec3') + '22' }}>
        <Icon size={16} color={cat.color || '#b2bec3'} />
      </div>

      <div className="txn-row__info">
        <div className="txn-row__desc">{txn.description || '—'}</div>
        <div className="txn-row__meta">
          <span>{txn.date ? formatDate(txn.date, 'short') : '—'}</span>
          <span className="txn-row__dot">·</span>
          <span style={{ color: cat.color }}>{cat.label}</span>
          {txn.note && <><span className="txn-row__dot">·</span><span className="txn-row__note">{txn.note}</span></>}
        </div>
      </div>

      <div className="txn-row__right">
        <div className={`txn-row__amount ${txn.type === 'income' ? 'amount--income' : 'amount--expense'}`}>
          {txn.type === 'income' ? '+' : '−'}{formatCurrency(txn.amount || 0)}
        </div>
        <span className={`txn-badge txn-badge--${txn.type}`}>{txn.type}</span>
      </div>

      {isAdmin && (
        <div className="txn-row__actions">
          <button className="txn-action-btn" onClick={() => onEdit(txn)} title="Edit"><Pencil size={13} /></button>
          <button className="txn-action-btn txn-action-btn--delete" onClick={() => onDelete(txn.id)} title="Delete"><Trash2 size={13} /></button>
        </div>
      )}
    </div>
  );
}