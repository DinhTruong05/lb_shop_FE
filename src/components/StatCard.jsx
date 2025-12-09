export default function StatCard({ title, value, change, positive }) {
    return (
      <div className="flex flex-col gap-2 rounded p-6 bg-[#1b2537] border border-white/10">
        <p className="text-white/80 text-base font-medium">{title}</p>
        <p className="text-white tracking-light text-3xl font-bold">{value}</p>
  
        <p className={`${positive ? "text-green-400" : "text-red-400"} text-base`}>
          {change}
        </p>
      </div>
    );
  }
  