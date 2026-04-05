import { useState, useEffect } from 'react';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants/constants';
import Button from '../common/Button';
import './TransactionForm.css';

const defaultForm = {
  description: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  category: 'food',
  note: '',
};

export default function TransactionForm({ initial, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState(initial ? { ...initial, amount: String(initial.amount) } : defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({ ...initial, amount: String(initial.amount) });
  }, [initial]);

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Required';
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  const filteredCategories = CATEGORIES.filter(c => c.type === form.type || (form.type === 'income' ? c.type === 'income' : c.type === 'expense'));

  return (
    <div className="txn-form">
      {/* Type */}
      <div className="form-field">
        <label className="form-label">Type</label>
        <div className="type-toggle">
          {['expense', 'income'].map(t => (
            <button
              key={t}
              type="button"
              className={`type-btn type-btn--${t} ${form.type === t ? 'type-btn--active' : ''}`}
              onClick={() => { setForm(f => ({ ...f, type: t, category: t === 'income' ? 'salary' : 'food' })); }}
            >
              {t === 'income' ? '📈 Income' : '📉 Expense'}
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        {/* Description */}
        <div className="form-field form-field--grow">
          <label className="form-label">Description</label>
          <input className={`form-input ${errors.description ? 'form-input--error' : ''}`}
            type="text" value={form.description} onChange={set('description')}
            placeholder="e.g. Monthly Salary" />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        {/* Amount */}
        <div className="form-field form-field--amount">
          <label className="form-label">Amount (₹)</label>
          <input className={`form-input ${errors.amount ? 'form-input--error' : ''}`}
            type="number" value={form.amount} onChange={set('amount')}
            placeholder="0" min="1" />
          {errors.amount && <span className="form-error">{errors.amount}</span>}
        </div>
      </div>

      <div className="form-row">
        {/* Category */}
        <div className="form-field form-field--grow">
          <label className="form-label">Category</label>
          <select className="form-input" value={form.category} onChange={set('category')}>
            {CATEGORIES.filter(c => c.type === form.type).map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-field form-field--date">
          <label className="form-label">Date</label>
          <input className={`form-input ${errors.date ? 'form-input--error' : ''}`}
            type="date" value={form.date} onChange={set('date')} />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>
      </div>

      {/* Note */}
      <div className="form-field">
        <label className="form-label">Note <span className="form-optional">(optional)</span></label>
        <input className="form-input" type="text" value={form.note} onChange={set('note')}
          placeholder="Any additional details…" />
      </div>

      {/* Actions */}
      <div className="form-actions">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} loading={loading}>
          {initial ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </div>
    </div>
  );
}
