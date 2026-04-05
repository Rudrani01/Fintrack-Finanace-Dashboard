import { SearchX } from 'lucide-react';
import TransactionRow from './TransactionRow';
import './TransactionTable.css';

export default function TransactionTable({ transactions, isAdmin, onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="txn-empty">
        <SearchX size={36} strokeWidth={1.5} color="var(--text-muted)" />
        <p className="txn-empty__title">No transactions found</p>
        <p className="txn-empty__sub">Try adjusting your filters or add a new transaction.</p>
      </div>
    );
  }

  // console.log('first txn:', transactions[0]);
  
  return (
    <div className="txn-table">
      <div className="txn-table__header">
        <span>Transaction</span>
        <span className="txn-table__header-right">Amount</span>
      </div>
      <div className="txn-table__body">
        {transactions.map((txn) => (
          <TransactionRow
            key={txn.id}
            txn={txn}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}