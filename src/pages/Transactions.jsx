import { useState, useMemo } from 'react';
import { Download, Plus } from 'lucide-react';
import { useTransactionContext } from '../context/TransactionContext';
import { useTransactions } from '../hooks/useTransactions';
import { useIsAdmin } from '../hooks/useRoleGuard';
import { useExport } from '../hooks/useExport';
import { formatCurrency } from '../utils/helpers';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionForm from '../components/transactions/TransactionForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Transactions.css';

export default function Transactions() {
  const { addTransaction, updateTransaction, deleteTransaction, loading } = useTransactionContext();
  const isAdmin = useIsAdmin();
  const { exportCSV, exportJSON } = useExport();

  const [filters, setFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { filtered } = useTransactions(filters);

  const totalIncome = useMemo(() => filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0), [filtered]);
  const totalExpense = useMemo(() => filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0), [filtered]);

  const openAdd = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (txn) => { setEditTarget(txn); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editTarget) await updateTransaction(editTarget.id, data);
      else await addTransaction(data);
      closeModal();
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setDeleteConfirm(null);
  };

  if (loading) return <LoadingSpinner text="Loading transactions…" />;

  return (
    <div className="page-wrapper page-enter">
      <div className="page-header txn-page-header">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">{filtered.length} records · Income {formatCurrency(totalIncome, true)} · Expenses {formatCurrency(totalExpense, true)}</p>
        </div>
        <div className="txn-page-actions">
          <Button variant="ghost" size="sm" onClick={() => exportCSV(filtered)} icon={<Download size={13} />}>CSV</Button>
          <Button variant="ghost" size="sm" onClick={() => exportJSON(filtered)} icon={<Download size={13} />}>JSON</Button>
          {isAdmin && (
            <Button variant="primary" size="sm" onClick={openAdd} icon={<Plus size={13} />}>Add Transaction</Button>
          )}
        </div>
      </div>

      <TransactionFilters filters={filters} onChange={setFilters} />

      <TransactionTable
        transactions={filtered}
        isAdmin={isAdmin}
        onEdit={openEdit}
        onDelete={(id) => setDeleteConfirm(id)}
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editTarget ? 'Edit Transaction' : 'Add Transaction'}
        size="md"
      >
        <TransactionForm
          initial={editTarget}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Transaction"
        size="sm"
      >
        <div className="delete-confirm">
          <p>Are you sure you want to delete this transaction? This cannot be undone.</p>
          <div className="delete-confirm__actions">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}