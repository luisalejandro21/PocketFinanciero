import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
const data = await login(formData.email, formData.password);

console.log("RESPUESTA LOGIN:", data);

localStorage.setItem("accessToken", data.access);
localStorage.setItem("refreshToken", data.refresh);

      navigate("/dashboard");
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <Card>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">
            PocketFinanciero
          </h1>

          <p className="mb-8 text-slate-500">
            Toma mejores decisiones con tu dinero.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <Button type="submit">
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}

export default LoginPage;