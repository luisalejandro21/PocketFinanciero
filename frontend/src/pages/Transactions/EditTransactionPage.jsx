import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAccounts } from "../../api/accounts";
import { getCategories } from "../../api/categories";
import {
  getTransactionById,
  updateTransaction,
} from "../../api/transactions";

import TransactionForm from "../../components/transactions/TransactionForm";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

function EditTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    transaction_type: "EXPENSE",
    account: "",
    destination_account: "",
    category: "",
    amount: "",
    date: "",
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
        const [
          transactionData,
          accountsData,
          categoriesData,
        ] = await Promise.all([
          getTransactionById(id),
          getAccounts(),
          getCategories(),
        ]);

        setForm({
          transaction_type: transactionData.transaction_type,
          account: String(transactionData.account ?? ""),
          destination_account: String(
            transactionData.destination_account ?? ""
          ),
          category: String(transactionData.category ?? ""),
          amount: transactionData.amount ?? "",
          date: transactionData.date ?? "",
          description: transactionData.description ?? "",
          status: transactionData.status ?? "CONFIRMED",
        });

        const availableAccounts = accountsData.filter((account) => {
          const isCurrentAccount =
            String(account.id) === String(transactionData.account);

          const isDestinationAccount =
            String(account.id) ===
            String(transactionData.destination_account);

          return (
            account.is_active ||
            isCurrentAccount ||
            isDestinationAccount
          );
        });

        setAccounts(availableAccounts);
        setCategories(categoriesData);
      } catch (error) {
        console.log(
          "ERROR AL CARGAR MOVIMIENTO:",
          error.response?.data || error.message
        );

        setError("No se pudo cargar el movimiento.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

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

    if (!form.date) {
      setError("Debes seleccionar una fecha.");
      return;
    }

    if (form.transaction_type === "TRANSFER") {
      if (!form.destination_account) {
        setError("Debes seleccionar una cuenta destino.");
        return;
      }

      if (
        String(form.account) ===
        String(form.destination_account)
      ) {
        setError(
          "La cuenta origen y destino no pueden ser la misma."
        );
        return;
      }
    } else if (!form.category) {
      setError("Debes seleccionar una categoría.");
      return;
    }

    const payload = {
      ...form,
      category:
        form.transaction_type === "TRANSFER"
          ? null
          : form.category,
      destination_account:
        form.transaction_type === "TRANSFER"
          ? form.destination_account
          : null,
    };

    try {
      setSaving(true);

      await updateTransaction(id, payload);

      navigate("/transactions");
    } catch (error) {
      console.log(
        "ERROR AL EDITAR MOVIMIENTO:",
        error.response?.data || error.message
      );

      const backendError =
        error.response?.data?.detail ||
        error.response?.data?.amount?.[0] ||
        error.response?.data?.account?.[0] ||
        error.response?.data?.category?.[0] ||
        error.response?.data?.destination_account?.[0];

      setError(
        backendError || "No se pudo editar el movimiento."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-slate-500">
          Cargando movimiento...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card>
        <h2 className="text-2xl font-bold text-slate-900">
          Editar movimiento
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Modifica los datos del ingreso, gasto o transferencia.
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
            submitText="Guardar cambios"
          />
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default EditTransactionPage;