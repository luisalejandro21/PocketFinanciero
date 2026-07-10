import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccounts } from "../../api/accounts";
import { getCategories } from "../../api/categories";
import { createTransaction } from "../../api/transactions";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

function NewTransactionPage() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    account: "",
    category: "",
    transaction_type: "EXPENSE",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    status: "CONFIRMED",
  });

  const filteredCategories = categories.filter(
    (category) => category.category_type === formData.transaction_type
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [accountsData, categoriesData] = await Promise.all([
          getAccounts(),
          getCategories(),
        ]);

        setAccounts(accountsData);
        setCategories(categoriesData);

        const expenseCategories = categoriesData.filter(
          (category) => category.category_type === "EXPENSE"
        );

        setFormData((prev) => ({
          ...prev,
          account: accountsData[0]?.id || "",
          category: expenseCategories[0]?.id || "",
        }));
      } catch {
        setError("No se pudieron cargar los datos del formulario.");
      }
    };

    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "transaction_type") {
      const newFilteredCategories = categories.filter(
        (category) => category.category_type === value
      );

      setFormData((prev) => ({
        ...prev,
        transaction_type: value,
        category: newFilteredCategories[0]?.id || "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.account) {
      setError("Debes seleccionar una cuenta.");
      return;
    }

    if (!formData.category) {
      setError("Debes seleccionar una categoría.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("El monto debe ser mayor a cero.");
      return;
    }

    try {
      setSaving(true);
      await createTransaction(formData);
      navigate("/dashboard");
    } catch {
      setError("No se pudo registrar el movimiento.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <h2 className="text-2xl font-bold text-slate-900">Nuevo movimiento</h2>
        <p className="mt-2 text-sm text-slate-500">
          Registra un ingreso o gasto en tu cuenta.
        </p>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Select
            label="Tipo de movimiento"
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleChange}
          >
            <option value="INCOME">Ingreso</option>
            <option value="EXPENSE">Gasto</option>
          </Select>

          <Select
            label="Cuenta"
            name="account"
            value={formData.account}
            onChange={handleChange}
          >
            <option value="">Selecciona una cuenta</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </Select>

          <Select
            label="Categoría"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Input
            label="Monto"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Ej: 15000"
            required
          />

          <Input
            label="Fecha"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <Input
            label="Descripción"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej: Almuerzo"
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Registrar movimiento"}
          </button>
        </form>
      </Card>
    </DashboardLayout>
  );
}

export default NewTransactionPage;