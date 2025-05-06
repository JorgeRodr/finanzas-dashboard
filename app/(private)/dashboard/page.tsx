'use client'

import { useState } from "react";
import TransactionList from "@/components/dashboard/TransactionLIst/TransactionLIst";
import AddTransactionForm from "@/components/dashboard/AddTransactionForm/addTransactionForm";

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

        <div className="mb-8">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? 'Ocultar formulario' : 'Añadir transacción'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <AddTransactionForm />
          </div>
        )}

        <TransactionList />
      </div>
    </div>
  );
}
