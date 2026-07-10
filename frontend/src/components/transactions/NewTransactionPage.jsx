import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccounts } from "../../api/accounts";
import { getCategories } from "../../api/categories";
import { createTransaction } from "../../api/transactions";
import TransactionForm from "../../components/transactions/TransactionForm";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

function NewTransactionPage() {
  const navigate = useNavigate();

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    transaction_type: "EXPENSE",
    account: "",
    destination_account: "",
    category: "",
    amount: "",
    date: today,
    description: "",
    status: "CONFIRMED",
  });

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [accountsData, categoriesData] = await Promise.all([
          getAccounts(),
          getCategories(),
        ]);

        setAccounts(accountsData.filter((account) => account.is_active));
        setCategories(categoriesData);
      } catch (error) {
        console.log("ERROR AL CARGAR DATOS:", error.response?.data || error.message);
        setError("No se pudieron cargar las cuentas o categorías.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => {
      const nextForm = {
        ...prevForm,
        [name]: value,
      };

      if (name === "transaction_type") {
        nextForm.category = "";
        nextForm.destination_account = "";
      }

      if (name === "account") {
        nextForm.destination_account = "";
      }

      return nextForm;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.account) {
      setError("Debes seleccionar una cuenta.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("El monto debe ser mayor que cero.");
      return;
    }

    if (form.transaction_type === "TRANSFER") {
      if (!form.destination_account) {
        setError("Debes seleccionar una cuenta destino.");
        return;
      }

      if (String(form.account) === String(form.destination_account)) {
        setError("La cuenta origen y destino no pueden ser la misma.");
        return;
      }
    } else if (!form.category) {
      setError("Debes seleccionar una categoría.");
      return;
    }

    const payload = {
      ...form,
      category: form.transaction_type === "TRANSFER" ? null : form.category,
      destination_account:
        form.transaction_type === "TRANSFER" ? form.destination_account : null,
    };

    try {
      setSaving(true);
      await createTransaction(payload);
      navigate("/transactions");
    } catch (error) {
      console.log("ERROR AL CREAR MOVIMIENTO:", error.response?.data || error.message);
      setError("No se pudo crear el movimiento.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-slate-500">Cargando formulario...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card>
        <h2 className="text-2xl font-bold text-slate-900">
          Nuevo movimiento
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Registra un ingreso, gasto o transferencia entre tus cuentas.
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-8">
          <TransactionForm
            form={form}
            accounts={accounts}
            categories={categories}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            submitText="Guardar movimiento"
          />
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default NewTransactionPage;