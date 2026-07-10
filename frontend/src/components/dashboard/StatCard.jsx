import Card from "../ui/Card";

function StatCard({ title, value, color = "slate" }) {
  const colorClasses = {
    slate: "text-slate-900",
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
  };

  return (
    <Card>
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h3 className={`mt-3 text-3xl font-bold ${colorClasses[color]}`}>
        {value}
      </h3>
    </Card>
  );
}

export default StatCard;