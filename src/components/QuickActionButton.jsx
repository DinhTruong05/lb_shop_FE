import Icon from "./Icon";

export default function QuickActionButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded bg-primary/10 hover:bg-primary/20 text-primary">
      <Icon name={icon} className="text-3xl" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}
