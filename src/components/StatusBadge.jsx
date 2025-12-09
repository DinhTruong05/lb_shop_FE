export default function StatusBadge({ status }) {
    const styles = {
      "On Loan": "bg-green-500/20 text-green-400",
      "Overdue": "bg-red-500/20 text-red-400",
      "Due Soon": "bg-yellow-500/20 text-yellow-400",
    };
  
    return (
      <span className={`${styles[status]} px-2 py-1 text-xs font-bold rounded-full`}>
        {status}
      </span>
    );
  }
  