function TransactionForm({
  form,
  accounts,
  categories,
  onChange,
  onSubmit,
  saving,
  submitText,
}) {
  const isTransfer = form.transaction_type === "TRANSFER";

  const filteredCategories = categories.filter((category) => {
    if (form.transaction_type === "INCOME") {
      return category.category_type === "INCOME";
    }

    if (form.transaction_type === "EXPENSE") {
      return category.category_type === "EXPENSE";
    }

    return false;
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tipo de movimiento
        </label>

        <select
          name="transaction_type"
          value={form.transaction_type}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="INCOME">Ingreso</option>
          <option value="EXPENSE">Gasto</option>
          <option value="TRANSFER">Transferencia</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {isTransfer ? "Cuenta origen" : "Cuenta"}
        </label>

        <select
          name="account"
          value={form.account}
          onChange={onChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">Selecciona una cuenta</option>

          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name} - {account.institution || "Sin institución"}
            </option>
          ))}
        </select>
      </div>

      {isTransfer && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cuenta destino
          </label>

          <select
            name="destination_account"
            value={form.destination_account}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Selecciona una cuenta destino</option>

            {accounts
              .filter((account) => String(account.id) !== String(form.account))
              .map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} - {account.institution || "Sin institución"}
                </option>
              ))}
          </select>
        </div>
      )}

      {!isTransfer && (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Categoría
          </label>

          <select
            name="category"
            value={form.category}
            onChange={onChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">Selecciona una categoría</option>

            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Monto
        </label>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={onChange}
          required
          min="1"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Fecha
        </label>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Descripción
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? "Guardando..." : submitText}
      </button>
    </form>
  );
}

export default TransactionForm;