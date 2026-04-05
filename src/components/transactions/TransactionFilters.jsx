import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../../constants/constants';
import './TransactionFilters.css';

export default function TransactionFilters({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="filters">
      <div className="filters__search-wrap">
        <Search size={14} className="filters__search-icon" />
        <input
          className="filters__search"
          type="text"
          placeholder="Search transactions…"
          value={filters.search || ''}
          onChange={set('search')}
        />
        {filters.search && (
          <button className="filters__clear-search" onClick={() => onChange({ ...filters, search: '' })}>
            <X size={13} />
          </button>
        )}
      </div>

      <div className="filters__row">
        <select className="filters__select" value={filters.type || 'all'} onChange={set('type')}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className="filters__select" value={filters.category || 'all'} onChange={set('category')}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>

        <select className="filters__select"
          value={`${filters.sortBy || 'date'}-${filters.sortDir || 'desc'}`}
          onChange={e => {
            const [sortBy, sortDir] = e.target.value.split('-');
            onChange({ ...filters, sortBy, sortDir });
          }}>
          <option value="date-desc">Date ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="amount-asc">Amount ↑</option>
          <option value="description-asc">Name A–Z</option>
        </select>

        {Object.values(filters).some(v => v && v !== 'all' && v !== 'date' && v !== 'desc') && (
          <button className="filters__reset" onClick={() => onChange({})}>Reset</button>
        )}
      </div>
    </div>
  );
}