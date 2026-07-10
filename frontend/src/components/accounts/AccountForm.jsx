function AccountForm({
  form,
  onChange,
  onSubmit,
  saving,
  submitText,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Nombre de la cuenta
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Tipo de cuenta
        </label>

        <select
          name="account_type"
          value={form.account_type}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="CHECKING">Cuenta corriente</option>
          <option value="VIEW">Cuenta vista</option>
          <option value="SAVINGS">Cuenta ahorro</option>
          <option value="CASH">Efectivo</option>
          <option value="CREDIT_CARD">Tarjeta de crédito</option>
          <option value="OTHER">Otra</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Institución
        </label>

        <input
          type="text"
          name="institution"
          value={form.institution}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Saldo inicial
        </label>

        <input
          type="number"
          name="initial_balance"
          value={form.initial_balance}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Moneda
        </label>

        <input
          type="text"
          name="currency"
          value={form.currency}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Notas
        </label>

        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={onChange}
        />

        <span className="text-sm text-slate-700">
          Cuenta activa
        </span>
      </label>

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

export default AccountForm;