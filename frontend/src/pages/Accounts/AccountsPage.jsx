import { useEffect, useState } from "react";

import {
  deactivateAccount,
  getAccounts,
  reactivateAccount,
} from "../../api/accounts";
import AccountCard from "../../components/accounts/AccountCard";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

function AccountsPage() {
  const [activeAccounts, setActiveAccounts] = useState([]);
  const [inactiveAccounts, setInactiveAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAccounts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAccounts();

      setActiveAccounts(data.filter((account) => account.is_active));
      setInactiveAccounts(data.filter((account) => !account.is_active));
    } catch (error) {
      console.log("ERROR AL CARGAR CUENTAS:", error.response?.data || error.message);
      setError("No se pudieron cargar las cuentas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleDeactivate = async (id) => {
    const confirm = window.confirm(
      "¿Seguro que deseas desactivar esta cuenta?"
    );

    if (!confirm) return;

    try {
      await deactivateAccount(id);
      await loadAccounts();
    } catch (error) {
      console.log("ERROR AL DESACTIVAR CUENTA:", error.response?.data || error.message);
      alert("No se pudo desactivar la cuenta.");
    }
  };

  const handleReactivate = async (id) => {
    try {
      await reactivateAccount(id);
      await loadAccounts();
    } catch (error) {
      console.log("ERROR AL REACTIVAR CUENTA:", error.response?.data || error.message);
      alert("No se pudo reactivar la cuenta.");
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Cuentas
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Administra tus cuentas y saldos disponibles.
            </p>
          </div>

          <a
            href="/accounts/new"
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Nueva cuenta
          </a>
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="mt-8 text-sm text-slate-500">
            Cargando cuentas...
          </p>
        ) : (
          <>
            <section className="mt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Cuentas activas
              </h3>

              {activeAccounts.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No tienes cuentas activas.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {activeAccounts.map((account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      onDeactivate={handleDeactivate}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mt-10 border-t border-slate-200 pt-8">
              <h3 className="text-lg font-bold text-slate-900">
                Cuentas desactivadas
              </h3>

              {inactiveAccounts.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No tienes cuentas desactivadas.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {inactiveAccounts.map((account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      onDeactivate={handleDeactivate}
                      onReactivate={handleReactivate}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}

export default AccountsPage;