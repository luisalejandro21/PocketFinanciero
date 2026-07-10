function Select({
  label,
  name,
  value,
  onChange,
  children,
  required = false,
  disabled = false,
  error = "",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900
          outline-none transition
          focus:border-blue-600 focus:ring-4 focus:ring-blue-100
          disabled:cursor-not-allowed disabled:bg-slate-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300"
          }
        `}
      >
        {children}
      </select>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;