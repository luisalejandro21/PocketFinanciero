import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../api/accounts";
import AccountForm from "../../components/accounts/AccountForm";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

function NewAccountPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    account_type: "VIEW",
    institution: "",
    initial_balance: "",
    currency: "CLP",
    notes: "",
    is_active: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Debes ingresar un nombre para la cuenta.");
      return;
    }

    if (!form.initial_balance || Number(form.initial_balance) < 0) {
      setError("El saldo inicial debe ser mayor o igual a cero.");
      return;
    }

    try {
      setSaving(true);
      await createAccount(form);
      navigate("/accounts");
    } catch (error) {
      console.log("ERROR AL CREAR CUENTA:", error.response?.data || error.message);
      setError("No se pudo crear la cuenta.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <h2 className="text-2xl font-bold text-slate-900">
          Nueva cuenta
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Registra una cuenta bancaria, efectivo u otro medio donde guardas dinero.
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-8">
          <AccountForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            saving={saving}
            submitText="Crear cuenta"
          />
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default NewAccountPage;