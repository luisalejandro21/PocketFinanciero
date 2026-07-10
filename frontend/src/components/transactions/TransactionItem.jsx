import { Link } from "react-router-dom";

function TransactionItem({
  transaction,
  onDelete,
}) {
  const isIncome = transaction.transaction_type === "INCOME";

  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString("es-CL")}`;
  };

  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="font-semibold text-slate-900">
          {transaction.description || "Movimiento sin descripción"}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {transaction.date} · {isIncome ? "Ingreso" : "Gasto"}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <p
          className={`text-lg font-bold ${
            isIncome
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>

        <div className="flex gap-2">
          <Link
            to={`/transactions/${transaction.id}/edit`}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Editar
          </Link>

          <button
            onClick={() => onDelete(transaction.id)}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Anular
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;