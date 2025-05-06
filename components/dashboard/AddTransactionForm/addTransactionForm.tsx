import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Transaction } from '@/interfaces/transaction';
import { z } from 'zod';
import { useTransactions } from '@/store/useTransactions';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';

const transactionSchema = z.object({
  amount: z.number().min(1, 'La cantidad debe ser mayor que 0'),
  type: z.enum(['income', 'expense'], { message: 'Selecciona un tipo de transacción' }),
  category: z.string().min(1, 'La categoría es requerida'),
  description: z.string().min(1, 'La descripción es requerida'),
  date: z.string().min(1, 'La fecha es requerida'),
});

export default function AddTransactionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Transaction>({
    resolver: zodResolver(transactionSchema),
  });
  const { user } = useAuth();
  const { addTransaction, success } = useTransactions();

  useEffect(() => {
    if(success) {
      reset();
    }
  }, [success])

  const submit = (data: Transaction) => {
    const transaction = {
      amount: data.amount,
      type: data.type,
      category: data.category,
      description: data.description,
      date: data.date
    };

    addTransaction(transaction);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl mb-4">Agregar Transacción</h2>
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        
        {/* Campo de Monto */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2">Cantidad</label>
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            id="amount"
            className="p-2 rounded-md bg-gray-700 text-white"
            placeholder="Monto de la transacción"
          />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>

        {/* Campo de Tipo */}
        <div className="flex flex-col">
          <label htmlFor="type" className="mb-2">Tipo</label>
          <select
            {...register('type')}
            id="type"
            className="p-2 rounded-md bg-gray-700 text-white"
          >
            <option value="">Selecciona el tipo de transacción</option>
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        {/* Campo de Categoría */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2">Categoría</label>
          <input
            {...register('category')}
            type="text"
            id="category"
            className="p-2 rounded-md bg-gray-700 text-white"
            placeholder="Categoría de la transacción"
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Campo de Descripción */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2">Descripción</label>
          <input
            {...register('description')}
            type="text"
            id="description"
            className="p-2 rounded-md bg-gray-700 text-white"
            placeholder="Descripción de la transacción"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* Campo de Fecha */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2">Fecha</label>
          <input
            {...register('date')}
            type="date"
            id="date"
            className="p-2 rounded-md bg-gray-700 text-white"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        {/* Botón de Enviar */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
          >
            Agregar Transacción
          </button>
        </div>
      </form>
    </div>
  );
}
