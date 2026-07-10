import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAccountById, updateAccount } from "../../api/accounts";
import AccountForm from "../../components/accounts/AccountForm";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";

function EditAccountPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    account_type: "CHECKING",
    institution: "",
    initial_balance: "",
    current_balance: "",
    currency: "CLP",
    notes: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      try {
        const data = await getAccountById(id);

        setForm({
          name: data.name || "",
          account_type: data.account_type || "CHECKING",
          institution: data.institution || "",
          initial_balance: data.initial_balance || "",
          current_balance: data.current_balance || "",
          currency: data.currency || "CLP",
          notes: data.notes || "",
          is_active: data.is_active ?? true,
        });
      } catch (error) {
        console.log("ERROR AL CARGAR CUENTA:", error.response?.data || error.message);
        setError("No se pudo cargar la cuenta.");
      } finally {
        setLoading(false);
      }
    };

    loadAccount();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateAccount(id, form);
      navigate("/accounts");
    } catch (error) {
      console.log("ERROR AL ACTUALIZAR CUENTA:", error.response?.data || error.message);
      setError("No se pudo actualizar la cuenta.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-slate-500">Cargando cuenta...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card>
        <h2 className="text-2xl font-bold text-slate-900">
          Editar cuenta
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Modifica los datos de tu cuenta financiera.
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
            submitText="Guardar cambios"
          />
        </div>
      </Card>
    </DashboardLayout>
  );
}

export default EditAccountPage;