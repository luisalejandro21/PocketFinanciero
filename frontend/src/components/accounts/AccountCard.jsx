import { Link } from "react-router-dom";

function AccountCard({
  account,
  onDeactivate,
  onReactivate,
}) {
  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString("es-CL")}`;
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">
        {account.institution || "Sin institución"}
      </p>

      <h3 className="mt-2 text-xl font-bold text-slate-900">
        {account.name}
      </h3>

      <p className="mt-4 text-2xl font-bold text-blue-600">
        {formatCurrency(account.current_balance)}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {account.account_type} · {account.currency}
      </p>

      <div className="mt-5 flex gap-3">
        {account.is_active ? (
          <>
            <Link
              to={`/accounts/${account.id}/edit`}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Editar
            </Link>

            <button
              onClick={() => onDeactivate(account.id)}
              className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Desactivar
            </button>
          </>
        ) : (
          <button
            onClick={() => onReactivate(account.id)}
            className="rounded-xl border border-green-300 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
          >
            Reactivar
          </button>
        )}
      </div>
    </div>
  );
}

export default AccountCard;