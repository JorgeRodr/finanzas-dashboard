import { TransactionFirebaseData } from "@/interfaces/transaction";
import { useTransactions } from "@/store/useTransactions";
import { useEffect } from "react";
import TransactionItem from "./partials/TransactionItem";
import { useAuth } from "@/hooks/useAuth";

export default function TransactionList() {

  const {fetchTransactions, deleteTransaction, updateTransaction, transactions } = useTransactions();
  // const { user } = useAuth();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  const onDelete = (id: TransactionFirebaseData['id']) => {
    deleteTransaction(id);
  }

  const onUpdate = (data: TransactionFirebaseData) => {
    updateTransaction(data);
  }

  if (transactions.length === 0) {
    return <p className="text-gray-400">No transactions found.</p>;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl">Total balance: <span className="font-bold">{total.toFixed(2)}€</span></h2>
      </div>
      <ul className="flex flex-col gap-4">
        {transactions.map((transaction) => (<TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
        ))}
      </ul>
    </>
  );
}
