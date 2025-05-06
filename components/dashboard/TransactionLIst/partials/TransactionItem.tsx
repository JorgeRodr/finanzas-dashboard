// TransactionItem.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Transaction, TransactionFirebaseData } from "@/interfaces/transaction";

type TransactionItemProps = {
  transaction: TransactionFirebaseData;
  onDelete: (id: TransactionFirebaseData['id']) => void;
  onUpdate: (data: TransactionFirebaseData) => void;
};

type TransactionEditionData = {
  description: Transaction['description'];
  amount: Transaction['amount'];
}

export default function TransactionItem({ transaction, onDelete, onUpdate }: TransactionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<TransactionEditionData>({
    defaultValues: {
      description: transaction.description,
      amount: transaction.amount,
    },
  });

  const submit = (data: TransactionEditionData) => {
    const newData = {
      id: transaction.id,
      userId: transaction.userId,
      amount: data.amount,
      type: transaction.type,
      category: transaction.category,
      description: data.description,
      date: transaction.date
    };
    onUpdate(newData);
    setIsEditing(false);
  };

  return (
    <li className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
          <input
            {...register("description")}
            className="bg-gray-700 text-white p-2 rounded"
          />
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="bg-gray-700 text-white p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setIsEditing(false);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{transaction.description}</h3>
            <p className="text-sm text-gray-400">{transaction.amount}€</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-400 text-sm underline mt-1"
            >
              Editar
            </button>
          </div>
          <button
            onClick={() => onDelete(transaction.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
