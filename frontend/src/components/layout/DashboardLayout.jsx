import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  Folder,
  Home,
  LogOut,
  ReceiptText,
} from "lucide-react";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

const pageTitles = {
  "/dashboard": "Dashboard",
  "/transactions": "Movimientos",
  "/transactions/new": "Nuevo movimiento",
  "/accounts": "Cuentas",
  "/categories": "Categorías",
  "/reports": "Reportes",
};

const currentTitle = pageTitles[location.pathname] || "PocketFinanciero";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Movimientos", href: "/transactions", icon: ReceiptText },
{ label: "Cuentas", href: "/accounts", icon: CreditCard },
{ label: "Categorías", href: "/categories", icon: Folder },
{ label: "Reportes", href: "/reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 lg:block">
        <h1 className="mb-10 text-2xl font-bold text-slate-900">
          PocketFinanciero
        </h1>

        <nav className="space-y-2 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="lg:ml-64">
        <header className="border-b border-slate-200 bg-white px-6 py-5">
          <p className="text-sm text-slate-500">Bienvenido</p>
          <h2 className="text-2xl font-bold text-slate-900">{currentTitle}</h2>
        </header>

        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}

export default DashboardLayout;