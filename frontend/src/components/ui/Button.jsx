function Button({ children, type = "button", variant = "primary", onClick }) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
    onClick={onClick}
      type={type}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-sm transition ${variants[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button