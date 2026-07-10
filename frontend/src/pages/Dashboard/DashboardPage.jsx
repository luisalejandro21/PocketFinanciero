import { useEffect, useState } from "react";

import { getAccounts } from "../../api/accounts";
import { getTransactions } from "../../api/transactions";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";

function DashboardPage() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      setError("");

      try {
        const [accountsData, transactionsData] = await Promise.all([
          getAccounts(),
          getTransactions(),
        ]);

        setAccounts(accountsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.log("ERROR DASHBOARD:", error.response?.data || error.message);
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString("es-CL")}`;
  };

  const activeAccounts = accounts.filter((account) => account.is_active);

  const totalBalance = activeAccounts.reduce((total, account) => {
    return total + Number(account.current_balance);
  }, 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear &&
      transaction.status === "CONFIRMED"
    );
  });

  const monthlyIncome = monthlyTransactions
    .filter((transaction) => transaction.transaction_type === "INCOME")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const monthlyExpenses = monthlyTransactions
    .filter((transaction) => transaction.transaction_type === "EXPENSE")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const monthlyBalance = monthlyIncome - monthlyExpenses;

  return (
    <DashboardLayout>
      {error && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Saldo total"
          value={loading ? "Cargando..." : formatCurrency(totalBalance)}
        />

        <StatCard
          title="Ingresos del mes"
          value={loading ? "Cargando..." : formatCurrency(monthlyIncome)}
          color="green"
        />

        <StatCard
          title="Gastos del mes"
          value={loading ? "Cargando..." : formatCurrency(monthlyExpenses)}
          color="red"
        />

        <StatCard
          title="Balance"
          value={loading ? "Cargando..." : formatCurrency(monthlyBalance)}
          color="blue"
        />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;