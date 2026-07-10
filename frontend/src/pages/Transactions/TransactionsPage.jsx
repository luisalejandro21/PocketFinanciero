import { useEffect, useState } from "react";

import {
  cancelTransaction,
  getTransactions,
} from "../../api/transactions";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TransactionItem from "../../components/transactions/TransactionItem";
import Card from "../../components/ui/Card";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTransactions = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTransactions();

      setTransactions(
        data.filter((transaction) => transaction.status === "CONFIRMED")
      );
    } catch (error) {
      console.log(
        "ERROR AL CARGAR MOVIMIENTOS:",
        error.response?.data || error.message
      );
      setError("No se pudieron cargar los movimientos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Seguro que deseas anular este movimiento?"
    );

    if (!confirm) return;

    try {
      await cancelTransaction(id);

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.log(
        "ERROR AL ANULAR MOVIMIENTO:",
        error.response?.data || error.message
      );

      alert("No se pudo anular el movimiento.");
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Movimientos
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Revisa tus ingresos, gastos y transferencias.
            </p>
          </div>

          <a
            href="/transactions/new"
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Nuevo movimiento
          </a>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-slate-500">
            Cargando movimientos...
          </p>
        ) : transactions.length === 0 ? (
          <p className="mt-8 text-sm text-slate-500">
            Aún no tienes movimientos registrados.
          </p>
        ) : (
          <div className="mt-8 divide-y divide-slate-200">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </Card>
    </DashboardLayout>
  );
}

export default TransactionsPage;